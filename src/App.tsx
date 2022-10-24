import "./App.css";
import styled from "@emotion/styled";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "pages/HomePage";
import { ScenePage } from "pages/ScenePage";

const AppContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 20px;
`;

const App = () => {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<ScenePage navigate={navigate}/>} />
      </Routes>
    </AppContainer>
  );
};

export default App;
