import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./containers/Home";
import UserRegistration from "./containers/UserRegistration";
import Dashboard from "./containers/Dashboard";
import Bill from "./containers/Bill";
import BillSummary from "./containers/BillSummary";
import Payment from "./containers/Payment";
import PaymentDetails from "./containers/PaymentDetails";
import MyProfile from "./containers/MyProfile";
import NotFound from "./containers/NotFound";
import Footer from "./components/Footer";

function App() {
  const alert = useAlert();
  useEffect(() => {
    var notConnectedAlert = null;
    var connectionRestoredAlert = null;
    setInterval(async () => {
      await axios
        .request({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/`,
        })
        .then((res) => {
          if (res.status === 200) {
            if (notConnectedAlert !== null) {
              alert.remove(notConnectedAlert);
              notConnectedAlert = null;

              if (connectionRestoredAlert === null) {
                connectionRestoredAlert = alert.show("Internet Restored!", {
                  type: "success",
                  timeout: 5000,
                });
              }
            }
          }
          if (res.status !== 200) {
            if (connectionRestoredAlert !== null) {
              alert.remove(connectionRestoredAlert);
              connectionRestoredAlert = null;
            }
            if (notConnectedAlert === null) {
              console.log("ran..");
              notConnectedAlert = alert.show("No Internet!", {
                type: "error",
                timeout: 0,
              });
            }
          }
        })
        .catch((err) => {
          if (connectionRestoredAlert !== null) {
            alert.remove(connectionRestoredAlert);
            connectionRestoredAlert = null;
          }
          if (notConnectedAlert === null) {
            notConnectedAlert = alert.show("No Internet!", {
              type: "error",
              timeout: 0,
            });
          }
        });
    }, 10000);
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/userRegistration"
              component={UserRegistration}
            />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/bill" component={Bill} />
            <Route exact path="/billSummary" component={BillSummary} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/paymentDetails" component={PaymentDetails} />
            <Route exact path="/myProfile" component={MyProfile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
