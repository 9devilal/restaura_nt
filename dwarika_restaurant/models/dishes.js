const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const commentSchema=new Schema({ 
review:{type:String},
rating:{type:Number,max:5,min:2,default:4}
}        //modified for part 2 dealing editing comments  
);

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    genre:{type:String,required:true},
/*
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
},*/
 
});
dishSchema.set('timestamps', true);
var Detail = mongoose.model('Dish',dishSchema);//Dish IS THE NAME OF COLLECTION FORMEDD IN DB
module.exports=Detail;
