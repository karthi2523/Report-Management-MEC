const express = require('express')
const base=require('./db')
const { json } = require('body-parser')
const server = express.Router()




server.get("/getAcdYrList",async(req,res)=>{
    let sql="select * from predefined_academic_year"
    base.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({err})
            return
        }
        else if(result.length==0){
            res.status(201).json({"message":"No records found"})
            return
        }
        res.status(200).json({result})
    })
})

server.get("/getFactList",async(req,res)=>{
    let sql="select * from data_faculties"
    base.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({err})
            return
        }
        else if(result.length==0){
            res.status(201).json({"message":"No records found"})
            return
        }
        res.status(200).json({result})
    })
})

server.get('/findFacWithDept/:deptId',async(req,res)=>{
    if(req.params.deptId==0){
        // const dId=req.params.deptId
    const sql=`select * from data_faculties inner join data_dept on data_faculties.dept_id = data_dept.dept_id where not faculty_desig in(401) and data_dept.dept_id=${req.params.deptId};`
    //     INNER JOIN data_dept d ON f.dept_id = d.dept_id
    // WHERE f.faculty_desig NOT IN (403, 404);
        base.query(sql,[],(err,rows)=>{
            if(err){
                console.log(err)
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No faculties"})
                return
            }
            res.status(200).json({rows})
        })
    }else{
        console.log("Cannot fetch with multiple major ids")
    const rows=[{
        faculty_id:"",
        faculty_name:"None"
    }]
    res.status(200).json({rows})
    }
})

module.exports=server
