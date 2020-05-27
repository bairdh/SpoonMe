import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* saveUserRecipe(action) {
    yield axios.post('/api/userRecipe/', action.payload);
}

function* fetchUserRecipes(action){
    const res= yield axios.get('/api/userRecipe/');
    yield put({type:"SET_USER_RECIPES", payload: res.data});
}



function* userRecipeSaga() {
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe);
    yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
}

export default userRecipeSaga;
