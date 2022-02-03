const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const GET_RECOMENDATION = 'GET_RECOMENDATION'
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PROMOTION = 'GET_PROMOTION'


const defaultstate = {
    currentUser: {},
    isAuth: false,
    recommendations: [],
    categories: [],
    products: [],
    product: {},
    promotion: [],
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case GET_RECOMENDATION:
            return {
                ...state,
                recommendations: action.payload,
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }
        case GET_PROMOTION:
            return {
                ...state,
                promotion: action.payload,
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default: return state;
    }
}


export const setUser = user => ({ type: SET_USER, payload: user })
export const logout = user => ({ type: LOGOUT })

export const get_categories_reducer = categories => ({ type: GET_CATEGORIES, payload: categories })
export const get_products_reducer = products => ({ type: GET_PRODUCTS, payload: products })

export const get_recommendations_reducer = recommendation => ({ type: GET_RECOMENDATION, payload: recommendation })

export const get_product_reducer = product => ({ type: GET_PRODUCT, payload: product })

export const get_promotion_reducer = promotion => ({ type: GET_PROMOTION, payload: promotion })