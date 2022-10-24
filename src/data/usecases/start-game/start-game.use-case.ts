import { GameRepositoryInterface } from 'domain/game/game.repository';
import { UseCaseInterface } from 'domain/usecases/use-case';
import { StartRoundUseCase } from '../start-round/start-round.use-case';

export class StartGameUseCase implements UseCaseInterface {

    constructor(
        private readonly repository: GameRepositoryInterface,
        private readonly startRoundUseCase: StartRoundUseCase) {}
    async execute(): Promise<any> {
        const gameObject = await this.repository.getData();
        if(gameObject && gameObject.getGameEnded() === false) {
            gameObject.startGame();
            await this.startRoundUseCase.execute();
        }
    }

}