import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_THOUGHT } from '../../utils/mutations.js';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries.js';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation
  (
    ADD_THOUGHT,
    {
      update(cache, { data: { addThought }}) 
      {
        try {
          //read what's currently in the cache
          //could potentially not exist yet, so wrap in trycatch
          const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
          
          cache.writeQuery
          (
            {
              query: QUERY_THOUGHTS,
              data: {
                thoughts: [addThought, ...thoughts]
              }
            }
          );
        } catch (error) {
          console.error(error);
        }
        //update me object's cache, appending newthought
        // to the end of the array
        const { me } = cache.readQuery({ query: QUERY_ME });
        console.log(me);
        
        //prepend the newest thought to the front of the array
        cache.writeQuery
        (
          {
            query: QUERY_ME,
            data: {
              me: {
                ...me,
                thoughts: [
                  ...me.thoughts,
                  addThought
                ]
              }
            }
          }
        );
      }
    }
  );
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      //add a thought to database
      await addThought
      (
        {
          variables: { thoughtText }
        }
      );
      //clear form value
      setText('');
      setCharacterCount(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p 
        className={`
          m-0 
          ${characterCount === 280 ? 'text-error' : ''}
        `}>
          Character Count: {characterCount}/280
          {
            error &&
            <span 
              className="ml-2"
            >
              Something went wrong with your request.
            </span>
          }
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
        >
        <textarea
          placeholder="Here's a new thought..."
          className="form-input col-12 col-md-9"
          style={{ resize: 'none' }}
          onChange={handleChange}
        >
        </textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;