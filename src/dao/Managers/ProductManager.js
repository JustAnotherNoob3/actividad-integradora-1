import fs from 'node:fs';
import {productsModel} from "../models/products.js"
import mongoose from "mongoose";
import { __dirname } from '../../utils.js';

class ProductManager {
    #path;
    constructor(path) {
        console.log("new instance created")
        this.instance = this;
        this.#path = path;
        if (!fs.existsSync(path)) fs.writeFileSync(path, "[]");
        
    }
    async addProduct(product) {
        if (product.thumbnails === undefined) product.thumbnails = [];

        let newProduct = await productsModel.create(product);
        console.log(newProduct);
        return newProduct._id;
    }
    async updateProduct(productId, product) {
        //if (this.#argumentsHaveFalsyNotZero(Object.values(product))) {
        //    throw Error(`There were values undefined or impossible. Not updating to product ${Object.values(product)}`);
        //}
        if (product.price !== undefined && product.price <= 0) {
            throw Error(`There were values undefined or impossible. Not updating to product ${Object.values(product)}`);
        }
        //if (!this.#checkValidCode(product.code)) {
        //    throw Error("The given code is already on use.");
        //}
        if((await productsModel.updateOne({_id: new mongoose.Types.ObjectId(productId)}, product)).n == 0) throw Error("No product with ID "+productId);
        }
    async deleteProduct(productId) {
        if((await productsModel.deleteOne({_id:new mongoose.Types.ObjectId(productId)})).deletedCount == 0) throw Error("No product with ID "+productId);
    }
    async getProducts() {
        let products = await productsModel.find();
        return products;
    }
    async getProductById(productId) {
        let product = await productsModel.findById(new mongoose.Types.ObjectId(productId));
        if (product == undefined) {
            throw Error("No product with ID "+productId);
        }
        return product;
    }
    async getProductByCode(code) {
        let product = await productsModel.find({code: code});
        if (product == undefined) {
            throw Error("No product with ID "+productId);
        }
        return product;
    }
    #checkIfValidProductKeys(obj) {
        let productKeys = Object.keys(obj);
        if(productKeys.length  != 8) return false;
        return this.#equalArrays(productKeys, ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"]);
    }
    #argumentsHaveFalsyNotZero(arr) {
        let isFalsy = false;
        arr.forEach((element) => {
            if (!element && element !== 0 && element !== false) isFalsy = true;
        });
        return isFalsy;
    }
    #equalArrays(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

const productManager = new ProductManager(__dirname + "/data/productos.json");

export default productManager;


