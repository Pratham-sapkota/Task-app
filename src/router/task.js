const express=require('express')
const router=new express.Router()
const Tasks=require('../models/task')

router.post('/task', async (req,res)=>{
    const task= new Tasks(req.body)
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})



router.get('/task',async (req,res)=>{
    try{
        const task=await Tasks.find({})
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/task/:id',async (req,res)=>{
    const _id=req.params.id
    try{
        const task=await Tasks.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send
    }
   
})

router.patch('/task/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['task','description','email','completed']
    const isValidUpdate=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(404).send({error:"invalid updates"})
    }
    try{
        const task=await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)

    }
})

router.delete('/task/:id',async(req,res)=>{
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports=router
