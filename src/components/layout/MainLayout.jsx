import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth';
import { addRealtimeNotification } from '../../features/notifications';

import { connectSocket, disconnectSocket } from '../../services/socket'; 
import toast from 'react-hot-toast';

export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let currentSocket = null;

    if (user && user._id) {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        currentSocket = connectSocket(token);

        currentSocket.on('new_notification', (newNotif) => {
          console.log('🔔 Notification:', newNotif);

          // Suppression Logic:
          // Don't show toast if it's a message/support notification AND user is currently on the chat page with this specific chat open.
          const isMessageOrSupport = newNotif.category === 'MESSAGE' || newNotif.category === 'SUPPORT';
          const notificationConvId = newNotif.data?.conversationId;
          
          const isViewingThisChat = location.pathname === '/chat' && notificationConvId === activeChatId;

          if (isMessageOrSupport && isViewingThisChat) {
            console.log('🛑 Toast suppressed: User is viewing this chat.');
          } else {
            // Show Toast
            toast.success(
              <div>
                <div className="font-bold">{newNotif.title}</div>
                {newNotif.message && <div className="text-xs opacity-90">{newNotif.message}</div>}
              </div>,
              { icon: '🔔', duration: 4000 }
            );
          }

          // Always update Redux state
          dispatch(addRealtimeNotification(newNotif));
        });
      }
    }

    return () => {
      if (currentSocket) {
        currentSocket.off('new_notification');
        // Note: We don't call disconnectSocket() here if we want the socket 
        // to stay alive across layout re-renders, but since MainLayout wraps 
        // all protected routes, it only unmounts on logout or hard refresh.
        disconnectSocket();
      }
    };
  }, [user, dispatch, activeChatId, location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}