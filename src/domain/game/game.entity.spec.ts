import { GameEntity } from './game.entity';

interface GameTestTypes {
    instance: GameEntity;
    gameProps: GameEntity.Props;
}

const mokProps = (): GameEntity.Props => {
    return {
        players: new Map<string, any>(),
        eliminatedPlayers: new Map<string, any>(),
        roundCount: 0,
        gamePot: 0,
        voteCount: 0,
        gameStarted: false,
        gameEnded: false
    }
}

const makeBaseTest = (): GameTestTypes => {
    const gameProps = mokProps();
    const instance = new GameEntity(gameProps);

    return {
        gameProps,
        instance
    }
}

describe('Game Tests', () => {
    it('Should has all props', () => {
        const {instance, gameProps} = makeBaseTest();

        expect(instance.props).toStrictEqual(gameProps);
    });
    it('Should can be started', () => {
        const { instance } = makeBaseTest();

        instance.startGame();

        expect(instance.props.gameStarted).toBeTruthy();
    });
    it('Should can be stopped', () => {
        const { instance } = makeBaseTest();

        instance.stopGame();

        expect(instance.props.gameStarted).toBeFalsy();
    });
    it('Should can add and remove a player', () => {
        const { instance } = makeBaseTest();
        const playerId = 'uuid-test-player';
        const playerData = {
            name: 'player1'
        }
        instance.addPlayer(playerId, playerData);
        const playerAdded = instance.getPlayer(playerId);
        expect(playerAdded).toEqual(playerData);

        instance.deletePlayer(playerId);
        const playerRemoved = instance.getPlayer(playerId);
        expect(playerRemoved).toBeFalsy();
    });

    it('Should can eliminate a player', () => {
        const { instance } = makeBaseTest();
        const playerId = 'uuid-test-player';
        const playerData = {
            name: 'player1'
        }

        instance.addPlayer(playerId, playerData);
        const playerAdded = instance.getPlayer(playerId);
        expect(playerAdded).toEqual(playerData);

        instance.eliminatePlayer(playerId);

        const playerRemovedOnPlayers = instance.getPlayer(playerId);
        expect(playerRemovedOnPlayers).toBeFalsy();

        const eliminatePlayer = instance.getEliminatePlayer(playerId);

        expect(eliminatePlayer).toBe(playerData);
    });

    it('Should can add to pot a value', () => {
        const { instance } = makeBaseTest();
        const newPotValue = 100;

        instance.addToPot(newPotValue);
        
        expect(instance.props.gamePot).toBe(newPotValue);
    });
    it('Should can add vote', () => {
        const { instance } = makeBaseTest();

        instance.increaseVote();
        
        expect(instance.props.voteCount).toBe(1);
    });
    it('Should can change the round', () => {
        const { instance } = makeBaseTest();
        const newRound = 10;

        instance.changeRound(newRound);

        expect(instance.props.roundCount).toBe(newRound);
    });
    it('Should can increase round', () => {
        const { instance } = makeBaseTest();

        instance.increaseRound();
        
        expect(instance.props.roundCount).toBe(1);
    });
});