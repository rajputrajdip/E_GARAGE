const userschema  = require("../model/garageownermodel")
const bcrypt = require("bcrypt")

//register garage owner
const registergarageowner = async (req,res) => {
    try{

        const hashedpassword = await bcrypt.bcrypthash(req.body.password,10)
        req.body.password = hashedpassword

        const garageowner = await userschema.create(req.body)
        res.status(201).json({
            message : "garage owner registered successfully",
            data : garageowner
        })
    }
    catch(err){
        res.status(500).json({
            message : "garage owner not registered",
            err : err
        })
    }
}
    //loging garage owner
    const logigarageowner = async (req,res) => {
        try{
            const owner = await userschema.findone({email:req.body.email})
            if(!owner){
                return res.status(404).json({
                    message : "garage owner not found"
                })
            }
            const ispasswordmatch = await bcrypt.compare(req.body.password,owner.password)
            if(!ispasswordmatch){
                return res.status(401).json({
                    message : "invalid password"
                })
            }
            res.status(200).json({
                message :" garage owner logged in successfully",
                data : owner
            })
            }
        catch(err){
            res.status(500).json({
                message : "garage owner not logged in successfully",
                err : err
            })
        }
    }

    // get all garage owner 

    const getallgarageowner = async (req,res) => {
        try{
            const garageowners = await userschema.find()
            res.status(200).json({
                message : "all garage owners retrieved successfully",
                data : garageowners
            })
        }
        catch(err){
            res.status(500).json({
                message : "error retrieving garage owners",
                err : err
            })

        }
    }

    //get garage owner by id 

     const garageownerbyid = async (req,res) =>{
         try{
            const garageowner = await userschema.findbyid(req.params.id)
            if(!garageowner){
                return res.status(404).json({
                    message : "garage owner not found"
                })
            }
            res.status(200).json({
                message : "garage owner found",
                data : garageowner
            })
         }catch(err){
            res.status(500).json({
                message : "error retrieving garage owner",
                err : err
            })
         }
     }

     // update garage owner 

     const updatagarageowner = async (req,res) => {
        try{
            const garageowner = await userschema.findbyidandupdate(
                req.params.id,
                req.body,
                {new : true}
            )
            res.status(200).json({
                message : "garage owner updated successfully",
                data : garageowner
            })
        }
        catch(err){
            res.status(500).json({
                message : "error updating garage owner",
                err : err
            })
     }
    }

// delete garage owner

const deleteowner = async (req,res) => {
    try{
        await userschema.findbyidanddelete(req.params.id)
        res.status(200).json({
            message : "garage owner deleted successfully",
            data : garageowner 
        })
    }
    catch(err){
        res.status(500).json({
            message : "error deleting garage owner",
            err : err
        })
    }
}