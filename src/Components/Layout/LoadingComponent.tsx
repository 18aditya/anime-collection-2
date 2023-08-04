/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CircularLoading } from "../components";
import * as globalStyles from "../../utils/styles/global";

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
