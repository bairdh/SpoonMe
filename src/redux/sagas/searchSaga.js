import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRandomRecipes(action){
    const res = yield axios.get('/api/search/random');
    yield put({type: 'SET_RECIPES', payload:res.data.recipes});
}

function* fetchSearch(action){
    const res = yield axios.get(`api/search/${action.payload}`);
    yield put({type: 'SET_RECIPES', payload: res.data.results});
}


function* searchSaga(){
    yield takeLatest('FETCH_RANDOM_RECIPES', fetchRandomRecipes);
    yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;