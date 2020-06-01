import React, { Component } from "react";
import { Box, Typography, Button, TextField, withStyles } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { connect } from "react-redux";
import swal from "sweetalert";


const styles = theme => ({
    mainContainer:{
        width: '80vw',
        margin: 'auto',
        textAlign: 'center'
    },
    items:{
        textAlign: 'left',
        border: 1
    },
    editBtn:{
        textAlign: 'right'
    }
})

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
        if(oldProps.data.setOneRecipe !== this.props.data.setOneRecipe){
            this.setState({
                ingredients: this.props.data.setOneRecipe.ingredients,
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

    editIsTrue = (id) => {
        this.setState({
            edit: {
                isTrue: !this.state.edit.isTrue,
                key: id
            }
        })
    }

    editOne = (id, type) => {
        let changes = {
            type: type,
            id: id,
            change: ''
        }

        if(type === "ingredient"){
            changes.change = this.state.ingredient;
        }else if(type === "direction"){
            changes.change = this.state.direction;
        } else if (type === "notes") {
            changes.change = this.state.notes;
            this.setState({
                editNotes: !this.state.editNotes
            })
        }
        this.props.dispatch({ type: "EDIT_USER_RECIPE", payload: changes});

        this.setState({
            edit: {
                isTrue: false
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
            ingredients: this.props.data.setOneRecipe.ingredients,
        })
    }

    directionList = () => {
        let item = {
            item: 'direction',
            direction: this.state.direction,
            step: (this.state.directions.length + 1),
            recipe: this.props.match.params.id
        }
        this.props.dispatch({ type: "ADD_ITEM", payload: item });
        this.setState({
            directions: [...this.state.directions, this.state.direction],
        })
    }

    removeDirectionListItem = (key) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: { item: 'direction', key: key } });
        let newList = this.state.directions;
        newList.splice(key, 1);
        this.setState({
            directions: [...newList]
        })
    }

    deleteRecipe = () =>{
        swal({
            title: "Are you sure you want to delete this recipe?",
            text: "Once deleted you will not be able to recover this recipe or any changes you may have made to it",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if(willDelete){
                this.props.dispatch({type: "DELETE_RECIPE", payload: this.props.data.setOneRecipe.id});
                swal("This recipe has been deleted!", {icon: "success"});
                this.props.history.push(`/login`)

            }else{
                swal("Recipe not deleted!");
            }
        })
    }

// ==================== RENDER ==========================
    render(){
        const {classes} = this.props;
        let ingredients;

        if(this.state.editIngredients){
            ingredients = (
            <Box className={classes.items} border={1}>
                    <Typography variant="h5">Ingredients:</Typography>
                <ol>
                        {this.props.data.setOneRecipe.ingredients.map(item => {
                        if(this.state.edit.isTrue && this.state.edit.key === item.id){
                            return (
                            <Box key={item.id}>
                                <TextField onChange={event => this.handleChange(event, "ingredient")}
                                        defaultValue={item.ingredient} />
                                <Button onClick={() => this.editOne(item.id, "ingredient")}>Save Changes</Button>
                            </Box>
                            )
                        }else{
                            return ( <li key={item.id}>{item.ingredient}  
                                 <EditOutlinedIcon fontSize="small" onClick={() => this.editIsTrue(item.id)} />
                                 <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeIngredientListItem(item.id)} />
                             </li>)
                        }
                    })}
                </ol>
                <Box>
                    <TextField onChange={event => this.handleChange(event, 'ingredient')}
                        ref="ingredient"
                        variant="standard"
                        label="Ingredient" />
                    <Button onClick={this.ingredientList}>Add</Button>
                </Box>
                    <Box className={classes.editBtn}>
                    <Button onClick={this.editIngredients}>Save</Button>
                </Box>
            </Box>)
        }else{
            ingredients = (
                <Box className={classes.items} border={1} borderColor="grey">
                    <Typography variant="h5">Ingredients:</Typography>
                    <ul>
                      {this.state.ingredients.map(item => {
                          return(<li key={item.id}>{item.ingredient}</li>)
                      })}
                      
                    </ul>
                    <Box className={classes.editBtn}>
                        <Button onClick={this.editIngredients}>edit</Button>
                    </Box>
                </Box>)
        }

        let directions;

        if(this.state.editDirections){
            directions = (
                <Box className={classes.items}>
                    <Typography variant="h5">Directions:</Typography>
                    <ul>
                        {this.state.directions.map(item => {
                            if (this.state.edit.isTrue && this.state.edit.key === item.id) {
                                return (
                                    <Box key={item.id}>
                                        <TextField onChange={event => this.handleChange(event, "direction")}
                                            defaultValue={item.direction} />
                                        <Button onClick={() => this.editOne(item.id, "direction")}>Save Changes</Button>
                                    </Box>
                                )
                            } else {
                                return (<li key={item.id}>{item.direction}
                                    <EditOutlinedIcon fontSize="small" onClick={() => this.editIsTrue(item.id)} />
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
                    <Box className={classes.editBtn}>
                        <Button onClick={this.editDirections}>Save</Button>
                    </Box>
                </Box>)
        }else{
            directions =(
                <Box className={classes.items}>
                    <Typography variant="h5">Directions:</Typography>
                <ol>
                    {this.state.directions.map(step => (
                        <li key={step.id}>{step.direction}</li>
                    ))}
                </ol>
                    <Box className={classes.editBtn}>
                    <Button onClick={this.editDirections}>edit</Button>
                </Box>
            </Box>)
        }

        let notes;

        if (this.state.editNotes){
            notes = ( 
                <Box className={classes.items}>
                <Typography variant="h5">NOTES:</Typography>
                <TextField onChange={event => this.handleChange(event, 'notes')}
                    ref="Notes"
                    fullWidth={true}
                    variant="outlined"
                    multiline={true}
                    defaultValue={this.state.notes} />
                    <Box className={classes.editBtn}>
                        <Button onClick={() => this.editOne(this.props.data.setOneRecipe.id, "notes")}>SAVE</Button>
                    </Box>
            </Box>
                )
        }else{
            notes = (
                <Box className={classes.items}>
                    <Typography variant="h5">NOTES:</Typography>
                    <Typography ml={2}>{this.state.notes}</Typography>
                    <Box className={classes.editBtn}>
                        <Button onClick={this.editNotes}>edit</Button>
                    </Box>
                </Box>
                )
        }
        console.log(this.props.data.setOneRecipe);
// ==================== RETURN ==========================
        console.log(this.props.data.setOneRecipe.ingredients);
        return(
            <Box >
            <Button variant="outlined" onClick={this.goToUserPage}>Back to User Recipes</Button>
                <Box className={classes.mainContainer}>
                    <Typography variant="h3">{this.props.data.setOneRecipe.name}</Typography>
                    <img src={this.props.data.setOneRecipe.image} />
                    {ingredients}
                    {directions}
                    {notes}
                    <Box className={classes.editBtn} mt={4}>
                        <Button onClick={this.deleteRecipe} variant="contained" color="secondary">DELETE RECIPE</Button>
                    </Box>
                </Box>
            </Box>
        ) //return
    } // render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(withStyles(styles)(UserRecipeDetails));