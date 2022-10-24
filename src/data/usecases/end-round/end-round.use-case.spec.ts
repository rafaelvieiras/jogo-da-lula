import { PlayerEntity } from '../../../domain/player/player.entity';
import { EndGameUseCase } from '../../../data/usecases/end-game/end-game.use-case';
import { MockGameRepository } from '../../tests/mock-game-repository';
import { EndRoundUseCase } from './end-round.use-case';
import { faker } from "@faker-js/faker";

const createFakePlayers = async (gameRepository: MockGameRepository) => {
    const totalOfPlayers = 100;
    const game = await gameRepository.getData();
    for (let index = 0; index < totalOfPlayers; index++) {
        const playerID = PlayerEntity.createUUID();
        const player = new PlayerEntity({
            name: faker.name.fullName(),
            pot: 10
        });
        game.addPlayer(playerID, player);
    }
    gameRepository.insert(game);
}

interface TesteTypes {
    instance: EndRoundUseCase;
    gameRepository: MockGameRepository;
    endGameUseCase: EndGameUseCase;
}

const makeBaseTeste = (): TesteTypes => {
    const gameRepository = new MockGameRepository();
    const game = gameRepository.mockGameObject();
    gameRepository.insert(game);
    
    createFakePlayers(gameRepository);

    const endGameUseCase = new EndGameUseCase(gameRepository);

    const instance = new EndRoundUseCase(gameRepository, endGameUseCase);

    return {
        instance,
        gameRepository,
        endGameUseCase
    }
}

describe('EndRoundUseCase Testes', () => {
    test('Should return a instance', () => {
        const { instance } = makeBaseTeste();
        expect(instance).toBeInstanceOf(EndRoundUseCase);
        expect(instance).toBeTruthy();
    });

    test('Should call execute function', async () => {
        const { instance, gameRepository } = makeBaseTeste();
        await instance.execute();

        const game = await gameRepository.getData();
        const eliminatedPlayers = game.getAllEliminatedPlayers();

        expect(instance.round.getVotes()).toBeGreaterThanOrEqual(1);
        expect(instance.round.getPot()).toBeGreaterThanOrEqual(1);
        expect(eliminatedPlayers.length).toBeGreaterThanOrEqual(1);
    });
});