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
          {pageCount.map((el) => {
            return <button onClick={() => paginate(el)}>{el + 1}</button>;
          })}
        </ul>
      </div>
      <div className="nextArrow"></div>
    </div>
  );
};

export default Paginate;
