const express = require('express');
const router = express.Router();
const {Client, Provider} = require('../models/Client');


// 1_ GET BACK ALL THE CLIENTS
router.get('/', async (req, res) => {
    try{
        const client = await Client.find({});
            res.json(client);
    }   catch(err){
            res.json({message: err});
    }
});


// 1_ GET BACK ONE CLIENT (NOT WORKING)
router.get('/:clientId/', async (req, res) => {
    try{
        const client = await Client.findById(
            { _id: req.params.clientId }, 
        );
            res.json(client);
    }   catch(err){
            res.json({message: err});
    }
});


// 2_ Post the Client field
router.post('/post', async (req, res) => {
    const client = new Client({
        client: [{
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            providers: [{
                pname: req.body.pname,
            }],
        }],
    });
    try{
    const savedClient = await client.save();
    res.json(savedClient)
    }catch(err){
        res.json({message: err});
    }
});


// 3_ Adds a Client to List
router.post('/addClient/:clientId', async (req, res) => {
    try{
    const updatedClient = await Client.updateOne({ _id: req.params.clientId }, 
        {
            $push: { 
                client: [{
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    providers: [{
                        pname: req.body.pname,
                    }],
                }],   
             }
        });
        res.json(updatedClient);
            }catch (err) {
                res.json({ message: err });
    }
});


// 4_ Deletes a Client from List
router.post('/deleteClient/:clientId/:infoId', async (req, res) => {
    try{
    const removedClient = await Client.findByIdAndUpdate(
        { _id: req.params.clientId }, 
        {
            $pull: { 
                "client": {
                    _id: req.params.infoId
                },   
             }
        });
        res.json(removedClient);
            }catch (err) {
                res.json({ message: err });
    }
});


// 5_ Edit a Client from List
router.post("/edit/:clientId", async (req, res) => {
    try{
    const editClient = await Client.updateMany(
        {"client._id": req.params.clientId},
        {   
            $set:
            {
                "client.$.name": req.body.name,
                "client.$.email": req.body.email,
                "client.$.phone": req.body.phone,
                "client.$.providers.0.pname": req.body.pname,
            }
        }   
        );
        res.json(editClient);
            }catch (err) {
                res.json({ message: err });
    }
});


// PROVIDERS
// Gets list of providers
/*
router.get('/provider', async (req, res) => {
    try{
        const provider = await Provider.find({});
            res.json(provider);
    }   catch(err){
            res.json({message: err});
    }
});
*/


// 6_ Adds a Provider to List
router.post('/addprovider/:clientId', async (req, res) => {
    try{
    const updatedProvider = await Client.updateOne({ _id: req.params.clientId }, 
        {
            $push: { 
                providers: [{
                    proname: req.body.proname
                }],   
             }
        });
        res.json(updatedProvider);
            }catch (err) {
                res.json({ message: err });
    }
});


// 7_ Deletes a Provider from List
router.post('/deleteprovider/:providerId/:infoId', async (req, res) => {
    try{
    const removedProvider = await Client.findByIdAndUpdate(
        { _id: req.params.providerId }, 
        {
            $pull: { 
                "providers": {
                    _id: req.params.infoId
                },   
             }
        });
        res.json(removedProvider);
            }catch (err) {
                res.json({ message: err });
    }
});


module.exports = router;