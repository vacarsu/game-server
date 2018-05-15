import { Room, Client } from "colyseus";
import { GameState } from '../state/game-state';

export class MainRoom extends Room<GameState> {
  constructor() {
    super();
    this.setPatchRate(10);
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  onAuth (options: any): boolean { return true; }

  // When room is initialized
  onInit (options: any) {
    console.log('room initialized');
    this.setState(new GameState());
  }

  // Checks if a new client is allowed to join. (default: `return true`)
  requestJoin (options: any, isNew: boolean): boolean {
    return true;
  }

  // When client successfully join the room
  onJoin (client: Client, options: any) {
    this.state.setHeroColor(client, options.heroColor);
    this.state.addPlayer(client, options);
  }

  // When a client leaves the room
  onLeave (client: Client) {
    this.state.removePlayer(client);
  }

  // When a client sends a message
  onMessage (client: Client, message: any) {
    if (message.action) {
      this.state.movePlayer(client, message);
    } else if(message.heroColor) {
      this.state.setHeroColor(client, message.heroColor);
    }
  }

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose () { }
}