import React from "react";
import axios from "axios";
import SubjectContent from "./SubjectContent";
import { Pagination } from "antd";

import { useState, useEffect } from "react";
const SubjectSearch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const subjects = ["javascript", "c++", "economics", "history", "law"];

  const renderList = async (title) => {
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/subjects/${title}.json`
    );

    console.log(response.data.works);
    // paginate(data);
    setData(response.data.works);
    setTotal(response.data.works.length);
    setLoading(false);

    filterData();
  };
  const fetchApi = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/subjects/${query}.json`
    );

    console.log(response.data.works);
    // paginate(data);
    setData(response.data.works);
    setTotal(response.data.works.length);
    setLoading(false);
  };

  const filterData = () => {
    if (query.length > 0) {
      const searchData = data.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
      setData(searchData);
    }
  };

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = data.slice(indexOfFirstPage, indexOfLastPage);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value.length !== 0) {
      setQuery(e.target.value);

      fetchApi();
      // console.log(getSearch);
      console.log(data);
      filterData();
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
    return <h2 className="subjectloading">Loading...</h2>;
  }
  return (
    <>
      <div className="sidebar">
        <h3>Trending subject</h3>
        <form onSubmit={handleSearch}>
          <input
            className="sidebarinput"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
        </form>
        <ul className="list">
          {subjects.map((item) => {
            return (
              <li>
                <a onClick={() => renderList(item)}>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <SubjectContent data={currentPage} />
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
    </>
  );
};

export default SubjectSearch;
