import { useState, useEffect } from "react";
import "./Paginate.css";

const Paginate = ({ arr, paginate, itemsPerPage }) => {
  const pageCount = [];

  for (let i = 0; i < Math.ceil(arr.length / itemsPerPage); i++) {
    pageCount.push(i);
  }

  return (
    <div className="paginateContainer">
      <div className="pageSelector">
        <ul>
          <button onClick={() => paginate("previous")}>←</button>
          {pageCount.map((el) => {
            return <button onClick={() => paginate(el)}>{el + 1}</button>;
          })}
          <button onClick={() => paginate("next")}>→</button>
        </ul>
      </div>
      <div className="nextArrow"></div>
    </div>
  );
};

export default Paginate;
