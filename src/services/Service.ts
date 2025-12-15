import axios from "axios";
import type { Article } from "../types/types";

interface ArticlesHttpResponse {
  hits: Article[];
  nbPages: number;
}

export const fetchPerson = async (id: string) => {
  const response = await axios.get(`https://swapi.info/api/planets/${id}`);

  return response.data;
};

export const fetchArticles = async (
  topic: string,
  page: number
): Promise<ArticlesHttpResponse> => {
  const response = await axios.get("https://hn.algolia.com/api/v1/search", {
    params: {
      query: topic,
      page,
    },
  });

  return response.data;
};
