import React, { Component } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { connect } from "react-redux";

class CreateRecipe extends Component{

    state = {
        name: '',
        image: '',
        ingredient: '',
        direction: '',
        ingredients: [],
        directions: [],
        notes: '',
        edit: {isTrue:false, key: ''}
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

    edit = (index) =>{
        this.setState({
            edit: {
                isTrue: !this.state.edit.isTrue,
                key: index}
        })
    }

    editOneDirection = (key) => {
        // create new copy of direction list 
        // but cut out the old step and replace it with the new one
        const newList = this.state.directions
        newList.splice(key, 1, this.state.direction);
        // replace the old direction list with the new one in state
        this.setState({
            directions: [...newList],
            edit:{
                isTrue: !this.state.edit.isTrue
            }
        })
    }

    editOneIngredient = (key) => {
        // create new copy of ingredient list 
        // but cut out the old step and replace it with the new one
        const newList = this.state.ingredients
        newList.splice(key, 1, this.state.ingredient);
        // replace the old ingredient list with the new one in state
        this.setState({
            ingredients: [...newList],
            edit:{
                isTrue: !this.state.edit.isTrue
            }
        })
    }

    removeDirectionListItem = (key) => {
        let newList = this.state.directions;
        newList.splice(key, 1);
        this.setState({
            directions: [...newList]
        })
    }
    removeIngredientListItem = (key) => {
        let newList = this.state.ingredients;
        newList.splice(key, 1);
        this.setState({
            ingredients: [...newList]
        })
    }

    sendRecipe = () =>{
        let recipe = {
            name: this.state.name,
            image: this.state.image,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            notes: this.state.notes
        };
        this.props.dispatch({type:'CREATE_RECIPE', payload: recipe});
        this.props.history.push({pathname: '/login'});
    }
    
    goToUserPage = () => {
        this.props.history.push({pathname:'/login'});
    }
    render(){
        let image;

        // toggles input for ingredients/directions List
        if(this.state.image !== ''){
            image =(<img src={this.state.image}/>)
        }else{
            image= <Box></Box>
        }

        return(
            <Box >
                <Button variant="outlined" onClick={this.goToUserPage}>Back to User Recipes</Button>
                <Typography variant="h3">Create Recipe</Typography>
                <TextField onChange={event => this.handleChange(event, "name")} variant="standard"
                    label="Name"/>
                    {image}
                <TextField onChange={event => this.handleChange(event, "image")}variant="standard"
                    label="Image"/>
                <Box>
                    <Box>
                        <Typography>Ingredients:</Typography>
                        <ul>
                            {this.state.ingredients.map((item, i) => {
                                if (this.state.edit.isTrue && this.state.edit.key === i) {
                                    return (<Box key={i}>
                                        <TextField onChange={event => this.handleChange(event, "ingredient")}
                                            defaultValue={item} />
                                        <Button onClick={() => this.editOneIngredient(i)}>Save Changes</Button>
                                    </Box>)
                                }
                                else {
                                    return (<li key={i}>{item}
                                        <EditOutlinedIcon fontSize="small" onClick={() => this.edit(i)} />
                                        <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeIngredientListItem(i)} /> </li>)
                                }
                            })}
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
                            {this.state.directions.map((step, i) => {
                                if(this.state.edit.isTrue && this.state.edit.key === i){
                                    return( <Box key={i}>
                                        <TextField onChange={event => this.handleChange(event, "direction")}
                                            label='Step'
                                            defaultValue={step}/>
                                        <Button onClick={()=>this.editOneDirection(i)}>Save Changes</Button>
                                    </Box>)
                                }
                                else{
                                    return( <li key={i}>{step} 
                                    <EditOutlinedIcon fontSize="small" onClick={() => this.edit(i)}/>
                                        <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeDirectionListItem(i)}/> </li>)
                                }

                            })}
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

                <TextField  variant="outlined"
                        multiline={true}
                        label="Notes"/>
                <Button onClick={this.sendRecipe} variant="outlined">Submit all</Button>
            </Box>
        ) // return
    } // render
} // class

const reduxToProps = data => ({data});

export default connect(reduxToProps)(CreateRecipe);