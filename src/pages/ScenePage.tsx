import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "components/button/Button";
import { NameList } from "components/name-list/NameList";
import { RoundSummary } from "components/round-summary/RoundSummary";
import { EndGameUseCase } from "data/usecases/end-game/end-game.use-case";
import { EndRoundUseCase } from "data/usecases/end-round/end-round.use-case";
import { LoadGameUseCase } from "data/usecases/load-game/load-game.use-case";
import { LoadPlayerUseCase } from "data/usecases/load-player/load-player.use-case";
import { StartGameUseCase } from "data/usecases/start-game/start-game.use-case";
import { StartRoundUseCase } from "data/usecases/start-round/start-round.use-case";
import { MemoryGameRepository } from "infra/memory/MemoryGameRepository";
import React from "react";
import { NavigateFunction } from "react-router-dom";

interface ScenePageProps {
    navigate: NavigateFunction;
}
interface ScenePageState {
    players: any[];
    eliminatedPlayers: any[];
    gamePot: string;
    playerPot: string;
    round: number;
    roundVotes: number;
    roundEnd: boolean;
    gameStarted: boolean;
    gameEnded: boolean;
}

const shakeAnimation = keyframes`
   0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const ImageShake = styled.img`
    animation: ${shakeAnimation} 1s ease infinite;
`

const Container = styled.main`
    display: flex;
    flex-direction: column;
    background-color: #000;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    justify-content: space-between;
`;

const RoundExtraData = styled.div`
    display: flex;
    gap: 50px;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
`

export class ScenePage extends React.Component<ScenePageProps, ScenePageState> {
    constructor(
        props: ScenePageProps,
        private stateGameRepository: MemoryGameRepository,
        private startGameUseCase: StartGameUseCase,
        private loadGameUseCase: LoadGameUseCase,
        private mainThemeAudio: HTMLAudioElement,
        private redLightAudio: HTMLAudioElement
    ) {
        super(props);

        this.mainThemeAudio = new Audio('main-theme.mp3');
        this.mainThemeAudio.preload = 'metadata';
        this.mainThemeAudio.load();

        this.redLightAudio = new Audio('red-light-sound.mp3');
        this.redLightAudio.preload = 'metadata';
        this.redLightAudio.load();

        this.stateGameRepository = new MemoryGameRepository();

        const loadPlayerUseCase = new LoadPlayerUseCase();
        const endGameUseCase = new EndGameUseCase(this.stateGameRepository);
        const endRoundUseCase = new EndRoundUseCase(this.stateGameRepository, endGameUseCase);
        const startRoundUseCase = new StartRoundUseCase(endRoundUseCase);
        
        this.loadGameUseCase = new LoadGameUseCase(
            this.stateGameRepository, 
            loadPlayerUseCase
        );

        this.startGameUseCase = new StartGameUseCase(this.stateGameRepository, startRoundUseCase)
        
        this.state = {
            players: [],
            eliminatedPlayers: [],
            gamePot: '',
            playerPot: '',
            round: 0,
            roundVotes: 0,
            roundEnd: false,
            gameStarted: false,
            gameEnded: false
        }
    }

    private playMainTheme() {
        let audioVolume = 0;
        const volumeLoop = setInterval(() => {
            audioVolume += 0.1;
            if(audioVolume >= 1) {
                clearInterval(volumeLoop);
            }
            this.mainThemeAudio.volume = audioVolume;
        }, 300);

        setInterval(() => {
            this.mainThemeAudio.pause();
        }, 10000);
        this.mainThemeAudio.play();
    }

    private playRedLight() {
        let audioVolume = 0;
        this.mainThemeAudio.pause();
        this.redLightAudio.currentTime = 0;
        const volumeLoop = setInterval(() => {
            audioVolume += 0.1;
            if(audioVolume >= 1) {
                clearInterval(volumeLoop);
            }
            this.redLightAudio.volume = audioVolume;
        }, 300);
        this.redLightAudio.play();
    }

    private listeningToStorageChantes() {
        this.stateGameRepository
        .getStorage()
        .subscribe(gameState => {
            if(gameState) {
                this.setState({
                    players: gameState.getAllPlayers(),
                    eliminatedPlayers: gameState.getAllEliminatedPlayers(),
                    gamePot: this.formatCurrency(gameState.getPot()),
                    playerPot: this.formatCurrency(gameState.getPlayerPot()),
                    round: gameState.getRound(),
                    roundVotes: gameState.getVote(),
                    roundEnd: true,
                    gameStarted: gameState.getGameStarted(),
                    gameEnded: gameState.getGameEnded()
                });

                setTimeout(() => {
                    this.setState({
                        roundEnd: false,
                    });
                }, 1000);
            }
            
        })
    }

    private async loadGame() {
        await this.loadGameUseCase.execute();
    }

    private formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    public initRound() {
        if(this.state.gameEnded) {
            this.props.navigate('/');

        } else {
            this.playRedLight();
            this.startGameUseCase.execute();
        }
    }

    async componentDidMount() {
        this.playMainTheme();
        this.listeningToStorageChantes();
        await this.loadGame();
    }

    componentWillUnmount() {
        this.mainThemeAudio.pause();
        this.redLightAudio.pause();
    }

    render(): React.ReactNode {
        return <Container>

            <Header>
                <h1>{this.state.gameEnded ? 'Fim de Jogo!' : `Round: ${this.state.round}`}</h1>
                <h2>Fundo do Prêmio: {this.state.gamePot}</h2>
            </Header>

            <Content>
                

                <NameList title="Jogadores Remanescentes" 
                    names={this.state.players.map(player => player.name)}
                />
                <RoundExtraData>
                    <RoundSummary totalPlayers={this.state.players.length}
                        totalVotes={this.state.roundVotes}
                        totalPot={this.state.gamePot}
                        totalEliminatedPlayers={this.state.eliminatedPlayers.length}
                        totalPlayerPot={this.state.playerPot}
                    ></RoundSummary>
                    
                    {this.state.roundEnd ? <ImageShake src="red-man.gif" alt="Red Men"/> : <img src="red-man.gif" alt="Red Men"></img> }

                    <h3>
                        Votos para o fim de jogo: {this.state.roundVotes}
                    </h3>
                    <Button onClick={() => this.initRound()}>
                        {this.state.gameEnded ? 'Voltar ao Menu' : 'Novo Round'}
                    </Button>
                </RoundExtraData>

                <NameList title="Jogadores Eliminados" 
                    names={this.state.eliminatedPlayers.map(player => player.name)} 
                />
            </Content>

        </Container>;
    }

}