import { Player } from "./player";
import { keys } from "../constants/keys";

export class PlayerController {
    player: Player;
    key:boolean[];
    constructor(player:Player,key:boolean[]){
        this.player= player;
        this.key = key;
    }

    evaluateInput() {
        let length = this.key.length;
        for (let i = 0; i < length; i++) {
            if (this.key[i]) {
                switch (i) {
                    case keys.keyA:
                        this.player.changeRotation(true);
                        break;
                    case keys.keyD:
                        this.player.changeRotation(false);
                        break;
                    case keys.keyW:
                        this.player.forward();
                        break;
                    case keys.keyS:
                        this.player.backward();
                        break;
                    case keys.spaceBar:
                        this.player.shoot();
                        break;
                    default:
                        console.log(i);
                        break;
                }
            }
        }
    }
}