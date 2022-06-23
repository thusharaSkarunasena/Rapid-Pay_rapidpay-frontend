import React from "react";
import "./BillForm.css";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button } from "react-bootstrap";

const BillForm = () => {
  const history = useHistory();
  const location = useLocation();

  const { getAccessTokenSilently } = useAuth0();

  const [userId, setUserId] = useState(
    location.state ? (location.state[0] ? location.state[0] : null) : null
  );
  const [billCategory, setBillCategory] = useState(
    location.state ? (location.state[1] ? location.state[1] : null) : null
  );

  const [billType, setBillType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [payment, setPayment] = useState("");

  const [billTypeErrorMsg, setBillTypeErrorMsg] = useState("");
  const [accountNumberErrorMsg, setAccountNumberErrorMsg] = useState("");
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");

  const [accountNumberLabel, setAccountNumberLabel] = useState("");

  useEffect(() => {
    if (!userId || !billCategory) {
      history.replace("/dashboard");
    }

    location.state.isLoadingData = false;

    if (billCategory === "electricity") {
      setAccountNumberLabel("Electricity Account Number");
    } else if (billCategory === "water") {
      setAccountNumberLabel("Water Account Number");
    } else if (billCategory === "mobile") {
      setAccountNumberLabel("Mobile Number");
    } else if (billCategory === "insurance") {
      setAccountNumberLabel("Insurance Account Number");
    }
  }, []);

  const billTypeOnClickHandler = (billType) => {
    if (billType === "CEB") {
      setBillType(billType);
      setAccountNumberLabel("CEB Account Number");
    } else if (billType === "LECO") {
      setBillType(billType);
      setAccountNumberLabel("LECO Account Number");
    } else if (billType === "NWSDB") {
      setBillType(billType);
      setAccountNumberLabel("NWSDB Account Number");
    } else if (billType === "prepaid") {
      setBillType(billType);
      setAccountNumberLabel("Prepaid Mobile Number");
    } else if (billType === "postpaid") {
      setBillType(billType);
      setAccountNumberLabel("Postpaid Mobile Number");
    } else if (billType === "option0") {
      setBillType(billType);
      setAccountNumberLabel("Account Number");
    } else if (billType === "option1") {
      setBillType(billType);
      setAccountNumberLabel("AIA Account Number");
    } else if (billType === "option2") {
      setBillType(billType);
      setAccountNumberLabel("Allianz Account Number");
    } else if (billType === "option3") {
      setBillType(billType);
      setAccountNumberLabel("Arpico Account Number");
    } else if (billType === "option4") {
      setBillType(billType);
      setAccountNumberLabel("Softlogic Account Number");
    } else if (billType === "option5") {
      setBillType(billType);
      setAccountNumberLabel("Fairfirst Account Number");
    } else if (billType === "option6") {
      setBillType(billType);
      setAccountNumberLabel("Ceylinco Account Number");
    } else if (billType === "option7") {
      setBillType(billType);
      setAccountNumberLabel("Continental Account Number");
    } else if (billType === "option8") {
      setBillType(billType);
      setAccountNumberLabel("Cooperative Account Number");
    } else if (billType === "option9") {
      setBillType(billType);
      setAccountNumberLabel("HNB Assurance Account Number");
    } else if (billType === "option10") {
      setBillType(billType);
      setAccountNumberLabel("Janashakthi Account Number");
    }
  };

  async function inputFieldValidationHandler() {
    var inputFieldValidationPoints = 0;

    setAccountNumber(accountNumber.trim());
    setPayment(payment.trim());

    if (billCategory === "electricity") {
      if (billType !== "") {
        setBillTypeErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setBillTypeErrorMsg("Bill Type is required.");
      }

      if (accountNumber !== "") {
        setAccountNumberErrorMsg("");
        if (/^[0-9]{4,20}/.test(accountNumber.trim())) {
          if (billType === "CEB") {
            setAccountNumberErrorMsg("Checking CEB Account Number...");
            const accessToken = await getAccessTokenSilently();
            await axios
              .request({
                method: "GET",
                url: `${process.env.REACT_APP_CEB_SERVER_URL}/ceb_user/checkCebUser/${accountNumber}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((res) => {
                setAccountNumberErrorMsg("");
                if (res.data) {
                  setAccountNumberErrorMsg("");
                  inputFieldValidationPoints++;
                } else {
                  setAccountNumberErrorMsg("CEB Account number doesn't exist.");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (billType === "LECO") {
            setAccountNumberErrorMsg("Checking LECO Account Number...");
            const accessToken = await getAccessTokenSilently();
            await axios
              .request({
                method: "GET",
                url: `${process.env.REACT_APP_LECO_SERVER_URL}/leco_user/checkLecoUser/${accountNumber}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((res) => {
                setAccountNumberErrorMsg("");
                if (res.data) {
                  setAccountNumberErrorMsg("");
                  inputFieldValidationPoints++;
                } else {
                  setAccountNumberErrorMsg(
                    "LECO Account number doesn't exist."
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setAccountNumberErrorMsg(
              "Select bill type to validate account number."
            );
          }
        } else {
          setAccountNumberErrorMsg("Invalid Account Number.");
        }
      } else {
        setAccountNumberErrorMsg("Account Number is required.");
      }

      if (payment !== "") {
        setPaymentErrorMsg("");
        if (/^[0-9]+(([. ][0-9])?[0-9]*)*$/.test(payment.trim())) {
          if (parseInt(payment.trim()) >= 200) {
            setPaymentErrorMsg("");
            inputFieldValidationPoints++;
          } else {
            setPaymentErrorMsg("Payment should more than LKR.200");
          }
        } else {
          setPaymentErrorMsg("Invalid Payment.");
        }
      } else {
        setPaymentErrorMsg("Payment is required.");
      }
    } else if (billCategory === "water") {
      if (billType !== "") {
        setBillTypeErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setBillTypeErrorMsg("Bill Type is required.");
      }

      if (accountNumber !== "") {
        setAccountNumberErrorMsg("");
        if (/^[0-9]{4,20}/.test(accountNumber.trim())) {
          if (billType === "NWSDB") {
            setAccountNumberErrorMsg("Checking NWSDB Account Number...");
            const accessToken = await getAccessTokenSilently();
            await axios
              .request({
                method: "GET",
                url: `${process.env.REACT_APP_NWSDB_SERVER_URL}/nwsdb_user/checkNwsdbUser/${accountNumber}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((res) => {
                setAccountNumberErrorMsg("");
                if (res.data) {
                  setAccountNumberErrorMsg("");
                  inputFieldValidationPoints++;
                } else {
                  setAccountNumberErrorMsg(
                    "NWSDB Account number doesn't exist."
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          setAccountNumberErrorMsg("Invalid Account Number.");
        }
      } else {
        setAccountNumberErrorMsg("Account Number is required.");
      }

      if (payment !== "") {
        setPaymentErrorMsg("");
        if (/^[0-9]+(([. ][0-9])?[0-9]*)*$/.test(payment.trim())) {
          if (parseInt(payment.trim()) >= 200) {
            setPaymentErrorMsg("");
            inputFieldValidationPoints++;
          } else {
            setPaymentErrorMsg("Payment should more than LKR.200");
          }
        } else {
          setPaymentErrorMsg("Invalid Payment.");
        }
      } else {
        setPaymentErrorMsg("Payment is required.");
      }
    } else if (billCategory === "mobile") {
      if (billType !== "") {
        setBillTypeErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setBillTypeErrorMsg("Connection Type is required.");
      }

      if (accountNumber !== "") {
        setAccountNumberErrorMsg("");
        if (
          /^(\+94)[0-9+]{9}$|^(0)[0-9+]{9}$|^[0-9+]{9}$/.test(
            accountNumber.trim()
          )
        ) {
          setAccountNumberErrorMsg("");
          inputFieldValidationPoints++;
        } else {
          setAccountNumberErrorMsg("Invalid Mobile Number.");
        }
      } else {
        setAccountNumberErrorMsg("Mobile Number is required.");
      }

      if (payment !== "") {
        setPaymentErrorMsg("");
        if (/^[0-9]+(([. ][0-9])?[0-9]*)*$/.test(payment.trim())) {
          if (parseInt(payment.trim()) >= 50) {
            setPaymentErrorMsg("");
            inputFieldValidationPoints++;
          } else {
            setPaymentErrorMsg("Payment should more than LKR.50");
          }
        } else {
          setPaymentErrorMsg("Invalid Payment.");
        }
      } else {
        setPaymentErrorMsg("Payment is required.");
      }
    } else if (billCategory === "insurance") {
      if (billType !== "" && billType !== "option0") {
        setBillTypeErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setBillTypeErrorMsg("Company Name is required.");
      }

      if (accountNumber !== "") {
        setAccountNumberErrorMsg("");
        if (/^[0-9]{4,20}/.test(accountNumber.trim())) {
          setAccountNumberErrorMsg("");
          inputFieldValidationPoints++;
        } else {
          setAccountNumberErrorMsg("Invalid Account Number.");
        }
      } else {
        setAccountNumberErrorMsg("Account Number is required.");
      }

      if (payment !== "") {
        setPaymentErrorMsg("");
        if (/^[0-9]+(([. ][0-9])?[0-9]*)*$/.test(payment.trim())) {
          if (parseInt(payment.trim()) >= 200) {
            setPaymentErrorMsg("");
            inputFieldValidationPoints++;
          } else {
            setPaymentErrorMsg("Payment should more than LKR.200");
          }
        } else {
          setPaymentErrorMsg("Invalid Payment.");
        }
      } else {
        setPaymentErrorMsg("Payment is required.");
      }
    }

    if (inputFieldValidationPoints === 3) {
      return true;
    } else if (inputFieldValidationPoints < 3) {
      return false;
    } else {
      return false;
    }
  }

  async function continueButtonOnClickHandler() {
    if (await inputFieldValidationHandler()) {
      history.replace("/billSummary", {
        userId: userId,
        billCategory: billCategory,
        billType: billType,
        accountNumber: accountNumber,
        payment: payment,
      });
    }
  }

  return (
    <div className="bill_form">
      <div className="container px-5 py-2 shadow">
        <div className="mx-lg-5 mx-md-3 mx-sm-1">
          {billCategory === "electricity" && (
            <div className="d-flex flex-column mt-5">
              <div className="d-flex mb-3 justify-content-center">
                <p className="fs-3 fw-bold">Pay for Electricity</p>
              </div>
              <div className="d-flex justify-content-center">
                <Form>
                  <Form.Group className="mb-2" controlId="formBillType">
                    <Form.Label className="fs-6 fw-light">Bill Type</Form.Label>
                    <Form.Check
                      type="radio"
                      onClick={() => {
                        billTypeOnClickHandler("CEB");
                      }}
                      label="CEB"
                      name="electricityRadioBtnGroup"
                      id="electricityRadioBtn1"
                    />
                    <Form.Check
                      type="radio"
                      onClick={() => {
                        billTypeOnClickHandler("LECO");
                      }}
                      label="LECO"
                      name="electricityRadioBtnGroup"
                      id="electricityRadioBtn2"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {billTypeErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formAccountNumber">
                    <Form.Label className="fs-6 fw-light">
                      {accountNumberLabel}
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                      }}
                      type="number"
                      placeholder="83615484423"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {accountNumberErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formPayment">
                    <Form.Label className="fs-6 fw-light">Payment</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                      type="number"
                      placeholder="1000.00"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {paymentErrorMsg}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}

          {billCategory === "water" && (
            <div className="d-flex flex-column mt-5">
              <div className="d-flex mb-3 justify-content-center">
                <p className="fs-3 fw-bold">Pay for Water</p>
              </div>
              <div className="d-flex justify-content-center">
                <Form>
                  <Form.Group className="mb-2" controlId="formBillType">
                    <Form.Label className="fs-6 fw-light">Bill Type</Form.Label>
                    <Form.Check
                      type="radio"
                      onClick={() => {
                        billTypeOnClickHandler("NWSDB");
                      }}
                      label="NWSDB"
                      name="waterRadioBtnGroup"
                      id="waterRadioBtn"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {billTypeErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formAccountNumber">
                    <Form.Label className="fs-6 fw-light">
                      {accountNumberLabel}
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                      }}
                      type="number"
                      placeholder="83615484423"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {accountNumberErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formPayment">
                    <Form.Label className="fs-6 fw-light">Payment</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                      type="number"
                      placeholder="1000.00"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {paymentErrorMsg}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}

          {billCategory === "mobile" && (
            <div className="d-flex flex-column mt-5">
              <div className="d-flex mb-3 justify-content-center">
                <p className="fs-3 fw-bold">Pay for Mobile</p>
              </div>
              <div className="d-flex justify-content-center">
                <Form>
                  <Form.Group className="my-2" controlId="formBillType">
                    <Form.Label className="fs-6 fw-light">
                      Mobile Connection Type
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      onClick={() => {
                        billTypeOnClickHandler("prepaid");
                      }}
                      label="Prepaid Reload"
                      name="mobileRadioBtnGroup"
                      id="mobileRadioBtn1"
                    />
                    <Form.Check
                      type="radio"
                      onClick={() => {
                        billTypeOnClickHandler("postpaid");
                      }}
                      label="Postpaid Bill"
                      name="mobileRadioBtnGroup"
                      id="mobileRadioBtn2"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {billTypeErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formAccountNumber">
                    <Form.Label className="fs-6 fw-light">
                      {accountNumberLabel}
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                      }}
                      type="number"
                      placeholder="0123456789"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {accountNumberErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formPayment">
                    <Form.Label className="fs-6 fw-light">Payment</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                      type="number"
                      placeholder="100.00"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {paymentErrorMsg}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}

          {billCategory === "insurance" && (
            <div className="d-flex flex-column mt-5">
              <div className="d-flex mb-3 justify-content-center">
                <p className="fs-3 fw-bold">Pay for Insurance</p>
              </div>
              <div className="d-flex justify-content-center">
                <Form>
                  <Form.Group className="mb-2" controlId="formAccountNumber">
                    <Form.Label className="fs-6 fw-light">
                      Insurance Company
                    </Form.Label>
                    <Form.Control
                      as="select"
                      onClick={(e) => {
                        billTypeOnClickHandler(e.target.value);
                      }}
                    >
                      <option id="option0" value="option0">
                        Select Company from here
                      </option>
                      <option id="option1" value="option1">
                        AIA Insurance Lanka Ltd
                      </option>
                      <option id="option2" value="option2">
                        Allianz Insurance Lanka Ltd
                      </option>
                      <option id="option3" value="option3">
                        Arpico Insurance PLC
                      </option>
                      <option id="option4" value="option4">
                        Softlogic Life Insurance PLC
                      </option>
                      <option id="option5" value="option5">
                        Fairfirst Insurance Limited
                      </option>
                      <option id="option6" value="option6">
                        Ceylinco Life Insurance Limited
                      </option>
                      <option id="option7" value="option7">
                        Continental Insurance Lanka Ltd
                      </option>
                      <option id="option8" value="option8">
                        Cooperative Insurance Company Ltd
                      </option>
                      <option id="option9" value="option9">
                        HNB Assurance PLC
                      </option>
                      <option id="option10" value="option10">
                        Janashakthi Insurance PLC
                      </option>
                    </Form.Control>
                    <Form.Label className="inputFieldErrorMsg">
                      {billTypeErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formAccountNumber">
                    <Form.Label className="fs-6 fw-light">
                      {accountNumberLabel}
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                      }}
                      type="number"
                      placeholder="0123456789"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {accountNumberErrorMsg}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formPayment">
                    <Form.Label className="fs-6 fw-light">Payment</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                      type="number"
                      placeholder="100.00"
                    />
                    <Form.Label className="inputFieldErrorMsg">
                      {paymentErrorMsg}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}

          <Form>
            <Form.Group
              className="d-flex justify-content-center mb-5"
              controlId="formButton"
            >
              <Button
                className="btn-custom px-3"
                onClick={() => {
                  continueButtonOnClickHandler();
                }}
              >
                Continue
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
