import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Input, Button, Box } from '@material-ui/core';
import logo from '../../logoSpoonMe.png';

const handleClick = (search, props) => {
  console.log(search);
  props.dispatch({type: 'FETCH_SEARCH', payload: search});
}

const Nav = (props) => {
  const [search, setSearch] = useState('');

  return (<Box className="nav">
    <Link to="/home">
      <img width={80} src={logo}/>
    </Link>
    <Box className="nav-right">
      <Box className="navSearch">
        <Input placeholder="Search" defaultValue="" onChange={event => setSearch(event.target.value)}/>
        <Box display="inline" ml={1}>
          <Link to="/home">
            <Button variant="outlined" color="primary" onClick={() => handleClick(search, props)}>Search</Button>
          </Link>
        </Box>
      </Box>
      <Link className="nav-link" to="/userRecipes">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {!props.user.id ? 'Login / Register': 'Profile'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </Box>
  </Box>)
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
