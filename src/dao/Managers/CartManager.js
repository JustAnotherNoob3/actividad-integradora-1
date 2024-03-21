import fs from 'node:fs';
import mongoose from "mongoose";
import { cartsModel } from "../models/carts.js"
import { __dirname } from '../../utils.js';

class CartManager {

    async createNewCart() {
        let cart = {
            products: []
        };
        let newCart = await cartsModel.create(cart);
        return newCart._id;
    }
    async addProductToCart(cartId, productId, quantity) {
        if (!quantity) quantity = 1;
        let cart = await this.getCartById(cartId);
        console.log(cart)
        let pIndex = cart.products.findIndex((element) => { console.log(element._id); return element._id == productId });
        let quantity2;
        if (pIndex == -1) {
            quantity2 = quantity;
            let product = {
                _id: productId,
                quantity: quantity
            };
            cart.products.push(product)
        } else {
            cart.products[pIndex].quantity += quantity;
            quantity2 = cart.products[pIndex].quantity;
        }
        console.log(cart);
        await cartsModel.updateOne({ _id: cartId }, cart)
        return quantity2;
    }
    async deleteCart(cartId) {
        if ((await cartsModel.deleteOne({ _id: cartId })).deletedCount == 0) throw Error("No cart with ID " + cartId);
    }
    async getQuantityOfProduct(cartId, productId) {
        let cart = await this.getCartById(cartId);
        let pIndex = cart.products.find((element) => element._id == productId)
        if (pIndex) {
            return pIndex.quantity;
        } else {
            return 0;
        }
    }
    async getCartById(cartId) {
        let cart = await cartsModel.findById(cartId);
        if (cart == undefined) {
            throw Error("No cart with ID " + cartId);
        }
        return cart;
    }
}


const cartManager = new CartManager();

export default cartManager;


