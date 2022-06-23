import React from "react";
import "./UserRegistrationForm.css";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Form, Alert, Button } from "react-bootstrap";

const UserRegistrationForm = () => {
  const history = useHistory();
  const location = useLocation();

  const { getAccessTokenSilently } = useAuth0();

  const [email, setEmail] = useState(
    location.state ? (location.state.email ? location.state.email : null) : null
  );
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [nicErrorMsg, setNicErrorMsg] = useState("");
  const [contactNumberErrorMsg, setContactNumberErrorMsg] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (!email) {
      history.replace("/dashboard");
    }
  }, []);

  function inputFieldValidationHandler() {
    var inputFieldValidationPoints = 0;

    setName(name.trim());
    setContactNumber(contactNumber.trim());
    setNic(nic.trim());

    if (name.trim() !== "") {
      setNameErrorMsg("");
      if (/^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/.test(name.trim())) {
        setNameErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setNameErrorMsg("Invalid Name.");
      }
    } else {
      setNameErrorMsg("Name is required.");
    }

    if (nic.trim() !== "") {
      setNicErrorMsg("");
      if (/^[0-9+]{9}[vV|xX]$|^[0-9+]{12}$/.test(nic.trim())) {
        setNicErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setNicErrorMsg("Invalid NIC.");
      }
    } else {
      setNicErrorMsg("NIC is required.");
    }

    if (contactNumber.trim() !== "") {
      setContactNumberErrorMsg("");
      if (
        /^(\+94)[0-9+]{9}$|^(0)[0-9+]{9}$|^[0-9+]{9}$/.test(
          contactNumber.trim()
        )
      ) {
        setContactNumberErrorMsg("");
        inputFieldValidationPoints++;
      } else {
        setContactNumberErrorMsg("Invalid Contact Number.");
      }
    } else {
      setContactNumberErrorMsg("Contact Number is required.");
    }

    if (inputFieldValidationPoints === 3) {
      return true;
    } else if (inputFieldValidationPoints < 3) {
      return false;
    } else {
      return false;
    }
  }

  async function registerButtonOnClickHandler() {
    if (inputFieldValidationHandler()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("nic", nic);
      formData.append("contact_number", contactNumber);

      const accessToken = await getAccessTokenSilently();
      await axios
        .request({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/rapidpay_user/saveRapidpayUser`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: formData,
        })
        .then((res) => {
          if (res.data.id) {
            setAlertVariant("success");
            setAlertMsg("User has been Registered Successfully..");
            setShowAlert(true);
            history.replace("/dashboard");
          } else {
            setAlertVariant("danger");
            setAlertMsg("Failed to Register User..");
            setShowAlert(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Do Nothing
    }
  }

  return (
    <div className="userRegistrationForm">
      <div className="container px-5 py-5 shadow">
        <div className="mx-lg-5 mx-md-3 mx-sm-1">
          <div className="d-flex justify-content-center">
            <h4>User Registration</h4>
          </div>
          <div className="d-flex justify-content-center my-3">
            <Form>
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  disabled={true}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled={false}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Thushara Supun"
                />
                {nameErrorMsg !== "" && (
                  <Form.Label className="inputFieldErrorMsg">
                    {nameErrorMsg}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNic">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  disabled={false}
                  value={nic}
                  onChange={(e) => {
                    setNic(e.target.value);
                  }}
                  placeholder="987654321V"
                />
                {nicErrorMsg !== "" && (
                  <Form.Label className="inputFieldErrorMsg">
                    {nicErrorMsg}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formContactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  disabled={false}
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                  placeholder="012 3456789"
                />
                {contactNumberErrorMsg !== "" && (
                  <Form.Label className="inputFieldErrorMsg">
                    {contactNumberErrorMsg}
                  </Form.Label>
                )}
              </Form.Group>
            </Form>
          </div>
          <div className="d-flex justify-content-center my-4">
            <Button
              className="btn-custom px-3"
              onClick={() => {
                registerButtonOnClickHandler();
              }}
            >
              Register
            </Button>
          </div>
          {showAlert && (
            <div className="container d-flex justify-content-center mx-3">
              <Alert variant={alertVariant}>
                <h6>{alertMsg}</h6>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
