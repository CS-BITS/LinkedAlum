import React from 'react';

export default function FeedInput() {
  function handleSubmit(e) {
    const inputValue = document.querySelector('.feedInput').value;
    //send text to database to save
    console.log(inputValue);
    const body = {
      user_id: 3,
      message: inputValue,
    };
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    //after sending to DB reset value field
    document.querySelector('.feedInput').value = '';
  }

  return (
    <div className='FeedInput'>
      <div className='flex flex-col justify-center items-center'>
        <input
          type='text'
          className='feedInput text-center h-15 w-80'
          placeholder='Message...'
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
}
