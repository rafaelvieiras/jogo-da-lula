import { GameRepositoryInterface } from 'domain/game/game.repository';
import { PlayerEntity } from 'domain/player/player.entity';
import { UseCaseInterface } from 'domain/usecases/use-case';
import { v4 as randomUUID } from 'uuid';
import { LoadPlayerUseCase } from '../load-player/load-player.use-case';
import { GameEntity } from 'domain/game/game.entity';

export class LoadGameUseCase implements UseCaseInterface {

    constructor(
        private readonly repository: GameRepositoryInterface, 
        private readonly loadPlayerUseCase: LoadPlayerUseCase) {}
    async execute(): Promise<any> {
        const totalOfPlayers = 69;
        const players = new Map<string, PlayerEntity>();
        const eliminatedPlayers = new Map<string, PlayerEntity>();
        
        for (let index = 0; index < totalOfPlayers; index++) {
            const key = randomUUID();
            const newPlayer = await this.loadPlayerUseCase.execute();
            players.set(key, newPlayer);
        }

        const game = new GameEntity({
            players,
            eliminatedPlayers,
            roundCount: 0,
            gamePot: 0,
            voteCount: 0,
            gameStarted: true,
            gameEnded: false,
        });

        this.repository.insert(game);
    }

}