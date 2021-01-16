import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">Sorry, this page isn't available.</h2>
      <p className="not-found__text">
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link className="not-found__link" to="/">
          Go back to Instagram
        </Link>
      </p>
    </div>
  );
};
export default PageNotFound;
