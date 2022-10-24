import { GameEntity } from "./game.entity";


export interface GameRepositoryInterface{
    insert(game: GameEntity): Promise<void>;
    getData(): Promise<GameEntity>;
}