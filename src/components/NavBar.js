import React from "react";
import "./NavBar.css";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Nav, NavDropdown, Navbar, Image } from "react-bootstrap";
import RapidPayLogo from "../assets/image/rapid_pay_logo.png";

const NavBar = () => {
  const history = useHistory();

  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  function accountNavLinkClickedHandler() {
    loginWithRedirect();
  }

  function myProfileNavLinkClickedHandler() {
    history.push("/myProfile");
  }

  function logoutNavLinkClickedHandler() {
    logout();
  }

  return (
    <Navbar
      id="navbar"
      className="Navbar px-4 shadow"
      collapseOnSelect
      bg="light"
      expand="lg"
    >
      <Navbar.Brand
        className="fs-3 fw-bold font-monospace"
        href="#"
        onClick={() => {
          history.push("/");
        }}
      >
        <img
          alt="Rapid Pay Logo"
          src={RapidPayLogo}
          width="50"
          height="50"
          className="d-inline-block align-content-center"
        />
        Rapid Pay
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar_collapse" className="justify-content-end">
        <Nav className="">
          <Nav.Link
            href="#"
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="#"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Dashboard
          </Nav.Link>
          <NavDropdown title="Billing" id="navbar_collapse_dropdown_billing">
            <NavDropdown.Item
              href="#"
              onClick={() => {
                history.push({ pathname: "/bill", state: ["electricity"] });
              }}
            >
              Electricity
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#"
              onClick={() => {
                history.push({ pathname: "/bill", state: ["water"] });
              }}
            >
              Water Bill
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#"
              onClick={() => {
                history.push({ pathname: "/bill", state: ["mobile"] });
              }}
            >
              Mobile
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#"
              onClick={() => {
                history.push({ pathname: "/bill", state: ["insurance"] });
              }}
            >
              Insurance
            </NavDropdown.Item>
          </NavDropdown>
          {!isAuthenticated && (
            <Nav.Link
              href="#"
              onClick={() => {
                accountNavLinkClickedHandler();
              }}
            >
              Account
            </Nav.Link>
          )}
          {isAuthenticated && (
            <NavDropdown
              title={
                <div className="d-inline-flex align-content-start">
                  Account &nbsp;
                  <Image
                    className="border"
                    src={user.picture}
                    alt={user.nickname}
                    roundedCircle={true}
                    height="30"
                    width="30"
                  />
                </div>
              }
              id="navbar_collapse_dropdown_account"
            >
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  myProfileNavLinkClickedHandler();
                }}
              >
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  logoutNavLinkClickedHandler();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <Nav.Link
            href="#"
            onClick={() => {
              history.push("/about");
            }}
          >
            About
          </Nav.Link>
          <Nav.Link
            href="#"
            onClick={() => {
              history.push("/contact");
            }}
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
