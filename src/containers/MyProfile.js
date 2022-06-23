import React from "react";
import "./MyProfile.css";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";
import MyProfileForm from "../components/MyProfileForm";

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, user } = useAuth0();

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       setIsLoading(true);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });

  return isLoading ? (
    <ContainerLoading />
  ) : !isAuthenticated ? (
    <NotLogged />
  ) : !user.email_verified ? (
    <NotVerified />
  ) : (
    <div className="myProfile">
      <div className="my-md-5 my-sm-2 py-5 d-flex justify-content-center">
        <MyProfileForm />
      </div>
    </div>
  );
};

export default MyProfile;
