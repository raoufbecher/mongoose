const express = require('express')
const router = express.Router()
const User = require ('../models/userSchema')

//get users router
router.get('/getusers', (req,res)=>{
    User.find()
    .then((data)=> res.json(data))
    .catch((err)=> res.status(400).json(err))
    });
    
//register user
router.post('/register', (req,res)=>{
const newUser = req.body
const newPerson = new User (newUser);
newPerson.save()
.then(()=> res.send('user register'))
.catch((err)=> res.status(400).json(err))
});
//using model.create()
var createManyPeople = function(arrayOfPeople, done) {
    User.create( arrayOfPeople, (err, data) => err ? console.log(err) : done(null, data));
  }; 
  
  router.post('/manyperson',(req,res)=> {
  createManyPeople (req.body,(err,data)=> { 
    err ?  console.log(err) : res.send('ManyPerson was created')
  })  
  })
//delete user 
router.delete('/deleteuser/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then((data)=> res.json('user is deleted'))
    .catch((err)=> res.status(400).json(err))
    });
    //Delete with model.remove()
    router.delete('/delete/:name',(req,res)=> {
        User.remove({ name:req.params.name},(err,data)=> { 
          err ?  console.log(err) : res.send('all persons named mary were deleted')
        })   })
//Use model.findOne()
router.get('/getfavorite/:favoriteFoods',(req,res)=> {
    console.log('favorite food')
     User.findOne({favoriteFoods: {$elemMatch:{$eq:req.params.favoriteFoods}} },(err,data)=> { 
         err ?  console.log(err) : res.json(data)
   })
   }) 
//update user
router.put('/updateuser/:id', (req,res)=>{
    const updateData = req.body
    User.findByIdAndUpdate(req.params.id,updateData)
    .then((data)=> res.json('user is updated'))
    .catch((err)=> res.status(400).json(err))
    });

//model.findOneAndUpdate() :

router.put('/update/:name',(req,res)=> {

    var newAge = 20;
    User.findOneAndUpdate({name:req.params.name},{$set: {"age":newAge}},{returnNewDocument : true}, function(err, doc){
    if(err){return console.log("error!!!");}
    res.json(doc);                  
          })
      
    })
    //Find, Edit, then Save 
router.put('/:id',async (req,res)=>{
 
    try{
      var foodToAdd = 'hamburger';
      const data=await User.findById(req.params.id)
      data.favoriteFoods=[...data.favoriteFoods,foodToAdd]
      const result= await  data.save()
      res.status(200).json(result)
    }
    catch(err){
      res.status(400).json({error:err})
    }
  })
  //Chain Search Query Helpers to Narrow Search Results :
router.get('/',(req,res)=> {
    var findFood = "burritos";
    User.find({favoriteFoods:{$elemMatch:{$eq:findFood }}})
    .sort({name : "desc"})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
         if(err)
       return  console.log(err);
      res.json(data)
    })
    })

module.exports = router;