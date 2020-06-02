import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeDetails from "../RecipeDetails.js/RecipeDetails";
import {Card, CardMedia, GridList, GridListTile, CardContent, Typography, Box, withStyles, Button} from '@material-ui/core';
import Gallery from 'react-grid-gallery';
import '../App/App.css';

const styles = theme => ({
    mainContainer: {
        textAlign: 'center'
    }
});

class Search extends Component{

    componentDidMount(){
    }
    
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
                <Button variant="outlined" onClick={this.handleClick}>Test API</Button>
                <Box mx="auto" className={classes.mainContainer}>
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