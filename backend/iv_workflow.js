const express = require("express")
const route = express.Router()
const base = require("./db")
// const cors=require('cors')



//get mapping
//async - multiple interactions
route.get('/fetchIv',async(req,res)=>{
    const sql = "select * from data_iv"
    base.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.status(201).json({"error":"No records found"})  
            return
        }
        res.status(200).json({records})
    })
})

//post mapping
route.post('/proposeIV',async(req,res)=>{
    const {
        date_of_visit_from  ,
        date_of_visit_to ,
        details_of_the_industry_1 ,
        details_of_the_industry_2, 
        details_of_the_industry_3, 
        name_of_the_contact_person_1, 
        designation_of_the_contact_person_1 ,
        phone_no_of_the_contact_person_1 , 
        email_of_the_contact_person_1, 
        name_of_the_contact_person_2,
        designation_of_the_contact_person_2 , 
         phone_no_of_the_contact_person_2 ,
        email_of_the_contact_person_2, 
        name_of_the_contact_person_3 ,
        designation_of_the_contact_person_3, 
        phone_no_of_the_contact_person_3, 
        email_of_the_contact_person_3 ,
        name_of_the_inn , 
        address_of_the_inn , 
        phone_no_of_the_inn ,
        students_count,
        faculty_count, 
        event_coordinator ,
name_of_the_travel_1 , 
address_of_the_travel_1, 
bus_no_of_the_travel_1 ,
operator_of_the_travel_1, 
operator_contact_of_the_travel_1, 
name_of_the_travel_2 ,
address_of_the_travel_2, 
bus_no_of_the_travel_2 ,
operator_of_the_travel_2,
operator_contact_of_the_travel_2 , 
name_of_the_travel_3 , 
address_of_the_travel_3 , 
bus_no_of_the_travel_3 , 
operator_of_the_travel_3 , 
operator_contact_of_the_travel_3, 
faculty_accompanied ,
undertaking_from_parents,
acdyr_id,
sem_id,
year_of_students_visited,
sem_of_students_visited,
proposal_date
  } = req.body
    const sql = "insert into data_iv (date_of_visit_from,date_of_visit_to,details_of_the_industry_1 ,details_of_the_industry_2,details_of_the_industry_3,name_of_the_contact_person_1,designation_of_the_contact_person_1 ,phone_no_of_the_contact_person_1,email_of_the_contact_person_1,name_of_the_contact_person_2, designation_of_the_contact_person_2,phone_no_of_the_contact_person_2 ,email_of_the_contact_person_2,name_of_the_contact_person_3 ,designation_of_the_contact_person_3,phone_no_of_the_contact_person_3,email_of_the_contact_person_3 , name_of_the_inn , address_of_the_inn , phone_no_of_the_inn ,students_count,faculty_count,event_coordinator ,name_of_the_travel_1 , address_of_the_travel_1,bus_no_of_the_travel_1 ,operator_of_the_travel_1,operator_contact_of_the_travel_1,name_of_the_travel_2 ,address_of_the_travel_2,bus_no_of_the_travel_2 ,operator_of_the_travel_2,operator_contact_of_the_travel_2,name_of_the_travel_3 , address_of_the_travel_3 ,bus_no_of_the_travel_3 , operator_of_the_travel_3 ,operator_contact_of_the_travel_3,faculty_accompanied,undertaking_from_parents, acdyr_id, sem_id,sem_of_students_visited,year_of_students_visited,proposal_date,report_proposal_status,final_proposal_status,report_completion_status,final_completion_status,final_report_status)values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0)"
    //update mec_students set DOB=?, Age=? where id=?
    base.query(sql,[
        date_of_visit_from,date_of_visit_to,details_of_the_industry_1 ,details_of_the_industry_2,details_of_the_industry_3,name_of_the_contact_person_1,designation_of_the_contact_person_1 ,phone_no_of_the_contact_person_1,email_of_the_contact_person_1,name_of_the_contact_person_2, designation_of_the_contact_person_2,phone_no_of_the_contact_person_2 ,email_of_the_contact_person_2,name_of_the_contact_person_3 ,designation_of_the_contact_person_3,phone_no_of_the_contact_person_3,email_of_the_contact_person_3 , name_of_the_inn , address_of_the_inn , phone_no_of_the_inn ,students_count,faculty_count,event_coordinator ,name_of_the_travel_1 , address_of_the_travel_1,bus_no_of_the_travel_1 ,operator_of_the_travel_1,operator_contact_of_the_travel_1,name_of_the_travel_2 ,address_of_the_travel_2,bus_no_of_the_travel_2 ,operator_of_the_travel_2,operator_contact_of_the_travel_2,name_of_the_travel_3 , address_of_the_travel_3 ,bus_no_of_the_travel_3 , operator_of_the_travel_3 ,operator_contact_of_the_travel_3,faculty_accompanied,undertaking_from_parents, acdyr_id, sem_id,sem_of_students_visited,year_of_students_visited,proposal_date],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({"error":err.message})
            return
        }
        res.status(200).json({"message":"Iv Proposal Sent Successfully"})
    })
})




