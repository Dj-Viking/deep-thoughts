import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS } from '../utils/queries.js';
import ThoughtList from '../components/ThoughtList.js';

const Home = () => {
  //use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];//optional chaining supported by new browsers as of oct 19 2020 but not node yet we will see later.
  console.log('loading: ', loading);
  console.log(thoughts);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
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