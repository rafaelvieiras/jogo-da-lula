import { GameEntity } from '../../../domain/game/game.entity';
import { LoadPlayerUseCase } from '../load-player/load-player.use-case';
import { LoadGameUseCase } from './load-game.use-case';
import { MockGameRepository } from '../../tests/mock-game-repository';

interface TesteTypes {
    instance: LoadGameUseCase;
    mockGameRepository: MockGameRepository;
}
const makeBaseTeste = (): TesteTypes => {
    const loadPlayerUseCase = new LoadPlayerUseCase();
    const mockGameRepository = new MockGameRepository();
    const instance = new LoadGameUseCase(mockGameRepository, loadPlayerUseCase);

    return {
        instance,
        mockGameRepository
    }
}

describe('LoadGameUseCase Testes', () => {
    test('Should return a instance', () => {
        const { instance } = makeBaseTeste();
        expect(instance).toBeInstanceOf(LoadGameUseCase);
        expect(instance).toBeTruthy();
    });

    test('Should call execute function', async () => {
        const { instance, mockGameRepository } = makeBaseTeste();
        await instance.execute();
        expect(mockGameRepository.state).toBeInstanceOf(GameEntity);
    });
});