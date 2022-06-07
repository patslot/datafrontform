import React, { useState, useEffect } from 'react';

import styles from './App.module.scss';
import useInput from './hooks/use-input';

import Checkbox from './components/checkbox';
import InputField from './components/inputfield';

function App() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  //useInput Custom Hook to reduce code duplication
  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlueHandler: emailBlueHandler,
    reset: emailReset,
  } = useInput((value: string) => value.includes('@'));

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlueHandler: passwordBlueHandler,
    reset: passwordReset,
  } = useInput((value: string) => value.trim() !== '');

  const rememberMeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(!rememberMe);
  };

  //Handle form submit
  const signInHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const submittedData: { email: string; password: string } = {
      email: enteredEmail,
      password: enteredPassword,
    };
    if (emailIsValid && passwordIsValid) {
      //submit data to server
      console.log(submittedData);
      fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(submittedData),
      }).then((res) => {
        // if user checked Remember Me
        // server should return a JWT token and store it with the email to localstorage
        if (rememberMe) {
          console.log('store email to local storage');
        }
      });

      //reset the form
      emailReset();
      passwordReset();
      setRememberMe(false);
    }
  };

  useEffect(() => {
    //Form only can be submitted when email & password is valid
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    }
  }, [emailIsValid, passwordIsValid]);

  return (
    <div className={styles.container}>
      <h1>Sign in</h1>
      <form onSubmit={signInHandler}>
        <InputField
          type="email"
          name="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlueHandler}
          hasError={emailInputHasError}
          errorMsg="Please enter valid email"
        />
        <InputField
          type="password"
          name="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlueHandler}
          hasError={passwordInputHasError}
          errorMsg="Please enter valid password"
        />

        <Checkbox value={rememberMe} onChange={rememberMeHandler} />
        <button type="submit" disabled={!formIsValid}>
          Sign in
        </button>
      </form>
      <p>
        <a href="/">Forgot your password?</a>
      </p>

      <p>
        Don't have an account? <a href="/">Sign up</a>
      </p>
      <p>
        <a href="/">Resend email confirmation</a>
      </p>
    </div>
  );
}

export default App;
