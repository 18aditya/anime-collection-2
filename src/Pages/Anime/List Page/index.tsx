/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as globalStyles from "src/Utils/styles/global";
import { Pagination, AnimeList } from "src/Components/components";

import useAnimeData from "src/Utils/Hooks/useAnimeList";
import { AnimeListCtx, useAnimeListCtx } from "src/Utils/Context/context";

export default function Page() {
  const useAnimeListContext = useAnimeData();

  return (
    <AnimeListCtx.Provider value={useAnimeListContext}>
      <Content />
    </AnimeListCtx.Provider>
  );
}

function Content() {
  const { loading, data } = useAnimeListCtx();
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
            background-image: url("https://s4.anilist.co/file/anilistcdn/media/anime/banner/131573-3veuVz5p0z2I.jpg");
            background-position: center;
            background-size: cover;
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
              font-family: "Bits", sans-serif;
              font-size: 40px;
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
            padding: 12px;
            gap: 24px;
            ${globalStyles.medium} {
              width: 80%;
            }
          `,
        ]}
      >
        On-going Anime
        <AnimeList loading={loading} data={data?.Data} />
        <Pagination />
      </div>
    </div>
  );
}
