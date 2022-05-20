var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteData:(dataId)=>{
        // console.log(dataId + '**********************');
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(dataId)}).then((response)=>{
                console.log(response);

                resolve(response)
            })

        })
    },
    getProductDetails:(dataId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(dataId)}).then((product)=>{
               resolve(product) 
            })
        })
    },
    updateProduct:(dataId,dataDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION)
            .updateOne({_id:objectId(dataId)},{
                $set:{
                    Name:dataDetails.Name,
                    Email:dataDetails.Email
                }
            }).then((response)=>{
                resolve()
            })

        })
    }

}