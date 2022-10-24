import { GameEntity } from "domain/game/game.entity";
import { GameRepositoryInterface } from "domain/game/game.repository";

export class MockGameRepository implements GameRepositoryInterface {
    public state: GameEntity;
    async insert(game: GameEntity): Promise<void> {
        this.state = game;
    }

    async getData(): Promise<GameEntity> {
        return this.state;
    }

    mockGameObject(partial?: Partial<GameEntity>): GameEntity {
        return new GameEntity({
            players: new Map<string, any>(),
            eliminatedPlayers: new Map<string, any>(),
            roundCount: 0,
            gamePot: 0,
            voteCount: 0,
            gameStarted: false,
            gameEnded: false,
            ...partial
        });
    }

}