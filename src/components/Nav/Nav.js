import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Input, Button } from '@material-ui/core';


const handleClick = (search, props) => {
  console.log(search);
  props.dispatch({type: 'FETCH_SEARCH', payload: search});
}

const Nav = (props) => {
  const [search, setSearch] = useState('');


  return (<div className="nav">
    <Link to="/home">
      <img width={80} src="https://scontent.ffcm1-1.fna.fbcdn.net/v/t1.15752-9/99350421_1890253584438394_6196566935342153728_n.png?_nc_cat=105&_nc_sid=b96e70&_nc_ohc=YX9kX5rpBc4AX_CF_po&_nc_ht=scontent.ffcm1-1.fna&oh=e1f0236828dee330107b4fbc1e5e18ca&oe=5EEEC033"/>
    </Link>
    <div className="nav-right">
      <div className="navSearch">
        <Input placeholder="Search" defaultValue="" onChange={event => setSearch(event.target.value)}/>
        <Link to="/about">
          <Button variant="outlined" color="primary" onClick={() => handleClick(search, props)}>Search</Button>
        </Link>
      </div>
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/info">
            Info Page
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>)
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
