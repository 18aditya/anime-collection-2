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

export const fontStyles = css`
  font-face {
    font-family: "Bits";
    src: url("../../../public/ARCADE.TTF") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  font-face {
    font-family: "Geek";
    src: url("../../../public/JetBrainsMono-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
`;

export const bodyStyles = css`
  @font-face {
    font-family: "Bits";
    src: url("/ARCADE.TTF") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Geek";
    src: url("/JetBrainsMono-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Geek", sans-serif;
  }
`;
