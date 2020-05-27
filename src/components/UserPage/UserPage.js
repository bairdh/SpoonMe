import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Typography, Card, CardMedia, CardContent, Button, Box } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


class UserPage extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_USER_RECIPES'});
  };

  sendToUserRecipeDetails = (recipe) => {
    this.props.history.push({ pathname:'/userRecipeDetails', recipe})
  }

  sendToCreateRecipe = () =>{
    this.props.history.push({pathname:'/createRecipe'});
  }

    render(){
      return(   
      <Box>
        <Box>
          <Typography variant="h3">User recipes</Typography>
          <Button variant="outlined" color="secondary" onClick={(event)=>this.sendToCreateRecipe()}>Create New Recipe</Button>
        </Box>
         {this.props.data.setUserRecipes.map(recipe => (
           <Card className="card" onClick={(event) => this.sendToUserRecipeDetails(recipe)}>
             <CardMedia className="cardImage" component="img" src={recipe.image}></CardMedia>
             <CardContent>
               <Typography>{recipe.name}</Typography>
             </CardContent>
           </Card>
 
         ))}
       </Box>
   )
    }};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const ReduxToProps = data => ({data})

// this allows us to use <App /> in index.js
export default connect(ReduxToProps)(UserPage);
