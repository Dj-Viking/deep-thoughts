import React, { useState } from 'react';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setText('');
    setCharacterCount(0);
  };
  return (
    <div>
      <p className="m-0">
        Character Count: 0/280
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch">
        <textarea
          placeholder="Here's a new thought..."
          className="form-input col-12 col-md-9"
          style={{ resize: 'none' }}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
        >
        </textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
        <p 
          className={`
            m-0 
            ${characterCount === 280 ? 'text-error' : ''}
          `}>
            Character Count: {characterCount}/280
        </p>
      </form>
    </div>
  );
};

export default ThoughtForm;