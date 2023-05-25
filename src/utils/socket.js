import io from 'socket.io-client';

const baseUrl = process.env.REACT_APP_BASE_URL;

const socket = io.connect(baseUrl, {
  transports: ['websocket'],
  reconnectionAttempts: 15,
});

export default socket;
