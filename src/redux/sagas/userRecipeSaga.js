import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* saveUserRecipe(action) {
    yield axios.post('/api/userRecipe/', action.payload);
}



function* userRecipeSaga() {
    yield takeLatest('SAVE_USER_RECIPE', saveUserRecipe);
    yield takeLatest('FETCH_USER_RECIPE')
}

export default userRecipeSaga;
