import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

// Styling
import { Typography, Card, CardMedia, CardContent, Button, Box, TextField, withStyles, Grid } from '@material-ui/core';

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

  // makes a dispatch to get all the users recipes
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_USER_RECIPES'});
  };

  componentDidUpdate(oldProps){
    if(oldProps.data.setUserRecipes !== this.props.setUserRecipes){
      // this.props.dispatch({ type: 'FETCH_USER_RECIPES' });
    }
  }

  // sends the user to the retails page for the recipes they click on
  sendToUserRecipeDetails = (recipe) => {
    this.props.history.push(`/userRecipeDetails/${recipe.id}`)
  }

  // sends the user to the create recipe page
  sendToCreateRecipe = () =>{
    this.props.history.push({pathname:'/createRecipe'});
  }

  // saving the input of the search bar
  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  // sending a dispatch to get the recipe with the search term
  sendSearch = () =>{
    if(this.state.search === ''){
      this.props.dispatch({ type: 'FETCH_USER_RECIPES' });
      return;
    }
    this.props.dispatch({type: 'GET_SEARCH', payload: this.state.search});

    this.setState({
      search: ''
    })
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
              <TextField label="User Search" value={this.state.search} onChange={event => this.handleSearch(event)}/>
            <Box ml={1} mt={1} display="inline">
              <Button variant="outlined" onClick={this.sendSearch}>Search</Button>
            </Box>
          </Grid>
          <Grid item className={classes.createBtn} display="inline">
              <Button variant="outlined" color="secondary" onClick={(event)=>this.sendToCreateRecipe()}>Create New Recipe</Button>
          </Grid>
        </Grid>
        <Box className={classes.cards} mx="auto">
          {/* mapping through the recipes and displaying them in cards */}
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

const ReduxToProps = data => ({data})
export default connect(ReduxToProps)(withStyles(styles)(UserPage));
