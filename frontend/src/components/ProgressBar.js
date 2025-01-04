import React, { useEffect, useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next' // Import useTranslation hook

const ProgressBar = () => {
  const [count, setCount] = useState(false)
  const { t } = useTranslation() // Initialize translation function

  useEffect(() => {
    // Simulates a loading state when the component mounts
    const loadingTimer = setTimeout(() => {
      setCount(true)
    }, 2000)

    return () => {
      clearTimeout(loadingTimer) // Cleanup timeout when the component unmounts
    }
  }, [])

  // Reusable stats data with translation keys
  const stats = [
    { end: 430987, labelKey: 'propertyReady' },
    { end: 543210, labelKey: 'happyCustomers' },
    { end: 1200, labelKey: 'totalListings' },
  ]

  return (
    <div className='progressBar'>
      <ScrollTrigger
        onEnter={() => setCount(true)}
        onExit={() => setCount(false)}
      >
        <div className='progress-bar'>
          {stats.map((stat, index) => (
            <div className='count' key={index}>
              {count && (
                <>
                  <CountUp
                    start={0}
                    end={stat.end}
                    separator=','
                    duration={3}
                  />
                  + {t(stat.labelKey)} {/* Translate the label */}
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollTrigger>
    </div>
  )
}

export default ProgressBar
