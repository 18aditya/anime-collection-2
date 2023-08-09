/** @jsxImportSource @emotion/react */

import * as globalStyles from "src/Utils/Styles";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { useCollectionDetail } from "src/Utils/Hooks";
import { CollectionDetailCtx, useCollectionDetailCtx } from "src/Utils/Context";
import { AnimeList, Modal } from "src/Components";

export default function Page() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = parseInt(pathname.split("/")[pathname.split("/").length - 1]);
  const useCollectionDetailContext = useCollectionDetail(id);

  return (
    <CollectionDetailCtx.Provider value={useCollectionDetailContext}>
      <Content />
    </CollectionDetailCtx.Provider>
  );
}

function Content() {
  const {
    setNewTitle,
    formError,
    handleModifyCollectionTitle,
    newTitle,
    removeModal,
    handleRemoveModalState,
    loading,
    data,
    handleRemoveAnimeCollection,
    editModal,
    handleEditModalState,
    removedAnime,
  } = useCollectionDetailCtx();

  return (
    <div
      css={[
        globalStyles.flexCol,
        globalStyles.flexCenter,
        css`
          position: relative;
          height: 100%;
          gap: 24px;
        `,
      ]}
    >
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
      <Modal modalState={removeModal} setModalState={handleRemoveModalState}>
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
            <div>{removedAnime.title}</div>
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
              onClick={() => handleRemoveModalState("")}
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
              onClick={handleRemoveAnimeCollection}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <div
        css={[
          globalStyles.flexRow,
          css`
            width: 80%;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
          `,
        ]}
      >
        {data?.collection_title}
        <button
          css={[
            globalStyles.flexRow,
            globalStyles.flexCenter,
            css`
              font-family: "Geek", sans-serif;
              display: flex;
              height: 100%;
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
          onClick={() => handleEditModalState()}
        >
          Change Collection Name
        </button>
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
        <AnimeList
          loading={loading}
          data={data?.animes}
          handleRemoveModalState={handleRemoveModalState}
        />
      </div>
    </div>
  );
}
