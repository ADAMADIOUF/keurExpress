import React from 'react'
import a from '../assets/c1.png'
import b from '../assets/c2.png'
import c from '../assets/c3.png'
import d from '../assets/c4.png'
import e from '../assets/c5.png'

const Companies = () => {
  return (
    <div className='companies'>
      <div className='section-center'>
        <div className='companies-title'>
          <div className='line'></div>
          <h2>
            Trusted by <span>1000+</span> companies around the world
          </h2>
          <div className='line'></div>
        </div>
        <div className='container-companies'>
          <article className='companies-details'>
            <img src={a} alt='' />
          </article>
          <article className='companies-details'>
            <img src={b} alt='' />
          </article>
          <article className='companies-details'>
            <img src={c} alt='' />
          </article>
          <article className='companies-details'>
            <img src={d} alt='' />
          </article>
          <article className='companies-details'>
            <img src={e} alt='' />
          </article>
        </div>
      </div>
    </div>
  )
}

export default Companies
