const express= require('express')
const bodyparser=require('body-parser')
const database=require('./db')
const cors=require('cors')
const multer=require('multer')

const server=express.Router()
server.use(cors())
server.use(bodyparser.urlencoded({extended:true}))
server.use(bodyparser.json())



////////////////////journal///////////////////////
server.get('/journallist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


server.post('/journalnewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,emp_id,dept_id,academic_year,semester,	name_of_author,	title_of_paper,	name_of_journal,date_of_publication,issn_number,volume_no,issue_no,page_no,journal_listed_in,link_to_website_of_journal,journal_first_page_PDF}=req.body
    const sql="insert into data_setaf_journal_publication values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,empid,dept_id,
        academic_year,
        semester,
        name_of_author,	
        title_of_paper,	
        name_of_journal,
        date_of_publication,
        issn_number,
        volume_no,
        issue_no,
        page_no,
        journal_listed_in,
        link_to_website_of_journal,
        journal_first_page_PDF
    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
/////hod dashboard
server.get('/journallist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/journalrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join data_dept on setaf.dept_id=data_dept.dept_id  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

///////////////////conference publication and presentation//////////////////////////////
server.get('/conferencelist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select  * from data_setaf_conference_publication_and_presentations as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
//post method
server.post('/conferencenewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,dept_id,
        emp_id,
        academic_year,
        semester,
        name_of_the_authors,
        title_of_the_conference_paper,
        name_of_the_conference,
        place_of_the_conference,
        conference_type,
        date_of_conference,
        isbn_of_the_conference_proceeding,
        conference_certificate_and_proceeding_pdf
    }=req.body
    const sql="insert into data_setaf_conference_publication_and_presentations values (?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,dept_id,
            empid,
            academic_year,
        	semester,
            name_of_the_authors,
            title_of_the_conference_paper,
            name_of_the_conference,
            place_of_the_conference,
            conference_type,
            date_of_conference,
            isbn_of_the_conference_proceeding,
            conference_certificate_and_proceeding_pdf

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/conferencelist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_conference_publication_and_presentations  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/conferencerecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_conference_publication_and_presentations  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id "
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/conf/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_conference_publication_and_presentations as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

/////////////////////////////////workshop//////////////////////////
server.get('/workshoplist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_workshop_seminar_fdps_sdpa_participation  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/workshopnewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        certificates_pdf
    }=req.body
    const sql="insert into data_setaf_workshop_seminar_fdps_sdpa_participation values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        certificates_pdf	
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


/////hod dashboard
server.get('/workshoplist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_workshop_seminar_fdps_sdpa_participation  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/workshopprincipalrecs',async(req,res)=>{  
    const query="select * from  data_setaf_workshop_seminar_fdps_sdpa_participation as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


////////pdf fetch code
server.get('/data/workshop/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_workshop_seminar_fdps_sdpa_participation as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id  inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });


////////Techtalks//////////

server.get('/techtalklist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_tech_talks as setaf inner join data_dept as dept on setaf.lecture_delivered_to_branch=dept.dept_id inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/techtalknewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        name_of_the_faculty,
        MuDiL_number,
        lecture_delivered_to_branch,
        academic_year,
        semester,
        section,
        data_of_lecture_delivered,
        period,
        topic_of_discussion,
        no_of_beneficiaries,
        detail_of_discussion_made,
        outcome_of_the_discussion,
        outcome_of_the_activity,
        PO_and_PSO,
        attendance_sheet_pdf,
        handout_of_lecture_pdf	
    }=req.body
    const sql="insert into data_setaf_tech_talks values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,
        name_of_the_faculty,
        MuDiL_number,
        lecture_delivered_to_branch,
        academic_year,
        semester,
        section,
        data_of_lecture_delivered,
        period,
        topic_of_discussion,
        no_of_beneficiaries,
        detail_of_discussion_made,
        outcome_of_the_discussion,
        outcome_of_the_activity,
        JSON.stringify(PO_and_PSO),
        attendance_sheet_pdf,
        handout_of_lecture_pdf	

    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
////////pdf fetch code
server.get('/data/techtalk/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_tech_talks as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id inner join predefined_academic_year   where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
  /////hod dashboard
  server.get('/techtalklist/hoddashboard/:deptID',async(req,res)=>{
    const deptid=req.params.deptID;
    const query="select * from  data_setaf_tech_talks as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id inner join data_dept as dept on setaf.dept_id=dept.dept_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/techtalkprincipalrecs',async(req,res)=>{  
    const query="select * from  data_setaf_tech_talks as setaf inner join data_dept as dept on setaf.dept_id=dept.dept_id inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


///////////////////////faculty guest talk in other institutions/////////////////////////
server.get('/facultylist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_faculty_guest_talk_in_other_institution as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/facultynewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {emp_id,
        report_id,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        date,
        topic_of_guest_talk,
        name_of_institution_or_industry,
        place_of_institution_or_industry,
        no_of_beneficaries,
        letter_of_appreciation_or_certificate_pdf
    }=req.body
    const sql="insert into data_setaf_faculty_guest_talk_in_other_institution values(?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[empid,
        report_id,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        date,
        topic_of_guest_talk,
        name_of_institution_or_industry,
        place_of_institution_or_industry,
        no_of_beneficaries,
        letter_of_appreciation_or_certificate_pdf
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

////////pdf fetch code
server.get('/data/faculty/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_faculty_guest_talk_in_other_institution as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

  /////hod dashboard
server.get('/facultylist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from  data_setaf_faculty_guest_talk_in_other_institution as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id  where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/facultyprincipalrecs',async(req,res)=>{  
    const query="select * from  data_setaf_faculty_guest_talk_in_other_institution as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id "
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
////////////////////////////nptel//////////////////////////////
server.get('/nptellist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_nptel_certification as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/nptelnewrecord/:empid',async(req,res)=>{
    const empid=req.params.empid
    const {emp_id,
        report_id,
        academic_year,
        semester,
        name_of_the_faculty,
        year,
        session,
        course_name,
        score_obtained,
        certificate_type,
        certificate_pdf,
        dept_id
    }=req.body
    const sql="insert into data_setaf_nptel_certification values (?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[empid,
        report_id,
        academic_year,
        semester,
        name_of_the_faculty,
        year,
        session,
        course_name,
        score_obtained,
        certificate_type,
        certificate_pdf,
        dept_id
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

server.get('/nptel/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_nptel_certification  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;
    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
/////hod dashboard
server.get('/nptel/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_nptel_certification as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id  where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }

        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/nptelrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_nptel_certification as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

////fetch data/////
server.get('/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =`SELECT * FROM data_setaf_nptel_certification where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
  //////pdf fetch datas////////
server.get('/nptel/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_nptel_certification where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });


  ////////////////////////////Participation in TASTE//////////////////////////////
  server.get('/tastelist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_participation_in_taste as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/tastenewrecord/:empid',async(req,res)=>{
    const empid=req.params.empid
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        date,
        taste_number,
        seminar_topic,
        resource_person_name,
        outcome_of_the_activity,
        

    }=req.body
    // const sql="insert into data_setaf_participation_in_taste values (?,?,?,?,?,?,?,?) where emp_id=?";
    const sql="insert into  data_setaf_participation_in_taste values (?,?,?,?,?,?,?,?,?,?,?);"
    
    database.query(sql,[  report_id,empid,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        date,
        taste_number,
        seminar_topic,
        resource_person_name,
        outcome_of_the_activity,


    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

server.get('/taste/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql = `SELECT * FROM data_setaf_participation_in_taste  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;
    // const sql=`SELECT * FROM  data_setaf_participation_in_taste;`
//SELECT * FROM  data_setaf_participation_in_taste  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;
    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
/////hod dashboard
server.get('/taste/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from  data_setaf_participation_in_taste as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id    where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/tasterecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_participation_in_taste as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
////////////////////proposal submission for grants

server.post('/proposalnewrecord/:empid',async(req,res)=>{
    const empid=req.params.empid
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_funding_agency,
        date_of_submission,
        type,
        title_of_the_proposal_submitted,
        duration,
        amount_quoted_in_lakhs,
        grant_sanctioned,
        proposal_proof_pdf,
        grant_sanctioned_proof_pdf

    }=req.body
    const sql="insert into data_setaf_proposal_submission_for_grants values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,        
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_funding_agency,
        date_of_submission,
        type,
        title_of_the_proposal_submitted,
        duration,
        amount_quoted_in_lakhs,
        grant_sanctioned,
        proposal_proof_pdf,
        grant_sanctioned_proof_pdf
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
server.get('/proposallist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_proposal_submission_for_grants as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



/////hod dashboard
server.get('/proposallist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_proposal_submission_for_grants as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            console.log(err)
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/proposalrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_proposal_submission_for_grants as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/proposal_data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_proposal_submission_for_grants as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;
    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });

/////////////////////////////////////////////////visit to industry//////////////////////////////////////

server.get('/industrylist/:empId',async(req,res)=>{

    const empid=req.params.empId;
    const query="select * from data_setaf_visit_to_industries_institution as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:err})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/industryrecord/:empid',async(req,res)=>{

    const empid=req.params.empid;
    const{emp_id,
        report_id,
        dept_id,
        faculty_name,
        academic_year, 
        semester,
        date_of_visit,
        name_of_industry,   
        location_of_industry,   
        website_link_of_industry,   
        name_of_insdustry_instution_person_interacted,  
        designation_of_industry_instution_person_interacted,    
        purpose_of_the_visite,
        outcome_of_the_activity,
        attachments,
        report_of_visit_pdf,
        photo_jpg,
        geotagged_photos_jpg
    }=req.body
    
    const sql="insert into data_setaf_visit_to_industries_institution values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[empid,
        report_id,
        dept_id,
        faculty_name,

        academic_year,  
        semester,
        date_of_visit,
        name_of_industry,   
        location_of_industry,   
        website_link_of_industry,   
        name_of_insdustry_instution_person_interacted,  
        designation_of_industry_instution_person_interacted,    
        purpose_of_the_visite,
        outcome_of_the_activity,
        attachments,
        report_of_visit_pdf,
        photo_jpg,
        geotagged_photos_jpg],(err,records)=>{
        if(err){
            console.log(err)
            res.status(500).json({'error':err.message})
            return
        }
        res.status(200).json(records)

    })

})

/////hod dashboard
server.get('/industrylist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_visit_to_industries_institution as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/industryrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_visit_to_industries_institution as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/industry/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_visit_to_industries_institution as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join data_dept on setaf.dept_id=data_dept.dept_id  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });



///// seed post method/////
server.post('/seednewrecord/:empid',async(req,res)=>{
    const empid=req.params.empid
    const{emp_id,report_id,dept_id,academic_year,semester,name_of_the_faculty,title_of_the_research_project,amount_of_seed_money,year_of_receiving,metrf_sanction_letter_pdf}=req.body
    const sql="insert into data_setaf_seed_money_proposal_for_research values(?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[empid,report_id,dept_id,academic_year,semester,name_of_the_faculty,title_of_the_research_project,amount_of_seed_money,year_of_receiving,metrf_sanction_letter_pdf],(err,records)=>{
        if(err){
            res.status(500).json({'error':err.message})
            return
        }
        res.status(200).json(records)

    })

})


/////get faculty////


server.get('/seedlist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
      const query="select * from data_setaf_seed_money_proposal_for_research as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.emp_id=?"
    //  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


/////Hod dashboard/////
server.get('/seedlist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_seed_money_proposal_for_research as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard////

server.get('/seedrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_seed_money_proposal_for_research as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
server.get('/seeddata/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_seed_money_proposal_for_research as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
  //////////////////////////////////////////////////////

//// pdf upload//////////
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/MEC/MEC PROJECT/New folder/Updated-MEC-RMS-mec/frontend/public/Journal_SETAF');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload1 = multer({ storage: storage1 });

server.post('/uploadPdf', upload1.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('PDF uploaded and saved on the server.');
});

//////////////////////Consultancy//////////////////////////////

server.get('/consultancylist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_consultancy_and_corporate_training as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id = ? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.json({message:"the value in not found in the table"})
           
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/consultancynewrecord',async(req,res)=>{
    const {
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_consultancy_project,
        sponsoring_agency_details,
        sponsoring_agency_contact_details,
        date,
        revenue_generated,
        number_to_trainees,
        enclose_proof_pdf   
       
    }=req.body
    const sql="insert into data_setaf_consultancy_and_corporate_training values(?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_consultancy_project,
        sponsoring_agency_details,
        sponsoring_agency_contact_details,
        date,
        revenue_generated,
        number_to_trainees,
        enclose_proof_pdf   
    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})    


/////hod dashboard
server.get('/consultancylist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_consultancy_and_corporate_training as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            console.log(err)
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/consultancyrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_consultancy_and_corporate_training as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



//////pdf fetch datas////////
server.get('/consultancy_data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_consultancy_and_corporate_training as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

  
//////////////////////////////////////////////////////Patents filled//////////////////////////////////////////////////

server.get('/patentlist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_patents_filled as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id  where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"no record found"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/patentnewrecord',async(req,res)=>{
    const {
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        title_of_the_patent,
        application_no,
        date_of_application,
        date_of_publication,
        enclose_first_page_pdf  
       
    }=req.body
    const sql="insert into data_setaf_patents_filled values(?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        title_of_the_patent,
        application_no,
        date_of_application,
        date_of_publication,
        enclose_first_page_pdf  

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/patentlist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_patents_filled as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            console.log(err)
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/patentrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_patents_filled as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/patent/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_patents_filled as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;
    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });


  

/////////////////////////////////////////////////////////////////////////collabrative/////////////////////////////////////////////

server.get('/collabrativelist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_collabrative_activity_with_mou as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            res.status(200).json(result)
        }
    })
})

server.post('/collabrativerecord',async(req,res)=>{
    const {
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_faculty_coordinator,    
        nature_of_the_activity, 
        name_of_MoU_signed_industry_or_institution,
        title_of_the_activity,
        duration_from,
        duration_to,
        name_of_resource_person,
        contact_details_of_resource_person,
        designation_of_resource_person,
        organization_details_of_resource_person,
        no_of_beneficiaries,
        enclose_Proof_PDF   
    }=req.body
    const sql="insert into data_setaf_collabrative_activity_with_mou values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[
        report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_faculty_coordinator,    
        nature_of_the_activity, 
        name_of_MoU_signed_industry_or_institution,
        title_of_the_activity,
        duration_from,
        duration_to,
        name_of_resource_person,
        contact_details_of_resource_person,
        designation_of_resource_person,
        organization_details_of_resource_person,
        no_of_beneficiaries,
        enclose_Proof_PDF   
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/collabrativelist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_collabrative_activity_with_mou as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            console.log(err)
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/collaborativerecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_collabrative_activity_with_mou as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/collaborative_data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_collabrative_activity_with_mou as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on dept.dept_id=setaf.dept_id where report_id=?`;
    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });

////////////////////////////////e-content////////////////////////////////

server.post('/econtentnewrecord',async(req,res)=>{
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_module_developed,
        module_of_platform,
        date_of_launching_e_content,
        link_to_the_module_developed
    }=req.body;
    const sql="insert into data_setaf_e_content values (?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_module_developed,
        module_of_platform,
        date_of_launching_e_content,
        link_to_the_module_developed

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


server.get('/econtentlist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query=" select * from data_setaf_e_content as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/econtent/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_e_content as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

  /////hod dashboard
server.get('/econtentlist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_e_content as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/econtentrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_e_content as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id "
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


////////////////////////////////visit to library////////////////////////////////

server.post('/visittolibrarynewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        date,
        purpose_of_visit
    }=req.body;
    const sql="insert into data_setaf_visit_to_library values(?,?,?,?,?,?,?,?)"
    database.query(sql,[report_id,
        empid,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        date,
        purpose_of_visit

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


server.get('/visittolibrarylist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_visit_to_library as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/visittolibrary/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_visit_to_library as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
//hod
  server.get('/visittolibrary/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query=`select * from data_setaf_visit_to_library as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?`;
    // console.log("Executing the code via deptID:",deptid)
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
  

server.get('/visittolibraryrecs', async (req, res) => {
    const query = `
        SELECT * 
        FROM data_setaf_visit_to_library AS setaf 
        INNER JOIN predefined_academic_year AS acd 
        ON acd.acd_yr_id = setaf.academic_year
        INNER JOIN predefined_semester as sems 
        ON setaf.semester=sems.sem_id
    `;
    
    database.query(query, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.length == 0) {
            console.warn("No records found in the table");
            res.status(404).json({ message: "No records found in the table" });
            return;
        } else {
            res.status(200).json(result);
        }
    });
});




////////////////////////////////Award at National and International////////////////////////////////

server.post('/awardatnational/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_award,
        category,
        date_of_award,
        name_of_awarding_organization,
        award_certificate_pdf
    }=req.body;
    const sql="insert into data_setaf_awards_at_national values(?,?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[report_id,
        empid,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_award,
        category,
        date_of_award,
        name_of_awarding_organization,
        award_certificate_pdf

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


////award at national and international
server.get('/awardatnationallist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_awards_at_national as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/awardatnational/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_awards_at_national as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

  server.get('/awardatnational/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query=`select * from data_setaf_awards_at_national as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where setaf.dept_id=?`;
    // console.log("Executing the code via deptID:",deptid)
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
  

server.get('/awardatnational/principaldashboard', async (req, res) => {
    const query = `
        SELECT * 
        FROM data_setaf_awards_at_national AS setaf 
        INNER JOIN predefined_academic_year AS acd 
        ON acd.acd_yr_id = setaf.academic_year
        INNER JOIN predefined_semester as sems 
        ON setaf.semester=sems.sem_id
    `;
    
    database.query(query, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.length == 0) {
            console.warn("No records found in the table");
            res.status(404).json({ message: "No records found in the table" });
            return;
        } else {
            res.status(200).json(result);
        }
    });
});



////////////////////////////////BOOKS CHAPTERS AUTHORSHIPS////////////////////////////////

server.post('/booksrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_authors,
        title_of_the_book,
        date_of_publication,
        isbn_number,
        details_of_the_publisher,
        website_link_of_the_publisher,
        category,
        enclose_proof_pdf
    }=req.body;
    const sql="insert into data_setaf_books_chapter_authorship values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[report_id,
        empid,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        name_of_the_authors,
        title_of_the_book,
        date_of_publication,
        isbn_number,
        details_of_the_publisher,
        website_link_of_the_publisher,
        category,
        enclose_proof_pdf

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


server.get('/bookslist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_books_chapter_authorship as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/books/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_books_chapter_authorship as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on setaf.dept_id=dept.dept_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

  server.get('/books/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query=`select * from data_setaf_books_chapter_authorship as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?`;
    // console.log("Executing the code via deptID:",deptid)
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
  

server.get('/books/principaldashboard', async (req, res) => {
    const query = `
        SELECT * 
        FROM data_setaf_books_chapter_authorship AS setaf 
        INNER JOIN predefined_academic_year AS acd 
        ON acd.acd_yr_id = setaf.academic_year
        INNER JOIN predefined_semester as sems
        ON setaf.semester=sems.sem_id
    `;
    
    database.query(query, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.length == 0) {
            console.warn("No records found in the table");
            res.status(404).json({ message: "No records found in the table" });
            return;
        } else {
            res.status(200).json(result);
        }
    });
});



/////students_motivation/////

server.get('/Motivationlist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_students_motivation as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/Motivationnewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,emp_id,dept_id,academic_year,semester,name_of_the_faculty,name_of_the_student,paper_presentation_project_submission_other_contest,date,no_of_beneficiaries,certificate_PDF}=req.body
    const sql="insert into data_setaf_students_motivation values(?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,empid,dept_id,
        academic_year,
        semester,
        name_of_the_faculty,	
        name_of_the_student,
        paper_presentation_project_submission_other_contest,
        date,
        no_of_beneficiaries,
        certificate_PDF
    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/Motivationlist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_students_motivation as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/Motivationrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_students_motivation as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/data/motivation/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_students_motivation as setaf inner join data_dept as dept on setaf.dept_id=dept.dept_id inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });
module.exports = server


////////////////////////////professional socitey membership/////////////////////
server.get('/professionallist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_professional_society_membership as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/professionalrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,dept_id,academic_year,semester, name_of_the_faculty,date_of_membership,membership_id,professional_society_membership,membership_certificate_PDF}=req.body
    const sql="insert into data_setaf_professional_society_membership values(?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,
        academic_year,
        semester,
        name_of_the_faculty,  
        membership_id,
        date_of_membership,
        professional_society_membership,
        membership_certificate_PDF,
       
    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/professionallist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_professional_society_membership as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/professionalrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_professional_society_membership as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/data/professional/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_professional_society_membership as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join data_dept on setaf.dept_id=data_dept.dept_id  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

///////////////fieldwork and internship////////////////
server.get('/fieldworklist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_fieldwork_internship as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


server.post('/fieldwork/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const {report_id,emp_id,dept_id,academic_year,semester,name_of_the_faculty,nature_of_guidance,duration_from,duration_to,number_of_students_undertaking_the_fieldwork_internship,student_name,certificate_report_pdf}=req.body
    const sql="insert into data_setaf_fieldwork_internship values(?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,empid,dept_id,
        academic_year,
        semester,
        name_of_the_faculty,
        nature_of_guidance,
        duration_from,
        duration_to,
        number_of_students_undertaking_the_fieldwork_internship,
        student_name,
        certificate_report_pdf


    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
/////hod dashboard
server.get('/fieldwork/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_fieldwork_internship as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/fieldworkrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_fieldwork_internship as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/data/fieldwork/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_fieldwork_internship as setaf inner join predefined_academic_year as acd on setaf.academic_year=acd.acd_yr_id inner join data_dept as dept on setaf.dept_id=dept.dept_id  where report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });


  ///fdpsdp
  server.get('/fdpsdplist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_fdp_sdp  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/fdpsdp/newrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        certificates_pdf
    }=req.body
    const sql="insert into data_setaf_fdp_sdp values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,
        name_of_the_faculty,
        academic_year,
        semester,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        certificates_pdf	
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


/////hod dashboard
server.get('/fdpsdplist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_fdp_sdp as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/fdpsdp/principalrecs',async(req,res)=>{  
    const query="select * from  data_setaf_fdp_sdp as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join predefined_semester as sems on setaf.semester=sems.sem_id"
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


////////pdf fetch code
server.get('/data/fdpsdp/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_fdp_sdp as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id  inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });




////////filter///////////////////////////////

// server.post('/filterSetaf/:tableName',async(req,res)=>{
//     try{
//         const tableName = req.params.tableName
//         const { acdyr_id, sem_id, dept_id, emp_id } = req.body
//         const academic_id = acdyr_id.split(',')
//         const dept = dept_id.split(",")
//         const sem = sem_id.split(',')
//         const emp = emp_id.split(',')
//         let resultArray = []

//         const processQuery = async (sql, params) => {
//             return new Promise((resolve, reject) => {
//                 database.query(sql, params, (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             });
//         };

//         const pushToResultArray = async (sql, params) => {
//             console.log(sql)
//             const temp = await processQuery(sql, params);
//             if (temp.length > 0) {
//                 resultArray.push(...temp);
//                 // console.log("Resultarray"+resultArray)
//             } else {
//                 console.log("No records");
//             }
//         };
// // 1
//         if(acdyr_id!="" && sem_id=="" && dept_id=="" && emp_id==""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id})`)
//         }
// // 2
//         else if(acdyr_id=="" && sem_id=="" && dept_id!="" && emp_id==""){
//             await pushToResultArray(`select * from ${tableName} where dept_id in (${dept})`)
//         }
// // 3
//         else if(acdyr_id=="" && sem_id=="" && dept_id=="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where emp_id in (${emp})`)
//         }
// // 4
//         else if(acdyr_id!="" && sem_id!="" && dept_id=="" && emp_id==""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem})`)
//         }
// // 5
//         else if(acdyr_id!="" && sem_id=="" && dept_id!="" && emp_id==""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and dept_id in (${dept})`)
//         }
// // 6
//         else if(acdyr_id!="" && sem_id=="" && dept_id=="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and emp_id in (${emp})`)
//         }
// // 7
//         else if(acdyr_id=="" && sem_id=="" && dept_id!="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and emp_id in (${emp})`)
//         }
// // 8
//         else if(acdyr_id!="" && sem_id!="" && dept_id!="" && emp_id==""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem}) and dept_id in (${dept})`)
//         }
// // 9
//         else if(acdyr_id!="" && sem_id!="" && dept_id=="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem}) and emp_id in (${emp})`)
//         }
// // 10
//         else if(acdyr_id!="" && sem_id=="" && dept_id!="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and academic_year in (${academic_id}) and emp_id in (${emp})`)
//         }
// // 11
//         else if(acdyr_id!="" && sem_id!="" && dept_id!="" && emp_id!=""){
//             await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and academic_year in (${academic_id}) and emp_id in (${emp}) and semester in(${sem})`)
//         }

//         res.status(200).json({ resultArray });

//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


server.post('/filterSetaf/principal/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const { acdyr_id, sem_id, dept_id, emp_id } = req.body;
        const academic_id = acdyr_id ? acdyr_id.split(',') : [];
        const dept = dept_id ? dept_id.split(",") : [];
        const sem = sem_id ? sem_id.split(',') : [];
        const emp = emp_id ? emp_id.split(',') : [];
        let resultArray = [];

        const processQuery = async (sql, params) => {
            return new Promise((resolve, reject) => {
                database.query(sql, params, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const pushToResultArray = async (sql, params) => {
            console.log(sql);
            const temp = await processQuery(sql, params);
            if (temp.length > 0) {
                resultArray.push(...temp);
            } else {
                console.log("No records");
            }
        };

      
        const combinations = [
            [dept, 'dept_id'],
            [emp, 'emp_id'],
            [sem, 'semester'],
            [academic_id, 'academic_year']
        ];
        
        const nonEmptyCombinations = combinations.filter(([values]) => values.length > 0);
        
        let conditions = '';
        
        if (nonEmptyCombinations.length > 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join(' AND ');
        } else if (nonEmptyCombinations.length === 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join('');
        } else {
            conditions = '1=1';  // If no conditions, add a default true condition
        }
        
        const query = `SELECT * FROM ${tableName} as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id WHERE ${conditions}`;
        
        await pushToResultArray(query);
        
        res.status(200).json({ resultArray });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/////faculty filter
server.post('/filterSetaf/:tableName/:empId', async (req, res) => {
    const empid = req.params.empId;
    try {
        const tableName = req.params.tableName;
        const { acdyr_id, sem_id, dept_id, emp_id } = req.body;
        const academic_id = acdyr_id ? acdyr_id.split(',') : [];
        const dept = dept_id ? dept_id.split(",") : [];
        const sem = sem_id ? sem_id.split(',') : [];
        const emp = emp_id ? emp_id.split(',') : [];
        let resultArray = [];

        const processQuery = async (sql, params) => {
            return new Promise((resolve, reject) => {
                database.query(sql, params, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const pushToResultArray = async (sql, params) => {
            console.log(sql);
            const temp = await processQuery(sql, params);
            if (temp.length > 0) {
                resultArray.push(...temp);
            } else {
                console.log("No records");
            }
        };

        const combinations = [
            [dept, 'dept_id'],
            [emp, 'emp_id'],
            [sem, 'semester'],
            [academic_id, 'academic_year']
        ];

        const nonEmptyCombinations = combinations.filter(([values]) => values.length > 0);

        let conditions = '';

        if (nonEmptyCombinations.length > 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join(' AND ');
        } else if (nonEmptyCombinations.length === 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join('');
        } else {
            conditions = '1=1';  // If no conditions, add a default true condition
        }

        // Ensure emp_id is always included in the conditions
        if (conditions) {
            conditions += ` AND (emp_id = '${empid}')`;
        } else {
            conditions = `(emp_id = '${empid}')`;
        }

        const query = `SELECT * FROM ${tableName} as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id WHERE ${conditions}`;

        await pushToResultArray(query);

        res.status(200).json({ resultArray });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/////hod filter page
server.post('/filterSetaf/hod/:tableName/:deptId', async (req, res) => {
    const deptid = req.params.deptId;
    try {
        const tableName = req.params.tableName;
        const { acdyr_id, sem_id, dept_id, emp_id } = req.body;
        const academic_id = acdyr_id ? acdyr_id.split(',') : [];
        const dept = dept_id ? dept_id.split(",") : [];
        const sem = sem_id ? sem_id.split(',') : [];
        const emp = emp_id ? emp_id.split(',') : [];
        let resultArray = [];

        const processQuery = async (sql, params) => {
            return new Promise((resolve, reject) => {
                database.query(sql, params, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const pushToResultArray = async (sql, params) => {
            console.log(sql);
            const temp = await processQuery(sql, params);
            if (temp.length > 0) {
                resultArray.push(...temp);
            } else {
                console.log("No records");
            }
        };

        const combinations = [
            [dept, 'dept_id'],
            [emp, 'emp_id'],
            [sem, 'semester'],
            [academic_id, 'academic_year']
        ];

        const nonEmptyCombinations = combinations.filter(([values]) => values.length > 0);

        let conditions = '';

        if (nonEmptyCombinations.length > 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join(' AND ');
        } else if (nonEmptyCombinations.length === 1) {
            conditions = nonEmptyCombinations.map(([values, column]) => {
                const formattedValues = values.map(value => `'${value}'`).join(',');
                return `(${column} IN (${formattedValues}))`;
            }).join('');
        } else {
            conditions = '1=1';  // If no conditions, add a default true condition
        }

        // Ensure emp_id is always included in the conditions
        if (conditions) {
            conditions += ` AND (dept_id = '${deptid}')`;
        } else {
            conditions = `(dept_id = '${deptid}')`;
        }

        const query = `SELECT * FROM ${tableName} as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year inner join predefined_semester as sems on setaf.semester=sems.sem_id WHERE ${conditions}`;

        await pushToResultArray(query);

        res.status(200).json({ resultArray });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});










server.get('/getDeptById/:dept',async(req,res)=>{
    let sql= `select * from data_dept where dept_id = ${req.params.dept}`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

server.get('/getAcdyr',async(req,res)=>{
    let sql= `select * from predefined_academic_year`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

server.get('/getSem',async(req,res)=>{
    let sql= `select * from predefined_semester`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

server.get('/getDept',async(req,res)=>{
    let sql= `select * from data_dept`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

module.exports = server