import React, { Component } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { connect } from "react-redux";

class UserRecipeDetails extends Component{

    state = {
        ingredient: '',
        direction: '',
        notes: '',
        ingredients: [],
        directions: [],
        edit: {
            isTrue: false,
            key: ''
        },
        editIngredients: false,
        editDirections: false,
        editNotes: false
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.props.dispatch({ type: 'FETCH_ONE_RECIPE', payload: this.props.match.params.id});
    }

    componentDidUpdate(oldProps){        
        if(oldProps.data.setOneRecipe.ingredients === undefined && this.props.data.setOneRecipe.ingredients){
            this.setState({
                // ingredients: this.props.data.setOneRecipe.ingredients,
                directions: this.props.data.setOneRecipe.directions,
                notes: this.props.data.setOneRecipe.notes
            })
        }
    }


    goToUserPage = () => {
        this.props.history.push({ pathname: '/login' });
    }

    handleChange = (event, prop) => {
        this.setState({
            [prop]: event.target.value
        })
    }

    editIngredients = () => {
        this.setState({
            editIngredients: !this.state.editIngredients
        })
    }

    editDirections = () => {
        this.setState({
            editDirections: !this.state.editDirections
        })
    }

    editNotes = () =>{
        this.setState({
            editNotes: !this.state.editNotes
        })
    }

    edit = (index) => {
        this.setState({
            edit: {
                isTrue: !this.state.edit.isTrue,
                key: index
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
            edit: {
                isTrue: !this.state.edit.isTrue
            }
        })
    }

    removeIngredientListItem = (key) => {
        this.props.dispatch({type:"DELETE_ITEM", payload: {item: 'ingredient', key: key}});
        let newList = this.state.ingredients;
        newList.splice(key, 1);
        this.setState({
            ingredients: [...newList]
        })
    }

    ingredientList = () => {
    let item = {
        item: 'ingredient',
        ingredient: this.state.ingredient,
        recipe: this.props.match.params.id
    }
        this.props.dispatch({ type: "ADD_ITEM", payload: item});
        this.setState({
            ingredients: [...this.state.ingredients, this.state.ingredient],
        })
    }

    directionList = () => {
        let item = {
            item: 'direction',
            direction: this.state.direction,
            step: this.state.directions.length,
            recipe: this.props.match.params.id
        }
        this.props.dispatch({ type: "ADD_ITEM", payload: item });
        this.setState({
            directions: [...this.state.directions, this.state.direction],
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
            edit: {
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

    editUserRecipe = () => {
        let recipe = {
            id: this.props.data.setOneRecipe.id,
            title: this.props.data.setOneRecipe.title,
            image: this.props.data.setOneRecipe.image,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            notes: this.state.notes
        }
        // this.props.dispatch({type: 'EDIT_USER_RECIPE', payload: recipe});
        this.setState({
            editIngredients: false,
            editDirections: false,
            editNotes: false
        });
    }
// ==================== RENDER ==========================
    render(){
        console.log(`state:`, this.state);
        let ingredients;

        if(this.state.editIngredients){
            ingredients = (
            <Box>
                <Typography>Ingredients:</Typography>
                <ul>
                        {this.props.data.setOneRecipe.ingredients.map(item => {
                        if(this.state.edit.isTrue && this.state.edit.key === item.id){
                            return (
                            <Box key={item.id}>
                                <TextField onChange={event => this.handleChange(event, "ingredient")}
                                        defaultValue={item.ingredient} />
                                <Button onClick={() => this.editOneIngredient(item.id)}>Save Changes</Button>
                            </Box>
                            )
                        }else{
                            return ( <li key={item.id}>{item.ingredient}  
                                 <EditOutlinedIcon fontSize="small" onClick={() => this.edit(item.id)} />
                                 <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeIngredientListItem(item.id)} />
                             </li>)
                        }
                    })}
                </ul>
                <Box>
                    <TextField onChange={event => this.handleChange(event, 'ingredient')}
                        ref="ingredient"
                        variant="standard"
                        label="Ingredient" />
                    <Button onClick={this.ingredientList}>Add</Button>
                </Box>
                <Button onClick={this.editIngredients}>Save</Button>
            </Box>)
        }else{
            ingredients = (
                <Box>
                    <Typography>Ingredients:</Typography>
                    {this.props.data.setOneRecipe.ingredients}
                    <ul>
                      {this.props.data.setOneRecipe.ingredients.map(item => {
                          return(<li>{item.ingredient}</li>)
                      })}
                      
                    </ul>
                    <Button onClick={this.editIngredients}>edit</Button>
                </Box>)
        }

        // {
        //     this.state.directions.map(step => (
        //         <li>{step.direction}</li>
        //     ))
        // }

        let directions;

        if(this.state.editDirections){
            directions = (
                <Box>
                    <Typography>Directions:</Typography>
                    <ul>
                        {this.state.directions.map(item => {
                            if (this.state.edit.isTrue && this.state.edit.key === item.id) {
                                return (
                                    <Box>
                                        <TextField onChange={event => this.handleChange(event, "direction")}
                                            defaultValue={item.direction} />
                                        <Button onClick={() => this.editOneDirection(item.id)}>Save Changes</Button>
                                    </Box>
                                )
                            } else {
                                return (<li key={item.id}>{item.direction}
                                    <EditOutlinedIcon fontSize="small" onClick={() => this.edit(item.id)} />
                                    <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeDirectionListItem(item.id)} />
                                </li>)
                            }
                        })}
                    </ul>
                    <Box>
                        <TextField onChange={event => this.handleChange(event, 'direction')}
                            ref="direction"
                            variant="standard"
                            label="Direction" />
                        <Button onClick={this.directionList}>Add</Button>
                    </Box>
                    <Button onClick={this.editDirections}>Save</Button>
                </Box>)
        }else{
            directions =(
            <Box>
                <ol>
                    {this.state.directions.map(step => (
                        <li>{step.direction}</li>
                    ))}
                </ol>
                    <Button onClick={this.editDirections}>edit</Button>
            </Box>)
        }

        let notes;

        if (this.state.editNotes){
            notes = ( 
            <Box>
                <TextField onChange={event => this.handleChange(event, 'notes')}
                    ref="Notes"
                    variant="standard"
                    label="Notes"
                    multiline={true}
                    defaultValue={this.state.notes} />
                <Button onClick={this.editNotes}>SAVE</Button>
            </Box>
                )
        }else{
            notes = (
                <Box>
                    <Typography>{this.state.notes}</Typography>
                    <Button onClick={this.editNotes}>edit</Button>
                </Box>
                )
        }
// ==================== RETURN ==========================
        return(
            <Box>
                <Button variant="outlined" onClick={this.goToUserPage}>Back to User Recipes</Button>
                <Typography>{this.props.data.setOneRecipe.name}</Typography>
                <img src={this.props.data.setOneRecipe.image} />
                {ingredients}
                {directions}
                <Box>
                    <Typography>NOTES:</Typography>
                   {notes}
                </Box>
            <Button onClick={this.editUserRecipe}>Submit Changes</Button>
            </Box>
        ) //return
    } // render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(UserRecipeDetails);