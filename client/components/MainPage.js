import React from 'react'
import GoogleSign from './images/GoogleSign.png'
import GitHubLogin from './images/github.png'
const Mainpage = () => {
    function GoogleButton(){
        console.log('Google Button is Clicked')
    }
    function GithubButton(){
        console.log('GitHub Button is Clicked')
    }
return (
    
    <div className='bg-white h-screen flex flex-col justify-center items-center'>
        <h2 className='lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14'>
            LinkedAlum
        </h2>
        <h3 className='font-black'>
            Connecting People
        </h3>
        <br></br>
        <button>
            <img className='h-12 w-38'src={GoogleSign} onClick={GoogleButton} />
        </button>
        <button>
            <img className='h-12 w-38'src={GitHubLogin} onClick={GithubButton} />
        </button>
    </div>
  );
};
export default Mainpage;