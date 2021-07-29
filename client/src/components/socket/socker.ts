import { io } from 'socket.io-client';

const configureSocket = () => {
  const clientSocket = io('http://localhost:5000', {
    path: '/api/socket',
    transports: ['websocket']
  });
};

export function SockerInit() {
  const socker = io('http://localhost:5000', {
    path: '/api/socket',
    transports: ['websocket']
  });
  return socker;
}
