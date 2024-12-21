import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown, FaMapMarkerAlt } from 'react-icons/fa'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'
import SerachTerm from './SerachTerm'
import bigimg from '../assets/hero1.png'
import a from '../assets/herorounded.png'
import b from '../assets/hero2.png'
import SearchTerm from './SerachTerm'

const Hero = () => {
  const [count, setCount] = useState(false)

  const title = 'Beautiful Apartment'
  const price = '1500'
  const location = 'New York'

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setCount(true)
    }, 2000)

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <div className='hero section-center'>
      <div className='herocontainer'>
        <article className='hero-details'>
          <div className='hero-content'>
            <div className='dote'></div>
            <span className='hero-text'>Find Your Dream Home</span>

            <h2>
              Discover Your Dream Home with{' '}
              <span className='hero-text-2'>Keur Express</span>
            </h2>
            <p>
              Embark on a journey to find your ideal living space with Keur
              Express. Explore a curated selection of properties.
            </p>
          </div>

          <ScrollTrigger
            onEnter={() => setCount(true)}
            onExit={() => setCount(false)}
          >
            <div className='progress-bar'>
              <div className='count'>
                {count && (
                  <>
                    <CountUp
                      start={0}
                      end={430987}
                      separator=','
                      duration={3}
                    />
                    + Property Ready
                  </>
                )}
              </div>
              <div className='count'>
                {count && (
                  <>
                    <CountUp
                      start={0}
                      end={543210}
                      separator=','
                      duration={3}
                    />
                    + Happy Customers
                  </>
                )}
              </div>

              {/* New Count */}
              <div className='count'>
                {count && (
                  <>
                    <CountUp start={0} end={1200} separator=',' duration={3} />+
                    Total Listings
                  </>
                )}
              </div>
            </div>
          </ScrollTrigger>
          <SearchTerm />
        </article>
        <article className='hero-image'>
          <div className='big-img'>
            <img src={bigimg} alt='Big Hero' />
          </div>
          <div className='first-hero-img'>
            <img src={a} alt='Hero Image' />
            <FaArrowDown className='arrow-icon' />
          </div>
          <div className='second-hero-img-content'>
            <img src={b} alt='Second Hero' className='second-hero-img' />

            <h2 className='title'>{title}</h2>
            <p className='price'>${price} per month</p>
            <div className='location'>
              <FaMapMarkerAlt className='location-icon' />
              <span className='location-name'>{location}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Hero
