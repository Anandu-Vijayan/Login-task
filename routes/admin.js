var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((user)=>{
    res.render('admin/view-product',{admin:true,user})

  })
  
 
});
 
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
  productHelpers.addProduct(req.body,(result)=>{
    res.render("admin/add-product",{admin:true})
  })
})
router.get('/delete-data/:id',(req,res)=>{
  let dataId=req.params.id
  console.log(dataId);
  productHelpers.deleteData(dataId).then((response)=>{
    res.redirect('/admin')

  })

})


// router.get('/view-product',(req,res)=>{
// productHelpers.getAllProducts().then((user)=>{
//   console.log(user);
//   res.render('admin/view-product')
// })
// })

router.get('/edit-product/:id',async(req,res)=>{
  let user=await productHelpers.getProductDetails(req.params.id)
  console.log(user);
  req.session.uid=req.params.id
  res.render('admin/edit-product',{user,uid:req.session.uid})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params._id);
  productHelpers.updateProduct(req.session.uid,req.body).then(()=>{
    res.redirect('/admin')
  })
})

module.exports = router;
