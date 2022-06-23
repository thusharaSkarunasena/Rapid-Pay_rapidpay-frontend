import React from "react";
import "./ImageCarousel.css";
import { Carousel } from "react-bootstrap";

const ImageCarousel = () => {
  return (
    <div id="image_carousel" className="image_carousel">
      <div className="container w-100">
        <Carousel fade={true} indicators={false} controls={false} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-75 m-auto"
              src="https://i.ibb.co/5FGZ9Zf/slider-customer-care.png"
              alt="Customer Service"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
            <Carousel.Caption className="d-block  position-relative w-100 float-start start-0">
              <h4 className="fs-3 text-black">Customer Service</h4>
              <p className="fs-5 text-black">
                Questions? Concerns? Feedback? Customer Service with a human
                touch.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 m-auto"
              src="https://i.ibb.co/ykfcR84/slider-bill.png"
              alt="Bills"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
            <Carousel.Caption className="d-block  position-relative w-100 float-start start-0">
              <h4 className="fs-3 text-black">Bills</h4>
              <p className="fs-5 text-black">
                Mobile, Postpaid, Electricity, Water, 4G, TV Bill etc.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 m-auto"
              src="https://i.ibb.co/pbxxJYz/slider-reload.png"
              alt="Reloads"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
            <Carousel.Caption className="d-block  position-relative w-100 float-start start-0">
              <h4 className="fs-3 text-black">Reloads</h4>
              <p className="fs-5 text-black">
                Reload to any number/network 24*7.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-75 m-auto"
              src="https://i.ibb.co/4MCJ277/slider-insurance.png"
              alt="Insurance"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
            <Carousel.Caption className="d-block  position-relative w-100 float-start start-0">
              <h4 className="fs-3 text-black">Insurance</h4>
              <p className="fs-5 text-black">
                Pay your monthly installments easily without wasting time.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
