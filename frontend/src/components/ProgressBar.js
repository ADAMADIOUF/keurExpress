import React, { useEffect, useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'

const ProgressBar = () => {
  const [count, setCount] = useState(false)

  useEffect(() => {
    // Simulate loading state when component mounts
    const loadingTimer = setTimeout(() => {
      setCount(true)
    }, 2000)

    return () => {
      clearTimeout(loadingTimer) // Clean up on unmount
    }
  }, [])

  // Reusable stats data with translation keys for French
  const stats = [
    { end: 430987, labelKey: 'proprietesPrêtes' }, // 'propertyReady' in French
    { end: 543210, labelKey: 'clientsSatisfaits' }, // 'happyCustomers' in French
    { end: 1200, labelKey: 'listingsTotaux' }, // 'totalListings' in French
  ]

  // Function to translate label keys
  const translate = (key) => {
    const translations = {
      proprietesPrêtes: 'Propriétés Prêtes',
      clientsSatisfaits: 'Clients Satisfaits',
      listingsTotaux: 'Annonces Totales',
    }
    return translations[key] || key
  }

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
                  + {translate(stat.labelKey)} {/* Translate the label */}
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
