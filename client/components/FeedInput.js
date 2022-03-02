import React from 'react';

export default function FeedInput() {
  function handleSubmit(e) {
    const inputValue = document.querySelector('.feedInput').value;
    //send text to database to save
    console.log(inputValue);
    //after sending to DB reset value field
    document.querySelector('.feedInput').value = '';
  }

  return (
    <div className='FeedInput'>
      <div className="flex flex-col justify-center items-center">
        <input className='text-center h-15 w-80'type='text' placeholder='Message...' />
      
      <button onClick={() => handleSubmit()}>Submit</button>
      </div>  
    </div>
  );
}
