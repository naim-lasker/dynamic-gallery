import React, { useState, useEffect } from 'react'
import './App.css'
import Slider from "react-slick"
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaBeer } from 'react-icons/fa';

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import { slidesData } from './enums/slider'

function App() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [currentColor, setCurrentColor] = useState('cream');
  const [colorId, setColorId] = useState(1);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  })

  const settingsMain = {
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    arrows: false,
  }

  const settingsThumbs = {
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    arrows: false,
  }

  const checkPrev = () => {
    if (colorId < 2) {
      setColorId(slidesData.length)
    }
    setColorId(id => id - 1)

    slider1.slickPrev();
  }

  const checkNext = () => {
    setColorId(id => id + 1)
    if (colorId == slidesData.length) {
      setColorId(1)
    }

    slider1.slickNext();

  }

  const resetColor = (id) => {
    setColorId(id)
  }

  const testImage = color => {
    if (color == 'cream') {
      setCurrentColor('cream')
    } else if (color == 'gray') {
      setCurrentColor('gray')
    } else {
      if (color == 'white') {
        setCurrentColor('white')
      }
    }
  }


  return (

    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={5}>
            <div className="slider-wrapper">

              <button className='custom-prev' onClick={checkPrev}><FaArrowLeft size={30} /></button>
              <button className='custom-next' onClick={checkNext}><FaArrowRight size={30} /></button>

              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={slider => (setSlider1(slider))}
              >
                {slidesData.map((slide) => {

                  return (
                    <div className="slick-slide" key={slide.id}>
                      <img className="slick-slide-image img-fluid"
                        src={require(`./images/soho_36/angle${colorId == 1 ? 1 : colorId == 2 ? 2 : colorId == 3 ? 3 : colorId}_${currentColor}.jpg`)} />
                    </div>
                  )
                }
                )}
              </Slider>

              <div className="thumbnail-slider-wrap">
                <Slider
                  {...settingsThumbs}
                  asNavFor={nav1}
                  ref={slider => (setSlider2(slider))}>

                  {slidesData.map((slide) =>

                    <div className="slick-slide" key={slide.id}>
                      <img onClick={() => resetColor(slide.id)} className="slick-slide-image img-fluid"
                        src={require(`./images/soho_36/angle${slide.id}_${currentColor}.jpg`)} />
                    </div>

                  )}

                </Slider>
              </div>
            </div>
          </Col>

          <Col xs={5}>
            <Row>
              <Col>
                <img className="slick-slide-image img-fluid" onClick={() => testImage('cream')} src={require(`./images/colors/img1.jpg`)} />
              </Col>
              <Col>
                <img className="slick-slide-image img-fluid" onClick={() => testImage('gray')} src={require(`./images/colors/img2.jpg`)} />
              </Col>
              <Col>
                <img className="slick-slide-image img-fluid" onClick={() => testImage('white')} src={require(`./images/colors/img3.jpg`)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;