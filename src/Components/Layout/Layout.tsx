/** @jsxImportSource @emotion/react */
// import useLayoutHooks from "../../utils/hooks/useLayoutHooks";
import { medium } from "../../utils/styles/global";
import { navBarConstant } from "../../constant/navbar";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { css } from "@emotion/react";
import * as globalStyles from "../../utils/styles/global";
import { useGlobalStorageCtx } from "../../utils/context/GlobalStorage";

export default function Layout(): JSX.Element {
  // const { optionState, handleShowOption } = useLayoutHooks();
  const { modalState, handleShowOption, optionState } = useGlobalStorageCtx();
  return (
    <div css={mainComponent}>
      <div>
        <nav css={navBar}>
          <Link to="/" css={homeButton}>
            Home
          </Link>
          <div>
            <AiOutlineMenu css={menuIcon} onClick={() => handleShowOption()} />
            {/* Show the menu icon for tablet and below */}
            <div css={container}>{NavBarLink()}</div>
          </div>
        </nav>
        {/* Show links for desktop */}
        <div css={menuMobile(optionState)}>{NavBarLink()}</div>
      </div>

      <main css={mainContainer(optionState, modalState)}>
        <div css={layerDisable(optionState, modalState)}> </div>
        <div css={[globalStyles.flexCol, globalStyles.widthFull]}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavBarLink() {
  const { setOption } = useGlobalStorageCtx();
  return (
    <>
      {navBarConstant.map((dt, index) => (
        <Link
          key={index}
          to={dt.url}
          css={desktopLinkStyles}
          onClick={() => setOption(false)}
        >
          {dt.title}
        </Link>
      ))}
    </>
  );
}

const layerDisable = (optionState: Boolean, modalState: Boolean) => css`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 80;
  height: ${optionState  === true ? "10000px" : "0px"};
  background-color: grey;
  opacity: ${optionState === true ? "0.5" : "0"};
  pointer-events: ${optionState === true ? "none" : "auto"};
  ${medium} {
    pointer-events: auto;
  }
`;
const mainComponent = css`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;

const mainContainer = (optionState: Boolean, modalState: Boolean) => css`
  position: relative;
  height: 100%;
  overflow: ${optionState || modalState === true ? "hidden" : "auto"};
`;

const navBar = css`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  padding: 24px;
  background-color: white;
`;

const menuIcon = css`
  display: block;
  cursor: pointer;
  ${medium} {
    display: none;
  }
`;

const container = css`
  display: none;
  ${medium} {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    animation: none;
  }
`;

const menuMobile = (optionState: Boolean) => css`
  display: ${optionState === true ? "flex" : "none"};
  z-index: 99;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid black;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  top: 56px;
  position: absolute;
  ${medium} {
    display: none;
  }
`;

const desktopLinkStyles = css`
  padding: 8px 12px;
  text-decoration: none;
  color: #000;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const homeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;

  &:hover {
    background-color: #f0f0f0;
  }
`;
