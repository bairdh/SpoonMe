import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRandomRecipes(action){
    const res = yield axios.get('/api/search/random');
    yield put({type: 'SET_RANDOM_RECIPES', payload:res.data});
}


function* searchSaga(){
    yield takeLatest('FETCH_RANDOM_RECIPES', fetchRandomRecipes);
}

export default searchSaga;