const express = require("express")
const route = express.Router()
const base = require("./db")

route.post('/ecrProposal/:tableName',async(req,res)=>{
    // receive the request from client
    const{report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id}=req.body
    sql=`insert into ${req.params.tableName}(report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id,report_proposal_status,final_proposal_status,report_completion_status,final_completion_status,final_report_status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0)`
        base.query(sql,[report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Workshop Proposal has sent"})
        })
})

// route.get('/loadforlevel1/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let sql = `select report_lvl1, data_table_name from data_approval where dept_id=? and report_lvl1 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             // res.status(200).json([]);
//             return;
//         }

//         let resultArr = [];
//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_proposal_status=0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


route.get('/loadforlevel1/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl1, data_table_name from data_approval where report_lvl1 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        let resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl1, data_table_name from data_approval where dept_id=? and report_lvl1 like ?`;

        try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        let resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/acknowledgelevel1/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=0 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=0 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/loadforlevel2/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let resultArr = [];
//     let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             // res.status(200).json([]);
//             return;
//         }

//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });



route.get('/loadforlevel2/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl2, data_table_name from data_approval where report_lvl2 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/acknowledgelevel2/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=1 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            // }
            // else{
            //     res.status(404).json({error:"Forbidden access"})
            // }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=1 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     // console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=1 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            // }
            // else{
            //     res.status(404).json({error:"Forbidden access"})
            // }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=1 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     // console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/loadforlevel3/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let resultArr = [];
//     let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No records");
//             // res.status(200).json([]);
//             return;
//         }

//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


route.get('/loadforlevel3/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl3, data_table_name from data_approval where report_lvl3 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/acknowledgelevel3/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][2].column_value.includes(eId))
            // if(rows[0][2].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][2].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][2].column_value.includes(eId))
            // if(rows[0][2].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][2].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/loadforlevel4/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let resultArr = [];
//     let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No records");
//             // res.status(200).json([]);
//             return;
//         }

//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

route.get('/loadforlevel4/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl4, data_table_name from data_approval where report_lvl4 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});


route.put('/acknowledgelevel4/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][3].column_value.includes(eId))
            // if(rows[0][3].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][3].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][3].column_value.includes(eId))
            // if(rows[0][3].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][3].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/loadforlevel5/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let resultArr = [];
//     let sql = `select report_lvl5, data_table_name from data_approval where dept_id=${dId} and report_lvl5 like concat("%",${eId},"%")`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No records");
//             // res.status(200).json([]);
//             return;
//         }

//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


route.get('/loadforlevel5/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl5, data_table_name from data_approval where report_lvl5 like concat("%",${eId},"%")`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql,(err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl5, data_table_name from data_approval where dept_id=${dId} and report_lvl5 like concat("%",${eId},"%")`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/acknowledgelevel5/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql=`select report_id from ${req.params.tableName} where report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][4].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_5_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    }else{
        let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][4].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_5_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    }
})

// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

route.get('/loadecrCompletion/:deptId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    let sql=`select * from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=?`
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

route.put('/ecrCompletion/:tableName/:report_id',async(req,res)=>{
    // receive the request from client
    const{event_photo_1,event_photo_2,event_po,pdf,event_date_from,event_date_to,event_organizing_secretary,event_time,event_description,event_budget_utilized}=req.body
    sql=`update ${req.params.tableName} set event_photo_1=?, event_photo_2=?, event_po=?, pdf=?, event_date_from=?, event_date_to=?, event_organizing_secretary=?, event_time=?, event_description=?, event_budget_utilized=? where report_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0`
        base.query(sql,[event_photo_1,event_photo_2,event_po,pdf,event_date_from,event_date_to,event_organizing_secretary,event_time,event_description,event_budget_utilized,req.params.report_id],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Workshop Completion Report has sent"})
        })
})

// route.get('/completionloadforlevel1/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let sql = `select report_lvl1,data_table_name from data_approval where dept_id=? and report_lvl1 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             // res.status(200).json([]);
//             return;
//         }

//         let resultArr = [];
//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_1_completion_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, [dId], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

route.get('/completionloadforlevel1/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl1,data_table_name from data_approval where report_lvl1 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        let resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_1_completion_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl1,data_table_name from data_approval where dept_id=? and report_lvl1 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        let resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_1_completion_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/completionacknowledgelevel1/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1,final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1,final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     console.log(rows[0][0].column_value)
        //     if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/completionloadforlevel2/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let resultArr = [];  // Declare resultArr before the loop
//     let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             // res.status(200).json([]);
//             return;
//         }

//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where report_completion_status=1 and lvl_2_completion_sign is null and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, [dId], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         res.status(200).json({resultArr});
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


route.get('/completionloadforlevel2/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];  // Declare resultArr before the loop
    if(dId==0||dId=="0"){
        let sql = `select report_lvl2, data_table_name from data_approval where report_lvl2 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_completion_status=1 and lvl_2_completion_sign is null and final_proposal_status=1 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where report_completion_status=1 and lvl_2_completion_sign is null and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/completionacknowledgelevel2/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][1].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][1].column_value.includes(eId))
            // if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][1].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/completionloadforlevel3/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             return;
//         }

//         const resultArr = [];
//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_3_completion_sign is null and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, [dId], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({resultRows});
//             }
//         }

//         if (resultArr.length > 0) {
//             res.status(200).json({resultArr});
//         } else {
//             console.log("No records");
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

route.get('/completionloadforlevel3/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl3, data_table_name from data_approval where report_lvl3 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_3_completion_sign is null and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({resultArr});
        } else {
            console.log("No records");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_3_completion_sign is null and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({resultArr});
        } else {
            console.log("No records");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/completionacknowledgelevel3/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][2].column_value.includes(eId))
            // if(rows[0][2].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1 where report_completion_status=2 and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][2].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and final_completion_status=0 and report_completion_status=2 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][2].column_value.includes(eId))
            // if(rows[0][2].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1 where dept_id=? and report_completion_status=2 and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][2].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and final_completion_status=0 and report_completion_status=2 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/completionloadforlevel4/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             return;
//         }

//         const resultArr = [];
//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_4_completion_sign is null and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, [dId], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({ resultRows });
//             }
//         }

//         if (resultArr.length > 0) {
//             res.status(200).json({ resultArr });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

route.get('/completionloadforlevel4/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl4, data_table_name from data_approval where report_lvl4 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_4_completion_sign is null and report_completion_status=3 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_4_completion_sign is null and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/completionacknowledgelevel4/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][3].column_value.includes(eId))
            // if(rows[0][3].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][3].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][3].column_value.includes(eId))
            // if(rows[0][3].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][3].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

// route.get('/completionloadforlevel5/:deptId/:empId', async (req, res) => {
//     const dId = req.params.deptId;
//     const eId = req.params.empId;
//     let sql = `select report_lvl5, data_table_name from data_approval where dept_id=? and report_lvl5 like ?`;

//     try {
//         const rows = await new Promise((resolve, reject) => {
//             base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err);
//                     return;
//                 }
//                 resolve(row);
//             });
//         });

//         if (rows.length === 0) {
//             console.log("No approvals");
//             return;
//         }

//         const resultArr = [];
//         for (let i = 0; i < rows.length; i++) {
//             sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_5_completion_sign is null and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

//             const resultRows = await new Promise((resolve, reject) => {
//                 base.query(sql, [dId], (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                         return;
//                     }
//                     resolve(rows);
//                 });
//             });

//             if (resultRows.length > 0) {
//                 resultArr.push({ resultRows });
//             }
//         }

//         if (resultArr.length > 0) {
//             res.status(200).json({ resultArr });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

route.get('/completionloadforlevel5/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl5, data_table_name from data_approval where report_lvl5 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_5_completion_sign is null and report_completion_status=4 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl5, data_table_name from data_approval where dept_id=? and report_lvl5 like ?`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from ${rows[i].data_table_name} where final_proposal_status=1 and lvl_5_completion_sign is null and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/completionacknowledgelevel5/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql=`select report_id from ${req.params.tableName} where final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][4].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_5_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    }else{
        let sql=`select report_id from ${req.params.tableName} where dept_id=? and final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
        // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     // for (let index = 0; index < rows.length; index++)
        //     // {count++;}
        //     console.log(count)
        //     //upto this
        //     if(rows[0][4].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_5_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
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
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    }
})

route.put('/reject/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="${req.params.tableName}"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
            let sql=`select report_id from ${req.params.tableName} where report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][0].column_value)
            // if(rows[0][0].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set rejected_by=?, final_report_status=2 where report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"rejected by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            // console.log(row)
            // sql="call GetNonNullColumnsForDataApprovals(?,?,?);"
            // base.query(sql,[dId,eId,req.params.tableName],(err,rows)=>{
            // if(err){
            //     res.status(500).json({error:err.message})
            //     return
            // }
            // if(rows.length==0){
            //     res.status(404).json({error:"No records available to acknowledge"})
            //     return
            // }
            // console.log(rows[0])
            // let count=rows.length
            // // for (let index = 0; index < rows.length; index++)
            // // {count++;}
            // console.log(count)
            // //upto this
            // console.log(rows[0][0].column_value)
            // if(rows[0][0].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set rejected_by=?, final_report_status=2 where dept_id=? and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"rejected by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
    })
    }
})


module.exports = route