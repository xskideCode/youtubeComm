import { FETCH_ALL_PROMOTIONS, FETCH_PROMOTION, FETCH_PROMOTION_BY_USER, START_LOADING, END_LOADING, CREATE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators

export const getPromotion = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        

        const { data } = await api.fetchPromotion(id);

        dispatch({ type: FETCH_PROMOTION, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPromotions = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
  
        const { data } = await api.fetchPromotions(page);
  
  
        dispatch({ type: FETCH_ALL_PROMOTIONS, payload: data });
  
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

  
export const createPromotion = (Promotion) => async (dispatch) => {
try {
    //dispatch({ type: START_LOADING });

    const { data } = await api.createPromotion(Promotion);

    //navigate(`/Promotions/${data._id}`)

    dispatch({ type: CREATE, payload: data });
} catch (error) {
    console.log(error)
}
}