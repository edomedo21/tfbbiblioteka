const express = require('express');
const helpers = require('../config/helpers');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No products found"});
            }
        })
        .catch(err => console.log(err));
});

/* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id',
            'p.images',
            'p.short_desc'
        ])
        .filter({'p.id': productId})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
});

router.get('/:ime', (req, res) => {
    const imepr = req.params.ime;
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id',
            'p.images'
        ])
        .filter({'p.title': imepr})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${imepr}`});
            }
        }).catch(err => res.json(err));
});

/* GET ALL PRODUCTS FROM ONE CATEGORY */
router.get('/category/:catName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const cat_title = req.params.catName;

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({id: 1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${cat_title}`});
            }
        }).catch(err => res.json(err));

});

// DELETE ONE PRODUCT

router.delete('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    database.table('products')
      .filter({ id: productId })
      .remove()
      .then(result => {
        if (result > 0) {
          res.status(200).json({ message: `Product with id ${productId} was successfully deleted.` });
        } else {
          res.json({ message: `No product found with id ${productId}` });
        }
      })
      .catch(err => res.json(err));
  });

  // UPDATE ONE PRODUCT
  router.put('/proizvod/:prodId', (req, res) => {
    let productId = req.params.prodId;
    let updatedProduct = req.body;
    
  
    database.table('products')
      .filter({ id: productId })
      .update(updatedProduct)
      .then(result => {
        if (result > 0) {
          res.status(200).json({ message: `Product with id ${productId} was successfully updated.` });
        } else {
          res.json({ message: `No product found with id ${productId}` });
        }
      })
      .catch(err => res.json(err));
  });

  //CREATE PRODUCT

  router.post('/create', (req,res)=>{
    let title = req.body.title;
    let image = req.body.image;
    let images = req.body.images;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let short_desc = req.body.short_desc;
    let cat_id = req.body.cat_id;

    helpers.database.table('products').insert({
        title: title,
        image: image,
        images: images,
        description: description,
        price: price,
        quantity: quantity,
        short_desc: short_desc,
        cat_id: cat_id
    }).then(result=>{
        if (result > 0) {
            res.status(200).json({ message: `Product was inserted.` });
          } else {
            res.json({ message: `error` });
          }
    });
  });
  


module.exports = router;
