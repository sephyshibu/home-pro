// utils/socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://home-pro-vlh7.vercel.app/', {
  transports: ['websocket'],
});

export default socket;
