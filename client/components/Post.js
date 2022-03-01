import React from 'react';
import './Post.css';
export default function Post(props) {
  return (
    <div className='PostContainer' key={props.post_id}>
      <div className='UserInfo'>
        <div className='UserPic'>{props.user_id}</div>
        <div className='UserName'>{props.user_id}</div>
      </div>
      <div className='PostInfo'>
        <div className='PostMessage'>{props.message}</div>
        <div className='LikeComment'>
          <div className='LikeCounter'>{props.likes}</div>
          <div className='CommentContainer'>
            {/* prolly need to map out comments in this section and have a scroll */}
            {0} comments
          </div>
        </div>
        <div className='CommentInput'>
          <input type='text' placeholder='Comment Here...' />
        </div>
      </div>
    </div>
  );
}
