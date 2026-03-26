// Socket configuration
import { io } from 'socket.io-client';

// We take your API URL (http://localhost:3000/api/v1) and remove the /api/v1 
// because Socket.io needs to connect to the root server (http://localhost:3000)
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '');

export const socket = io(SOCKET_URL, {
    autoConnect: false, // We only connect manually when the user logs in
    withCredentials: true,
});

let Socket = null;
 
export const connectSocket = (token) => {
  if (!Socket) {
    Socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    Socket.on('connect', () => {
      console.log('Connected to socket server:', Socket.id);
    });

    Socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });
  }
  return Socket;
};

export const getSocket = () => {
  if (!Socket) {
    console.warn('Socket not connected. Call connectSocket first.');
  }
  return Socket;
};

export const disconnectSocket = () => {
  if (Socket) {
    Socket.disconnect();
    Socket = null;
  }
};
