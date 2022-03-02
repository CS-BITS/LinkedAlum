import React from 'react'
import GoogleSign from './images/GoogleSign.png'
import GitHubLogin from './images/github.png'
import '../index.css'
import Navbar from './Navbar';
const Mainpage = () => {

    //onclick function that will do a fetch request to localhost3000/auth/google 
    function GoogleButton(){       
        fetch('http://localhost:3000/auth/google',{
            mode:'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(() => {
        console.log('success');
        })
        .catch((error) => console.log(`ERROR in going to auth route ${error}`));
    }

    return (
        <div>
            <Navbar/>
        <div className='bg-white h-screen flex flex-col justify-center items-center'>
            <h2 className='lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14'>
                LinkedAlum
            </h2>
            <h3 className='font-black'>
                Connecting People
            </h3>
            <br></br>
            <button>
                <a href="/auth/google"><img className='h-12 w-38'src={GoogleSign}/></a>
            </button>
            <button>
                <img className='h-12 w-38'src={GoogleSign} onClick={GoogleButton} />
            </button>
        </div>
        </div>

        
    );
};
export default Mainpage;