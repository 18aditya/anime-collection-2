/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CircularLoading } from "src/Components";
import * as globalStyles from "src/Utils/styles/global";

const LoadingComponent = () => {
  return (
    <div
      css={[
        globalStyles.flexCenter,
        css`
          height: calc(100vh - 66px);
        `,
      ]}
    >
      <CircularLoading />
    </div>
  );
};

export default LoadingComponent;
