import React from "react";
import "./BillSummaryForm.css";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Form, Button } from "react-bootstrap";

const BillSummaryForm = () => {
  const history = useHistory();
  const location = useLocation();

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

  const [charge, setCharge] = useState(0.0);
  const [totalPayment, setTotalPayment] = useState(0.0);

  useEffect(async () => {
    if (!userId || !billCategory || !billType || !accountNumber || !payment) {
      history.replace("/bill");
    }

    {
      if (billCategory === "electricity") {
        setCharge(Math.round((payment * 0.05 + Number.EPSILON) * 100) / 100);
        setTotalPayment(parseFloat(payment) + parseFloat(charge));
      } else if (billCategory === "water") {
        setCharge(Math.round((payment * 0.05 + Number.EPSILON) * 100) / 100);
        setTotalPayment(parseFloat(payment) + parseFloat(charge));
      } else if (billCategory === "mobile" && billType === "prepaid") {
        setCharge(Math.round((payment * 0.0 + Number.EPSILON) * 100) / 100);
        setTotalPayment(parseFloat(payment) + parseFloat(charge));
      } else if (billCategory === "mobile" && billType === "postpaid") {
        setCharge(Math.round((payment * 0.05 + Number.EPSILON) * 100) / 100);
        setTotalPayment(parseFloat(payment) + parseFloat(charge));
      } else if (billCategory === "insurance") {
        setCharge(Math.round((payment * 0.05 + Number.EPSILON) * 100) / 100);
        setTotalPayment(parseFloat(payment) + parseFloat(charge));
      }
    }
  });

  async function payButtonOnClickHandler() {
    history.replace("/payment", {
      userId: userId,
      billCategory: billCategory,
      billType: billType,
      accountNumber: accountNumber,
      payment: payment,
      charge: charge,
      totalPayment: totalPayment,
    });
  }

  return (
    <div className="bill_summary_form">
      <div className="container px-5 py-2 shadow">
        <div className="mx-lg-5 mx-md-3 mx-sm-1">
          <div className="d-flex flex-column mt-5">
            <div className="d-flex mb-3 justify-content-center">
              <p className="fs-4 fw-bold">Bill Summary</p>
            </div>
            <div>
              <Form>
                <Form.Group className="my-3" controlId="formBillCategory">
                  <Form.Label>Bill Category : {billCategory}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBillType">
                  <Form.Label>Bill Type : {billType}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAccountNumber">
                  <Form.Label>Account Number : {accountNumber}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPayment">
                  <Form.Label>Payment : Rs.{payment}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCharge">
                  <Form.Label>Charge : Rs.{charge}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTotalPayment">
                  <Form.Label>Total Payment : Rs.{totalPayment}</Form.Label>
                </Form.Group>
                <Form.Group
                  className="d-flex justify-content-center mb-5"
                  controlId="formButton"
                >
                  <Button
                    className="btn-custom px-5"
                    type="submit"
                    onClick={() => {
                      payButtonOnClickHandler();
                    }}
                  >
                    Pay
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSummaryForm;
