import React from "react";
import "./UserRegistration.css";
import { useAuth0 } from "@auth0/auth0-react";
import AuthFailed from "./AuthFailed";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";
import UserRegistrationForm from "../components/UserRegistrationForm";

const UserRegistration = () => {
  const { isLoading, error, isAuthenticated, user } = useAuth0();

  return (
    <div className="billSummary">
      {error ? (
        <AuthFailed />
      ) : isLoading ? (
        <ContainerLoading />
      ) : !isAuthenticated ? (
        <NotLogged />
      ) : !user.email_verified ? (
        <NotVerified />
      ) : (
        <div>
          <div className="my-md-5 my-sm-2 py-5 d-flex justify-content-center">
            <UserRegistrationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
