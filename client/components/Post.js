import React, { useState, useEffect } from 'react';
import './Post.css';
export default function Post(props) {
  console.log(props.comments);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setLikes((likes) => (likes = props.likes));
    setComments((comments) => (comments = props.comments));
  }, []);
  function handleLikeClick() {
    //send updated like to db
    setLikes((likes) => (likes += 1));
  }
  function handleCommentInput(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      //send comment to DB and update comments array
    }
  }
  return (
    <div className='PostContainer' key={props.post_id}>
      <div className='UserInfo'>
        <div className='UserPic'>{props.user_id}</div>
        <div className='UserName'>{props.user_id}</div>
      </div>
      <div className='PostInfo'>
        <div className='PostMessage'>{props.message}</div>
        <div className='LikeComment'>
          <button className='LikeCounter' onClick={() => handleLikeClick()}>
            {likes} Likes
          </button>
          <div className='CommentContainer'>
            {/* prolly need to map out comments in this section and have a scroll */}
            {comments.map((ele) => {
              return (
                <div className='CommentBox'>
                  <div className='CommentUserName'>{ele.user_name} :</div>
                  <div className='CommentMessage'>{ele.message}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='CommentInput'>
          <input
            type='text'
            placeholder='Comment Here...'
            onKeyPress={(e) => handleCommentInput(e)}
          />
        </div>
      </div>
    </div>
  );
}
