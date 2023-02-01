import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemMovie from "../ItemMovie";
import { getListMovie } from "../../../reducers/listMovie";
import { RowMovie, NextList, NextListMovie } from "./ListMovieElement";
const ListMovie = ({ theme }) => {
  const { listMovie, totalPages } = useSelector((state) => state.movie);
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();
  const NextPage = (page) => {
    dispatch(getListMovie(page));
    setNumber(page);
  };
  const hanldePrevious = () => {
    if (number === 1) return;
    setNumber((pre) => pre - 1);
    dispatch(getListMovie(number - 1));
  };
  const hanldeNext = () => {
    if (number === totalPages.length) return;
    setNumber((pre) => pre + 1);
    dispatch(getListMovie(number + 1));
  };
  return (
    <>
      <RowMovie id="community">
        {listMovie.map((movie, index) => {
          return <ItemMovie key={index} movie={movie} />;
        })}
      </RowMovie>

      <NextListMovie>
        <ul className="pagination">
          <li
            role={number == 1 ? "" : "button"}
            className={`page-item ${number == 1 ? "disabled " : ""}`}
            onClick={hanldePrevious}
          >
            <span className="page-link">Previous</span>
          </li>
          {totalPages.map((item, index) => {
            return (
              <li
                role="button"
                className={`page-item ms-2 me-2 ${
                  number == item ? "active" : ""
                }`}
                key={index}
                onClick={() => NextPage(item)}
              >
                <span className="page-link">{item}</span>
              </li>
            );
          })}
          <li
            role={number == totalPages.length ? "" : "button"}
            className={`page-item ${
              number == totalPages.length ? "disabled" : ""
            }`}
            onClick={hanldeNext}
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </NextListMovie>
    </>
  );
};

export default ListMovie;
