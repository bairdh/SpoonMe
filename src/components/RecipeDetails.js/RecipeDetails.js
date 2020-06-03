import React, { Component } from "react";
import { connect } from "react-redux";

// Styling
import { Button, Box, Typography, withStyles } from "@material-ui/core";
import swal from "sweetalert";

const styles =  theme =>({
    mainContainer:{
        textAlign: 'center',
        maxWidth: '80vw',
        background: 'rgba(255, 255, 255, 0.678)',
        borderRadius: 10
    },
    saveBtn:{
        textAlign: 'right'
    },
    item:{
        textAlign: 'left'
    }
})


class RecipeDetails extends Component{

    state = {
        recipe: this.props.location.recipe
    }

    // On click of the save button this sends a dispatch to add the recipe to the database
    handleSave = () => {
        this.props.dispatch({type: 'SAVE_USER_RECIPE', payload: this.state});
        // notifying the user that the recipe was saved
        swal({
            icon:"success",
            title: "Recipe successfully saved to your recipes!"
        });
    }

    render(){
        const {classes} = this.props;
        let saveButton;

        // only if the user is logged in can they see the Save Recipe button
        if (this.props.data.user.id) {
             saveButton = (<Box>
                <Button variant="outlined" onClick={this.handleSave}>save recipe</Button>
            </Box>)
        }else{
            saveButton = (<Box></Box>)
        }
        
        return( 
        <Box mb={4}>
            <Box className={classes.saveBtn} m={2}>
                {saveButton}
            </Box>        
                <Box mx="auto" mp={4} boxShadow={3} p={2} className={classes.mainContainer}>
                <Typography variant="h3">{this.state.recipe.title}</Typography>
                <br/>
                    <img src={this.state.recipe.image} className="detailImage"/>
                <Box className={classes.item}>
                    <Typography variant="h5">Ingredients:</Typography>
                    <ul>
                        {/* mapping through the ingredients and displaying them in a list */}
                        {this.state.recipe.extendedIngredients.map(steps => (
                            <li>{steps.original}</li>
                        ))}
                    </ul>
                </Box>
                <Box className={classes.item}>
                    <Typography variant="h5">Directions:</Typography>
                    <ol>
                        {/* mapping through the directions and displaying them in a list */}
                        {this.state.recipe.analyzedInstructions[0].steps.map( step => (
                            <li>{step.step}</li>
                        ))}

                    </ol>
                </Box>
            </Box>
            </Box>
        ) // return
    } // render
} // class

const ReduxToProps = data => ({data});

export default connect(ReduxToProps)(withStyles(styles)(RecipeDetails));