import { Product } from './product.model'

import { Action, ActionCreator } from 'redux'

export const ADD_PRODUCT = "[Product action] Add product";
export interface AddProductAction extends Action {
    product: Product;
}
export const addProduct: ActionCreator<AddProductAction> =
    (product: Product): AddProductAction => {
        return {
            type: ADD_PRODUCT,
            product: product
        }
    }

export const REMOVE_PRODUCT = "[Product action] Remove product";
export interface RemoveProductAction extends Action {
    productId: number;
}
export const removeProduct: ActionCreator<RemoveProductAction> =
    (id: number): RemoveProductAction => {
        return {
            type: REMOVE_PRODUCT,
            productId: id
        }
    }