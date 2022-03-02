import React from 'react';
import '../index.css';;
import { Link } from 'react-router-dom'

const FeedNavbar = () => {
  return (
    <div
        className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono'
        role='navigation'
    >
        <Link to='/' className='pl-8'>
          Home
        </Link>
    <div className='pr-8 md:block'>
        <Link to='/' className='pl-9'>
            Sign Out 
        </Link>
    </div>
    </div>
  )
}

export default FeedNavbar;