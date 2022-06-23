import React from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Row, Col, Table } from "react-bootstrap";
import AuthFailed from "./AuthFailed";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";

const Dashboard = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const history = useHistory();

  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();

  const [userId, setUserId] = useState(null);

  const [paymentData, setPaymentData] = useState([]);

  const [wasUseEffectRan, setWasUseEffectRan] = useState(false);

  useEffect(async () => {
    if (isAuthenticated) {
      if (!wasUseEffectRan) {
        setWasUseEffectRan(true);
        setIsLoadingData(true);

        const accessToken = await getAccessTokenSilently();
        await axios
          .request({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/rapidpay_user/checkRapidpayUser/${user.email}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setIsLoadingData(false);

            if (!res.data) {
              history.replace("/userRegistration", {
                email: user.email,
              });
            } else {
              setUserId(res.data.id);
              setIsLoadingData(true);

              axios
                .request({
                  method: "GET",
                  url: `${process.env.REACT_APP_SERVER_URL}/rapidpay_payment/getAllRapidpayPaymentsByUserId/${res.data.id}`,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((res) => {
                  setIsLoadingData(false);
                  setPaymentData(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });

  function PaymentTableRow(payment) {
    return (
      <tr>
        <td>{payment.data.id}</td>
        <td>{payment.data.date_and_time}</td>
        <td>{payment.data.category}</td>
        <td>{payment.data.type}</td>
        <td>{payment.data.account_number}</td>
        <td>{payment.data.payment}</td>
        <td>{payment.data.charge}</td>
        <td>{payment.data.total_payment}</td>
      </tr>
    );
  }

  function DashboardBody() {
    return (
      <div>
        <div className="px-5">
          <Row className="my-5 justify-content-center">
            <Col
              lg={3}
              md={6}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Card className="DashCard m-5 shadow">
                <Card.Img
                  className="container w-50 mt-4 my-3 shine"
                  variant="top"
                  src="https://i.ibb.co/zFLWmP8/dashboard-bill-electricity.png"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
                <Card.Body className="bg-custom">
                  <Card.Title className="text-center text-light">
                    Electricity Bill
                  </Card.Title>
                  <Card.Text className="text-center text-light fst-italic mt-3">
                    Pay your CEB or LECO electricity bills.
                  </Card.Text>
                </Card.Body>
                <Link
                  to={{
                    pathname: "/bill",
                    state: [userId, "electricity"],
                  }}
                >
                  <a href="#" className="stretched-link" />
                </Link>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Card className="DashCard m-5 shadow">
                <Card.Img
                  className="container w-50 mt-4 my-3 mt-3"
                  variant="top"
                  src="https://i.ibb.co/mz1P1B2/dashboard-water-bill.png"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
                <Card.Body className="bg-custom">
                  <Card.Title className="text-center text-light">
                    Water Bill
                  </Card.Title>
                  <Card.Text className="text-center text-light fst-italic mt-3">
                    Pay your NWSDB water bills.
                  </Card.Text>
                </Card.Body>
                <Link
                  to={{
                    pathname: "/bill",
                    state: [userId, "water"],
                  }}
                >
                  <a href="#" className="stretched-link" />
                </Link>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Card className="DashCard m-5 shadow">
                <Card.Img
                  className="container w-50 mt-4 my-3 mt-3"
                  variant="top"
                  src="https://i.ibb.co/Rgg8C8L/dashboard-mobile-bill.png"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
                <Card.Body className="bg-custom">
                  <Card.Title className="text-center text-light">
                    Prepaid Reload / Postpaid Bill
                  </Card.Title>
                  <Card.Text className="text-center text-light fst-italic mt-3">
                    Pay postpaid bills or reload to any prepaid mobile number.
                  </Card.Text>
                </Card.Body>
                <Link
                  to={{
                    pathname: "/bill",
                    state: [userId, "mobile"],
                  }}
                >
                  <a href="#" className="stretched-link" />
                </Link>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Card className="DashCard m-5 shadow">
                <Card.Img
                  className="container w-50 mt-4 my-3 mt-3"
                  variant="top"
                  src="https://i.ibb.co/d73Mpwm/dashboard-insurance-bill.png"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
                <Card.Body className="bg-custom">
                  <Card.Title className="text-center text-light">
                    Insurance Installment
                  </Card.Title>
                  <Card.Text className="text-center text-light fst-italic mt-3">
                    Pay your monthly installments easily without wasting time.
                  </Card.Text>
                </Card.Body>
                <Link
                  to={{
                    pathname: "/bill",
                    state: [userId, "insurance"],
                  }}
                >
                  <a href="#" className="stretched-link" />
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
        <hr />
        <div className="p-5">
          <h3>Billing History</h3>
          <div className="m-3 p-3">
            <Table
              striped={true}
              bordered={true}
              responsive="lg"
              className="shadow"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date & Time</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Account Number</th>
                  <th>Payment</th>
                  <th>Charges</th>
                  <th>Total Payment</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment) => {
                  return <PaymentTableRow data={payment} />;
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {error ? (
        <AuthFailed />
      ) : isLoading ? (
        <ContainerLoading />
      ) : isLoadingData ? (
        <ContainerLoading />
      ) : !isAuthenticated ? (
        <NotLogged />
      ) : !user.email_verified ? (
        <NotVerified />
      ) : (
        <DashboardBody />
      )}
    </div>
  );
};

export default Dashboard;
