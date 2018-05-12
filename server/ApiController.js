const Subscribe = require('./model/Subscribe');

const ApiController = {};

ApiController.subscribe = function(req,res){

    let email = req.body.email;
    if(email){
        let newSub = new Subscribe({email});
        newSub.save().then(()=>{
            res.send(JSON.stringify({status:1}));
        }).catch(()=>{
            res.send(JSON.stringify({status:-1}));
        })
    }else{
        res.send(JSON.stringify({status:-1}));
    }

}

module.exports = ApiController;