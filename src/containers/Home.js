import React from "react";
import "./Home.css";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col, Button, Image } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";

const Home = () => {
  const history = useHistory();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function signInButtonOnClickedHandler() {
    loginWithRedirect();
  }

  function signUpButtonOnClickedHandler() {
    loginWithRedirect();
  }

  function dashboardButtonOnClickedHandler() {
    history.push("/dashboard");
  }

  return (
    <div id="home" className="home">
      <div className="container-fluid p-5">
        <Row className="gy-5 d-flex flex-md-row-reverse flex-sm-column-reverse">
          <Col lg={6} md={6} sm={12} className="">
            <div className="d-flex justify-content-center mt-md-5 align-content-center">
              <div className="d-block pt-md-5 pt-sm-3 px-md-2 px-sm-1">
                <h1 className="text-center mt-md-5 mt-sm-1">
                  Utility Bill Payment & Mobile Reload
                </h1>
                <p className="text-center fs-6 mt-md-3 mt-sm-1 mb-md-5 mb-sm-3 text-black">
                  Learn to pay your bills with Rapid Pay. It’s engaging, fun and
                  free!
                </p>
                {!isAuthenticated && (
                  <div className="my-md-5 my-sm-3 d-flex flex-row justify-content-center d-md-flex d-sm-none">
                    <div className="mx-4">
                      <Button
                        className="btn-outline-custom px-3"
                        onClick={() => {
                          signInButtonOnClickedHandler();
                        }}
                      >
                        Account
                      </Button>
                    </div>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="my-md-5 my-sm-3 d-flex flex-row justify-content-center d-md-flex d-sm-none">
                    <div className="mx-4">
                      <Button
                        className="btn-outline-custom px-3"
                        onClick={() => {
                          dashboardButtonOnClickedHandler();
                        }}
                      >
                        Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="">
            <div className="d-flex justify-content-center align-content-center">
              <ImageCarousel />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
