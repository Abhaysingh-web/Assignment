import axios from "axios";
import React, { useEffect, useState } from "react";
import Data from "./SearchContent";
import { Pagination } from "antd";
const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${query}`
    );

    console.log(response.data.docs);
    // paginate(data);
    setData(response.data.docs);
    setTotal(response.data.docs.length);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (query !== null) {
  //     axios.get(`https://openlibrary.org/search.json?q=${query}`).then((e) => {
  //       console.log(e.data.docs);
  //       // paginate(data);
  //       setData(e.data.docs);
  //       setTotal(e.data.docs.length);
  //       setLoading(false);
  //     });
  //   }
  // }, [query]);

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = data.slice(indexOfFirstPage, indexOfLastPage);

  const handleSearch = (e) => {
    e.preventDefault();
    const getSearch = e.target.value;
    setQuery(getSearch);
    // console.log(getSearch);
    fetchApi();
    if (getSearch.length > 0) {
      const getSearch = e.target.value;
      const searchData = data.filter((item) =>
        item.title.toLowerCase().includes(getSearch)
      );
      setData(searchData);
    }
  };
  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize);
  };
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  if (loading) {
    return <h2 className="loading">Loading....</h2>;
  }
  return (
    <div>
      <div className="navbar">
        <form onSubmit={handleSearch}>
          <input
            className="navbarinput"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search book by Titles or By Author"
          />
        </form>
      </div>
      <Data data={currentPage} />
      <div className="page">
        {data.length > 0 && (
          <Pagination
            onChange={(value) => setPage(value)}
            pageSize={postPerPage}
            total={total}
            current={page}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            itemRender={itemRender}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
