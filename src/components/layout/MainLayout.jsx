import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth';
import { addRealtimeNotification } from '../../features/notifications';
import { socket } from '../../services/socket';
import toast from 'react-hot-toast';

export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Only connect if we have a logged-in user
    if (user && user._id) {

      const token = localStorage.getItem("accessToken");
      socket.auth = { token };
      socket.io.opts.transports = ['websocket'];
      
      // Connect to the backend
      socket.connect();

      // 2. Tell backend who we are so it puts us in a private room
      socket.emit('setup', { _id: user._id });

      // 3. Confirm Connection (Check your F12 Browser Console for this!)
      socket.on('connected', () => {
        console.log('🟢 Socket.io Successfully Connected!');
      });

      // 4. The Global Listener for New Notifications
      socket.on('new_notification', (newNotif) => {
        console.log('🔔 New Notification Received via Socket:', newNotif);

        // Show a Toast Popup
        toast.success(newNotif.title, { icon: '🔔', duration: 4000 });

        // Update Redux state instantly (Updates the Bell Icon count!)
        dispatch(addRealtimeNotification(newNotif));
      });
    }

    // Cleanup: Disconnect when user logs out or leaves
    return () => {
      socket.off('connected');
      socket.off('new_notification');
      socket.disconnect();
      console.log('🔴 Socket.io Disconnected');
    };
  }, [user, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Your Sidebar/Navbar Usually goes here */}
      <main className="flex-1 w-full">
        <Outlet /> {/* This renders HomeFeed, Notifications, etc. */}
      </main>
    </div>
  );
}