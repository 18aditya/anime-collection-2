/** @jsxImportSource @emotion/react */

import * as globalStyles from "../../../utils/styles/global";
import {
  AnimeDetailCtx,
  useAnimeDetailCtx,
  useGlobalStorageCtx,
} from "../../../utils/context/Context";
import { useAnimeDetail } from "../../../utils/hooks/Hooks";
import {
  AddToCollection,
  LoadingComponent,
  Modal,
} from "../../../Components/components";
import { css } from "@emotion/react";
import {
  AiOutlineStar,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { GlobalStorageDataProps } from "../../../utils/context/GlobalStorage";
import { GenreContainerProps } from "src/utils/interface/Interface";

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
  const {
    loading,
    data,
    setFormState,
    formState,
    collectionName,
    setCollectionName,
    handleCreateNewCollection,
    handleAddAnimeCollection,
    formError,
    collectionModal,
    handleCollectionModalState,
    handleAdditionalModalState,
    handleCollectionList,
    addModal,
  } = useAnimeDetailCtx();
  const { GlobalStorageData } = useGlobalStorageCtx();
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div
      css={[
        globalStyles.flexCol,
        css`
          position: relative;
          height: 100%;
        `,
      ]}
    >
      <Modal
        modalState={collectionModal}
        setModalState={handleCollectionModalState}
      >
        <div
          css={[
            globalStyles.flexCol,
            css`
              gap: 12px;
            `,
          ]}
        >
          Anime is in this lists.
          <div
            css={[
              globalStyles.flexCol,
              css`
                max-height: 200px;
                overflow: auto;
                gap: 8px;
              `,
            ]}
          >
            {GlobalStorageData.length > 0 ? (
              GlobalStorageData.map(
                (dt: GlobalStorageDataProps, index: number) => {
                  const animeExistsInCollection = dt.animes.some(
                    (coll) => coll.id === data?.id
                  );
                  if (animeExistsInCollection) {
                    return (
                      <button
                        key={index}
                        css={[
                          globalStyles.flexRow,
                          globalStyles.flexCenter,
                          css`
                          gap: 6px;
                          background-color:white;
                          padding: 8px;
                          border: 1px solid lightgrey;
                          border-radius: 4px;
                          cursor: pointer;
                          &:hover {
                            background-color:" #f0f0f0"};
                          }
                        `,
                        ]}
                        onClick={() =>
                          handleCollectionList(dt.id)
                        }
                      >
                        {dt.collection_title}
                      </button>
                    );
                  }
                }
              )
            ) : (
              <div css={[globalStyles.flexCenter]}>Anime is not in any Collections</div>
            )}
          </div>
        </div>
      </Modal>
      <Modal modalState={addModal} setModalState={handleAdditionalModalState}>
        <div
          css={[
            globalStyles.flexCol,
            css`
              gap: 12px;
            `,
          ]}
        >
          Add to Collection
          <div
            css={[
              globalStyles.flexCol,
              css`
                max-height: 200px;
                overflow: auto;
                gap: 8px;
              `,
            ]}
          >
            {GlobalStorageData.map(
              (dt: GlobalStorageDataProps, index: number) => {
                const animeExistsInCollection = dt.animes.some(
                  (coll) => coll.id === data?.id
                );
                return (
                  <button
                    disabled={animeExistsInCollection}
                    key={index}
                    css={[
                      globalStyles.flexRow,
                      globalStyles.flexCenter,
                      css`
                        gap: 6px;
                        background-color: ${animeExistsInCollection
                          ? "#CDFFD4"
                          : "white"};
                        padding: 8px;
                        border: 1px solid
                          ${animeExistsInCollection ? "#ABFFB6" : "lightgrey"};
                        border-radius: 4px;
                        cursor: pointer;
                        &:hover {
                          background-color: ${animeExistsInCollection
                            ? "#92AE95"
                            : " #f0f0f0"};
                        }
                      `,
                    ]}
                    onClick={() =>
                      handleAddAnimeCollection({
                        collId: dt.id,
                        id: data?.id,
                        title: data?.title,
                        assets: {
                          coverImage: data?.assets.coverImage,
                          bannerImage: data?.assets.bannerImage,
                        },
                        popularity: data?.popularity,
                        status: data?.status,
                        episodes: data?.episodes,
                        duration: data?.duration,
                        description: data?.description,
                        format: data?.format,
                      })
                    }
                  >
                    {animeExistsInCollection
                      ? "Already on this List"
                      : dt.collection_title}
                  </button>
                );
              }
            )}
          </div>
          <div css={[globalStyles.flexCol]}>
            <button
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
              onClick={() => setFormState(!formState)}
            >
              {formState ? (
                <>
                  <AiOutlineClose />
                  Close Form
                </>
              ) : (
                <>
                  <AiOutlinePlus />
                  New collection
                </>
              )}
            </button>
            <div
              css={[
                globalStyles.flexCol,
                css`
                  margin-top: 24px;
                  display: ${formState ? "flex" : "none"};
                  height: 100%;
                  gap: 16px;
                `,
              ]}
            >
              Collection Name
              <div
                css={css`
                  font-size: 14px;
                  color: red;
                `}
              >
                {formError.trim() !== "" && formError}
              </div>
              <input
                value={collectionName}
                css={css`
                  height: 25px;
                  border: 1px solid ${formError.trim() !== "" ? "red" : "black"};
                  border-radius: 4px;
                  padding-inline: 6px;
                `}
                onChange={(e) => setCollectionName(e.target.value)}
              />
              <button
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
                onClick={() => handleCreateNewCollection()}
              >
                Add Collection
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div css={globalStyles.flexCol}>
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
        <AnimeDetailCard />
        <div
          css={css`
            width: 100%;
            display: flex;

            justify-content: space-around;
            align-items: center;
            background-color: rgb(248, 248, 248);
          `}
        >
          <AddToCollection
            styleDefault={{
              width: "200px",
              marginBlock: "24px",
              display: "flex",
            }}
            styleBreakpoint={{
              width: null,
              marginBlock: null,
              display: "none",
            }}
            setModalState={handleAdditionalModalState}
          />
          <button
            css={[
              globalStyles.flexRow,
              globalStyles.flexCenter,
              css`
                width: 200px;
                margin-block: 24px;
                display: flex;
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
                  display: none;
                }
              `,
            ]}
            onClick={handleCollectionModalState}
          >
            <AiOutlineMenu />
            View Collection
          </button>
        </div>
        <AnimeDescription />
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

const AnimeDetailCard = () => {
  const { data } = useAnimeDetailCtx();

  return (
    <div
      css={[
        globalStyles.flexRow,
        css`
          gap: 8px;
          background-color: rgb(248, 248, 248);
          ${globalStyles.medium} {
            ${globalStyles.flexCol}
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
          css`
            max-width: 100%;
            justify-content: space-between;
            margin-block: 16px;
            ${globalStyles.medium} {
              ${globalStyles.flexRow}
              margin-inline: 100px;
              margin-block: 50px;
              gap: 24px;
            }
          `,
        ]}
      >
        <DetailContainer />
        <GenreContainer display="mobile" />
        <InfoContainer />
        <GenreContainer display="desktop" />
      </div>
    </div>
  );
};
const DetailContainer = () => {
  const { data, handleCollectionModalState, handleAdditionalModalState } =
    useAnimeDetailCtx();

  return (
    <div css={[globalStyles.flexCol]}>
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
          css`
            gap: 24px;
          `,
        ]}
      >
        <AddToCollection
          styleDefault={{
            width: null,
            marginBlock: null,
            display: "none",
          }}
          styleBreakpoint={{
            width: "500px",
            marginBlock: "24px",
            display: "flex",
          }}
          setModalState={handleAdditionalModalState}
        />
        <button
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
          onClick={handleCollectionModalState}
        >
          <AiOutlineMenu />
          View Collection
        </button>
      </div>
    </div>
  );
};

const InfoContainer = () => {
  const { data } = useAnimeDetailCtx();
  return (
    <>
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
            width: 100%;
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
              width: 100%;
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
              width: 100%;
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
    </>
  );
};

const GenreContainer = ({ display }: GenreContainerProps) => {
  const { data } = useAnimeDetailCtx();
  return (
    <div
      css={css`
        width: 80%;
        display: ${display === "mobile" ? "flex" : "none"};

        ${globalStyles.medium} {
          display: ${display === "desktop" ? "flex" : "none"};
          width: 250px;
        }
      `}
    >
      <div
        css={[
          globalStyles.flexCol,
          css`
            gap: 6px;
            max-width: 200px;
            margin-bottom: 24px;
          `,
        ]}
      >
        <div
          css={css`
            width: 100%;
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
              width: 100%;
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
  );
};

const AnimeDescription = () => {
  const { data } = useAnimeDetailCtx();
  return (
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
  );
};

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
      object-fit: cover;
      height: 414px;
    }
  `,
];
