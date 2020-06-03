import React, {Component} from 'react';
import {HashRouter as Router, Route,Redirect,Switch,} from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import UserPage from '../UserPage/UserPage';
import Search from '../Search/Search';
import RecipeDetails from '../RecipeDetails.js/RecipeDetails';
import UserRecipeDetails from '../UserRecipeDetails/UserRecipeDetails';
import CreateRecipe from '../CreateRecipe/CreateRecipe';

// Styling
import './App.css';
import { Box } from '@material-ui/core';


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }
  render() {
    return (
      <Router>
        <Box className='appContainer'>
          <Nav  dispatch={this.props.dispatch}/>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/home will show the Search page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/home"
              component={Search}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/userRecipes"
              component={UserPage}
            />
            <Route
            path="/recipeDetails"
            component={RecipeDetails} />

            <ProtectedRoute
            path="/userRecipeDetails/:id"
            component={UserRecipeDetails} />

            <ProtectedRoute 
              path="/createRecipe"
            component={CreateRecipe}/>
            
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        {/* <Footer /> */}
        </Box>
      </Router>
  )}
}

export default connect()(App);
