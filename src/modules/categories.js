
export const CATEGORY_REQUEST = 'CATEGORY_REQUEST'
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'

const API_KEY = 'uid4961-26577031-68'
const BODY = 'http://api.shopstyle.com/api/v2/'


const initialState = {
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case CATEGORY_SUCCESS:
      return {
        ...state,
        [action.id]: action.data.products,
        isFetching: false
      }

    default:
      return state
  }
}


export const requestCategory = (catId, offset = 0) => {
  return async dispatch => {
    dispatch({
      type: CATEGORY_REQUEST
    })

    let response = await fetch(`${BODY}products?pid=${API_KEY}&cat=${catId}&offset=${offset}&limit=10`);
    console.log('response', response);

 // only proceed once promise is resolved
    let data = await response.json();
    console.log('data', data)
    dispatch({
      type: CATEGORY_SUCCESS,
      data: data,
      id: catId
    })
  }
}
