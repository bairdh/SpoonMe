import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* saveUserRecipe(action) {
    yield axios.post('/api/userRecipe/', action.payload);
}

function* fetchUserRecipes(action){
    const res= yield axios.get('/api/userRecipe/');
    yield put({type:"SET_USER_RECIPES", payload: res.data});
}

function* fetchOneRecipe(action){
    const res = yield axios.get(`/api/userRecipe/${action.payload}`);
    yield put({type:"SET_ONE_RECIPE", payload: res.data[0]});
}

function* createRecipe(action){
    yield axios.post(`/api/userRecipe/create`, action.payload);
    yield put({type: 'FETCH_USER_RECIPES'});

}

function* editUserRecipe(action){
    let res = yield axios.put('/api/userRecipe/edit', action.payload);
    yield put({ type: "FETCH_ONE_RECIPE", payload: res.data.recipe_id })
}

function* deleteItem(action){
    let res = yield axios.put(`/api/userRecipe/deleteItem/${action.payload.item}/${action.payload.key}`);
    console.log(res.data);
    yield put({type: "FETCH_ONE_RECIPE", payload: res.data.recipe_id})
}

function* addItem(action){
    let res = yield axios.post(`api/userRecipe/addItem`, action.payload);
    yield put({ type: "FETCH_ONE_RECIPE", payload: res.data.recipe_id })
}

function* deleteRecipe(action){
    yield axios.delete(`/api/userRecipe/deleteRecipe/${action.payload}`);
}

function* getSearch(action){
    let search = action.payload;
    let res = yield axios.get(`api/userRecipe/search/${search}`);
    yield put({ type: "SET_USER_RECIPES", payload: res.data});
}

function* userRecipeSaga() {
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe);
    yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
    yield takeLatest('FETCH_ONE_RECIPE', fetchOneRecipe);
    yield takeLatest('CREATE_RECIPE', createRecipe);
    yield takeLatest('EDIT_USER_RECIPE', editUserRecipe);
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('ADD_ITEM', addItem);
    yield takeLatest('DELETE_RECIPE', deleteRecipe);
    yield takeLatest('GET_SEARCH', getSearch);
}

export default userRecipeSaga;
