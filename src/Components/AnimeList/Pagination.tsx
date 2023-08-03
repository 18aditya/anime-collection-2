/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { GrPlay, GrFastForward } from "react-icons/gr";
import * as globalStyles from "../../utils/styles/global";
import { useAnimeListCtx } from "../../utils/context/AnimeList";

export default function Pagination() {
  const {
    data,
    error,
    loading,
    pageDropdown,
    setPageDropdown,
    handleChangeDataperPage,
    handlePageBack,
    handlePageNext,
    handleFirstPage,
    handleLastPage,
  } = useAnimeListCtx();

  return (
    <div css={paginationStyle}>
      <div
        css={[
          globalStyles.flexRow,
          css`
            justify-content: space-between;
            width: 50px;
          `,
        ]}
      >
        <GrFastForward
          css={[
            cursorPointer,
            css`
              transform: rotate(180deg);
            `,
          ]}
          onClick={handleFirstPage}
        />
        <GrPlay
          css={[
            cursorPointer,
            css`
              transform: rotate(180deg);
            `,
          ]}
          onClick={handlePageBack}
        />
      </div>
      <div
        css={[
          globalStyles.flexRow,
          css`
            justify-content: space-between;
            align-items: center;
            width: 140px;
          `,
        ]}
      >
        <div css={globalStyles.flexRow}>
          <div>Page {data?.Page.currentPage}</div> /
          <div>{data?.Page.lastPage}</div>
        </div>
        <div css={pageStyle}>
          <div onClick={() => setPageDropdown(!pageDropdown)}>
            {data?.Page.perPage}/Page
          </div>

          <div css={dropDown(pageDropdown)}>
            <div
              css={hoverBackground}
              onClick={() => handleChangeDataperPage(10)}
            >
              10
            </div>
            <div
              css={hoverBackground}
              onClick={() => handleChangeDataperPage(25)}
            >
              25
            </div>
            <div
              css={hoverBackground}
              onClick={() => handleChangeDataperPage(50)}
            >
              50
            </div>
          </div>
        </div>
      </div>
      <div
        css={[
          globalStyles.flexRow,
          css`
            justify-content: space-between;
            width: 50px;
          `,
        ]}
      >
        <GrPlay css={cursorPointer} onClick={handlePageNext} />
        <GrFastForward css={cursorPointer} onClick={handleLastPage} />
      </div>
    </div>
  );
}

const hoverBackground = [
  globalStyles.widthFull,
  css`
    ${globalStyles.flexCenter}
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  `,
];

const dropDown = (pageDropdown: Boolean) => [
  globalStyles.flexCenter,
  css`
    display: ${pageDropdown ? "flex" : "none"};
    flex-direction: column;
    top: 23px;
    left: 0;
    width: 49px;
    position: absolute;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
  `,
];

const pageStyle = [
  globalStyles.flexRow,
  css`
    position: relative;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
    height: 17px;
    width: 50px;
    cursor: pointer;
  `,
];

const paginationStyle = [
  globalStyles.flexRow,
  globalStyles.widthFull,
  css`
    justify-content: space-between;
    align-items: center;
    margin: 14px;

    height: 100px;
    margin-bottom: 50px;
  `,
];

const cursorPointer = css`
  cursor: pointer;
`;
