import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Results from "./Results";
import Coin from "./Coin";
import { HEADS, TAILS, NO_WINNER, INITIAL_COINS } from "./constants";
import "./styles.css";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "coin1 coin2"
    "toss-again toss-again"
    "result result";
  gap: 3rem;
  justify-items: center;
  max-width: 800px;
  width: 100%;
  margin: auto;
`;
const Stack = styled.div`
  > * + * {
    margin-top: 2rem;
  }
`;
const Header = styled.div`
  grid-area: header;
`;
const Coin1 = styled.div`
  grid-area: coin1;
`;
const Coin2 = styled.div`
  grid-area: coin2;
`;
const TossAgain = styled.button`
  grid-area: toss-again;
  padding: 1rem 2rem;
  background-color: #3f51b5;
  background: linear-gradient(to bottom, #2196f3, #3f51b5);
  color: white;
  border: none;
  appearance: none;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: inset 0 0 0 0.0625rem hsla(217, 62%, 16%, 0.1),
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: linear-gradient(to bottom, #03a9f4, #3f51b5);
    transform: translateY(-2px);
  }
`;

const randomResult = () => Math.floor(Math.random() * 2);
const headsOrTails = () => (randomResult() === 0 ? HEADS : TAILS);
const tossCoins = () => [headsOrTails(), headsOrTails()];
const getWinner = (result) => (result[0] === result[1] ? result[0] : NO_WINNER);

export default function App() {
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const tossFunction = () => {
    setLoading(true);
    setCoins(INITIAL_COINS);
    setTimeout(() => {
      const result = tossCoins();
      setLoading(false);
      setCount(count + 1);
      setCoins(result);
      setHistory([...history, getWinner(result)]);
    }, 2500);
  };

  const clearHistory = () => {
    setCount(0);
    setCoins(INITIAL_COINS);
    setHistory([]);
  };

  return (
    <div className="App">
      <Helmet>
        <title>Virtual Two-up</title>
      </Helmet>
      <Grid>
        <Header>
          <h1>
            Virtual Two-up{" "}
            <span role="img" aria-label="Australian flag">
              🇦🇺
            </span>
          </h1>
        </Header>

        <Coin1>
          <Stack>
            <Coin face={coins[0]} loading={loading ? true : undefined} />
            <p>{loading ? "" : coins[0]}</p>
          </Stack>
        </Coin1>

        <Coin2>
          <Stack>
            <Coin face={coins[1]} loading={loading ? true : undefined} />
            <p>{loading ? "" : coins[1]}</p>
          </Stack>
        </Coin2>

        <TossAgain onClick={tossFunction} disabled={loading ? true : undefined}>
          Toss 'em{count > 0 && " again"}!
        </TossAgain>

        <Results
          coins={coins}
          count={count}
          history={history}
          clearHistory={clearHistory}
          loading={loading}
        />
      </Grid>
    </div>
  );
}
