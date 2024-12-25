import React from 'react'

const Missions = () => {
  return (
    <div className='mission'>
      <div className='section-center'>
        <div className='missions-container'>
          <article>
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
            <hr className='mission-line'/>
            <div className='mission-card'>
              <div>
                <img
                  src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a7212b0799a98c7cf4300e_Mission%20Icon1.svg'
                  alt=''
                />
                <h3>Client-Centric Approach</h3>
                <p>
                  Putting our clients' needs first is at the core of our
                  mission. We strive to understand your unique goals.
                </p>
              </div>
              <div>
                <img
                  src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a7212b6920c9abb4a11e94_Mission%20Icon2.svg'
                  alt=''
                />
                <h3>Make Informed Decisions</h3>
                <p>
                  We believe in empowering our clients to make informed
                  decisions. Through clear communication.
                </p>
              </div>
            </div>
          </article>
          <article className='img-mission'>
            <img
              src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a722bfcecdc90bea3537bd_Our%20Mission%20Image.jpg'
              alt=''
            />
          </article>
        </div>
        <div className='img-mission-absolute'>
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395be0581e8c6129db93e_Star%20Icon.svg'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}

export default Missions
