import styled from "@emotion/styled";
import { Button } from "components/button/Button";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const HomePage = () => {
  return <Container>
    <img src="squid-game-image.jpg" alt="" />
    <h1>Jogo da Lula</h1>
    <Button to="/play">Jogar</Button>
  </Container>;
};
