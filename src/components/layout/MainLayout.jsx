import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth';
import { addRealtimeNotification } from '../../features/notifications';

import { connectSocket, disconnectSocket } from '../../services/socket'; 
import toast from 'react-hot-toast';

export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
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

          // Show a Toast Popup
          toast.success(newNotif.title, { icon: '🔔', duration: 4000 });

          // Update Redux state instantly
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
  }, [user, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}