import { PlayerEntity } from "domain/player/player.entity";

export class GameEntity {
    public props: Required<GameEntity.Props>;

    constructor(
        props: Partial<GameEntity.Props>
    ) {
        this.props = {
            ...this.props,
            ...props
        }
    }

    startGame() {
        this.props.gameStarted = true;
    }

    stopGame() {
        this.props.gameStarted = false;
    }

    finishGame() {
        this.props.gameEnded = true;
    }

    getGameStarted(): boolean {
        return this.props.gameStarted;
    }

    getGameEnded(): boolean {
        return this.props.gameEnded;
    }

    addPlayer(key: string, data: any) {
        this.props.players.set(key, data);
    }

    getPlayer(key: string): any {
        return this.props.players.get(key);
    }

    getAllPlayers(): PlayerEntity[] {
        return Array.from(this.props.players.values());
    }

    getAllPlayersMap(): Map<string, PlayerEntity> { 
        return this.props.players;
    }
    deletePlayer(key: string): void {
        this.props.players.delete(key);
    }

    eliminatePlayer(key: string): void {
        const playerData = this.getPlayer(key);
        if(playerData) {
            this.props.players.delete(key);
            this.props.eliminatedPlayers.set(key, playerData);
        }
    }

    getEliminatePlayer(key: string): any {
        return this.props.eliminatedPlayers.get(key);
    }

    getAllEliminatedPlayers(): PlayerEntity[] {
        return Array.from(this.props.eliminatedPlayers.values());
    }
    getAllEliminatedPlayersMap(): Map<string, PlayerEntity> { 
        return this.props.eliminatedPlayers;
    }

    addToPot(value: number): void {
        this.props.gamePot += value;
    }

    changePot(value: number): void {
        this.props.gamePot = value;
    }

    getPot(): number {
        return this.props.gamePot;
    }

    getPlayerPot(): number {
        return this.props.gamePot / this.props.players.size;
    }

    getVote(): number {
        return this.props.voteCount;
    }
    changeVote(value: number): void {
        this.props.voteCount = value;
    }

    increaseVote(): void {
        this.props.voteCount += 1;
    }

    changeRound(value: number): void {
        this.props.roundCount = value;
    }
    
    increaseRound(): void {
        this.props.roundCount += 1;
    }

    getRound(): number {
        return this.props.roundCount;
    }
}


export namespace GameEntity {
    export interface Props {
        players: Map<string, any>;
        eliminatedPlayers: Map<string, any>;
        roundCount: number;
        gamePot: number;
        voteCount: number;
        gameStarted: boolean;
        gameEnded: boolean;
    }
}