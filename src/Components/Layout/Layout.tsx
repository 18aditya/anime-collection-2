/** @jsxImportSource @emotion/react */
import useLayoutHooks from "../../utils/hooks/useLayoutHooks";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { css } from "@emotion/react";

export default function Layout(): JSX.Element {
  const { optionState, handleShowOption } = useLayoutHooks();

  return (
    <div css={mainComponent}>
      <nav css={navBar}>
        <li>
          <Link to="/" css={homeButton}>
            Home
          </Link>
        </li>
        <div>
          {/* Show the menu icon for tablet and below */}
          <AiOutlineMenu css={menuIcon} onClick={() => handleShowOption()} />

          {/* Show links for desktop */}
          <div css={container}>
            <Link to="/anime/1" css={desktopLinkStyles}>
              Anime Detail
            </Link>
            <Link to="/collection" css={desktopLinkStyles}>
              Collection
            </Link>
            <Link to="/collection/1" css={desktopLinkStyles}>
              Collection Detail
            </Link>
          </div>
        </div>
      </nav>
      <main css={mainContainer}>
        <div css={layerDisable(optionState)} />
        <div css={menuMobile(optionState)}>
          <Link to="/anime/1" css={desktopLinkStyles}>
            Anime Detail
          </Link>
          <Link to="/collection" css={desktopLinkStyles}>
            Collection
          </Link>
          <Link to="/collection/1" css={desktopLinkStyles}>
            Collection Detail
          </Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

const layerDisable = (optionState: Boolean) => css`
  display: ${optionState == true ? "flex" : "none"};
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: grey;
  opacity: 0.5;
  pointer-events: none;
  @media (min-width: 768px) {
    display: none;
    pointer-events: auto;
  }
`;
const mainComponent = css`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;

const mainContainer = css`
  position: relative;
  height: 100%;
`;

const navBar = css`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  padding: 24px;
`;

const menuMobile = (optionState: Boolean) => css`
  display: ${optionState == true ? "flex" : "none"};
  z-index: 99;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid black;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  top: 0;
  position: absolute;
  @media (min-width: 768px) {
    display: none;
  }
`;

const menuIcon = css`
  display: block;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const container = css`
  display: none;
  @media (min-width: 768px) {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    animation: none;
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
