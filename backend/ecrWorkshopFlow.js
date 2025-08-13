const express=require('express')
const router=express.Router()
const cors=require('cors')
const base=require('./db')
const fs=require('fs')
const multer = require('multer');
const path = require('path');


router.use(cors())


// Set up the storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/Project_Images'); 
      

    },
    filename: (req, file, cb) => {
        // const currentDate = new Date();
// const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      cb(null, file.originalname );
    },
  });
  

  
  const upload = multer({ storage });
  
  router.post('/upload1', upload.any(), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('Image uploaded and saved on the server.');
  });

  //////pdf/////
  const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/Pdf');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload1 = multer({ storage: storage1 });

router.post('/uploadPdf', upload1.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('PDF uploaded and saved on the server.');
});
/////////////////////////
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/requestMail');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload2 = multer({ storage: storage2 });

router.post('/uploadrequestMail', upload2.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('requestMail uploaded and saved on the server.');
});

/////
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/acceptMail');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload3 = multer({ storage: storage3 });

router.post('/uploadacceptMail', upload3.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('acceptMail uploaded and saved on the server.');
});
////
const storage4 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/resPerson');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload4 = multer({ storage: storage4 });

router.post('/uploadresPerson', upload4.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('resPerson uploaded and saved on the server.');
});

////
const storage5 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/partiFeedback');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload5 = multer({ storage: storage5 });

router.post('/uploadpartiFeedback', upload5.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('partiFeedback uploaded and saved on the server.');
});
////
const storage6 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/resProfile');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload6 = multer({ storage: storage6 });

router.post('/uploadresProfile', upload6.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('resProfile uploaded and saved on the server.');
});
/////

const storage7 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/React/Muthayammal/Updated-MEC-RMS/frontend/public/ppt');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload7 = multer({ storage: storage7 });

router.post('/uploadppt', upload7.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('ppt uploaded and saved on the server.');
});





//////////////////////////

router.get('/dept/:obj',async(req,res)=>{
    // console.log(req.params.obj)
    let received=req.params.obj.split("-")
    console.log(received)
    base.query("select * from data_ecr_workshop where dept_id in(?)",[received],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records matches"})
            return
        }
        res.status(200).json(rows)
    })

})

router.get('/find/:deptId',async(req,res)=>{
    const dId=req.params.deptId
    const sql="select faculty_id,faculty_name from data_faculties where dept_id=? and not faculty_desig in(403,404)"
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No faculties"})
            return
        }
        res.status(200).json({rows})
    })
})

router.post('/propose/:tableName',async(req,res)=>{
    // receive the request from client

    const{event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,proposal_date,proposal_hod,proposal_principal,event_budget,event_coordinator,coordinator_phno,coordinator_designation,acdyr_id,dept_id,sem_id}=req.body
    sql=`insert into ${req.params.tableName}(event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,proposal_date,proposal_hod,proposal_principal,event_budget,event_coordinator,coordinator_phno,coordinator_designation,acdyr_id,dept_id,sem_id,approval_status,is_eve_completed) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0)`
        base.query(sql,[event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_number,guest_email,student_count,faculty_count,others_count,proposal_date,proposal_hod,proposal_principal,event_budget,event_coordinator,coordinator_phno,coordinator_designation,acdyr_id,dept_id,sem_id],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Workshop Proposal has sent",id:ack.insertId})
        })
})

router.get('/loadforlevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl1 from data_approval_ecr where dept_id=? and report_lvl1 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql="select * from data_ecr_workshop where approval_status=0 and completion_hod is null and is_eve_completed=0 and dept_id=?"
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

router.get('/loadforlevel2',async(req,res)=>{
    const dId=req.params.deptId
    let sql="select * from data_ecr_workshop where approval_status=1 and is_eve_completed=0 "
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No workshop to be approved"})
            return
        }
        res.status(200).json({row})
    })
})


router.put('/acknowledgelevel1/:deptId/:empId/:sno',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const sno=req.params.sno
    let sql="select sno from data_ecr_workshop where dept_id=? and approval_status=0 and is_eve_completed=0 "
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            console.log("selecting workshop")
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records available to acknowledge"})
            console.log("selecting workshop records")
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++) 
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][0].column_value.includes(eId)){
                sql="update data_ecr_workshop set report_lvl1=?, approval_status=approval_status+1 where dept_id=? and approval_status=0 and is_eve_completed=0 and sno=?"
                base.query(sql,[eId,dId,sno],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
})



//Principal Approval

// router.put('/acknowledgelevel2/:deptId/:empId/:sno',async(req,res)=>{
//     const dId=req.params.deptId
//     const eId=req.params.empId
//     const sno=req.params.sno
//     let sql="select sno from data_ecr_workshop where dept_id=? and approval_status=1 and is_eve_completed=0 "
//     base.query(sql,[dId],(err,row)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             console.log("selecting workshop")
//             return
//         }
//         if(row.length==0){
//             res.status(404).json({error:"No records available to acknowledge"})
//             console.log("selecting workshop records")
//             return
//         }
//         //no need
//         sql="call GetNonNullColumnsForDeptId(?)"
//         base.query(sql,[dId],(err,rows)=>{
//             if(err){
//                 res.status(500).json({error:err.message})
//                 return
//             }
//             if(rows.length==0){
//                 res.status(404).json({error:"No records available to acknowledge"})
//                 return
//             }
//             console.log(rows[0])
//             let count=rows.length
//             // for (let index = 0; index < rows.length; index++) 
//             // {count++;}
//             console.log(count)
//             //upto this
//             if(rows[0][0].column_value.includes(eId)){
//                 sql="update data_ecr_workshop set report_lvl1=?, approval_status=approval_status+1 where dept_id=? and approval_status=0 and is_eve_completed=0 and sno=?"
//                 base.query(sql,[eId,dId,sno],(err,result)=>{
//                     if(err){
//                         res.status(500).json({error:err.message})
//                         return
//                     }
//                     if(result.affectedRows==0){
//                         res.status(404).json({error:"Event hasn't completed yet"})
//                         return
//                     }
//                     res.status(200).json({message:"acknowledged by level"})
//                 })
//             }
//             else{
//                 res.status(404).json({error:"Forbidden access"})
//             }
//         })
//     })
// })


router.put('/acknowedgelevel2/:deptId/:sno',async(req,res)=>{
    const dId=req.params.deptId
    const sno=req.params.sno
    let sql="update data_ecr_workshop set report_lvl2=6000, approval_status=approval_status+1 where dept_id=? and sno=?"
    base.query(sql,[dId,sno],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({error:"Nothing has approved"})
            return
        }
        //res.status(200).json({message:`${wid} approved by principal`})
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            console.log(count)
            sql="update data_ecr_workshop set is_eve_completed=1 where sno=? and approval_status=?"
            base.query(sql,[sno,count],(err,result)=>{
                if(err){
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    res.status(404).json({error:"Event approved"})
                    return
                }
                res.status(200).json({message:`Event Completed ${dId}`})
            })
        })
    })
})



module.exports=router