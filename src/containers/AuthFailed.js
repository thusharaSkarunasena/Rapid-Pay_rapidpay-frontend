import React from "react";
import "./AuthFailed.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

const AuthFailed = () => {
  const history = useHistory();

  const [countDown, setCountDown] = useState(20);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countDown > 1) {
        var tempCount = countDown - 1;
        setCountDown(tempCount);
      } else {
        history.replace("/");
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  function comeHomeButtonClicked() {
    history.replace("/");
  }

  return (
    <div className="authFailed">
      <div className="container-fluid mt-5">
        <Row>
          <Col lg={7} md={6} sm={12}>
            <div className="container w-100 d-flex justify-content-center">
              <Image
                src="https://i.ibb.co/MnRc0WS/auth-failed-error.png"
                fluid={true}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </Col>
          <Col lg={5} md={6} sm={12}>
            <div className="container w-100 align-self-center">
              <p className="mt-5 fs-1 fw-bold">Auth Failed!</p>
              <p className="fs-5 fw-normal">
                Something went wrong with authentication.
                <br />
                Please sign in again or try again later.
              </p>
              <p>
                (You will be Redirect to Home Page Within {countDown} Seconds.)
              </p>
              <div class="my-5 me-5 d-flex justify-content-center justify-content-md-start">
                <Button
                  className="btn-custom"
                  onClick={() => {
                    comeHomeButtonClicked();
                  }}
                >
                  Come Home
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthFailed;
