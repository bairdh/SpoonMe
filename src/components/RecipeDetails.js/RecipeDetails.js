import React, { Component } from "react";
import { useLocation } from "react-router-dom";

class RecipeDetails extends Component{

    render(){
        console.log(this.props.location.recipe);
        
        return(
            <div>
                <h2>{this.props.location.recipe.title}</h2>
                <img src={this.props.location.recipe.image} />
                {this.props.location.recipe.instructions}
                <div>
                    <p>extendedIngredients:</p>
                    <ol>
                        {this.props.location.recipe.extendedIngredients.map(steps => (
                            // steps.original = amount, unit, name
                            <li>{steps.amount}{steps.unit} {steps.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
        ) // return
    } // render
} // class


export default RecipeDetails;