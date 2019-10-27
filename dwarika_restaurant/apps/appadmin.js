const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const bodyp=require('body-parser');
const url = 'mongodb://localhost:27017/dwarika';
const morgan=require('morgan')
const dish=require('C:/Users/devilal/Documents/git/nodeexpress/dwarika_restaurant/models/dishes');//name of variable capital hona                                                                           //chahiyeconst router=express.Router();
const connect =mongoose.connect(url);
const db=mongoose.connection;
app.set('view engine','ejs');
app.use(morgan('dev'));
connect.then((db)=>console.log("connected to database"));
app.use(bodyp.json({type:'text/html'}));
app.use(bodyp.urlencoded({extended:true}));
app.use(express.static(__dirname+'apps/Desktop'));
const multer=require('multer')
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
  res.render('dishmenu',{flag:0});
}).listen(8080);
app.post('/newdish',upload.single('avatar'),(req,res,next)=>{
	console.log(req.body);
	console.log(req.file)
dish.findOne({"name":req.body.name}).then((details)=>{
  console.log("this is detail"+details)
  if(!details)
    {
       dish.create({
	     name:req.body.name,
	     category:req.body.category,
	     price:req.body.price,
	     genre:req.body.genre,
	     image:req.file.filename
     })
   .then((data)=>{
    console.log("record inserted successfully");
   res.render('./dishmenu',{flag:1});
   },(err)=>{next( err)})}
 else
 {
  res.render('./dishmenu',{flag:2})
 }
},(err)=>{next(err)})
.catch((err)=>{
  throw err;
});
});












