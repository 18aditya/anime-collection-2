import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  AnimeDetail,
  AnimeList,
  CollectionDetail,
  CollectionList,
} from "../Pages/pages";
import { Layout } from "../Components/components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <AnimeList /> },
      { path: "anime/:Animeid", element: <AnimeDetail /> },
      { path: "collection/", element: <CollectionList /> },
      { path: "collection/:collectionId", element: <CollectionDetail /> },
    ],
  },
]);

export default router;
