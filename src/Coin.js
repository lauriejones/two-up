import React from "react";
import styled, { keyframes, css } from "styled-components";
import { HEADS, TAILS, COIN_HEADS, COIN_TAILS } from "./constants";

const flipAnimation = keyframes`
  20% {
    transform: rotateX(1turn) scale(1.25);
  }

  100% {
    transform: rotateX(-5turn) scale(0.01);
  }
`;

const flipTailsAnimation = keyframes`
  20% {
    transform: rotateX(-0.5turn) scale(1.25);
  }

  100% {
    transform: rotateX(6turn) scale(0.01);
  }
`;

const Card = styled.div`
  position: relative;
  width: 20vmin;
  height: 20vmin;
  min-width: 6rem;
  min-height: 6rem;
  border-radius: 999px;
  /* perspective: 500px; */
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  transition: transform 1s;
  transform-style: preserve-3d;

  ${(props) =>
    props.loading &&
    css`
      animation: 2.5s linear
        ${props.face === HEADS ? flipAnimation : flipTailsAnimation} infinite;
    `}

  ${(props) =>
    props.face === TAILS &&
    `
    transform: rotateX(180deg);
  `}
`;

const Front = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  line-height: 300px;
  text-align: center;
  font-size: 60px;
  border-radius: 5px;
  backface-visibility: hidden;
`;

const Back = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  line-height: 300px;
  text-align: center;
  font-size: 60px;
  border-radius: 5px;
  backface-visibility: hidden;

  transform: rotateX(180deg);
`;

const BaseCoin = styled.div`
  width: 20vmin;
  height: 20vmin;
  min-width: 6rem;
  min-height: 6rem;
  border-radius: 999px;
  background-color: silver;
  box-shadow: inset 0 0 0 0.5rem hsla(0, 0%, 0%, 0.2),
    inset 1px 1px 2px 0.5rem hsla(0, 0%, 100%, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;

  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);

  ::before {
    font-size: 10vmin;
    font-weight: bold;
  }

  transition: all 0.2s;
  transform: scale(1);
  backface-visibility: hidden;
`;

const Heads = styled(BaseCoin)`
  position: absolute;
  background: linear-gradient(45deg, ${COIN_HEADS}, silver);
  color: #302f2c;

  ::before {
    content: "H";
  }
`;

const Tails = styled(BaseCoin)`
  position: absolute;
  background: linear-gradient(45deg, ${COIN_TAILS}, silver);
  color: #463715;

  ::before {
    content: "T";
  }
`;

const Coin = (props) => (
  <Card face={props.face}>
    <Content loading={props.loading} face={props.face}>
      <Front>
        <Heads />
      </Front>
      <Back>
        <Tails />
      </Back>
    </Content>
  </Card>
);

export default Coin;
