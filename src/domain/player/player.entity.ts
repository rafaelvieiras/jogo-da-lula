import { v4 as randomUUID } from 'uuid';

export class PlayerEntity {
    public props: Required<PlayerEntity.Props>;

    constructor(
        props: Partial<PlayerEntity.Props>
    ) {
        this.props = {
            ...this.props,
            ...props
        }
    }
    
    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }

    get pot(): number {
        return this.props.pot;
    }

    set pot(value: number) {
        this.props.pot = value;
    }

    makeDecision<T extends PlayerEntity.DecisionOption>(options: T[]): T {
        let totalWeight = 0;

        for (let option of options) {
            if(option.weight > 100 || option.weight < 0) throw new Error(`option has a invalid weight: ${option.weight}`);
            if(option.weight === 100) return option;
            totalWeight += option.weight;
        }

        const limit = Math.random() * totalWeight;

        totalWeight = 0;

        for (let option of options) {
            totalWeight += option.weight;

            if (totalWeight >= limit) {
                return option;
            }
        }

        return options[options.length - 1];
    }

    static createUUID(): string {
        return randomUUID();
    }
}


export namespace PlayerEntity {
    export interface Props {
       name: string;
       pot: number;
    }

    export interface DecisionOption {
        weight: number;
    }
}