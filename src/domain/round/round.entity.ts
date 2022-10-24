import { PlayerEntity } from "domain/player/player.entity";

export class RoundEntity {
    public props: Required<RoundEntity.Props>;

    constructor(
        props: Partial<RoundEntity.Props>
    ) {
        this.props = {
            ...this.props,
            ...props
        }
    }

    addPlayer(key: string, player: PlayerEntity): void {
        this.props.players.set(key, player);
    }

    excludePlayers(chance: number): void {
        if(chance < 0 && chance > 100) throw new Error(`Chance is invalid: ${chance}`);
        this.props.players.forEach((player, key, players) => {
            const seed = Math.random() * 100;
            if(seed <= chance) {
                this.increasePot(player.pot);
                players.delete(key);
                this.props.eliminatedPlayers.set(key, player);
            }
        });
    }

    calculateVotes() {
        this.props.players.forEach((player) => {
            if(player) {
                const decision = player.makeDecision([
                    {
                        name: 'yes',
                        weight: 30
                    },
                    {
                        name: 'no',
                        weight: 70
                    }
                ]);
    
                if(decision.name === 'yes') {
                    this.increaseVoteCount();
                }
            }
        });
    }

    getaAllPlayers(): PlayerEntity[] {
        return Array.from(this.props.players.values());
    }

    getaAllEliminatedPlayers(): PlayerEntity[] {
        return Array.from(this.props.eliminatedPlayers.values());
    }

    getaAllEliminatedPlayersMap(): Map<string, PlayerEntity> {
        return this.props.eliminatedPlayers;
    }

    increaseVoteCount() {
        this.props.voteCount += 1;
    }

    getVotes(): number {
        return this.props.voteCount;
    }

    getPot(): number {
        return this.props.potCount;
    }
    
    increasePot(value: number): number {
        return this.props.potCount += value;
    }

}

export namespace RoundEntity {
    export interface Props {
        players: Map<string, PlayerEntity>;
        eliminatedPlayers: Map<string, PlayerEntity>;
        potCount: number;
        voteCount: number;
        probabilityRateToExcluded: number;
    }
}