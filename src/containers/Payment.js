import React from "react";
import "./Payment.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import AuthFailed from "./AuthFailed";
import ContainerLoading from "../components/ContainerLoading";
import NotLogged from "./NotLogged";
import NotVerified from "./NotVerified";

const Payment = () => {
  const history = useHistory();
  const location = useLocation();

  const { isLoading, error, isAuthenticated, user } = useAuth0();

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

  const [wasUseEffectRan, setWasUseEffectRan] = useState(false);

  useEffect(() => {
    if (
      !userId ||
      !billCategory ||
      !billType ||
      !accountNumber ||
      !payment ||
      !totalPayment
    ) {
      history.replace("/billSummary");
    }

    // history.replace("/paymentDetails", {
    //   status1: 1,
    //   billCategory: billCategory,
    //   billType: billType,
    //   accountNumber: accountNumber,
    //   payment: payment,
    //   charge: charge,
    //   totalPayment: totalPayment,
    // });

    if (!isLoading && !wasUseEffectRan) {
      setWasUseEffectRan(false);
      pay();
    }
  });

  async function pay() {
    // Visa : 4916217501611292
    // MasterCard : 5307732125531191
    // AMEX : 346781005510225

    var payment = {
      sandbox: true,
      merchant_id: 1219088,
      return_url: `${process.env.REACT_APP_HOST_URL}/paymentDetails`,
      cancel_url: `${process.env.REACT_APP_HOST_URL}/paymentDetails`,
      notify_url: `${process.env.REACT_APP_HOST_URL}/paymentDetails`,
      order_id: "",
      items: `${billCategory} - ${billType}`,
      amount: totalPayment,
      currency: "LKR",
      first_name: user.nickname,
      last_name: user.nickname,
      email: user.email,
      phone: "",
      address: "",
      city: "",
      country: "",
    };

    window.payhere.startPayment(payment);
  }

  window.payhere.onCompleted = function onCompleted(orderId) {
    history.replace("/paymentDetails", {
      status1: 1,
      userId: userId,
      billCategory: billCategory,
      billType: billType,
      accountNumber: accountNumber,
      payment: payment,
      charge: charge,
      totalPayment: totalPayment,
    });
  };

  window.payhere.onDismissed = function onDismissed() {
    history.replace("/paymentDetails", {
      status1: 0,
    });
  };

  window.payhere.onError = function onError(error) {
    history.replace("/paymentDetails", {
      status1: -1,
    });
  };

  function PaymentBody() {
    return <ContainerLoading />;
  }

  return (
    <div className="payment">
      {error ? (
        <AuthFailed />
      ) : isLoading ? (
        <ContainerLoading />
      ) : !isAuthenticated ? (
        <NotLogged />
      ) : !user.email_verified ? (
        <NotVerified />
      ) : (
        <PaymentBody />
      )}
    </div>
  );
};

export default Payment;
