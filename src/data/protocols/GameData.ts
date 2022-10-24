export interface GameEntityData {
    players: Map<string, any>;
    eliminatedPlayers: Map<string, any>;
    roundCount: number;
    gamePot: number;
    voteCount: number;
    gameStarted: boolean;
}