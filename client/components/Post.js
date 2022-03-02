import React, { useState, useEffect } from 'react';
import './Post.css';
export default function Post(props) {
  // console.log(props.comments);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState('');
  useEffect(() => {
    setLikes((likes) => (likes = props.likes));
    setComments((comments) => (comments = props.comments));
  }, []);
  function handleDelete() {
    fetch(`http://localhost:3000/posts/${props.post_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  function handleLikeClick() {
    //send updated like to db
    fetch(`http://localhost:3000/posts/${props.post_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => setLikes((likes) => (likes += 1)))
      .catch((err) => console.log(err));
  }
  function handleCommentInput(e) {
    if (e.key === 'Enter') {
      //send comment to DB and update comments array
      console.log(e.target.value);
      const body = {
        post_id: props.post_id,
        user_id: 3,
        message: e.target.value,
      };
      fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(() => console.log('comment success'))
        .catch((err) => console.log(err));
      e.target.value = '';
    }
  }
  function handleEditInput(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      const body = {
        post_id: props.post_id,
        message: e.target.value,
      };
      fetch('http://localhost:3000/posts', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(() => setEdit((edit) => !edit))
        .catch((err) => console.log(err));
    }
  }
  return (
    <div
      className='h-56 grid grid-cols-3 gap-4 content-start'
      key={props.post_id}
    >
      <div className='UserInfo'>
        {/* <div className='UserPic'>{props.user_id}</div> */}
        <div className='container'>
          <div className='UserName text-center'>{props.user_name}</div>
          <div className='ButtonContainer text-center'>
            <button className='Delete' onClick={handleDelete}>
              Delete
            </button>
            <br></br>
            <button className='Edit' onClick={() => setEdit((edit) => !edit)}>
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className='PostMessage border-solid border-2 border-sky-500 '>
        {props.message}
      </div>
      <div className='EditInputContainer text-center '>
        {edit && (
          <input
            className='EditInput text-center border-solid border-2 border-sky-500'
            type='text'
            defaultValue={props.message}
            onKeyPress={(e) => handleEditInput(e)}
          />
        )}
      </div>
      <button
        className='LikeCounter align-text-top '
        onClick={() => handleLikeClick()}
      >
        {likes} Likes
      </button>
      <div className='CommentInput '>
        <input
          className='border-solid border-2 border-sky-500 '
          type='text'
          placeholder='Comment Here...'
          onKeyPress={(e) => handleCommentInput(e)}
        />
        <div className='CommentContainer'>
          {comments.map((ele) => {
            return (
              <div className='CommentBox'>
                <div className='CommentUserName'>
                  {ele.user_name} : {ele.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
