// utils/socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://homepro.sephy.live', {
  transports: ['websocket'],
});

export default socket;
