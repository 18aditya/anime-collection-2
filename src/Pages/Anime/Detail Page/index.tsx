/** @jsxImportSource @emotion/react */
import React, { useState } from "react";

import * as globalStyles from "../../../utils/styles/global";
import {
  AnimeDetailCtx,
  useAnimeDetailCtx,
} from "../../../utils/context/AnimeDetail";
import useAnimeDetail from "../../../utils/hooks/useAnimeDetail";
import { CountdownTimer, Modal } from "../../../Components/components";

import { css } from "@emotion/react";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
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
  const { data, modalState, setModalState } = useAnimeDetailCtx();

  return (
    <div
      css={[
        globalStyles.flexCol,
        css`
          position: relative;
          height: calc(100vh - 66px);
          overflow: auto;
        `,
      ]}
    >
      <Modal>a</Modal>
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
          loading="lazy"
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
          <div css={[globalStyles.flexCol]}>
            <div
              css={css`
                font-size: 18px;
                font-weight: 100;
                color: #7a7a7a;
              `}
            >
              Rating
            </div>
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
      <div
        css={[
          globalStyles.flexCol,
          globalStyles.flexCenter,
          css`
            background-color: rgb(248, 248, 248);
            height: 50px;
          `,
        ]}
      >
        <div
          css={[
            globalStyles.flexRow,
            globalStyles.flexCenter,
            css`
              gap: 6px;
              background-color: white;
              padding: 8px;
              border: 1px solid lightgrey;
              border-radius: 4px;
              cursor: pointer;
              &:hover {
                background-color: #f0f0f0;
              }
            `,
          ]}
          onClick={() => setModalState(true)}
        >
          <AiOutlineHeart />
          Add to Collection
        </div>
      </div>
      {/* <div css={[globalStyles.flexCol, globalStyles.flexCenter]}>
          <div>Next episode in:</div>
          <div>
            <CountdownTimer
              secondsToAdd={data?.nextAiringEpisode.timeUntilAiring || 0}
            />
          </div>
        </div> */}
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

    object-fit: cover;
    ${globalStyles.medium} {
      display: none;
    }
  `,
];

const detailContainer = css`
  width: 50%;
`;
