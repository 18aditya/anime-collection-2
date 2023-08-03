/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as globalStyles from "../../../utils/styles/global";
import {
  AnimeDetailCtx,
  useAnimeDetailCtx,
} from "../../../utils/context/AnimeDetail";
import useAnimeDetail from "../../../utils/hooks/useAnimeDetail";
import { useLocation } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
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
  const { data } = useAnimeDetailCtx();
  console.log(data);
  return (
    <>
      <div
        css={[
          globalStyles.flexCol,
          css`
            height: 100vh;
          `,
        ]}
      >
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
        <div
          css={[
            globalStyles.flexRow,
            css`
              gap: 8px;
              max-height: 250px;
              background-color: rgb(248, 248, 248);
            `,
          ]}
        >
          <img
            src={data?.assets.coverImage.large}
            css={coverImage}
            alt={data?.assets.coverImage.medium}
          />
          <div
            css={[
              globalStyles.flexCol,
              detailContainer,
              css`
                justify-content: space-between;
                gap: 4px;
              `,
            ]}
          >
            <div
              css={[
                globalStyles.flexRow,
                css`
                  align-items: center;
                  gap: 4px;
                `,
              ]}
            >
              <AiOutlineStar size={30} />
              <div
                css={css`
                  font-size: 30px;
                  font-weight: 700;
                `}
              >
                {(data?.averageScore || 0) / 10}
              </div>
            </div>
            <div
              css={[
                globalStyles.flexCol,
                css`
                  gap: 8px;
                `,
              ]}
            >
              <div
                css={[
                  globalStyles.flexRow,
                  css`
                    align-items: center;
                    gap: 4px;
                  `,
                ]}
              >
                <div
                  css={css`
                    font-size: 20px;
                    font-weight: 400;
                  `}
                >
                  {data?.format}
                </div>
                <div
                  css={css`
                    font-size: 22px;
                    font-weight: 400;
                  `}
                >
                  ({data?.episodes} eps)
                </div>
              </div>
              <div css={globalStyles.flexCol}>
                <div
                  css={css`
                    font-size: 18px;
                    font-weight: 100;
                    color: #7a7a7a;
                  `}
                >
                  Duration
                </div>
                <div
                  css={css`
                    font-size: 22px;
                    font-weight: 400;
                  `}
                >
                  {`${data?.duration} Minutes`}
                </div>
              </div>
              <div css={globalStyles.flexCol}>
                <div
                  css={css`
                    font-size: 18px;
                    font-weight: 100;
                    color: #7a7a7a;
                  `}
                >
                  Status
                </div>
                <div
                  css={css`
                    font-size: 22px;
                    font-weight: 400;
                  `}
                >
                  {data?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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

    object-fit: cover;
    ${globalStyles.medium} {
      display: none;
    }
  `,
];

const detailContainer = css`
  width: 50%;
`;
