import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* saveUserRecipe(action) {
    yield axios.post('/')
}



function* userRecipeSaga() {
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe);
}

export default userRecipeSaga;
