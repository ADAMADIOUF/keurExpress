import React, { useState } from 'react'
import { TfiAngleDoubleDown } from 'react-icons/tfi'
import { FaPlay, FaTimes } from 'react-icons/fa'
import placeholderImage from '../assets/keurexpress.png' // Replace with your image path
import v from '../assets/keurexpress.mp4' // Replace with your video path


const Services = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const handlePlayVideo = () => {
    setIsVideoOpen(true)
  }

  const handleCloseVideo = () => {
    setIsVideoOpen(false)
  }

  return (
    <div className='services '>
      <div className='container-services section-center'>
        <article className='services-details'>
          <article className='hero-details'>
            <div className='hero-content'>
              <div className='dote'></div>
              <span className='hero-text'>What Sets Keur Express</span>
            </div>
            <div className='services-content'>
              <h3>
                <span>
                  <TfiAngleDoubleDown />
                </span>
                Tailored Solutions
              </h3>
              <p>
                We craft customized strategies to meet your specific
                requirements and goals, ensuring exceptional outcomes.
              </p>
            </div>
            <div className='services-content'>
              <h3>
                <span>
                  <TfiAngleDoubleDown />
                </span>
                Clear Communication
              </h3>
              <p>
                We prioritize open and honest communication, keeping you
                informed and involved every step of the way.
              </p>
            </div>
            <div className='services-content'>
              <h3>
                <span>
                  <TfiAngleDoubleDown />
                </span>
                Cutting-Edge Innovation
              </h3>
              <p>
                Leveraging advanced technologies and modern tools, we deliver
                innovative solutions for a competitive edge.
              </p>
            </div>
          </article>
        </article>
        <article className='services-video'>
          {!isVideoOpen ? (
            <div className='video-placeholder' onClick={handlePlayVideo}>
              <img
                src={placeholderImage}
                alt='Video Placeholder'
                className='placeholder-img'
              />
              <button className='play-button'>
                <span className='flame'></span>
                <FaPlay />
              </button>
            </div>
          ) : (
            <div className='video-container'>
              <button className='close-button' onClick={handleCloseVideo}>
                <FaTimes />
              </button>
              <video controls autoPlay className='video-element'>
                <source src={v} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default Services
