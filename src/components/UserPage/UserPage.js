import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Typography, Card, CardMedia, CardContent, Button, Box, TextField, withStyles, Grid } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const styles = theme => ({
  mainContainer:{
    textAlign: 'center'
  },
  createBtn:{
    marginRight: 20
  },
  search:{
    marginLeft: 20
  }
});

class UserPage extends Component {

  state = {
    search: ''
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_USER_RECIPES'});
  };

  sendToUserRecipeDetails = (recipe) => {
    this.props.history.push(`/userRecipeDetails/${recipe.id}`)
  }

  sendToCreateRecipe = () =>{
    this.props.history.push({pathname:'/createRecipe'});
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  sendSearch = () =>{
    this.props.dispatch({type: 'GET_SEARCH', payload: this.state.search});
  }

    render(){  
      const {classes} = this.props;          
      return(   
      <Box className={classes.mainContainer}> 
        <Typography variant="h3">User recipes</Typography>
        <Grid 
          justify="space-between" 
          container
          spacing={2}>
          <Grid item className={classes.search} display="inline">
            <TextField mr={3} onChange={event => this.handleSearch(event)}/>
              <Button variant="outlined" onClick={this.sendSearch}>Search</Button>
          </Grid>
          <Grid item className={classes.createBtn} display="inline">
              <Button variant="outlined" color="secondary" onClick={(event)=>this.sendToCreateRecipe()}>Create New Recipe</Button>
          </Grid>
        </Grid>
        <Box className={classes.cards} mx="auto">
          {this.props.data.setUserRecipes.map(recipe => (
            <Card key={recipe.id} className="card" onClick={(event) => this.sendToUserRecipeDetails(recipe)}>
              <CardMedia className="cardImage" component="img" src={recipe.image}></CardMedia>
              <CardContent>
                <Typography>{recipe.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
       </Box>
   )
    }};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const ReduxToProps = data => ({data})

// this allows us to use <App /> in index.js
export default connect(ReduxToProps)(withStyles(styles)(UserPage));
