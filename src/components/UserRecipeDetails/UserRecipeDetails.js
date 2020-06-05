import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from 'react-dom';

// Styling
import { Box, Typography, Button, TextField, withStyles } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Grid, Row, Col } from 'react-flexbox-grid';
import swal from "sweetalert";
import '../App/App.css';

const styles = theme => ({
    mainContainer:{
        width: '80vw',
        margin: 'auto',
        textAlign: 'center',
        borderRadius: 10,
        background: 'rgba(255, 255, 255, 0.678)'
    },
    items:{
        textAlign: 'left',
    },
    editBtn:{
        textAlign: 'right',
        verticalAlign: 'middle',
    },
    icon:{
        width: '8px',
        verticalAlign: 'middle',
        marginRight: 4
    },
    grid:{
        marginTop: '17px'
    },
    inline:{
        display: 'inline'
    },
    input: {
        width: 400
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

    // gets the recipe details using the recipe id that was sent over from UserPage
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_ONE_RECIPE', payload: this.props.match.params.id});
    }

    // Changing state to reflect any changes to the database
    componentDidUpdate(oldProps, oldState){  
        // if the data coming from the database has changed change the state as well 
        if(oldProps.data.setOneRecipe !== this.props.data.setOneRecipe){
            this.setState({
                ingredients: this.props.data.setOneRecipe.ingredients,
                directions: this.props.data.setOneRecipe.directions,
                notes: this.props.data.setOneRecipe.notes
            })
        }
        if(oldState.ingredient === ''){
            // this.setState({
            //     ingredient: 
            // })
        }
    }

    // sends the user back to the UserPage
    goToUserPage = () => {
        this.props.history.push({ pathname: '/userRecipes' });
    }

    // saves the input if the user is adding ingredients, directions, or notes
    handleChange = (event, prop) => {
        this.setState({
            [prop]: event.target.value
        })
    }
    // toggles between editing the each section and not editing
    edit = (prop) => {
        if(prop === "ingredient"){
            this.setState({
                editIngredients: !this.state.editIngredients
            })
        }
        else if(prop === "direction"){
            this.setState({
                editDirections: !this.state.editDirections
            })
        }
        else if(prop === "notes"){
            this.setState({
                editNotes: !this.state.editNotes
            })
        }
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
            if(this.state.ingredient === ''){
                this.setState({
                    edit: {
                        isTrue: false
                    }
                })
                return;
            }
            changes.change = this.state.ingredient;
        }else if(type === "direction"){
            if (this.state.direction === '') {
                this.setState({
                    edit: {
                        isTrue: false
                    }
                })
                return;
            }
            changes.change = this.state.direction;
        } else if (type === "notes") {
            if (this.state.notes === '') {
                this.setState({
                    edit: {
                        isTrue: false
                    }
                })
                return;
            }
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
            direction: ''
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
                this.props.history.push(`/userRecipes`)

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
            <Box className={classes.items}>
                    <Typography variant="h5">Ingredients:</Typography>
                    <Grid fluid className={classes.grid}> 
                            {this.props.data.setOneRecipe.ingredients.map(item => {
                            if(this.state.edit.isTrue && this.state.edit.key === item.id){
                                return (
                                <Box key={item.id}>
                                    <Box className={classes.items} display="inline">
                                        <TextField onChange={event => this.handleChange(event, "ingredient")}
                                                defaultValue={item.ingredient} />
                                    </Box>
                                        <Box className={classes.editBtn} ml={2} display="inline">
                                        <Button variant="outlined" onClick={() => this.editOne(item.id, "ingredient")}>Save Changes</Button>
                                    </Box>
                                </Box>
                                )
                            }else{
                                return (
                                    <Row between="xs">
                                        <Col start='xs' xs={10} >
                                            <FiberManualRecordIcon className={classes.icon}/>
                                            <p className={classes.inline}>{item.ingredient}</p>
                                        </Col>
                                        <Col xs={1}>
                                            <EditOutlinedIcon fontSize="small" onClick={() => this.editIsTrue(item.id)} />
                                        </Col>
                                        <Col xs={1}>
                                            <RemoveCircleOutlineIcon  fontSize="small" onClick={() => this.removeIngredientListItem(item.id)} />
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                </Grid>
                <Box>
                    <TextField onChange={event => this.handleChange(event, 'ingredient')}
                        variant="standard"
                        label="Ingredient" />
                        <Button variant="outlined" onClick={this.ingredientList}>Add</Button>
                </Box>
                    <Box className={classes.editBtn}>
                        <Button variant="outlined" onClick={() => this.edit("ingredient")}>Save</Button>
                </Box>
            </Box>)
        }else{
            ingredients = (
                <Box className={classes.items} mt={2}>
                    <Typography variant="h5">Ingredients:</Typography>
                    <Grid fluid className={classes.grid}> 
                      {this.state.ingredients.map(item => {
                          return(
                              <Row between="xs">
                                  <Col start='xs' xs={10} >
                                      <FiberManualRecordIcon className={classes.icon} />
                                      {item.ingredient}
                                  </Col>
                              </Row>
                          )
                      })}
                    </Grid>
                    <Box className={classes.editBtn}>
                        <Button variant="outlined" onClick={() => this.edit("ingredient")}>edit</Button>
                    </Box>
                </Box>)
        }

        let directions;

        if(this.state.editDirections){
            directions = (
                <Box className={classes.items}>
                    <Typography variant="h5">Directions:</Typography>
                    <Grid fluid>
                        {this.state.directions.map((item, i) => {
                            if (this.state.edit.isTrue && this.state.edit.key === item.id) {
                                return (
                                    <Box key={item.id}>
                                        <Box display="inline" mr={1}>
                                            <TextField onChange={event => this.handleChange(event, "direction")}
                                                className={classes.input}
                                                multiline
                                                defaultValue={item.direction} />
                                        </Box>
                                        <Box display="inline" className={classes.editBtn}>
                                            <Button variant="outlined" onClick={() => this.editOne(item.id, "direction")}>Save Changes</Button>
                                        </Box>
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box mb={1}>
                                        <Row between="xs" className={classes.grid}>
                                            <Col xs={10}>
                                                <p className={classes.inline}>{i + 1}. </p>
                                                <p className={classes.inline}>{item.direction}</p>
                                            </Col>
                                            <Col xs={1}>
                                                <EditOutlinedIcon fontSize="small" onClick={() => this.editIsTrue(item.id)} />
                                            </Col>
                                            <Col xs={1}>
                                                <RemoveCircleOutlineIcon fontSize="small" onClick={() => this.removeDirectionListItem(item.id)} />
                                            </Col>
                                        </Row>
                                    </Box>)}})}
                    </Grid>
                    <Box display="inline">
                        <TextField className={classes.input} onChange={event => this.handleChange(event, 'direction')}
                            ref="direction"
                            variant="standard"
                            multiline={true}
                            label="Direction" />
                    </Box>
                    <Box display="inline">
                        <Button variant="outlined" mt={1} onClick={this.directionList}>Add</Button>
                    </Box>
                    <Box className={classes.editBtn}>
                        <Button variant="outlined" className={classes.editBtn} onClick={() => this.edit("direction")}>Save</Button>
                    </Box>
                </Box>)
        }else{
            directions =(
                <Box className={classes.items}>
                    <Typography variant="h5">Directions:</Typography>
                <Grid fluid>
                    {this.state.directions.map((step, i) => (
                        <Box mb={1}>
                            <Row className={classes.grid}>
                                <Col xs={12}>
                                    <p className={classes.inline}>{i + 1}. </p>
                                    <p className={classes.inline}>{step.direction}</p>
                                </Col>
                            </Row>
                        </Box>
                    ))}
                </Grid>
                    <Box className={classes.editBtn}>
                        <Button variant="outlined" onClick={() => this.edit("direction")}>edit</Button>
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
                    <Box className={classes.editBtn} mt={1}>
                        <Button variant="outlined" onClick={() => this.editOne(this.props.data.setOneRecipe.id, "notes")}>SAVE</Button>
                    </Box>
            </Box>
                )
        }else{
            notes = (
                <Box className={classes.items}>
                    <Typography variant="h5">NOTES:</Typography>
                    <Typography className='notes' ml={2}>{this.state.notes}</Typography>
                    <Box className={classes.editBtn}>
                        <Button variant="outlined" onClick={() => this.edit("notes")}>edit</Button>
                    </Box>
                </Box>
                )
        }
        console.log(this.props.data.setOneRecipe);
// ==================== RETURN ==========================
        console.log(this.props.data.setOneRecipe.ingredients);
        return(
            <Box>
                <Box my={3} ml={2}>
                    <Button variant="outlined" onClick={this.goToUserPage}>Back to User Recipes</Button>
                </Box>
                <Box className={classes.mainContainer} boxShadow={3} p={2}>
                    <Typography variant="h3">{this.props.data.setOneRecipe.name}</Typography>
                    <img src={this.props.data.setOneRecipe.image} className="detailImage"/>
                    {ingredients}
                    {directions}
                    {notes}
                </Box>
                <Box className={classes.editBtn} my={4} mr={3}>
                    <Button onClick={this.deleteRecipe} variant="contained" color="secondary">DELETE RECIPE</Button>
                </Box>
            </Box>
        ) //return
    } // render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(withStyles(styles)(UserRecipeDetails));