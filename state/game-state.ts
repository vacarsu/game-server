import { EntityMap, Client } from "colyseus";
import { Player } from './player';

export class GameState {
  players: EntityMap<Player> = {};
  playerColors: EntityMap<string> = {};

  setHeroColor(client: Client, heroColor: string) {
    this.playerColors[ client.id ] = heroColor;
  }

  addPlayer (client: Client, options: any) {
    this.players[ client.id ] = new Player('idle', this.playerColors[ client.id ], options.x, options.y);
  }

  removePlayer (client: Client) {
    delete this.players[ client.id ];
    delete this.playerColors[ client.id ];
  }

  movePlayer (client: Client, action: any) {
    if (action.action === 'updateX') {
      this.players[ client.id ].x = action.value;
    } else if (action.action === 'updateY') {
      this.players[ client.id ].y = action.value;
    }

    if(action.action === 'playAnim') {
      this.players[ client.id ].animation = action.value;
    }
  }
}