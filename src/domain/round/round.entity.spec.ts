import { PlayerEntity } from '../player/player.entity';
import { RoundEntity } from './round.entity';

interface RoundTestTypes {
    instance: RoundEntity;
    roundProps: RoundEntity.Props;
}

const mokProps = (): RoundEntity.Props => {
    return {
        players: new Map<string, any>(),
        eliminatedPlayers: new Map<string, any>(),
        voteCount: 0,
        probabilityRateToExcluded: 0,
        potCount: 0
    }
}

const makeBaseTest = (): RoundTestTypes => {
    const roundProps = mokProps();
    const instance = new RoundEntity(roundProps);

    return {
        roundProps,
        instance
    }
}

describe('Round Tests', () => {
    it('Should has all props', () => {
        const {instance, roundProps} = makeBaseTest();

        expect(instance.props).toStrictEqual(roundProps);
    });

    it('Should can add player', () => {
        const { instance } = makeBaseTest();
        const playerId = 'uuid-player';
        const playerData = {
            name: 'John',
            pot: 1230
        }
        const player = new PlayerEntity(playerData);

        instance.addPlayer(playerId, player);

        expect(instance.props.players.has(playerId)).toBeTruthy();
    });
    it('Should can calculate a exclude chance', () => {
        const { instance } = makeBaseTest();
        const playerId = 'uuid-player';
        const playerData = {
            name: 'John',
            pot: 1230
        }
        const player = new PlayerEntity(playerData);

        instance.addPlayer(playerId, player);

        instance.excludePlayers(100);
        expect(instance.props.players.has(playerId)).toBeFalsy();
        
    });
});