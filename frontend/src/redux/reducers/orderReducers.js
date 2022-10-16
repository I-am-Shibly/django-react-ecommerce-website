import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL,
    MY_ORDER_LIST_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,


} from '../constants/orderConstants'


export const orderCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const orderDeleteReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true }

        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    
    switch (action.type) {

        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}



export const orderPayReducer = (state = {}, action) => {
    
    switch (action.type) {
        
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success : true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}



export const orderDeliverReducer = (state = {}, action) => {

    switch (action.type) {

        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}



export const MyOrderListReducer = (state = {orders:[]}, action) => {

    switch (action.type) {

        case MY_ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case MY_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case MY_ORDER_LIST_RESET:
            return {
                order:[]
            }
        
        default:
            return state
    }
}



export const OrderListReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case ORDER_LIST_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}