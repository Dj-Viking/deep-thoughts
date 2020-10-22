import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries.js';
import Auth from '../utils/auth.js';
import ThoughtList from '../components/ThoughtList.js';
import FriendList from '../components/FriendList/index.js';
import ThoughtForm from '../components/ThoughtForm/index.js';

const Home = () => {
  //use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];//optional chaining supported by new browsers as of oct 19 2020 but not node yet we will see later.
  console.log('loading: ', loading);
  console.log(thoughts);
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {
          loggedIn &&
          (
            <div className="col-12 mb-3">
              <ThoughtForm />
            </div>
          )
        }
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {
            loading 
            ?
            (
              <div>Loading...</div>
            )
            :
            (
                <ThoughtList 
                  thoughts={thoughts}
                  title="Some Feed for Thought(s)..."
                />
            )
          } 
        </div>
        {
          loggedIn && userData
          ?
          (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList 
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          )
          :
          null
        }

      </div>
    </main>
  );
};

export default Home;


//optional chaining (?.) negates the need to check if an object even exists
// before accessing it's properties. in this case no data will exists until
// the query to the server is finished. so if we type data.thoughts
// we'll recieve an error saying we can't access the property of data
// because it is undefined
// if data exists, store it in the thoughts constant
// if data is undefined, then save an empty array to the thoughts component