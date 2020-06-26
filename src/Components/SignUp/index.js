import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../imports/';
import { compose } from 'recompose';

const SignUp = () => (
  <div className="signup">
    <h1>Signup</h1>
    <SignUpForm  />  
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

class SignUpFormBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      }).catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      error
    } = this.state;

    const isInvalid = (
      password !== passwordConfirm ||
      password === '' ||
      email === '' ||
      username === ''
    );

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Enter your Full name"
        />
      
        <input 
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />

        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Create a password"
          />

        <input 
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm your password"
        />

        <button disabled={isInvalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);


export default SignUp;

export { SignUpForm, SignUpLink };