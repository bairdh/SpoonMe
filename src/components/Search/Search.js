import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeDetails from "../RecipeDetails.js/RecipeDetails";
import {Card, CardMedia, GridList, GridListTile, CardContent, Typography} from '@material-ui/core';
import Gallery from 'react-grid-gallery';

class Search extends Component{

    // state = {
    //     imageList: [{ 
    //         src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    //         thumbnail: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
    //         thumbnailWidth: 300,
    //         thumbnailHeight: 300
    //     }]
    // }

handleClick =() =>{
    this.props.dispatch({type:'FETCH_RANDOM_RECIPES'});
    //  this.props.data.setRandom.map((recipe) => (
    //    this.setState({
    //        imageList: [...this.state.imageList, 
    //         {src:recipe.image,
    //         thumbnail: recipe.image,
    //         thumbnailWidth: 300,
    //         thumbnailHeight: 300}]
    //    })
    // ))
}

    sendToDetails = (recipe) =>{
        this.props.history.push({pathname:'/recipeDetails', recipe});
    }


    render(){
        console.log(this.props.data.setRandom);
        return(
            <div>
                This is my search page!
                <br/>
                <button onClick={this.handleClick}>Test API</button>
                <br/>
                {/* <RecipeDetails recipe={recipe} /> */}
               { this.props.data.setRandom.map((recipe) => (           
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