import { NormalAsteroid } from "./normalAsteroid";
import { width, height } from "../../constants/canvasSize"
import { Vector } from "../vector";
import { Asteroid } from "./asteroid";
export class AsteroidFactory {
    private _canvasSize: number[];
    private _difficulty: number;

    private constructor(canvasSize: number[]) {
        this._canvasSize = canvasSize;
    }
    static getInstance(difficulty: number) {

        let instance = new AsteroidFactory([width, height]);
        instance._difficulty = difficulty;
        return instance;
    }

    public createAsteroid(): Asteroid {
        const random = Math.random();
        const velocity = new Vector(Math.random(),Math.random());
        const color ="black";
        const shape = null;
        const rotation = Math.random();
        const rollDrag = 0;
        let position:Vector;
        if (random < 0.25) {
            // x == 0
            position = new Vector(0,Math.random() * this._canvasSize[1]);
        }
        else if (random < 0.50) {
            // y == 0
            position = new Vector(Math.random() * this._canvasSize[0],0);
        }
        else if (random < 0.75) {
            // x == width
            position = new Vector(this._canvasSize[0], Math.random() * this._canvasSize[1]);
        }
        else if (random <= 1) {
            // y == witdh
            position =  new Vector(Math.random() * this._canvasSize[0],this._canvasSize[1]);
        }
        return new NormalAsteroid(color, shape, rotation, rollDrag, velocity, position,1);
    }
}