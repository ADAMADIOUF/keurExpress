import React, { useState } from 'react'
import { useTranslation } from 'react-i18next' // Import i18next translation hook
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Testimonial = () => {
  const { t } = useTranslation() // Use the translation hook

  const testimonials = [
    {
      id: 1,
      image:
        'https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1cb18bf3470c595971a66_Testimonial%20Author.png',
      name: 'John Doe',
      descriptionKey: 'testimonial1.description', // Key for translation
      professionKey: 'testimonial1.profession', // Key for translation
    },
    {
      id: 2,
      image:
        'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      name: 'Jane Smith',
      descriptionKey: 'testimonial2.description',
      professionKey: 'testimonial2.profession',
    },
    {
      id: 3,
      image:
        'https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1cb1840367dcde4264180_Testimonial%20Author2.png',
      name: 'Michael Johnson',
      descriptionKey: 'testimonial3.description',
      professionKey: 'testimonial3.profession',
    },
    {
      id: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFhXXr75VSluBOAvjPZqL951In6-WMFWPeA&s',
      name: 'Michael Johnson',
      descriptionKey: 'testimonial4.description',
      professionKey: 'testimonial4.profession',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className='testimonial'>
      <div className='section-center'>
        <div className='testimonial-container'>
          <article>
            <div className='testimonial-content-dote'>
              <div className='dote'></div>
              <span className='testimonial-dote-text'>{t('testimonial')}</span>
              <h2>{t('hearFromOurSatisfiedCustomers')}</h2>
            </div>
          </article>
          <article>
            <div className='testimonial-slider-button'>
              <button onClick={handlePrev} className='prev-btn'>
                <FaAngleLeft />
              </button>
              <button onClick={handleNext} className='next-btn'>
                <FaAngleRight />
              </button>
            </div>
          </article>
        </div>
        <div className='testimonial-slider'>
          {testimonials
            .slice(currentIndex, currentIndex + 2)
            .map((testimonial) => (
              <div className='testimonial-item' key={testimonial.id}>
                <img src={testimonial.image} alt={testimonial.name} />
                <h3>{testimonial.name}</h3>
                <p className='testimonial-description'>
                  {t(testimonial.descriptionKey)} {/* Translated description */}
                </p>
                <span className='testimonial-profession'>
                  {t(testimonial.professionKey)} {/* Translated profession */}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial
