/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const medium = "@media (min-width: 768px)";

export const widthFull = css`
  width: 100%;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexCol = css`
  display: flex;
  flex-direction: column;
`;
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const layoutContainer = [
  flexCol,
  widthFull,
  css`
    position: relative;
    height: calc(100vh - 66px);
  `,
];
