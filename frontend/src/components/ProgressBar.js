import React, { useEffect, useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'
const ProgressBar = () => {
  const [count, setCount] = useState(false)
  useEffect(() => {
      const loadingTimer = setTimeout(() => {
        setCount(true)
      }, 2000)
  
      return () => {
        clearTimeout(loadingTimer)
      }
    }, [])
  return (
    <div className='progressBar'>
      <ScrollTrigger
        onEnter={() => setCount(true)}
        onExit={() => setCount(false)}
      >
        <div className='progress-bar'>
          <div className='count'>
            {count && (
              <>
                <CountUp start={0} end={430987} separator=',' duration={3} />+
                Property Ready
              </>
            )}
          </div>
          <div className='count'>
            {count && (
              <>
                <CountUp start={0} end={543210} separator=',' duration={3} />+
                Happy Customers
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
    </div>
  )
}

export default ProgressBar
