/** @jsxImportSource @emotion/react */

import * as globalStyles from "../../utils/styles/global";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { CircularLoading } from "../components";
import { AnimeListProps } from "src/utils/interface/Interface";
import { useCollectionDetailCtx } from "src/utils/context/Context";

export default function AnimeList({
  loading,
  data,
  handleRemoveAnimeCollection,
}: AnimeListProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const path = pathname.split("/")[pathname.split("/").length - 2];

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        data?.map((dt: any, index: number) => (
          <Link to={`/anime/${dt.id}`} key={index} css={cardStyle}>
            <img
              src={dt.assets.coverImage.large}
              css={coverImage}
              alt={dt.assets.coverImage.medium}
            />
            <img
              src={dt.assets.bannerImage}
              css={bannerImage}
              alt={`${dt.title}.png`}
            />
            <div css={cardDetail}>
              <div css={animeDetails}>
                <div> {dt.title}</div>
                <div> {dt.status}</div>
                <div> {dt.format}</div>
                <div> {dt.duration} Minute</div>
                <div> {dt.episodes !== "?" && `${dt.episodes} Episode`} </div>
                {path == "collection" && (
                  <div
                    css={css`
                      ${globalStyles.flexCol}
                      ${globalStyles.medium} {
                        ${globalStyles.flexRow}
                      }
                    `}
                  >
                    <button
                      css={[
                        globalStyles.flexRow,
                        globalStyles.flexCenter,
                        css`
                          margin-top: 10px;
                          max-width: 200px;
                          gap: 6px;
                          background-color: white;
                          padding: 8px;
                          border: 1px solid lightgrey;
                          border-radius: 4px;
                          cursor: pointer;
                          &:hover {
                            background-color: #f89e9e;
                          }
                        `,
                      ]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveAnimeCollection(dt.id);
                      }}
                    >
                      Remove from collection
                    </button>
                  </div>
                )}
              </div>
              <div css={animeDescription}>
                <div>Description</div>
                <div dangerouslySetInnerHTML={{ __html: dt.description }} />
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
}

const animeCard = css`
  ${globalStyles.flexRow}
  ${globalStyles.medium} {
    ${globalStyles.flexCol}
  }
`;

const image = css`
  object-fit: cover;
  width: 100px;
  height: 150px;
  ${globalStyles.medium} {
    ${globalStyles.widthFull}
    height: 100%;
  }
`;

const cardStyle = [
  animeCard,
  globalStyles.widthFull,
  css`
    color: black;
    text-decoration: none;
    border: 1px solid black;
    border-radius: 4px;
  `,
];

const coverImage = [
  image,
  css`
    width: 100px;
    height: 170px;
    display: flex;
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
      height: 260px;
      display: flex;
      object-fit: cover;
    }
  `,
];

const cardDetail = [
  globalStyles.flexRow,
  css`
    gap: 4px;
    padding: 4px;
    ${globalStyles.medium} {
      gap: 16px;
    }
  `,
];
const animeDetails = [
  globalStyles.flexCol,
  css`
    gap: 2px;
    padding: 4px;
    ${globalStyles.medium} {
      min-width: 200px;
    }
  `,
];

const animeDescription = [
  globalStyles.flexCol,
  css`
    display: none;
    ${globalStyles.medium} {
      display: flex;
    }
  `,
];
