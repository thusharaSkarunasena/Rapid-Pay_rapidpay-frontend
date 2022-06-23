import React from "react";
import "./NotFound.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

const NotFound = () => {
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
    <div className="notfound">
      <div className="container-fluid mt-5">
        <Row>
          <Col lg={7} md={6} sm={12}>
            <div className="container w-100 d-flex justify-content-center">
              <Image
                src="https://i.ibb.co/pJwrkG9/not-found-error404.png"
                fluid={true}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </Col>
          <Col lg={5} md={6} sm={12}>
            <div className="container w-100 align-self-center">
              <p className="mt-5 fs-1 fw-bold">I have bad news for you.</p>
              <p className="fs-5 fw-normal">
                The page you are looking for might be remove or temporary
                unavailable.
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

export default NotFound;
