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
      { path: "collections/", element: <CollectionList /> },
      { path: "collections/:collectionId", element: <CollectionDetail /> },
    ],
  },
]);

export default router;
