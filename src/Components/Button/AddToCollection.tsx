/** @jsxImportSource @emotion/react */

import * as globalStyles from "../../utils/styles/global";
import { css } from "@emotion/react";
import { AiOutlineHeart } from "react-icons/ai";

interface StyleDefault {
  width?: string | null;
  marginBlock?: string | null;
  display?: string | null;
}

interface ButtonProps {
  setModalState: ()=>void;
  styleDefault: StyleDefault;
  styleBreakpoint: StyleDefault;
}

const AddToCollection = ({
  setModalState,
  styleDefault = { width: "250px", marginBlock: "24px", display: "flex" },
  styleBreakpoint = { width: "100%", marginBlock: "24px", display: "none" },
}: ButtonProps) => {
  return (
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
        
          width: ${styleDefault.width};
          margin-block: ${styleDefault.marginBlock};
          display: ${styleDefault.display};
          ${globalStyles.medium} {
            display: ${styleBreakpoint.display};
          }
        `,
      ]}
      onClick={setModalState}
    >
      <AiOutlineHeart />
      Add to Collection
    </button>
  );
};

export default AddToCollection;
