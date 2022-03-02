import React, { useEffect, useState } from 'react';
import './Feed.css';
import FeedInput from '../components/FeedInput';
import Post from '../components/Post';
import FeedNavbar from './FeedNavBar';

const MockData = [
  { user_id: 1, post_id: 1, message: 'please end this', likes: 6 },
  {
    user_id: 2,
    post_id: 2,
    message: 'pleaseeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    likes: 6,
  },
];

export default function Feed() {
  const [feedData, setFeedData] = useState([]);
  //useeffect to get from DB to get all posts, map data inside feedDisplay
  return (
    <div>
      <FeedNavbar/>
    <div className='FeedContainer'>
      <br></br>
      <div className='MainFeed'>
        <FeedInput />
        <br></br>
        <div className='FeedDisplay'>
          {/* map out data array coming from DB passing in relevant values as props into post components */}
          {MockData.map((ele) => {
            return (
              <Post
                user_id={ele.user_id}
                post_id={ele.post_id}
                message={ele.message}
                likes={ele.likes}
              />
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
