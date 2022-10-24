import { GameRepositoryInterface } from 'domain/game/game.repository';
import { UseCaseInterface } from 'domain/usecases/use-case';

export class EndGameUseCase implements UseCaseInterface {

    constructor(
        private readonly gameRepository: GameRepositoryInterface) {}
    async execute(): Promise<any> {
        const game = await this.gameRepository.getData();
        
        game.finishGame();

        this.gameRepository.insert(game);
    }

}