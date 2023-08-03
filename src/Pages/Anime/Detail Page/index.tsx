/** @jsxImportSource @emotion/react */
import React, { useState } from "react";

import * as globalStyles from "../../../utils/styles/global";
import {
  AnimeDetailCtx,
  useAnimeDetailCtx,
} from "../../../utils/context/AnimeDetail";
import useAnimeDetail from "../../../utils/hooks/useAnimeDetail";
import {
  CircularLoading,
  CountdownTimer,
  Modal,
} from "../../../Components/components";

import { css } from "@emotion/react";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useGlobalStorageCtx } from "../../../utils/context/GlobalStorage";

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
  const { modalState, setModalState } = useGlobalStorageCtx();
  if (loading) {
    return (
      <div
        css={[
          globalStyles.flexCenter,
          css`
            height: calc(100vh - 66px);
          `,
        ]}
      >
        <CircularLoading />
      </div>
    );
  }
  return (
    <div
      css={[
        globalStyles.flexCol,
        css`
          position: relative;
          height: calc(100vh - 66px);
        `,
      ]}
    >
      <Modal modalState={modalState} setModalState={setModalState}>
        a
      </Modal>
      <div
        css={[
          css`
            padding: 12px;
            background-color: lightgrey;
            font-weight: 700;
            ${globalStyles.medium} {
              ${globalStyles.flexCol}
              display:none;
            }
          `,
        ]}
      >
        {data?.title}
      </div>
      <div
        css={[
          css`
            ${globalStyles.flexRow},
            gap: 8px;
            max-height: 350px;
            background-color: rgb(248, 248, 248);
            ${globalStyles.medium} {
              ${globalStyles.flexCol}
              max-height: 550px;
            }
          `,
        ]}
      >
        <img
          src={data?.assets.coverImage.extraLarge}
          css={coverImage}
          alt={data?.assets.coverImage.medium}
          loading="lazy"
        />
        <img
          src={data?.assets.bannerImage}
          css={bannerImage}
          alt={`${data?.title}.png`}
          loading="lazy"
        />
        <div
          css={[
            globalStyles.flexCol,
            detailContainer,
            css`
              margin-left: 6px;
              max-height: 400px;
              justify-content: space-between;
              gap: 4px;
              ${globalStyles.medium} {
                ${globalStyles.flexRow}
                margin-block: 24px;
              }
            `,
          ]}
        >
          <div
            css={[
              globalStyles.flexCol,
              css`
                ${globalStyles.medium} {
                  width: 33%;
                }
              `,
            ]}
          >
            <div
              css={[
                css`
                  display: none;
                  font-size: 30px;
                  font-weight: 700;
                  ${globalStyles.medium} {
                    ${globalStyles.flexCol}
                    display:flex;
                    margin-bottom: 24px;
                  }
                `,
              ]}
            >
              {data?.title}
            </div>
            <div
              css={[
                globalStyles.flexCol,
                css`
                  gap: 6px;
                  margin-bottom: 24px;
                `,
              ]}
            >
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
                globalStyles.flexRow,
                globalStyles.flexCenter,
                css`
                  display: none;
                  gap: 6px;
                  background-color: white;
                  padding: 8px;
                  border: 1px solid lightgrey;
                  border-radius: 4px;
                  cursor: pointer;
               
                  &:hover {
                    background-color: #f0f0f0;
                  }
                  ${globalStyles.medium} {
                    display: flex;
                  }
                `,
              ]}
              onClick={() => setModalState(true)}
            >
              <AiOutlineHeart />
              Add to Collection
            </div>
          </div>
          <div
            css={[
              globalStyles.flexCol,
              css`
                gap: 6px;
              `,
            ]}
          >
            <div
              css={css`
                font-size: 18px;
                font-weight: 100;
                color: #7a7a7a;
              `}
            >
              Platform
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
                ({data?.episodes} Eps)
              </div>
            </div>
            <div
              css={[
                globalStyles.flexCol,
                css`
                  gap: 6px;
                `,
              ]}
            >
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
            <div
              css={[
                globalStyles.flexCol,
                css`
                  gap: 6px;
                `,
              ]}
            >
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
          <div
            css={[
              globalStyles.flexCol,
              css`
                gap: 8px;
                display: none;
                ${globalStyles.medium} {
                  display: flex;
                }
              `,
            ]}
          >
            <div
              css={[
                globalStyles.flexCol,
                css`
                  gap: 6px;
                  max-width: 200px;
                `,
              ]}
            >
              <div
                css={css`
                  font-size: 18px;
                  font-weight: 100;
                  color: #7a7a7a;
                `}
              >
                Genre
              </div>
              <div
                css={[
                  globalStyles.flexRow,
                  css`
                    flex-wrap: wrap;
                    font-size: 22px;
                    font-weight: 400;
                    gap: 8px;
                  `,
                ]}
              >
                {data?.genres.map((dt: string, index: number) => (
                  <div
                    key={index}
                    css={css`
                      background-color: white;
                      border: 1px solid lightgrey;
                      padding: 4px;
                      border-radius: 4px;
                    `}
                  >
                    {dt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        css={[
          globalStyles.flexRow,
          globalStyles.flexCenter,
          css`
            background-color: rgb(248, 248, 248);
            padding-block: 12px;
            gap: 16px;
            ${globalStyles.medium} {
              display: none;
            }
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
      <div
        css={[
          globalStyles.flexCol,
          css`
            padding: 24px;
            gap: 24px;
          `,
        ]}
      >
        <div
          css={css`
            width: 100%;
            font-size: 200%;
          `}
        >
          Description
        </div>
        <div
          css={css`
            width: 100%;
            font-size: 100%;
          `}
          dangerouslySetInnerHTML={{ __html: data?.description || "-" }}
        />
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

const bannerImage = [
  image,
  css`
    display: none;
    ${globalStyles.medium} {
      display: flex;
    }
  `,
];

const detailContainer = css`
  width: 50%;
  ${globalStyles.medium} {
    width: calc(100% - 100px);
    margin: auto;
  }
`;
