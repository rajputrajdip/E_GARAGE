const userschema = require('../models/ServiceModel');

// create new service (garage owner)
const addservice = async (req,res) => {
    try{
        const service = await userschema.create({...req.body})
        res.status(201).json({
            message : "service added successfully",
            service : service
        })
    }catch(err){
        res.status(500).json({
            message : "service not added",
            err : err
        })
    }
}

//get all services

const getallservice = async(req,res) =>{
    try{
        const services = await userschema.find()
        res.status(200).json({
            message : "all service",
            data  : services
        })
    }
    catch(err){
        res.status(500).json({
            message : "service not found",
            err : err
        })
    }
}

// get service by id 

 const getservicebyid = async(req,res) =>{
    try{
        const service = await userschema.findById(req.parms.id)

            if(!service){
                return res.status(404).json({
                    message : "Service not found"
                })
            }

        res.status(200).json({
            message : "service found",
            data : service
        })
    }
    catch(err){
        res.status.json({
            message : "service not found",
            err : err
        })
    }
 }

//update service

const updateservice = async(req,res) =>{
    try{
        const service = await userschema.findbyinandupdate(req.params.id,req.body,{new: true})
        res.status(200).json({
            message : "service updates successfully",
            data : service
        })
        }catch(err){
            res.status(500).json({
                message : "service not updated",
                err : err
            })
        }

}

//delete service 

const deleteservice = async (req,res) =>{
    try{
        await userschema.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : "service deleted successfully",
            data : null
        })    }
    catch(err){
        res.status(500).json({
            message : "service not deleted",
            err : err
        })
    }
}

module.exports = {
    addservice,
    getallservice,
    getservicebyid,
    updateservice,
    deleteservice
}