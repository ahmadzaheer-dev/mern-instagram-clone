import { Fragment } from "react";
import LoadingSVG from "./Loading.svg";

const Loading = () => {
  return (
    <Fragment>
      <img
        src={LoadingSVG}
        style={{ width: "30px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Loading;
