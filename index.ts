import express, { Express } from 'express';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { MainRoom } from './rooms/main';

const app: Express = express();
const server: any = createServer(app);
const gameServer = new Server();

gameServer.attach({ server });
gameServer.listen(3000);

console.log('server running on port 3000');

gameServer.register("Main", MainRoom).
  on("create", (room) => console.log("room created:", room.roomId)).
  on("dispose", (room) => console.log("room disposed:", room.roomId)).
  on("join", (room, client) => console.log(client.id, "joined", room.roomId)).
  on("leave", (room, client) => console.log(client.id, "left", room.roomId));