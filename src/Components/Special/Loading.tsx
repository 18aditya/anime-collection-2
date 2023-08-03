/** @jsxImportSource @emotion/react */

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";


const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 5px solid lightgrey;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 1s linear infinite;
`;

const CircularLoading = () => {
  return <LoadingSpinner />;
};

export default CircularLoading;
