import axios from 'axios'
import { get_categories_reducer, get_products_reducer, get_promotion_reducer, get_recommendations_reducer, setUser } from '../reducers/userReducers'


let domain = 'http://localhost:5000';
let site_domain = 'http://localhost:3000/';


export const registration = async (email, password, name, callback) => {
    try {
        const response = await axios.post(`${domain}/registration?content-type=application/json; charset=utf-8`, {
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
            const response = await axios.post(`${domain}/login?content-type=application/json; charset=utf-8`, {
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
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/auth?content-type=application/json; charset=utf-8`,
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
            const response = await axios.get(`${domain}/?content-type=application/json; charset=utf-8`)
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
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/get-basket?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
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
            const response = await axios.get(`${domain}/recomandation?content-type=application/json; charset=utf-8`)
            dispatch(get_recommendations_reducer(response.data.recommendations))
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_product_id = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domain}/product-id/${id}?content-type=application/json; charset=utf-8`)
            dispatch(get_products_reducer(response.data.product))
            dispatch(get_recommendations_reducer(response.data.recommendations))
        } catch (e) {
            window.location.href = site_domain
            console.log(e)
        }
    }
}

export const get_promotion = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${domain}/promotion?content-type=application/json; charset=utf-8`)
            dispatch(get_promotion_reducer(response.data.promotion))
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_add_basket = (product_id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.post(`${domain}/product-add/${product_id}?content-type=application/json; charset=utf-8`, {},
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_plus_basket = (product_id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.put(`${domain}/product-plus/${product_id}?content-type=application/json; charset=utf-8`, {},
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_minus_basket = (product_id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.put(`${domain}/product-minus/${product_id}?content-type=application/json; charset=utf-8`, {},
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const product_delete_basket = (product_id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.delete(`${domain}/product-delete/${product_id}?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export const update_user_info = (name, number, street, house_number, apartment_number, entrance, floor) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const data = { name, number, street, house_number, apartment_number, entrance, floor }
            const response = await axios.put(`${domain}/update-user-info?content-type=application/json; charset=utf-8`, data,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const add_order = (phone_number, name, delivery_type, street, house_number,
    apartment_number, entrance, floor, comment, payment_type, cash_change,
    when_deliver_type, number_persons, time_delivery, call, time, basket) => {
    return async dispatch => {
        try {
            const data = {
                phone_number, name, delivery_type, street, house_number,
                apartment_number, entrance, floor, comment, payment_type, cash_change,
                when_deliver_type, number_persons, time_delivery, call, time, basket
            }
            const response = await axios.post(`${domain}/add-order?content-type=application/json; charset=utf-8`, data);
            localStorage.removeItem('basket');
            window.location = site_domain
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const get_user_info = (callback) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/get-user-info?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            callback(response.data)
        } catch (e) {
            console.log(e)
        }
    }
}