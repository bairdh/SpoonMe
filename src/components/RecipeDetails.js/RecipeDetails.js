import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import { connect } from "react-redux";

class RecipeDetails extends Component{

    state = {
        recipe: this.props.location.recipe
    }

    handleSave = () => {
        this.props.dispatch({type: 'SAVE_USER_RECIPE', payload: this.state})
    }

    render(){
        console.log(this.props.data.user);

       let saveButton;

        if (this.props.data.user.id) {
             saveButton = (<Box>
                <Button onClick={this.handleSave}>save recipe</Button>
            </Box>)
        }else{
            saveButton = (<Box></Box>)
        }

        
        return(
            <div>
                <h2>{this.state.recipe.title}</h2>
                {saveButton}
                <br/>
                <img src={this.state.recipe.image} />
                <ol>
                    {this.state.recipe.analyzedInstructions[0].steps.map( step => (
                        <li>{step.step}</li>
                    ))}

                </ol>
                <div>
                    <p>extendedIngredients:</p>
                    <ul>
                        {this.state.recipe.extendedIngredients.map(steps => (
                            // steps.original = amount, unit, name
                            <li>{steps.original}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ) // return
    } // render
} // class

const ReduxToProps = data => ({data});

export default connect(ReduxToProps)(RecipeDetails);