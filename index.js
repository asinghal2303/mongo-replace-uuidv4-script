
// const { query } = require('express');
// const {v4 : uuidv4} = require('uuid')
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/mongo-demo";

// const obj = {"email" : "david@gmail.com",
// "password" : "1235466",
// "typeOfUser" : 1,
// "userDetails" : {
//     "firstName" : "David",
//     "lastName" : "Beckham",
//     "contactNumber" : "12345678989"
// }}

// MongoClient.connect(url, async (err, db) => {
//     if(err) throw err;
//     const dbo = db.db('mydb');
//     console.log('connected successfully');

//     dbo.collection('users').find().toArray((err, res) => {
//         const o = res; 
//         const arr = res.forEach(element => {
//             delete element._id
//         });
//         // console.log(res)
//         res.forEach(element => {
//            res['_id'] = uuidv4()
//         });
//         console.log(res)
//     // dbo.collection('new_users').insertMany(res, (err, res) => {
//     //     console.log('data inserted' +res)
//     // })
//         // const myquery = { email: /.*@.*/ };

//         // const newvalues = {$set: {_id: uuidv4} };

//         // dbo.collection('users').updateMany(myquery, newvalues, (err, res)=> {
//         //     console.log(res)
//         //     db.close()
//         // })

//     })





// })




// // MongoClient.connect(url, (err, db) => {
// //     if(err) throw err;
// //     const dbo = db.db("mydb");
// //     dbo.collection('users').insertMany([{"email" : "david@gmail.com",
// //     "password" : "1235466",
// //     "typeOfUser" : 1,
// //     "userDetails" : {
// //         "firstName" : "David",
// //         "lastName" : "Beckham",
// //         "contactNumber" : "12345678989"
// //     }}, {"email" : "david@gmail.com",
// //     "password" : "1235466",
// //     "typeOfUser" : 1,
// //     "userDetails" : {
// //         "firstName" : "David",
// //         "lastName" : "Beckham",
// //         "contactNumber" : "12345678989"
// //     }}, {"email" : "david@gmail.com",
// //     "password" : "1235466",
// //     "typeOfUser" : 1,
// //     "userDetails" : {
// //         "firstName" : "David",
// //         "lastName" : "Beckham",
// //         "contactNumber" : "12345678989"
// //     }}], (err, res) => {
// //         if(err) throw err
// //         console.log('data inserted')
// //     })
// // })




const { MongoClient } = require('mongodb');
const {v4 : uuidv4} = require('uuid')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mydb';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');

    const findResult = await collection.find({}).toArray();
    //   console.log(findResult)

    // findResult.forEach( async ele => {
    //     const oldId = ele._id;
    //     const newId = uuidv4();
    //     ele._id = newId
    //     // console.log(ele);

    //     deleteOne(oldId)
        
    //     insertOne(ele)
        


    // })

    // async function deleteOne(oldId){
    //     const deleteResult = await collection.deleteOne({_id: oldId});
    //     console.log(deleteResult);
    // }

    // async function insertOne(ele){
    //     const insertResult = await collection.insertOne(ele);
    //     console.log(insertResult);
    // }

    for(let i = 0; i <= findResult.length; i++){
        const oldId = findResult[i]._id;

        const newData = findResult[i];

        newData._id = uuidv4();

        console.log(oldId, newData)


        const deleteResult = await collection.deleteOne({_id: oldId});
        console.log(deleteResult);
        const insertResult = await collection.insertOne(newData);
        console.log(insertResult)
    }

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());