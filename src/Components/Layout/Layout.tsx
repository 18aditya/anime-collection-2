/** @jsxImportSource @emotion/react */

import { navBarConstant } from "../../constant/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { css } from "@emotion/react";
import * as globalStyles from "src/Utils/styles/global";
import { useGlobalStorageCtx } from "src/Utils/Context/context";
import { useLocation } from "react-router-dom";
import { Modal } from "src/Components/components";
export default function Layout(): JSX.Element {
  const {
    modalState,
    handleShowOption,
    optionState,
    handleShowModal,
    addModal,
    handleCreateNewCollection,
    setCollectionName,
    collectionName,
    formError,
    setModalState,
    setAddModal,
  } = useGlobalStorageCtx();
  const location = useLocation();
  const currentLink = location.pathname;
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setAddModal(false);
    setModalState(false);
    navigate(path);
  };
  return (
    <div css={mainComponent}>
      <div>
        <nav
          css={[
            navBar,
            globalStyles.flexCenter,
            css`
              justify-content: space-between;
            `,
          ]}
        >
          <div onClick={() => handleNavigation("/")} css={homeButton}>
            Home
          </div>
          {currentLink === "/collection" && (
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
              onClick={handleShowModal}
            >
              Add new collection
            </button>
          )}
          <div>
            <AiOutlineMenu css={menuIcon} onClick={() => handleShowOption()} />
            {/* Show the menu icon for tablet and below */}
            <div css={container}>{NavBarLink(handleNavigation)}</div>
          </div>
        </nav>
        {/* Show links for desktop */}
        <div css={menuMobile(optionState, currentLink)}>
          {NavBarLink(handleNavigation)}
        </div>
      </div>

      <main css={mainContainer(optionState, modalState)}>
        <div css={layerDisable(optionState, modalState)}> </div>
        <div css={[globalStyles.flexCol, globalStyles.widthFull]}>
          <Modal modalState={addModal} setModalState={handleShowModal}>
            <div
              css={[
                globalStyles.flexCol,
                css`
                  font-family: "Geek", sans-serif;
                  margin-top: 24px;
                  display: flex;
                  height: 100%;
                  gap: 16px;
                `,
              ]}
            >
              Collection Name
              <div
                css={css`
                  font-family: "Geek", sans-serif;
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
          </Modal>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavBarLink(handleNavigation: any) {
  return (
    <>
      {navBarConstant.map((dt, index) => (
        <div
          key={index}
          css={desktopLinkStyles}
          onClick={() => handleNavigation(dt.url)}
        >
          {dt.title}
        </div>
      ))}
    </>
  );
}

const layerDisable = (optionState: Boolean, modalState: Boolean) => css`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 80;
  height: ${optionState === true ? "10000px" : "0px"};
  background-color: grey;
  opacity: ${optionState === true ? "0.5" : "0"};
  pointer-events: ${optionState === true ? "none" : "auto"};
  ${globalStyles.medium} {
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
  overflow: ${optionState || modalState ? "hidden" : "auto"};
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
  ${globalStyles.medium} {
    display: none;
  }
`;

const container = css`
  display: none;
  ${globalStyles.medium} {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    animation: none;
  }
`;

const menuMobile = (optionState: Boolean, route: string) => css`
  display: ${optionState === true ? "flex" : "none"};
  z-index: 99;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid black;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  top: ${route === "/collection" ? "80px;" : "56px"}
  position: absolute;
  ${globalStyles.medium} {
    display: none;
  }
`;

const desktopLinkStyles = css`
  ${globalStyles.flexCenter}
  justify-content:start;
  padding: 12px 12px;
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
