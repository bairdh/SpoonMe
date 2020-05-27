import React, { Component } from "react";
import { Box, Typography, Button } from "@material-ui/core";

class UserRecipeDetails extends Component{

     goToUserPage = () => {
        this.props.history.push({ pathname: '/login' });
    }


    render(){
        console.log(this.props.location.recipe);
        
        return(
            <Box>
                <Button variant="outlined" onClick={this.goToUserPage}>Back to User Recipes</Button>
                <Typography>{this.props.location.recipe.name}</Typography>
                <img src={this.props.location.recipe.image} />
                <Box>
                    <ul>
                        {this.props.location.recipe.ingredients.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </Box>
                <Box>
                    <ol>
                        {this.props.location.recipe.directions.map(step => (
                        <li>{step}</li>
                        ))}
                    </ol>
                </Box>


            </Box>
        ) //return
    } // render
} //class

export default UserRecipeDetails;