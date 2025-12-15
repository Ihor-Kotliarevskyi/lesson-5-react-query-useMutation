import ArticleList from "../ArticlesList/ArticlesList";
import OrderForm from "../OrderForm/OrderForm";
import "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import { fetchArticles, fetchPerson } from "../../services/Service";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

function App() {
  const [id, setId] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("");

  const {
    data: person,
    error: personError,
    isLoading: personIsLoading,
    isError: personIsError,
  } = useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPerson(id),
    enabled: Number(id) > 0,
  });

  const {
    data: articles,
    error: articlesError,
    isLoading: articlesIsLoading,
    isError: articlesIsError,
  } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = articles?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  return (
    <>
      <OrderForm />
      <button
        onClick={() => {
          setId(String(Number(id) - 1));
        }}
      >
        Previews
      </button>
      <button
        onClick={() => {
          setId(String(Number(id) + 1));
        }}
      >
        Next
      </button>
      {personIsLoading && <p>Loading person ...</p>}
      {personIsError && <p>An error occurred: {personError.message}</p>}
      {person && <pre>{JSON.stringify(person, null, 2)}</pre>}
      <br></br>
      <SearchForm onSubmit={handleSearch} />
      {totalPages > 0 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {articlesIsLoading && <p>Loading articles ...</p>}
      {articlesIsError && (
        <p>
          Whoops, something went wrong! Please try again!:
          {articlesError.message}
        </p>
      )}
      {articles && articles.hits.length > 0 && (
        <ArticleList items={articles.hits} />
      )}
    </>
  );
}

export default App;
