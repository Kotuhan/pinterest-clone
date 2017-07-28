
export const CATEGORY_REQUEST = 'CATEGORY_REQUEST'
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'

const PDK = window.PDK;

const initialState = {
  categories: {}
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
        categories: {...state.categories, [action.id]: action.data},
        isFetching: false
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: CATEGORY_REQUEST
    })

    fetch(() => {
      dispatch({
        type: INCREMENT
      })
    })
  }
}

export const requestCategory = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}