//get mapping
//async - multiple interactions
route.get('/ivtour',async(req,res)=>{
    const sql = "select * from iv_report"
    base.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({"error":err.message})
            return
        }
        else if(records.length==0){
            res.status(201).json({"error":"No records found"})
            return
        }
        res.status(200).json({records})
    })
})



//put mapping
route.put('/update/:report_id',async(req,res)=>{
    // const sno = req.params.s_no
    const {acdyr_id, 
        sem_id , 
        mode_of_transport, 
        dept ,
        year_of_students_visited , 
        sem_of_students_visited ,
        total_class_strength , 
        no_of_students_visited , 
        students_visited_list,
        place_of_visit, 
leaving_time, 
day_1_reaching_time, 
day_1_FN_time ,
day_1_FN_place,
day_1_AN_time , 
day_1_AN_place , 
day_1_night_time, 
day_1_night_place, 
day_2_FN_time, 
day_2_FN_place, 
day_2_AN_time,
day_2_AN_place, 
day_2_night_time ,
day_2_night_place ,
day_3_FN_time ,
day_3_FN_place , 
day_3_AN_time ,
day_3_AN_place ,
day_3_night_time , 
day_3_night_place ,
date_of_arriving,
time_of_arriving} = req.body
    const sql = "update data_iv set acdyr_id=?, sem_id=? ,mode_of_transport=?, dept_id=?, year_of_students_visited=? ,sem_of_students_visited=?, total_class_strength=?, no_of_students_visited=?, students_visited_list=?, places_of_visit=?, leaving_time=?, day_1_reaching_time=?, day_1_FN_time=?, day_1_FN_place=?, day_1_AN_time=?, day_1_AN_place=?, day_1_night_time=?, day_1_night_place=?, day_2_FN_time=?, day_2_FN_place=?, day_2_AN_time=?, day_2_AN_place=?, day_2_night_time=?, day_2_night_place=?, day_3_FN_time=?, day_3_FN_place=?, day_3_AN_time=?, day_3_AN_place=?, day_3_night_time=?, day_3_night_place=?, date_of_arriving=?, time_of_arriving=? where report_id=?"
    base.query(sql,[acdyr_id, 
        sem_id, 
        mode_of_transport, 
        dept,
        year_of_students_visited, 
        sem_of_students_visited,
        total_class_strength, 
        no_of_students_visited, 
        students_visited_list,
        place_of_visit,
        leaving_time,
        day_1_reaching_time, 
        day_1_FN_time,
        day_1_FN_place,
        day_1_AN_time, 
        day_1_AN_place, 
        day_1_night_time, 
        day_1_night_place, 
        day_2_FN_time, 
        day_2_FN_place, 
        day_2_AN_time,
        day_2_AN_place, 
        day_2_night_time,
        day_2_night_place,
        day_3_FN_time,
        day_3_FN_place, 
        day_3_AN_time,
        day_3_AN_place,
        day_3_night_time, 
        day_3_night_place,
        date_of_arriving,
        time_of_arriving,
    req.params.report_id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"error":err.message})
            return
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

//delete mapping



module.exports=route
/*-------------------------------------------------------------------------*/