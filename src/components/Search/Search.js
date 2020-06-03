import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RecipeDetails from "../RecipeDetails.js/RecipeDetails";

// Styling
import {Card, CardMedia, GridList, GridListTile, CardContent, Typography, Box, withStyles, Button} from '@material-ui/core';
import '../App/App.css';

const styles = theme => ({
    mainContainer: {
        textAlign: 'center'
    }
});

class Search extends Component{

    componentDidMount(){
    }
    
    // fetches the random recipes from the API
    // Will switch to componentDidMount for production
    handleClick =() =>{
        this.props.dispatch({type:'FETCH_RANDOM_RECIPES'});
    }

    sendToDetails = (recipe) =>{
        this.props.history.push({pathname:'/recipeDetails', recipe});
    }

    render(){
        const { classes } = this.props;
        return(
            <Box mx="auto"> 
                {/* Button will be removed for production*/}
                <Button variant="outlined" onClick={this.handleClick}>Test API</Button>
                <Box mx="auto" className={classes.mainContainer}>
                    {/* mapping through the list of recipes received from the API 
                        And displaying the title and image in a card*/}
                    { this.props.data.setRecipes.map((recipe) => (           
                            <Card className="card" onClick={(event)=>this.sendToDetails(recipe)}>
                            <CardMedia className="cardImage" component="img" src={recipe.image}/>
                                <CardContent>
                                    <Typography>{recipe.title}</Typography>
                                </CardContent>
                            </Card>
                    ))}
                </Box>
            </Box>
        ) //return
    } //render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(withStyles(styles)(Search));