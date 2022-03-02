import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFeed } from '../slices/feedSlice';
import './Feed.css';
import FeedInput from '../components/FeedInput';
import Post from '../components/Post';

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
  const feedData = useSelector((state) => state.feedData.value);
  const dispatch = useDispatch();
  //useeffect to get from DB to get all posts, map data inside feedDisplay
  useEffect(() => {
    dispatch(setFeed(MockData));
  }, []);
  return (
    <div className='FeedContainer'>
      <div>Nav</div>
      <div className='MainFeed'>
        <FeedInput />
        <div className='FeedDisplay'>
          {/* map out data array coming from DB passing in relevant values as props into post component */}
          {feedData.map((ele) => {
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
  );
}
