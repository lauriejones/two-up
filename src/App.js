import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Helmet } from "react-helmet";
import Results from "./Results";
import {
  HEADS,
  TAILS,
  NO_WINNER,
  INITIAL_COINS,
  COIN_HEADS,
  COIN_TAILS
} from "./constants";
import "./styles.css";

const fadeIn = keyframes`
  0% {
    transform: rotateX(0) scale(0.8);
  }
  100% {
    transform: rotateX(5turn) scale(0.01);
  }
`;
const Coin = styled.div`
  width: 20vmin;
  height: 20vmin;
  border-radius: 999px;
  background-color: silver;
  ${props =>
    props.face === HEADS
      ? ` background: linear-gradient(45deg, ${COIN_HEADS}, silver);`
      : ` background: linear-gradient(45deg, ${COIN_TAILS}, silver);`};
  box-shadow: inset 0 0 0 0.5rem hsla(0, 0%, 0%, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    ${props => (props.face === HEADS ? `content: 'H'` : `content: 'T'`)};
    font-size: 10vmin;
    font-weight: bold;
  }

  transition: all 0.2s;
  transform: scale(1);

  ${props =>
    props.loading &&
    css`
      animation: 3s ${fadeIn} infinite;
    `}
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "coin1 coin2"
    "result result"
    "toss-again toss-again";
  gap: 3rem;
  justify-items: center;
  max-width: 800px;
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
  background-color: blue;
  color: white;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: royalblue;
  }
`;

const randomResult = () => Math.floor(Math.random() * 2);
const headsOrTails = () => (randomResult() === 0 ? HEADS : TAILS);
const tossCoins = () => [headsOrTails(), headsOrTails()];
const getWinner = result => (result[0] === result[1] ? result[0] : NO_WINNER);

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
    }, 3000);
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
            <p>{loading ? "..." : coins[0]}</p>
          </Stack>
        </Coin1>

        <Coin2>
          <Stack>
            <Coin face={coins[1]} loading={loading ? true : undefined} />
            <p>{loading ? "..." : coins[1]}</p>
          </Stack>
        </Coin2>

        <Results
          coins={coins}
          count={count}
          history={history}
          clearHistory={clearHistory}
          loading={loading}
        />

        <TossAgain onClick={tossFunction} disabled={loading ? true : undefined}>
          Toss 'em{count > 0 && " again"}!
        </TossAgain>
      </Grid>
    </div>
  );
}
