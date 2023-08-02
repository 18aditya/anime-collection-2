/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as globalStyles from "../../../utils/styles/global";
import {
  AnimeDetailCtx,
  useAnimeDetailCtx,
} from "../../../utils/context/AnimeDetail";
import useAnimeDetail from "../../../utils/hooks/useAnimeDetail";
import { useLocation } from "react-router-dom";
export default function Page() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = parseInt(pathname.split("/")[pathname.split("/").length - 1]);
  const useAnimeDetailContext = useAnimeDetail(id);

  return (
    <AnimeDetailCtx.Provider value={useAnimeDetailContext}>
      <Content />
    </AnimeDetailCtx.Provider>
  );
}

function Content() {
  const { loading, data } = useAnimeDetailCtx();
  console.log(data);
  return (
    <div css={[globalStyles.flexCol, globalStyles.widthFull]}>
      <div css={[globalStyles.flexCol]}>
        <div
          css={[
            css`
              padding: 12px;
              background-color: lightgrey;
              font-weight: 700;
            `,
          ]}
        >
          {data?.title}
        </div>
        <div css={[globalStyles.flexRow]}>
          <img src={data?.assets.coverImage.large} css={coverImage} />
          <div css={detailContainer}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
const image = css`
  object-fit: cover;
  width: 50%;
  ${globalStyles.medium} {
    ${globalStyles.widthFull}
    height: 100%;
  }
`;

const coverImage = [
  image,
  css`
    display: flex;
    ${globalStyles.medium} {
      display: none;
    }
  `,
];

const detailContainer = css`
  width: 50%;
`;
