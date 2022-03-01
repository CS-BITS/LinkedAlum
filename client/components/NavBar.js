import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div
      className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono'
      role='navigation'
    >
      <Link to='/' className='pl-8'>
        LinkedAlumn
      </Link>
      <div className='pr-8 md:block'>
        <Link to='/feed' className='pl-9'>
          Feed
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
