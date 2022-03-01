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
      <input type='text' className='feedInput' placeholder='Message...' />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}
