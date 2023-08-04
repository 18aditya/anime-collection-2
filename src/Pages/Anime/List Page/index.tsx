/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as globalStyles from "../../../utils/styles/global";
import { Pagination, AnimeList } from "../../../Components/components";

import useAnimeData from "../../../utils/hooks/useAnimeList";
import { AnimeListCtx } from "../../../utils/context/Context";

export default function Page() {
  const useAnimeListContext = useAnimeData();

  return (
    <AnimeListCtx.Provider value={useAnimeListContext}>
      <Content />
    </AnimeListCtx.Provider>
  );
}

function Content() {
  return (
    <div
      css={[
        globalStyles.flexCol,
        globalStyles.widthFull,
        globalStyles.flexCenter,
      ]}
    >
      <div
        css={[
          globalStyles.flexCenter,
          globalStyles.widthFull,
          css`
            position: relative;
            height: 250px;
            border-bottom: 1px solid black;
            background-image: url("https://amymhaddad.s3.amazonaws.com/morocco-blue.png");
          `,
        ]}
      >
        <div
          css={[
            globalStyles.widthFull,
            css`
              position: absolute;
              opacity: 0.5;
              background-color: grey;
              height: 100%;
            `,
          ]}
        />
        <div
          css={[
            globalStyles.flexCenter,
            css`
              position: relative;
              z-index: 10;
            `,
          ]}
        >
          Welcome to Animepedia
        </div>
      </div>
      <div
        css={[
          globalStyles.flexCol,
          globalStyles.flexCenter,
          css`
            width: 80%;
            padding: 12px;
            gap: 24px;
          `,
        ]}
      >
        On-going Anime
        <AnimeList />
        <Pagination />
      </div>
    </div>
  );
}
