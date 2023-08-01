// Import necessary types from Apollo Client
import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  TypedDocumentNode,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Page, PageProperties, Media } from "../interface/interface";

class APIHandler {
  private client: ApolloClient<any>;

  constructor() {
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_API_URL,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
    });

    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  private handleData(data: any): { data: Media[]; page: PageProperties } {
    const pageData = data.Page.pageInfo;
    const mediaData = data.Page.media.map((media: any) => ({
      id: media.id,
      title: media.title.english,
      type: media.type,
      status: media.status,
      format: media.format,
      duration: media.duration,
      episode: media.episodes,
      popularity: media.popularity,
      coverImage: media.coverImage,
    }));

    return {
      data: mediaData || [],
      page:
        {
          currentPage: pageData.currentPage,
          hasNextPage: pageData.hasNextPage,
          lastPage: pageData.lastPage,
          perPage: pageData.perPage,
          total: pageData.total,
        } || [],
    };
  }

  private handleError(error: any): void {
    alert(`Failed to get requested data, ${error}`);
  }

  public async queryApi(
    query: DocumentNode | TypedDocumentNode<any, any>,
    variables: Page
  ) {
    try {
      const res = await this.client.query({ query, variables });
      return this.handleData(res.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}
export default APIHandler;
