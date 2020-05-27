import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Typography } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const UserPage = (props) => {
    useEffect(() => {
      props.dispatch({type: 'FETCH_USER_RECIPES'});
    })

     return( 
     <div>
        <Typography variant="h3">User recipes</Typography>
      </div>
  )};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const ReduxToProps = data => ({data})

// this allows us to use <App /> in index.js
export default connect(ReduxToProps)(UserPage);
