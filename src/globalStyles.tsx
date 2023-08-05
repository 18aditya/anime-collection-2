// globalStyles.tsx

import { Global } from "@emotion/react";

const GlobalStyles: React.FC = () => (
  <Global
    styles={{
      body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Geek', sans-serif", 
      },
    }}
  />
);

export default GlobalStyles;
