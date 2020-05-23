const setRandom = (state = [], action) => {
    switch(action.type){
        case 'SET_RANDOM_RECIPES':
            return action.payload;
        default:
            return state;
    }
}

export default setRandom;