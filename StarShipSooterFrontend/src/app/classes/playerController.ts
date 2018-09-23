import { Player } from "./ships/player";
import { keys } from "../constants/keys";

export enum Action{
    FORWARD,BACKWARD,TURN_LEFT,TURN_RIGHT,SHOOT
}
export class PlayerController {
    
    player: Player;
    key:boolean[];
    constructor(key:boolean[]){
        this.key = key;
    }

    evaluateInput():Action[] {
        let length = this.key.length;
        const pressedActions = [];
        for (let i = 0; i < length; i++) {
            if (this.key[i]) {
                switch (i) {
                    case keys.keyA:
                        // this.player.changeRotation(true);
                        pressedActions.push(Action.TURN_RIGHT)
                        break;
                    case keys.keyD:
                        // this.player.changeRotation(false);
                        pressedActions.push(Action.TURN_LEFT)
                        break;
                    case keys.keyW:
                        //this.player.forward();
                        pressedActions.push(Action.FORWARD)
                        break;
                    case keys.keyS:
                        //this.player.backward();
                        pressedActions.push(Action.BACKWARD)
                        break;
                    case keys.spaceBar:
                        //this.player.shoot();
                        pressedActions.push(Action.SHOOT);
                        break;
                    default:
                        break;
                }
            }
        }
        return pressedActions;
    }
}