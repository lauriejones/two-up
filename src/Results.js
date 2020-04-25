import React from "react";
import styled, { keyframes } from "styled-components";
import { HEADS, TAILS, COIN_HEADS, COIN_TAILS } from "./constants";

const Stack = styled.div`
  > * + * {
    margin-top: 1rem;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0.01;
  }
  100% {
    opacity: 1;
  }
`;

const Winner = styled.div`
  grid-area: result;
  background-color: ${({ winner }) => winner === HEADS && COIN_HEADS};
  background-color: ${({ winner }) => winner === TAILS && COIN_TAILS};
  /* width: 100%; */
  border-radius: 1rem;
  padding: 1rem;

  animation: 0.5s ${fadeIn};
`;

export default function Results(props) {
  const { count, coins, clearHistory, history, loading } = props;
  const winner = coins[0] === coins[1] ? coins[0] : null;
  return (
    <>
      {count > 0 && !loading && (
        <Winner winner={winner}>
          <Stack>
            <h2>{winner ? `${winner} wins!` : "No one wins!"}</h2>
            {/* <h3>History</h3>
            <ul>
              {history.map((toss, index) => (
                <li key={`result-${index}`}>{toss}</li>
              ))}
            </ul> */}
            <div>
              {HEADS} has won{" "}
              <strong>{history.filter(item => item === HEADS).length}</strong>{" "}
              times.
              {TAILS} has won{" "}
              <strong>{history.filter(item => item === TAILS).length}</strong>{" "}
              times. From <strong>{count}</strong> tosses.
            </div>
            <button onClick={clearHistory}>Clear history</button>
          </Stack>
        </Winner>
      )}
    </>
  );
}
