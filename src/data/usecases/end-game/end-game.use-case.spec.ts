import { MockGameRepository } from '../../tests/mock-game-repository';
import { EndGameUseCase } from './end-game.use-case';

interface TesteTypes {
    instance: EndGameUseCase;
    gameRepository: MockGameRepository;
}
const makeBaseTeste = (): TesteTypes => {
    const gameRepository = new MockGameRepository();
    const game = gameRepository.mockGameObject();
    gameRepository.insert(game);

    const instance = new EndGameUseCase(gameRepository);

    return {
        instance,
        gameRepository
    }
}

describe('EndGameUseCase Testes', () => {
    test('Should return a instance', () => {
        const { instance } = makeBaseTeste();
        expect(instance).toBeInstanceOf(EndGameUseCase);
        expect(instance).toBeTruthy();
    });

    test('Should call execute function', async () => {
        const { instance, gameRepository } = makeBaseTeste();
        await instance.execute();

        const game = await gameRepository.getData();

        expect(game.getGameEnded()).toBeTruthy();
    });
});