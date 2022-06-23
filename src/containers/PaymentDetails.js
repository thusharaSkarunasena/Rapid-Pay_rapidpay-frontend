import React from "react";
import "./PaymentDetails.css";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Lottie from "react-lottie";
import CompletedLottieAnimation from "../assets/lottie/completed.json";
import DismissedLottieAnimation from "../assets/lottie/dismissed.json";
import ErrorLottieAnimation from "../assets/lottie/error.json";
import AuthFailed from "./AuthFailed";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";

const PaymentDetails = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();

  const [status1, setStatus1] = useState(
    location.state
      ? location.state.status1
        ? location.state.status1
        : null
      : null
  );
  const [userId, setUserId] = useState(
    location.state
      ? location.state.userId
        ? location.state.userId
        : null
      : null
  );
  const [billCategory, setBillCategory] = useState(
    location.state
      ? location.state.billCategory
        ? location.state.billCategory
        : null
      : null
  );
  const [billType, setBillType] = useState(
    location.state
      ? location.state.billType
        ? location.state.billType
        : null
      : null
  );
  const [accountNumber, setAccountNumber] = useState(
    location.state
      ? location.state.accountNumber
        ? location.state.accountNumber
        : null
      : null
  );
  const [payment, setPayment] = useState(
    location.state
      ? location.state.payment
        ? location.state.payment
        : null
      : null
  );
  const [charge, setCharge] = useState(
    location.state
      ? location.state.charge
        ? location.state.charge
        : null
      : null
  );
  const [totalPayment, setTotalPayment] = useState(
    location.state
      ? location.state.totalPayment
        ? location.state.totalPayment
        : null
      : null
  );

  const [status2, setStatus2] = useState(0);

  const [wasUseEffectRan, setWasUseEffectRan] = useState(false);

  useEffect(async () => {
    if (
      !status1 ||
      !userId ||
      !billCategory ||
      !billType ||
      !accountNumber ||
      !payment ||
      !totalPayment
    ) {
      history.replace("/payment");
    }

    if (status1 === 1) {
      if (isAuthenticated) {
        if (!wasUseEffectRan) {
          setWasUseEffectRan(true);
          setIsLoadingData(true);

          const formData = new FormData();
          formData.append("user_id", userId);
          formData.append("category", billCategory);
          formData.append("type", billType);
          formData.append("account_number", accountNumber);
          formData.append("payment", payment);
          formData.append("charge", charge);
          formData.append("total_payment", totalPayment);
          formData.append(
            "date_and_time",
            new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
          );

          const accessToken = await getAccessTokenSilently();
          await axios
            .request({
              method: "POST",
              url: `${process.env.REACT_APP_SERVER_URL}/rapidpay_payment/saveRapidpayPayment`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              data: formData,
            })
            .then((res) => {
              setIsLoadingData(false);

              console.log(res.data);

              if (res.data.id) {
                setStatus2(1);
              } else {
                setStatus2(-1);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  });

  function finishButtonOnClickHandler() {
    history.replace("/dashboard");
  }

  function PaymentDetailsBody() {
    return (
      <div>
        <div className="mt-5 d-flex justify-content-center">
          {status1 === 1 && (
            <div>
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: CompletedLottieAnimation,
                }}
                height={300}
                width={300}
              />
              <h1 className="text-success text-center">Payment Successful!</h1>
              <p className="text-secondary text-center my-3">
                (You can see all the billing history in the dashboard.)
              </p>
            </div>
          )}
          {status1 === 0 && (
            <div>
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: DismissedLottieAnimation,
                }}
                height={300}
                width={300}
              />
              <h1 className="text-warning text-center">Payment Dismissed!</h1>
              <p className="text-secondary text-center my-3">
                (Something went wrong, payment dismissed by you. Please Try
                again later.)
              </p>
            </div>
          )}
          {status1 === -1 && (
            <div>
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: ErrorLottieAnimation,
                }}
                height={300}
                width={300}
              />
              <h1 className="text-danger text-center">Payment Canceled!</h1>
              <p className="text-secondary text-center my-3">
                (Something went wrong, payment cancelled by the payment gate.
                Please try again later.)
              </p>
            </div>
          )}
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <Button
            className="btn-custom px-3"
            onClick={() => {
              finishButtonOnClickHandler();
            }}
          >
            Finish Payment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="paymentDetails">
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
        <PaymentDetailsBody />
      )}
    </div>
  );
};

export default PaymentDetails;
