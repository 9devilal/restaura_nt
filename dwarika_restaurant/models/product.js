const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productschema=new Schema(

{
	productname:{type:String,required:true,unique:true},
	price:{type:Number},
	description:{type:String},
	quantity:{type:Number,default:1},
	image:{type:String,required:true}
});
productschema.set('timestamps',true);
module.exports=mongoose.model('cart',productschema);