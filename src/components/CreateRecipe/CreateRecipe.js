import React, { Component } from "react";
import { Box, Typography, TextField } from "@material-ui/core";

class CreateRecipe extends Component{
    render(){
        return(
            <Box>
                <Typography variant="h3">Create Recipe</Typography>
                <TextField variant="standard"
                    label="Recipe Title"/>
                <TextField variant="standard"
                    label="Recipe Image"/>
                <TextField variant="standard"
                    label="Recipe Ingredient"/>
                <TextField variant="standard"
                    label="Recipe directions"/>
            </Box>
        ) // return
    } // render
} // class

export default CreateRecipe;