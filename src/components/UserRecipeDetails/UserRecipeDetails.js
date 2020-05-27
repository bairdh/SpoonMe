import React, { Component } from "react";
import { Box, Typography, Button } from "@material-ui/core";

class UserRecipeDetails extends Component{
    render(){
        console.log(this.props.location.recipe);
        
        return(
            <Box>
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