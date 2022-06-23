
# <img src="https://i.ibb.co/kcLPX4L/rapid-pay-logo.png" width="30" height="30"> Rapid Pay - RapidPay Frontend

## Introduction
This is the frontend of the 'Rapid Pay' project which is developed as a utility bill payment platform.
The platform can be used to pay Electricity, Water, Insurance, postpaid telephone bills and also for prepaid mobile reloads.
'auth0' ([auth0.com](https://auth0.com/)) is used to token based user and logging management.
Sandbox of 'payhere' ([payhere.lk](https://www.payhere.lk/)) payment gateway is used to demonstrate bill payment.

## Technologies Used
* React
* Auth0
* Payhere SDK

## Demo Url
[https://rapidpay-fe.herokuapp.com](https://rapidpay-fe.herokuapp.com/)

## Features
1. Can create a user account with 'auth0'.
2. Sign-up email should verify using a verification link.
3. Users can recover accounts if forget passwords.
4. Can be used to pay Electricity, Water, Insurance, and postpaid telephone bills.
6. Also can be used for prepaid mobile reloads.
7. In Electricity, Water bill payments given account number validity is checked using another API.
8. All payments can be done using VISA or MASTER cards through the 'Payhere' gateway.
9. Users can view their previous bill payment transactions.
10. Can edit user account profile details.
