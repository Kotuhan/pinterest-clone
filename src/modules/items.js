
export const ITEM_REQUEST = 'ITEM_REQUEST'
export const ITEM_SUCCESS = 'ITEM_SUCCESS'

export const ITEM_MORE_REQUEST = 'ITEM_MORE_REQUEST'
export const ITEM_MORE_SUCCESS = 'ITEM_MORE_SUCCESS'

const API_KEY = 'uid4961-26577031-68'
const BODY = 'http://api.shopstyle.com/api/v2/'


const initialState = {
  isFetching: false,
  loadingMore: false
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
        [action.id]: {
          item: action.item,
          offset: action.offset,
          relatedItems: action.relatedItems,
        },
        isFetching: false
      }

      case ITEM_MORE_REQUEST:
        return {
          ...state,
          loadingMore: true
        }

      case ITEM_MORE_SUCCESS:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            relatedItems: [...state[action.id].relatedItems, ...action.relatedItems],
            offset: action.offset
          },
          loadingMore: false
        }

    default:
      return state
  }
}


export const requestItem = (itemId, catId, offset = 0) => {
  return async dispatch => {
    dispatch({
      type: ITEM_REQUEST
    })

    const [responseItem, responseRelated] = await Promise.all([
      fetch(`${BODY}products/${itemId}?pid=${API_KEY}`),
      fetch(`${BODY}products?pid=${API_KEY}&cat=${catId}&offset=${offset}&limit=15`)
    ]);

    const itemData = await responseItem.json();
    const relatedItems = await responseRelated.json();

    const formattedItemData = {
      name: itemData.name,
      description: itemData.description,
      url: itemData.image.sizes.Medium.url,
      id: itemData.id
    }

    if (relatedItems.length > 10) {
      relatedItems.length = 10
    }

    const formattedRelatedData = relatedItems.products.map(item => {
        const { name, description, image, id } = item
        const { height, width, url } = image.sizes.Medium

        return { name, description, url, width, height, id }
      })

    dispatch({
      type: ITEM_SUCCESS,
      relatedItems: formattedRelatedData,
      item: formattedItemData,
      offset: offset + 15,
      id: formattedItemData.id
    })
  }
}

export const requestMoreItems = (catId, offset = 0) => {
  return async dispatch => {
    dispatch({
      type: ITEM_MORE_REQUEST
    })

    const response = await fetch(`${BODY}products?pid=${API_KEY}&cat=${catId}&offset=${offset}&limit=15`);

    const data = await response.json();

    const formattedData = data.products.map(item => {
        const { name, description, image, id } = item
        const { height, width, url } = image.sizes.Medium

        return { name, description, url, width, height, id }
      })

    dispatch({
      type: ITEM_MORE_SUCCESS,
      offset: offset + 15,
      relatedItems: formattedData,
      id: catId
    })
  }
}
