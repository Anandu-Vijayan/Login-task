var express = require('express');
const session = require('express-session');
const res = require('express/lib/response');
const { helpers } = require('handlebars');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')



/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user
  // console.log(products)
  // productHelpers.getAllProducts().then((products)=>{
  //   console.log(products);
  //   res.render('user/view-products',{products,user})
  // })
  let products = [
    {
      name:"Iphone 13 pro max",
      category:'Mobile',
      discripition:"This phone make feel better",
      image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUK7g22tSAIjbNK1-8bTCI2PhcyjZjsGvM3F3MiqrSMYzium2Ejb2_jpPT0Z6j0_qBKt1gG530dOmYOq8R8zFqiKIkon1zbM1PJ_VUtw8IXoWDnicQLbdW2w&usqp=CAE"
    },
    {
      name:"one plus 9T",
      category:'Mobile',
      discripition:"Heavy Phone nice camera",
      image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRX-nNr7ZXwrJil2xwxR4UUDc79zi2kTsX4slf17D_XGW9dNfo-qMqUKscEaTq1tUrxaA235SDejI388CNgYR8FvY3YCDdLAoyl8zl_v1mHg4F4rUJX7yD2-A&usqp=CAE"

    },
    {
      name:"One plus 10 pro",
      category:'Mobile',
      discripition:"Next generation flagship",
      image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRE6T5rhD-_5RpmxCLiuyddhsTLOGjUG3RUQTB7MKQOXCzc5SrfsYjjZefBpmDedCzLDbCINHA_T-oiMx4HhgqvkvSp68-4W02B3bhCp5fLL0EyzSSUdlLkKQ&usqp=CAE"
    },
    {
      name:"Xiaomi 11T pro 5G",
      category:'Mobile',
      discripition:"Poor's iphone",
      image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTY9MRQ2ILL8LN1fJTGtqo-Ifnm9LYXw2bxXQDumHN8R87li625rvEixDNwxJJIMBOtSj0pL0zQYhhVn3PJYb6z1WO1Vf3CCdfzdxBbPFycfZKqzt-7oiaJew&usqp=CAE"
    }
  
  ]
  res.render('index',{products,user})
});

router.get('/login',function(req,res){
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
  }
  //res.render('user/login',{user:req.session.loggedIn})

})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);

    res.redirect('/login')
    console.log(response);
  })

})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){

      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      req.session.loginErr="Invalid Username or password"
      res.redirect('/login')
    }
  })

})

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.image
  

    })
    res.render("admin/add-product")
  })

  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
  })

module.exports = router;
