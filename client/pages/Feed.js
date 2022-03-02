import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFeed } from '../slices/feedSlice';
import './Feed.css';
import FeedInput from '../components/FeedInput';
import Post from '../components/Post';

export default function Feed() {
  const feedData = useSelector((state) => state.feedData.value);
  const dispatch = useDispatch();
  //useeffect to get from DB to get all posts, map data inside feedDisplay
  function getPosts() {
    fetch('http://localhost:3000/posts')
      .then((res) => res.json())
      .then((data) => {
        console.log('DBData', data);
        dispatch(setFeed(data));
      })
      .catch((err) => console.log('err', err));
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className='FeedContainer'>
      <div className='MainFeed'>
        <FeedInput />
        <br></br>
        <div className='FeedDisplay'>
          {/* map out data array coming from DB passing in relevant values as props into post component */}
          {feedData.map((ele) => {
            return (
              <Post
                user_id={ele.user_id}
                post_id={ele.post_id}
                message={ele.message}
                likes={ele.likes}
                comments={ele.comments}
                user_name={ele.user_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
