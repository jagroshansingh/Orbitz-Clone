const express = require("express");
const { productModel } = require("../model/productModel");
const productrouter = express.Router();

productrouter.get("/", async (req, res) => {
  let price = +req.headers.price;
  let destination = req.headers.destination;
  let sort = req.headers.sort;

  try {
    let obj={
        location:destination
    }
    if(price) obj.price={$lte:price}

    let found;
    if(sort) found=await productModel.find(obj).sort({'price':sort=='asc'?1:-1})
    else found=await productModel.find(obj)
    res.send(found)

  } catch (error) {
    console.log(error);
  }
});

productrouter.get("/single", async (req, res) => {
  try {
    let see = await productModel.find({ id: req.query.id });
    res.send(see);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { productrouter };
