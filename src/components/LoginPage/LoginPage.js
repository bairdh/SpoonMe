import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Box, withStyles, TextField, Button} from '@material-ui/core';

const styles = () => ({
  outline: {
    width: '50vw',
    maxWidth: '450px',
    minWidth: '300px',
    background: 'rgba(255, 255, 255, 0.678)',
    padding: 4,
    paddingBottom: 4,
    borderRadius: 30

  },
  form:{
    margin: 'auto',
    textAlign: 'center',
   
  },
  loginBtn:{
      margin: 10,
  }
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Box className={classes.outline} boxShadow={3} mx="auto" my={4}>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className={classes.form}>
          <h1>Login</h1>
          <Box>
              <TextField
                type="text"
                name="username"
                label= "Username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </Box>
          <Box>
              <TextField
                type="password"
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </Box>
          <Box>
            <Box mt={3} mb={2}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                name="submit"
                value="Log In"
              >Login</Button>
            </Box>
          </Box>
        </form>
        <center>
          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </Box>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps) (withStyles(styles)(LoginPage));
