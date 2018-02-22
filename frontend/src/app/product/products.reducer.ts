import { Product } from './product.model';
import * as ProductActions from './product.actions';
import { Action } from 'redux';

// Состояние продуктов
export interface ProductsState {
    products: Product[];
    selectedProduct: Product;
}

// Начальное состояние
const intitialState: ProductsState = {
    products: [
        //new Product(1, 55, "Product", "/assets/pictures/download.jpeg"),
        //new Product(2, 55, "Product2", "/assets/pictures/images.jpeg")
    ],
    selectedProduct: null
}

// Редьюсер
export const ProductsReducer = 
    function(state: ProductsState = intitialState, action: Action): ProductsState
    {
        switch (action.type) {
            // Добавление нового продукта
            case ProductActions.ADD_PRODUCT: {
                const product = (<ProductActions.AddProductAction>action).product;
                

                return {
                    products: [...state.products, product],
                    selectedProduct: state.selectedProduct
                }
            }
            // Удаление продукта по айди
            case ProductActions.REMOVE_PRODUCT: {
                const id = (<ProductActions.RemoveProductAction>action).productId;
                

                return {
                    products: state.products.filter(product => product.id != id),
                    selectedProduct: (state.selectedProduct != null && state.selectedProduct.id == id) ? null : state.selectedProduct
                }
            }
            // Ничего не делать, если тип действия неизвестен
            default: {
                return state;
            } 
        }
    }