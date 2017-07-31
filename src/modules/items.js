
export const ITEM_REQUEST = 'ITEM_REQUEST'
export const ITEM_SUCCESS = 'ITEM_SUCCESS'

const API_KEY = 'uid4961-26577031-68'
const BODY = 'http://api.shopstyle.com/api/v2/'


const initialState = {
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case ITEM_SUCCESS:
      return {
        ...state,
        [action.id]: action.data,
        isFetching: false
      }

    default:
      return state
  }
}


export const requestItem = (itemId, offset = 0) => {
  return async dispatch => {
    dispatch({
      type: ITEM_REQUEST
    })

    const response = await fetch(`${BODY}products/${itemId}?pid=${API_KEY}`);

    const data = await response.json();

    dispatch({
      type: ITEM_SUCCESS,
      data,
      id: itemId
    })
  }
}
