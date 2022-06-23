import React from "react";
import "./ContainerLoading.css";
import ReactLoading from "react-loading";

const ContainerLoading = () => {
  return (
    <div className="containerLoading">
      <div className="position-fixed d-flex align-items-center justify-content-center h-75 w-100 overflow-hidden">
        <ReactLoading
          type={"spin"}
          color={"black"}
          height={"5%"}
          width={"5%"}
        />
      </div>
    </div>
  );
};

export default ContainerLoading;
