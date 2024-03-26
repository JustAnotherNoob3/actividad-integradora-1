import fs from 'node:fs';
import {productsModel} from "../models/products.js"
import mongoose from "mongoose";
import { __dirname } from '../../utils.js';

class ProductManager {
    #path;
    constructor() {
        console.log("new instance created");
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
    async createTestProducts(){
        return await Promise.all([this.addProduct({title:"Real",description:"dddd",code:"he",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"idc",description:"dddd",code:"sadasd",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"mewhen",description:"dddd",code:"asdasd",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"pluh",description:"dddd",code:"gfg",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"heheheh",description:"dddd",code:"xcxc",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"asdasd",description:"dddd",code:"aaa",price:4,status:true,stock:1,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"eh? hehe!",description:"dddd",code:"v",price:20,status:true,stock:25,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"asdasd",description:"dddd",code:"hehe",price:20,status:true,stock:33,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"Im going to kms",description:"dddd",code:"bleh",price:20,status:true,stock:11,category:"w",thumbnails:["asd.json1","tt.png"]}),
        this.addProduct({title:"eeeee",description:"dddd",code:"bruv",price:20,status:true,stock:6,category:"w",thumbnails:[]})]);
    }
    #equalArrays(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

const productManager = new ProductManager();

export default productManager;


