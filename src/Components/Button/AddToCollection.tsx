/** @jsxImportSource @emotion/react */

import * as globalStyles from "src/Utils/styles/global";
import { css } from "@emotion/react";
import { AiOutlineHeart } from "react-icons/ai";
import { ButtonProps } from "src/Utils/Interface";

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
