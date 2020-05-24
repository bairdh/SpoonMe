import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeDetails from "../RecipeDetails.js/RecipeDetails";
import {Card, CardMedia, GridList, GridListTile, CardContent, Typography} from '@material-ui/core';
import Gallery from 'react-grid-gallery';

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
        console.log(this.props.data.setRecipes);
        return(
            <div>
                <button onClick={this.handleClick}>Test API</button>
                <br/>
               { this.props.data.setRecipes.map((recipe) => (           
                    <Card className="card" onClick={(event)=>this.sendToDetails(recipe)}>
                       <CardMedia className="cardImage" component="img" src={recipe.image}/>
                        <CardContent>
                            <Typography>{recipe.title}</Typography>
                        </CardContent>
                    </Card>

               ))}
               
            </div>
        ) //return
    } //render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(Search);