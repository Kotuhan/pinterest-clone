
export const CATEGORY_REQUEST = 'CATEGORY_REQUEST'
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'

export const CATEGORY_MORE_REQUEST = 'CATEGORY_MORE_REQUEST'
export const CATEGORY_MORE_SUCCESS = 'CATEGORY_MORE_SUCCESS'

const API_KEY = 'uid4961-26577031-68'
const BODY = 'http://api.shopstyle.com/api/v2/'


const initialState = {
  isFetching: false,
  loadingMore: false
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
        [action.id]: {
          items: action.data,
          offset: action.offset
        },
        isFetching: false
      }

    case CATEGORY_MORE_REQUEST:
      return {
        ...state,
        loadingMore: true
      }

    case CATEGORY_MORE_SUCCESS:
      return {
        ...state,
        [action.id]: {
          items: [...state[action.id].items, ...action.data],
          offset: action.offset
        },
        loadingMore: false
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

    const response = await fetch(`${BODY}products?pid=${API_KEY}&cat=${catId}&offset=${offset}&limit=15`);

    const data = await response.json();

    const formattedData = data.products.map(item => {
        const { name, description, image, id } = item
        const { height, width, url } = image.sizes.Medium

        return { name, description, url, width, height, id }
      })

    dispatch({
      type: CATEGORY_SUCCESS,
      data: formattedData,
      offset: offset + 15,
      id: catId,
    })
  }
}

export const requestMoreItems = (catId, offset = 0) => {
  return async dispatch => {
    dispatch({
      type: CATEGORY_MORE_REQUEST
    })

    const response = await fetch(`${BODY}products?pid=${API_KEY}&cat=${catId}&offset=${offset}&limit=15`);

    const data = await response.json();

    const formattedData = data.products.map(item => {
        const { name, description, image, id } = item
        const { height, width, url } = image.sizes.Medium

        return { name, description, url, width, height, id }
      })

    dispatch({
      type: CATEGORY_MORE_SUCCESS,
      offset: offset + 15,
      data: formattedData,
      id: catId
    })
  }
}
