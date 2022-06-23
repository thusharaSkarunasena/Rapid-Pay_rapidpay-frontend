import React from "react";
import "./Bill.css";
import { useAuth0 } from "@auth0/auth0-react";
import AuthFailed from "./AuthFailed";
import { useHistory, useLocation } from "react-router";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";
import BillForm from "../components/BillForm";

const Bill = () => {
  const { isLoading, error, isAuthenticated, user } = useAuth0();

  return (
    <div className="bill">
      {error ? (
        <AuthFailed />
      ) : isLoading ? (
        <ContainerLoading />
      ) : !isAuthenticated ? (
        <NotLogged />
      ) : !user.email_verified ? (
        <NotVerified />
      ) : (
        <div className="bill">
          <div className="my-md-5 my-sm-2 py-5 d-flex justify-content-center">
            <BillForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill;
