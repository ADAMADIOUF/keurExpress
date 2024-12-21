import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image:
        'https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1cb18bf3470c595971a66_Testimonial%20Author.png',
      name: 'John Doe',
      description: 'The service was excellent. Highly recommend!',
      profession: 'Software Engineer',
    },
    {
      id: 2,
      image:
        'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      name: 'Jane Smith',
      description: 'Great experience! Would love to work with them again.',
      profession: 'Designer',
    },
    {
      id: 3,
      image:
        'https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1cb1840367dcde4264180_Testimonial%20Author2.png',
      name: 'Michael Johnson',
      description: 'Amazing attention to detail. Truly professional.',
      profession: 'Project Manager',
    },
    {
      id: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFhXXr75VSluBOAvjPZqL951In6-WMFWPeA&s',
      name: 'Michael Johnson',
      description: 'Amazing attention to detail. Truly professional.',
      profession: 'Project Manager',
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
              <span className='testimonial-dote-text'>Testimonial</span>
              <h2>Hear From Our Satisfied Customers</h2>
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
                  {testimonial.description}
                </p>
                <span className='testimonial-profession'>
                  {testimonial.profession}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial
