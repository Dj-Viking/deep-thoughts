import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations.js';
import Auth from '../utils/auth.js';//importing as a short name...original name is AuthService

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [addUser, { error }] = useMutation(ADD_USER);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      //execute addUser mutation and pass in variable data from form
      const { data } = await addUser
      (
        {
          variables: {...formState}
        }
      );
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {
              error &&
              <div>Sign Up Failed.</div>
            }
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
