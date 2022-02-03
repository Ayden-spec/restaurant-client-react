import axios from 'axios'
import { get_categories_reducer, get_products_reducer, get_promotion_reducer, get_recommendations_reducer, setUser } from '../reducers/userReducers'


let domen = 'http://localhost:5000';
let site_domen = 'http://localhost:3000/';


export const registration = async (email, password, name, callback) => {
    try {
        const response = await axios.post(`${domen}/registration?content-type=application/json; charset=utf-8`, {
            email,
            password,
            name
        })
        callback()
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

export const login = (email, password, callback) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/login?content-type=application/json; charset=utf-8`, {
                email,
                password
            })
            callback()
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domen}/auth?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}


export const get_categories_products = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domen}/?content-type=application/json; charset=utf-8`)
            dispatch(get_categories_reducer(response.data.categories))
            dispatch(get_products_reducer(response.data.products))
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_basket_user = () => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/get-basket?content-type=application/json; charset=utf-8`, { token: localStorage.getItem('token') })
            
            localStorage.setItem('basket', JSON.stringify(response.data.basket))
            document.dispatchEvent(new Event(`storageChanged_basket_nav`));
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_recomendation = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domen}/recomandation?content-type=application/json; charset=utf-8`)
            dispatch(get_recommendations_reducer(response.data.recommendations))
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_product_id = (id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/product-id?content-type=application/json; charset=utf-8`, { id, token: localStorage.getItem('token') })
            dispatch(get_products_reducer(response.data.product))
            dispatch(get_recommendations_reducer(response.data.recommendations))
        } catch (e) {
            window.location.href = site_domen
            console.log(e)
        }
    }
}

export const get_promotion = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domen}/promotion?content-type=application/json; charset=utf-8`)
            dispatch(get_promotion_reducer(response.data.promotion))
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_add_basket = (product_id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/product-add?content-type=application/json; charset=utf-8`, {
                token: localStorage.getItem('token'),
                product_id
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_plus_basket = (product_id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/product-plus?content-type=application/json; charset=utf-8`, {
                token: localStorage.getItem('token'),
                product_id
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_minus_basket = (product_id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/product-minus?content-type=application/json; charset=utf-8`, {
                token: localStorage.getItem('token'),
                product_id
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_delete_basket = (product_id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domen}/product-delete?content-type=application/json; charset=utf-8`, {
                token: localStorage.getItem('token'),
                product_id
            })
        } catch (e) {
            console.log(e)
        }
    }
}