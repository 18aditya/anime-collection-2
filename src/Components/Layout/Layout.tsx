/** @jsxImportSource @emotion/react */
import useLayoutHooks from "../../utils/hooks/useLayoutHooks";
import { medium } from "../../utils/styles/global";
import { navBarConstant } from "../../constant/navbar";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { css } from "@emotion/react";
import * as globalStyles from "../../utils/styles/global";

export default function Layout(): JSX.Element {
  const { optionState, handleShowOption } = useLayoutHooks();

  return (
    <div css={mainComponent}>
      <div>
        <nav css={navBar}>
          <li>
            <Link to="/" css={homeButton}>
              Home
            </Link>
          </li>
          <div>
            <AiOutlineMenu css={menuIcon} onClick={() => handleShowOption()} />
            {/* Show the menu icon for tablet and below */}
            <div css={container}>{navBarLink()}</div>
          </div>
        </nav>
        {/* Show links for desktop */}
        <div css={menuMobile(optionState)}>{navBarLink()}</div>
      </div>

      <main css={mainContainer(optionState)}>
        <div css={layerDisable(optionState)}>
          <div css={[globalStyles.flexCol, globalStyles.widthFull]}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function navBarLink() {
  return (
    <>
      {navBarConstant.map((dt, index) => (
        <Link key={index} to={dt.url} css={desktopLinkStyles}>
          {dt.title}
        </Link>
      ))}
    </>
  );
}

const layerDisable = (optionState: Boolean) => css`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 80;
  background-color: ${optionState === true ? "grey" : "white"};
  opacity: ${optionState === true ? "0.5" : "1"};
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

const mainContainer = (optionState: Boolean) => css`
  position: relative;
  height: 100%;
  overflow: ${optionState === true ? "hidden" : "auto"};
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
  text-decoration: none;
  color: #000;

  &:hover {
    background-color: #f0f0f0;
  }
`;
