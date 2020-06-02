import React, { Component } from "react";
import { Button, Box, Typography, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
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

    handleSave = () => {
        this.props.dispatch({type: 'SAVE_USER_RECIPE', payload: this.state});
        swal({
            icon:"success",
            title: "Recipe successfully saved to your recipes!"
        });
    }

    render(){
        const {classes} = this.props;
        let saveButton;

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
                        {this.state.recipe.extendedIngredients.map(steps => (
                            <li>{steps.original}</li>
                        ))}
                    </ul>
                </Box>
                <Box className={classes.item}>
                    <Typography variant="h5">Directions:</Typography>
                    <ol>
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