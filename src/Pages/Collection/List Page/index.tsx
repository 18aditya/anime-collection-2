/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as globalStyles from "../../../utils/styles/global";
import { useCollectionList } from "../../../utils/hooks/Hooks";
import {
  CollectionListCtx,
  useCollectionListCtx,
} from "src/utils/context/Context";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit,  } from "react-icons/ai";
import { Modal } from "src/Components/components";

export default function Page() {
  const useCollectionListContext = useCollectionList();

  return (
    <CollectionListCtx.Provider value={useCollectionListContext}>
      <Content />
    </CollectionListCtx.Provider>
  );
}

function Content() {
  const {
    GlobalStorageData,
    handleDeleteCollection,
    deleteModal,
    handleDeleteModalState,
    deleteId,
    handleEditModalState,
    editModal,
    newTitle,
    setNewTitle,
    handleModifyCollectionTitle,
    formError,
  } = useCollectionListCtx();

  return (
    <div
      css={[
        globalStyles.flexCol,
        globalStyles.widthFull,
        globalStyles.flexCenter,
      ]}
    >
      <Modal modalState={deleteModal} setModalState={handleDeleteModalState}>
        <div
          css={[
            globalStyles.flexCol,
            css`
              width: 100%;
              justify-content: space-between;
              height: 100px;
            `,
          ]}
        >
          <div
            css={css`
              text-align: center;
              font-size: 8x;
              ${globalStyles.medium} {
                font-size: 24px;
              }
            `}
          >
            <div>Hold up!! Are you sure you want delete</div>
            <div>
              {
                GlobalStorageData.find((dt) => dt.id === deleteId)
                  ?.collection_title
              }
            </div>
          </div>
          <div
            css={[
              globalStyles.flexRow,
              globalStyles.flexCenter,
              css`
                gap: 24px;
              `,
            ]}
          >
            <button
              css={[
                globalStyles.flexRow,
                globalStyles.flexCenter,
                css`
                  width: 100px;
                  gap: 6px;
                  background-color: white;
                  padding: 8px;
                  border: 0px;
                  border-radius: 4px;
                  cursor: pointer;
                  background-color: #ffbaba;
                  &:hover {
                    background-color: #f89e9e;
                  }
                `,
              ]}
              onClick={() => handleDeleteModalState()}
            >
              No
            </button>
            <button
              css={[
                globalStyles.flexRow,
                globalStyles.flexCenter,
                css`
                  width: 100px;
                  gap: 6px;
                  background-color: white;
                  padding: 8px;
                  border: 0px;
                  border-radius: 4px;
                  cursor: pointer;
                  background-color: #b2d8b2;
                  &:hover {
                    background-color: #99cc99;
                  }
                `,
              ]}
              onClick={handleDeleteCollection}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <Modal modalState={editModal} setModalState={handleEditModalState}>
        <div
          css={[
            globalStyles.flexCol,
            css`
              width: 100%;
              justify-content: space-between;
              height: 100%;
            `,
          ]}
        >
          <div
            css={css`
              ${globalStyles.flexCenter}
              ${globalStyles.flexCol}
              gap:24px
              height:550px;
              text-align: center;
              font-size: 8x;
              ${globalStyles.medium} {
                font-size: 24px;
              }
            `}
          >
            <div>Change Collection Name here</div>
            <div
              css={css`
                font-size: 14px;
                color: red;
                margin-top: 12px;
              `}
            >
              {formError.trim() !== "" && formError}
            </div>
            <input
              value={newTitle}
              css={css`
                width: 100%;
                height: 25px;
                border: 1px solid ${formError.trim() !== "" ? "red" : "black"};
                border-radius: 4px;
                padding-inline: 6px;
                margin-block: 12px;
              `}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              css={[
                globalStyles.flexRow,
                globalStyles.flexCenter,
                css`
                  width: 100%;
                  max-width: 250px;
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
              onClick={() => handleModifyCollectionTitle()}
            >
              Change Collection Titlte
            </button>
          </div>
        </div>
      </Modal>
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
        View all your Collection List
        <div
          css={css`
            display: flex;
            width: 100%;
          `}
        >
          <div
            css={css`
              ${globalStyles.flexRow}
              ${globalStyles.flexCenter}
              flex-wrap: wrap;
              width: auto;
              margin: auto;
            `}
          >
            {GlobalStorageData.map((dt) => (
              <div
                css={css`
                  position: relative;
                  margin-block: 25px;
                `}
              >
                <div
                  css={[
                    globalStyles.flexRow,
                    css`
                      display: flex;
                      width: 92%;
                      flex-direction: row;
                      justify-content: end;
                      gap: 8px;
                      padding-top: 12px;
                      position: absolute;
                      z-index: 3;
                    `,
                  ]}
                >
                  <div
                    css={[
                      css`
                        background-color: white;
                        border-radius: 4px;
                        padding: 2px;
                        &:hover {
                          scale: 1.1;
                          cursor: pointer;
                        }
                      `,
                    ]}
                    onClick={() => handleEditModalState(dt.id)}
                  >
                    <AiFillEdit />
                  </div>
                  <div
                    css={[
                      css`
                        background-color: white;
                        border-radius: 4px;
                        padding: 2px;
                        &:hover {
                          scale: 1.1;
                          cursor: pointer;
                        }
                      `,
                    ]}
                    onClick={() => handleDeleteModalState(dt.id)}
                  >
                    <AiFillDelete color="darkred" />
                  </div>
                </div>
                <Link
                  to={`/collection/${dt.id}`}
                  css={css`
                    ${globalStyles.flexCol}
                    text-decoration: none;
                    color: black;
                  `}
                >
                  <div
                    css={css`
                      width: 120px;
                      height: 170px;
                      border: 1px solid black;
                      margin: 5px;
                      border-radius: 4px;
                      position: relative;
                      overflow: hidden;

                      ${globalStyles.medium} {
                        width: 200px;
                        height: 250px;
                      }
                      &:hover {
                        scale: 1.1;
                        cursor: pointer;
                      }
                    `}
                  >
                    {dt.animes[0]?.assets.coverImage ? (
                      <div
                        css={css`
                          width: 100%;
                          height: 100%;
                          position: relative;

                          &::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(128, 128, 128, 0.5);
                            z-index: 2;
                          }
                        `}
                      >
                        <div
                          css={css`
                            width: 100%;
                            height: 100%;
                            background-image: url(${dt.animes[0]?.assets
                              .coverImage?.large});
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;
                            position: relative;
                            z-index: 1;
                          `}
                        />
                      </div>
                    ) : (
                      <div
                        css={css`
                          ${globalStyles.flexCenter}
                          width: 100%;
                          height: 100%;
                          font-weight: 700;
                        `}
                      >
                        No anime added
                      </div>
                    )}
                  </div>
                  <div
                    css={css`
                      display: flex;
                      width: 100%;
                      font-weight: 700;
                      font-size: 24px;
                      ${globalStyles.medium} {
                        display: none;
                      }
                    `}
                  >
                    {dt.collection_title.length > 10
                      ? `${dt.collection_title.slice(0, 10)}...`
                      : dt.collection_title}
                  </div>
                  <div
                    css={css`
                      display: none;
                      width: 100%;
                      font-weight: 700;
                      font-size: 18px;
                      ${globalStyles.medium} {
                        display: flex;
                      }
                    `}
                  >
                    {dt.collection_title.length > 10
                      ? `${dt.collection_title.slice(0, 10)}...`
                      : dt.collection_title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
