import React, { Component } from "react";
import { useLocation } from "react-router-dom";

class RecipeDetails extends Component{

    render(){
        console.log(this.props.location.recipe);
        
        return(
            <div>
                <h2>{this.props.location.recipe.title}</h2>
                <img src={this.props.location.recipe.image} />
                <ol>
                    {this.props.location.recipe.analyzedInstructions[0].steps.map( step => (
                        <li>{step.step}</li>
                    ))}

                </ol>
                <div>
                    <p>extendedIngredients:</p>
                    <ul>
                        {this.props.location.recipe.extendedIngredients.map(steps => (
                            // steps.original = amount, unit, name
                            <li>{steps.original}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ) // return
    } // render
} // class


export default RecipeDetails;