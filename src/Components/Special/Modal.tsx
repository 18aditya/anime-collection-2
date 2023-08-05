/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";

import { ModalModel } from "src/utils/interface/Interface";

const Modal = ({ children, modalState, setModalState }: ModalModel) => {
  return (
    <>
      <div
        css={css`
          display: ${modalState ? "flex" : "none"};
          position: absolute;
          opacity: 0.5;
          background-color: grey;
          min-width: 100vw;
          height: 1000000px;
          z-index: 100000;
        `}
        onClick={setModalState}
      ></div>
      <div
        css={css`
          display: ${modalState ? "flex" : "none"};
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          width: 60%;
          min-width: 150px;
          min-height: 150px;
          padding: 14px;
          border-radius: 8px;
          flex-direction: column;
          gap: 7px;
          z-index: 100000;
          animation: ${slideInAnimation} 0.3s forwards;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: end;
          `}
        >
          <AiOutlineClose onClick={setModalState} />
        </div>
        {children}
      </div>
    </>
  );
};

const slideInAnimation = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

export default Modal;
