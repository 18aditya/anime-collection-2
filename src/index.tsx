import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes";
import GlobalStyles from "./globalStyles";
import { Client } from "../src/Utils/Apis/api";
import { ApolloProvider } from "@apollo/client";
import { GlobalStorageProvider } from "src/Utils/Context/context";
import "src/Utils/styles/fonts.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <GlobalStorageProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </GlobalStorageProvider>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
