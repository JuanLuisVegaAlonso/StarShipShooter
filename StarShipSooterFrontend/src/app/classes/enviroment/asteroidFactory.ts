import { NormalAsteroid } from "./normalAsteroid";
import { width, height } from "../../constants/canvasSize"
import { Vector } from "../vector";
import { Asteroid } from "./asteroid";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
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
        
        const rollDrag = 0;
        const locationInfo = new LocationInfo();
        locationInfo.rotation = Math.random();
        if (random < 0.25) {
            // x == 0
            locationInfo.position = new Point(0,Math.random() * this._canvasSize[1]);
        }
        else if (random < 0.50) {
            // y == 0
            locationInfo.position = new Point(Math.random() * this._canvasSize[0],0);
        }
        else if (random < 0.75) {
            // x == width
            locationInfo.position = new Point(this._canvasSize[0], Math.random() * this._canvasSize[1]);
        }
        else if (random <= 1) {
            // y == witdh
            locationInfo.position =  new Point(Math.random() * this._canvasSize[0],this._canvasSize[1]);
        }
        return new NormalAsteroid(color, shape, rollDrag, velocity, locationInfo,1);
    }
}