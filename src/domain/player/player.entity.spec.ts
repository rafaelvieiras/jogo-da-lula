import { PlayerEntity } from './player.entity';

interface PlayerTestTypes {
    instance: PlayerEntity;
    playerProps: PlayerEntity.Props;
}

const mokProps = (): PlayerEntity.Props => {
    return {
        name: 'player',
        pot: 1230
    }
}

const makeBaseTest = (): PlayerTestTypes => {
    const playerProps = mokProps();
    const instance = new PlayerEntity(playerProps);

    return {
        playerProps,
        instance
    }
}

describe('Player Tests', () => {
    it('Should has all props', () => {
        const {instance, playerProps} = makeBaseTest();

        expect(instance.props).toStrictEqual(playerProps);
    });
    it('Should can set a name', () => {
        const { instance } = makeBaseTest();
        const newName = 'playerNew';
        instance.name = newName;

        expect(instance.props.name).toEqual(newName);
    });
    it('Should can set a pot', () => {
        const { instance } = makeBaseTest();
        const newPotValue = 200;
        instance.pot = newPotValue;

        expect(instance.props.pot).toEqual(newPotValue);
    });
    it('Should validate options and make a decision', () => {
        const { instance } = makeBaseTest();
        const options = [
            {
                value: 'yes',
                weight: 90
            },
            {
                value: 'no',
                weight: 100
            },
            {
                value: 'maybe',
                weight: 30
            }
        ];

        const option = instance.makeDecision(options);

        expect(option).toBe(options[1]);
    });

    it('Should validate weight of options', () => {
        const { instance } = makeBaseTest();
        const options = [
            {
                value: 'yes',
                weight: 90
            },
            {
                value: 'no',
                weight: 130
            },
            {
                value: 'maybe',
                weight: 30
            }
        ];

        expect(() => {
            instance.makeDecision(options);
        }).toThrow(`option has a invalid weight: ${options[1].weight}`);
    });
});