
import {  BehaviorSubject } from "rxjs";
import { GameEntity } from "domain/game/game.entity";
import { GameRepositoryInterface } from "domain/game/game.repository";

export class MemoryGameRepository implements GameRepositoryInterface {

    private storage: BehaviorSubject<GameEntity | undefined> = new BehaviorSubject<GameEntity | undefined>(undefined);

    async insert(game: GameEntity): Promise<void> {
        this.storage.next(game);
    }

    async getData(): Promise<GameEntity> {
        return this.storage.getValue();
    }

    getStorage() {
        return this.storage;
    }
}