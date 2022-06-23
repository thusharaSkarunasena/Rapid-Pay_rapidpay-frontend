import React from "react";
import "./MyProfileForm.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Image, Form } from "react-bootstrap";

const MyProfileForm = () => {
  const { user } = useAuth0();

  return (
    <div className="myProfileForm">
      <div className="container px-5 py-5 shadow">
        <div className="mx-lg-5 mx-md-3 mx-sm-1">
          <div className="d-flex justify-content-center">
            <h4>My Profile</h4>
          </div>
          <div className="d-flex justify-content-center my-3">
            <Image
              src={user.picture}
              height="100px"
              width="100px"
              alt={user.nickname}
              roundedCircle={true}
            />
          </div>
          <div className="d-flex justify-content-center">
            <Form>
              <Form.Group>
                <Form.Label>Name : </Form.Label>
                <Form.Control
                  type="text"
                  value={user.nickname}
                  disabled={true}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Email : </Form.Label>
                <Form.Control type="email" value={user.email} disabled={true} />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>NIC : </Form.Label>
                <Form.Control type="text" value="nic" disabled={true} />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileForm;
