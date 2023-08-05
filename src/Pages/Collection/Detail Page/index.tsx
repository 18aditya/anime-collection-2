/** @jsxImportSource @emotion/react */

import * as globalStyles from "src/utils/styles/global";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { useCollectionDetail } from "src/utils/hooks/Hooks";
import {
  CollectionDetailCtx,
  useCollectionDetailCtx,
  useCollectionListCtx,
} from "src/utils/context/Context";
import { AnimeList, Modal } from "src/Components/components";

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
    collectionName,
    loading,
    data,
    handleRemoveAnimeCollection,
    editModal,
    handleEditModalState,
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
          handleRemoveAnimeCollection={handleRemoveAnimeCollection}
        />
      </div>
    </div>
  );
}
