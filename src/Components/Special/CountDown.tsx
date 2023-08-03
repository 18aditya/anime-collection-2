/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

interface CountdownProps {
  secondsToAdd: number;
}

const Countdown: React.FC<CountdownProps> = ({ secondsToAdd }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const currentTimeMillis = Math.floor(new Date().getTime() / 1000);
  console.log(new Date((currentTimeMillis + secondsToAdd) * 1000));

  const formatTime = (remainingTime: number) => {};

  return <div css={countdownStyles}></div>;
};

const countdownStyles = css`
  font-size: 18px;
  font-weight: bold;
`;

export default Countdown;
