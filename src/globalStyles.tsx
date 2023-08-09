// globalStyles.tsx

import { Global, css } from "@emotion/react";
import { fontStyles, bodyStyles } from "src/Utils/Styles";

const GlobalStyles: React.FC = () => <Global styles={ bodyStyles } />;

export default GlobalStyles;
