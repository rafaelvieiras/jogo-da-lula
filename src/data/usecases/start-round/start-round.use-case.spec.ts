import { StartRoundUseCase } from './start-round.use-case';
import { EndRoundUseCase } from '../end-round/end-round.use-case';
import { EndGameUseCase } from '../end-game/end-game.use-case';
import { MockGameRepository } from '../../tests/mock-game-repository';

class MockEndRoundUseCase extends EndRoundUseCase {
    public executed: boolean = false;

    async execute(): Promise<void> {
        this.executed = true;
    }
}

interface TesteTypes {
    instance: StartRoundUseCase;
    endRoundUseCase: MockEndRoundUseCase
}

const makeBaseTeste = (): TesteTypes => {
    const gameRepository = new MockGameRepository();
    const endGameUseCase = new EndGameUseCase(gameRepository);
    const endRoundUseCase = new MockEndRoundUseCase(gameRepository, endGameUseCase);
    const instance = new StartRoundUseCase(endRoundUseCase);

    return {
        instance,
        endRoundUseCase
    }
}

describe('StartRoundUseCase Testes', () => {
    test('Should return a instance', () => {
        const { instance } = makeBaseTeste();
        expect(instance).toBeInstanceOf(StartRoundUseCase);
        expect(instance).toBeTruthy();
    });

    test('Should call execute function', async () => {
        const { instance, endRoundUseCase } = makeBaseTeste();
        await instance.execute();
        expect(endRoundUseCase.executed).toBeTruthy();
    });
});