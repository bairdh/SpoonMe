import React, { Component } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

class CreateRecipe extends Component{

    state = {
        title: '',
        image: '',
        ingredient: '',
        direction: '',
        ingredients: [],
        directions: []
    }

    handleChange = (event, prop) => {
        this.setState({
            [prop]: event.target.value
        })        
    }

    ingredientList = () => {
        this.setState({
           ingredients: [...this.state.ingredients, this.state.ingredient],
        })
    }
    
    directionList = () => {
        this.setState({
           directions: [...this.state.directions, this.state.direction],
        })
    }

    render(){
        return(
            <Box>
                <Typography variant="h3">Create Recipe</Typography>
                <TextField onChange={event => this.handleChange(event, "title")} variant="standard"
                    label="Title"/>
                <TextField onChange={event => this.handleChange(event, "image")}variant="standard"
                    label="Image"/>
                <Box>
                    <Box>
                        <Typography>Ingredients:</Typography>
                        <ul>
                            {this.state.ingredients.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>

                    </Box> {/* End Ingredient List */}
                    <TextField onChange={event => this.handleChange(event, "ingredient")}
                        ref="ingredient" 
                        variant="standard"
                        label="Ingredient"/>
                    <Button onClick={this.ingredientList} 
                        variant="outlined" 
                        color="secondary">Add Ingredient</Button>
                </Box> {/* End Ingredient Box */} 
                <Box>
                    <Box>
                        <Typography>Directions:</Typography>
                        <ol>
                            {this.state.directions.map((step, i) => (
                                <li key={i}>{step} < EditOutlinedIcon fontSize="small" onClick={}/><RemoveCircleOutlineIcon fontSize="small"/> </li>
                            ))}
                        </ol>
                    </Box> {/* End Direction List */}
                    <TextField onChange={event => this.handleChange(event, "direction")} 
                        variant="outlined"
                        multiline={true}
                        label="Directions"/>
                    <Button onClick={this.directionList}
                        variant="outlined" 
                        color="secondary">Add Direction</Button>
                        <br/>
                </Box>  {/* End Direction Box */}
                <Button variant="outlined">Submit all</Button>
            </Box>
        ) // return
    } // render
} // class

export default CreateRecipe;