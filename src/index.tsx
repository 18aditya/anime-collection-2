import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import GlobalStyles from "./globalStyles";
import { client } from "./utils/api/api";
import { ApolloProvider } from "@apollo/client";
import { GlobalStorageProvider } from "./utils/context/Context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStorageProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </GlobalStorageProvider>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
