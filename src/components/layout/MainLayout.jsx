import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth';
import { addRealtimeNotification } from '../../features/notifications';

import { connectSocket, disconnectSocket } from '../../services/socket'; 
import toast from 'react-hot-toast';

export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const dispatch = useDispatch();

  useEffect(() => {
    let currentSocket = null;

    // 2. Only connect if we have a logged-in user
    if (user && user._id) {
      // 3. Grab the token from local storage
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        // 4. Securely connect using the teammate's function!
        currentSocket = connectSocket(token);

        // 5. The Global Listener for New Notifications
        currentSocket.on('new_notification', (newNotif) => {
          console.log('🔔 New Notification Received via Socket:', newNotif);

          // 🛑 SUPPRESSION LOGIC: 
          // If this is a message notification and the user is ALREADY in that chat,
          // we don't show the toast popup.
          const isSameChat = newNotif.category === 'MESSAGE' && 
                             newNotif.data?.conversationId === activeChatId;

          if (!isSameChat) {
            // Show a Toast Popup
            toast.success(newNotif.title, { icon: '🔔', duration: 4000 });
          }

          // Update Redux state instantly (Always update state so the Bell Icon count is correct)
          dispatch(addRealtimeNotification(newNotif));
        });
      }
    }

    // 6. Cleanup: Disconnect when user logs out or leaves
    return () => {
      if (currentSocket) {
        currentSocket.off('new_notification');
        disconnectSocket();
        console.log('🔴 Socket.io Disconnected');
      }
    };
  }, [user, dispatch, activeChatId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}