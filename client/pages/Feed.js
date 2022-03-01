import React from 'react';
import './Feed.css';
import FeedInput from '../components/FeedInput';
export default function Feed() {
  //useeffect to get from DB to get all posts, map data inside feedDisplay
  return (
    <div className='FeedContainer'>
      <div>Nav</div>
      <div className='MainFeed'>
        <FeedInput />
        <div className='FeedDisplay'>Render all posts ehre</div>
      </div>
    </div>
  );
}
