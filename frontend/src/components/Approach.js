import React from 'react'
import { FaCouch, FaHotTub, FaCheckCircle } from 'react-icons/fa'

const Approach = () => {
  return (
    <div className='approach'>
      <div className='section-center'>
        <div className='approach-container'>
          <article className='approach-img'>
            <img
              src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a72f475de22c67fe75aae1_Our%20Approach%20Image.jpg'
              alt=''
             className='approach-img-first'/>
            <div className='approach-details-img'>
              <div className='approch-price'>
                <h3>
                  $3699.00 <span></span>/Month
                </h3>
              </div>
              <div className='approach-content'>
                <h3>Orchard House</h3>
                <div>
                  <h3>
                    <FaCouch /> <span>3</span>
                  </h3>
                  <h3>
                    <FaHotTub /> <span>3</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className='approach-img-absolute'>
              <img
                src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a72fe8bfaa1d600253dae3_Our%20Approach%20Shape.png'
                alt=''
              />
            </div>
          </article>
          <articcle className='approach-details'>
            <div className='hero-content'>
              <div className='dote'></div>
              <span className='hero-text'>Our Mission</span>
              <h3>Empowering Your Real Estate Journey</h3>
              <p>
                To empower individuals and families to make informed real estate
                decisions and achieve their homeownership goals. We understand
                that buying or selling a home.
              </p>
            </div>
            <div className='approach-listings'>
              <div className='approch-listings-details'>
                <div>
                  <span>
                    <FaCheckCircle />
                  </span>
                  <h3>Listening to Your Needs:</h3>
                </div>
                <p>
                  We start by listening. Understanding your specific needs,
                  preferences, and objectives allows us to tailor our approach
                  to meet your unique requirements.
                </p>
              </div>
              <div className='approch-listings-details'>
                <div>
                  <span>
                    <FaCheckCircle />
                  </span>
                  <h3>Listening to Your Needs:</h3>
                </div>
                <p>
                  We start by listening. Understanding your specific needs,
                  preferences, and objectives allows us to tailor our approach
                  to meet your unique requirements.
                </p>
              </div>
            </div>
          </articcle>
        </div>
      </div>
    </div>
  )
}

export default Approach
