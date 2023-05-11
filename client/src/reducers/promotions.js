import { FETCH_ALL_PROMOTIONS, CREATE, FETCH_PROMOTION, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isloading: true, promotions: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isloading: true };
        case END_LOADING:
            return {...state, isloading: false };
        case FETCH_ALL_PROMOTIONS:
            return {
                ...state,
                promotions: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_PROMOTION:
            return { ...state, promotion: action.payload };
        case CREATE:
            return { ...state, promotions: [ ...state.promotions, action.payload]};
        default:
            return state;
    }
}