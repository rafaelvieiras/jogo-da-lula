import styled from "@emotion/styled";

interface RoundSummaryProps {
    totalPlayers: number;
    totalEliminatedPlayers: number;
    totalVotes: number;
    totalPot: string;
    totalPlayerPot: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    width: 100%;
    max-width: 80%;
    color: white;
    border: 1px solid #fff;
    padding: 30px 15px;
    gap: 5px;
    border-radius: 10px;
`;



export const RoundSummary = (props: RoundSummaryProps) => {
    return <Container>
        <div>
            Total de Jogadores Remanescentes: {props.totalPlayers}
        </div>
        <div>
            Total de Jogadores Eliminados: {props.totalEliminatedPlayers}
        </div>
        <div>
            Votos para o Fim do Jogo: {props.totalVotes}
        </div>
        <div>
            Prêmio por Jogador Remanescente: {props.totalPlayerPot}
        </div>
    </Container>;
};