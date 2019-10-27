/* this is the main page or server page*/

const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const bodyp=require('body-parser');
const url = 'mongodb://localhost:27017/dwarika';
const morgan=require('morgan')
const User=require('../models/user');//name of variable capital hona                                                                           //chahiyeconst router=express.Router();
const dish=require('../models/dishes');//name of variable capital hona                                                                           //chahiyeconst router=express.Router();
const Product=require('../models/product')
const connect =mongoose.connect(url);
const db=mongoose.connection;
app.set('view engine','ejs');
app.use(morgan('dev'));
connect.then((db)=>console.log("connected to database"));
app.use(bodyp.json({type:'text/html'}));
app.use(bodyp.urlencoded({extended:true}));
app.use(express.static(__dirname+'/Desktop/'));
var dishdata='';
const multer=require('multer')//used for uploading images
var storage= multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname,  'Desktop' ));
  },
  filename: function(req, file, cb){
    var filename = Date.now();
    switch (file.mimetype) {
      case 'image/png':
      filename = filename + ".png";
      break;
      case 'image/jpeg':
      filename = filename + ".jpg";
      break;
      default:
      break;
    }
    cb(null, filename);
  }
});
const upload=multer({storage:storage});
app.get('',(req,res)=>{
	  res.StatusCode=200;
    console.log(__dirname+'/Desktop/');
    dish.find({}).then((docs)=>{
     
    res.render('landingpage',{login:'loginpage',signup:'signuppage',dishes:docs});})
}).listen(3000);

app.get('/loginpage',(req,res)=>{
	res.render('loginpage',{info:null,flag:0});
   })
app.get('/signuppage',(req,res)=>{res.render('signuppage',{flag:0})});
app.post('/dwarika_restaurant/sign',upload.single('avatar') ,(req,res,next)=>{
	console.log(req.body);
	console.log(req.file);
	
  User.findOne({"email":req.body.email}).then((details)=>{
    console.log(details);
    if(!details)//if email already exists it flashes a message 
    {
     User.create(
     { firstname:req.body.firstname,
     lastname:req.body.lastname,
      email:req.body.email,
      password:req.body.password,
      mobile:req.body.mobile,
      image:req.file.filename
    	}).
    then((user)=>{
      dish.find({}).then((docs)=>{
  	res.render('userprofile',{data:user,image:user.image,info:'welcome',dishes:docs,cart:'shoppingcart'});});
    },(err)=>{next(err)}).
    catch((err)=>{next (err)});
  }
  else
  {
    res.render('./signuppage',{flag:1});
  }
 },(err)=>{next(err)}).
catch((err)=>{throw err})
})

app.post('/dwarika_restaurant/login',(req,res,next)=>{
  
      User.find({email:req.body.email,password:req.body.password})
      .then((user)=>
      {
      console.log(user);
      if(user[0])
      {console.log(user[0].image)
       
       dish.find({}).then((docs)=>{
       res.render('userprofile',{data:user,image:user[0].image,info:user[0].firstname,dishes:docs});});

      }

      else  
       res.render('loginpage',{info:'username or password was incorrect',flag:1});
       
    }
      ,(err)=>next(err)).
     catch((err)=>{throw(err)})
   });

  app.post('/cart',(req,res)=>
  { var data=
  {  price:req.body.price,
     productname:req.body.productName,
     description:req.body.description,
     image:req.body.image

  };
    //console.log(data) 
    Product.findOne({"productname":req.body.productName}).then((details)=>{
      console.log(details)
      if(!details)
      {
  Product.create(data,(err,docs)=>{
    if(err)
      next( err);
    else
      console.log("inserted successfully");
  },(err)=>{next(err)});
  }
  else
  {
    res.redirect('./')
  }

},(err)=>{next(err)})
    .catch((err)=>{throw err});
  });
  app.get('/shoppingcart',(req,res)=>{
   Product.find({}).then((docs)=>{
    console.log(docs);
    res.render('shoppingcart',{cart:docs}); 
   },(err)=>{throw err}); 
  
  })
  app.delete('/cart',(req,res)=>{
    console.log(req.body.productname)
    Product.deleteOne({productname:req.body.productname},(err)=>{
      if (err)
        throw err;
      else
        console.log("deleted successfully")
    });
  })
  app.get('/Desktop/stylesheets/landingpage',(req,res)=>{
    res.setHeader('content-type', 'text/css');
    res.sendFile('C:/Users/devilal/Documents/git/nodeexpress/dwarika_restaurant/apps/Desktop/stylesheets/landingpage.css');
  })
