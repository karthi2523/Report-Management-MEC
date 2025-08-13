const express=require('express')
const route=express.Router()
const base=require('./db')
const cors=require('cors')

route.use(cors())

route.post('/login',async(req,res)=>{
    const{id,pass}=req.body
    const sql="select * from data_faculties as faculties INNER JOIN predefined_designation AS designation ON faculties.faculty_desig = designation.designation_id where faculty_id=? and password=?"
    base.query(sql,[id,pass],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"Invalid faculty_id /password"})
            return
        }
        res.status(200).json(rows[0])
    })
})

module.exports=route