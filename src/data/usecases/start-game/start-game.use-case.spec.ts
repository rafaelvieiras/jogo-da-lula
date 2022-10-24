import { MockGameRepository } from '../../tests/mock-game-repository';
import { EndGameUseCase } from '../end-game/end-game.use-case';
import { EndRoundUseCase } from '../end-round/end-round.use-case';
import { StartRoundUseCase } from '../start-round/start-round.use-case';
import { StartGameUseCase } from './start-game.use-case';
class MockStartRoundUseCase extends StartRoundUseCase {
    public executed: boolean;
    async execute(): Promise<any> {
        this.executed = true;
    }

}

interface TesteTypes {
    instance: StartGameUseCase;
    mockStartRoundUseCase: MockStartRoundUseCase;
}

const makeBaseTeste = (): TesteTypes => {
    const mockGameRepository = new MockGameRepository();
    const game = mockGameRepository.mockGameObject();
    mockGameRepository.insert(game);
    
    const endGameUseCase = new EndGameUseCase(mockGameRepository);
    const endRoundUseCase = new EndRoundUseCase(mockGameRepository, endGameUseCase);
    const mockStartRoundUseCase = new MockStartRoundUseCase(endRoundUseCase);
    
    const instance = new StartGameUseCase(
        mockGameRepository,
        mockStartRoundUseCase
    );

    return {
        instance,
        mockStartRoundUseCase
    }
}

describe('StartGameUseCase Testes', () => {
    test('Should return a instance', () => {
        const { instance } = makeBaseTeste();
        expect(instance).toBeInstanceOf(StartGameUseCase);
        expect(instance).toBeTruthy();
    });

    test('Should call execute function', async () => {
        const { instance, mockStartRoundUseCase } = makeBaseTeste();
        await instance.execute();
        expect(mockStartRoundUseCase.executed).toBeTruthy();
    });
});