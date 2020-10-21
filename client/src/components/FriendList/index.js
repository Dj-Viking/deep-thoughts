import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = (props) => {
  const {
    friendCount,
    username,
    friends
  } = props;
  if (!friends || !friends.length) {
    return (
      <p className="bg-dark text-light p-3">
        {username}, lets find some friends to make!
      </p>
    );
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {
        friends.map
        (
          friend => 
          (
            <button 
              className="btn w-100 display-block mb-2"
              key={friend._id}
            >
              <Link to={`/profile/${friend.username}`}>
                {friend.username}
              </Link>
            </button>

          )
        )
      }
    </div>
  );
}

export default FriendList;