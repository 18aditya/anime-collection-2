// globalStyles.tsx

import { Global } from "@emotion/react";
import { fontStyles } from "src/Utils/Styles";

const GlobalStyles: React.FC = () => (
  <Global
    styles={[
      fontStyles,
      {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: "'Geek', sans-serif",
        },
      },
    ]}
  />
);

export default GlobalStyles;
