import React from "react";
import "./NotVerified.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col, Image, Button } from "react-bootstrap";

const NotVerified = () => {
  const history = useHistory();

  const { user, logout } = useAuth0();

  const [countDown, setCountDown] = useState(20);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countDown > 1) {
        var tempCount = countDown - 1;
        setCountDown(tempCount);
      } else {
        logout();
        history.replace("/");
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  function comeHomeButtonClicked() {
    logout();
    history.replace("/");
  }

  return (
    <div className="notVerified">
      <div className="container-fluid mt-5">
        <Row>
          <Col lg={7} md={6} sm={12}>
            <div className="container w-100 d-flex justify-content-center">
              <Image
                src="https://i.ibb.co/yBfdRRd/email-not-verified-error.png"
                fluid={true}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </Col>
          <Col lg={5} md={6} sm={12}>
            <div className="container w-100 align-self-center">
              <p className="mt-5 fs-1 fw-bold">Email Not Verified!</p>
              <p className="fs-5 fw-normal">
                Email Verification is Necessary.
                <br />
                Please check '
                {user.email.substring(0, 4) +
                  "****" +
                  "@" +
                  user.email.split("@").pop()}
                ' to Verify Your Email.
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

export default NotVerified;
