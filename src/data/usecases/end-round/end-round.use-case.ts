import { GameRepositoryInterface } from 'domain/game/game.repository';
import { RoundEntity } from 'domain/round/round.entity';
import { UseCaseInterface } from 'domain/usecases/use-case';
import { EndGameUseCase } from 'data/usecases/end-game/end-game.use-case';
import { GameEntity } from 'domain/game/game.entity';

export class EndRoundUseCase implements UseCaseInterface {
    private game: GameEntity;
    public round: RoundEntity;

    private async createRound() {
        this.game = await this.gameRepository.getData();
        const players = this.game.getAllPlayersMap();
        const eliminatedPlayers = this.game.getAllEliminatedPlayersMap();
        const potCount = this.game.getPot();
        this.round = new RoundEntity({
            players,
            eliminatedPlayers,
            potCount,
            voteCount: 0,
            probabilityRateToExcluded: 0
        });
    }

    private eliminatePlayers() {
        this.round.excludePlayers(40);
        this.game.changePot(this.round.getPot());
    }

    private calculateVotes(): number {
        this.round.calculateVotes();
        const totalOfVotes = this.round.getVotes();
        this.game.increaseRound();
        this.game.changeVote(totalOfVotes);
        this.gameRepository.insert(this.game);

        return totalOfVotes;
    }

    constructor(
        private readonly gameRepository: GameRepositoryInterface,
        private readonly endGameUseCase: EndGameUseCase) {}
    async execute(): Promise<any> {
        
        await this.createRound();
        
        this.eliminatePlayers();
        
        const totalOfVotes = this.calculateVotes();
        const currentPlayers = this.round.getaAllPlayers();

        if(currentPlayers.length === 1 || totalOfVotes >= (currentPlayers.length / 2)) {
            this.endGameUseCase.execute();
        }

    }

}