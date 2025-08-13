import axios from "axios";
const url="http://localhost:1234"


export const journalRecords=async(empId)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journallist/${empId}`)
}
catch(e){
    console.log(e);
}
    return res
}

///hod view///
export const journalRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journallist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

///principal view////
export const journalPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journalrecs`)
}
catch(e){
    console.log(e);
}
    return res
}


///conference
export const conferenceRecords=async(empId)=>{
    let res;
    try{
     res=await axios.get(`${url}/setaf/conferencelist/${empId}`)
   }
   catch(e){
    console.log(e);
   }
    return res
}

////hod view////
export const conferenceRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/conferencelist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

////principalview////
export const conferencePrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/conferencerecs`)
}
catch(e){
    console.log(e);
}
    return res
}

///workshop////
export const workshopRecords=async(empId)=>{
    try{
        const res=await axios.get(`${url}/setaf/workshoplist/${empId}`)
    console.log(res.data.rows)
    return res
    }
    catch(e){
        console.log(e);
    }
}


////hod view////
export const workshopRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/workshoplist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

/////principal////
export const workshopPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/workshopprincipalrecs`)
}
catch(e){
    console.log(e);
}
    return res
}

/////////////////techtalk/////////////////////////////

export const techtalkRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/techtalklist/${empId}`)
    console.log(res.data.rows)
    return res
}
///hod view///
export const techtalkRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/techtalklist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}
///principal view////
export const techtalkPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/techtalkprincipalrecs`)
}
catch(e){
    console.log(e);
}
    return res
}



//////////////Faculty Guest Talk in other Institutions////////////////
export const facultyRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/facultylist/${empId}`)
    console.log(res.data.rows)
    return res
}

///hod view///
export const facultyRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/facultylist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

///principal view////
export const facultyPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/facultyprincipalrecs`)
}
catch(e){
    console.log(e);
}
    return res
}

////////nptel/////////////////
export const NptelRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/nptellist/${empId}`)
    console.log(res.data.rows)
    return res
}
///hod view
export const NptelRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/nptel/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

//////////principal view////////////

export const nptelPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/nptelrecs`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}


////Participation in TASTE//////

export const TasteRecords=async(empId)=>{
    let res;
    try{
     res=await axios.get(`${url}/setaf/tastelist/${empId}`)
   }
   catch(e){
    console.log(e);
   }
    // console.log(res.data.rows)
    return res
}
////hod view
export const tasteRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/taste/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}

////principalview
export const TastePrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/tasterecs`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}


///visit to industry////

export const IndustryRecords=async(empId)=>{
    let res;
try{

    res=await axios.get(`${url}/setaf/industrylist/${empId}`)
        
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///hod view
export const industryRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/industrylist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///principal view
export const industryPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/industryrecs`)
}
catch(e){
    console.log(e);
}    
    return res
}
//////////////////seed money//////////
export const SeedRecords=async(empId)=>{
    let res
     try{
      res= await axios.get(`${url}/setaf/seedlist/${empId}`)
     console.log(res.data.rows)
      return res
    }
    catch(e){
     console.log("no reacord found"+e);
    }
     // console.log(res.data.rows)
 }
 ////hod view
 export const seedRecordsDept=async(deptID)=>{
     let res;
 try{
     res=await axios.get(`${url}/setaf/seedlist/hoddashboard/${deptID}`)
 }
 catch(e){
     console.log(e);
 }
     
     // console.log(res.data.rows)
     return res
 }
 
 ////principalview
 export const seedPrincipalView=async()=>{
     let res;
 try{
     res=await axios.get(`${url}/setaf/seedrecs`)
 }
 catch(e){
     console.log(e);
 }
     // console.log(res.data.rows)
     return res
 }
///////////////////////////consultancy//////////////////////////

export const consultancyRecords=async(empId)=>{
   try{
    const res=await axios.get(`${url}/setaf/consultancylist/${empId}`)
    console.log(res.data.rows)
    return res
   }
   catch(e){
    console.log(e);
   }
}

/////hod///
export const consultancyRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/consultancylist/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
} 
}

///principal view
export const consultancyPrincipalView=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/consultancyrecs`)
    return rec
}
catch(e){
    console.log(e);
}
    // console.log(res.data.rows)
   
}


///////////////////////////////Patents filled////////////////////////////////////////
export const patentRecords=async(empId)=>{
    try{
     const res=await axios.get(`${url}/setaf/patentlist/${empId}`)
     console.log(res.data.rows)
     return res
    }catch(err){
     console.log("No records in patent"+err)
    }
 }
 
 /////hod///
 export const patentRecordsDept=async(deptID)=>{
     let res;
 try{
     res=await axios.get(`${url}/setaf/patentlist/hoddashboard/${deptID}`)
     return res
 }
 catch(e){
     console.log(e);
 }
 
   
 }
 
 ///principal view
 export const patentPrincipalView=async()=>{
     let rec;
 try{
     rec=await axios.get(`${url}/setaf/patentrecs`)
 }
 catch(e){
     console.log(e);
 }
     // console.log(res.data.rows)
     return rec
 }
 ////////////////////////////Collabrative/////////////////////////////////////

export const collaborativeRecords=async(empId)=>{
   try{
    const res=await axios.get(`${url}/setaf/collabrativelist/${empId}`)
    console.log(res.data.rows)
    return res
   }
   catch(e){
    console.log(e);
   }
}

/////hod///
export const collaborativeRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/collabrativelist/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
    
}

///principal view
export const collaborativePrincipalView=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/collaborativerecs`)
    return rec
}
catch(e){
    console.log(e);
}
    // console.log(res.data.rows)
}

/////////////////////////////////econtent/////////////////

export const econtentRecords=async(empId)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/econtentlist/${empId}`)
}
catch(e){
    console.log(e);
}
    return res
}

//
export const EcontentRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/econtentlist/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
}
///principal view
export const econtentprincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/econtentrecs`)
    return res
}
catch(e){
    console.log(e);
}
}

//////////////////////////////proposal submission for grants////////////////////////////////////

export const proposalRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/proposallist/${empId}`)
    console.log(res.data.rows)
    return res
}

/////hod///
export const ProposalRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/proposallist/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
    
}

///principal view
export const proposalPrincipalView=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/proposalrecs`)
    return rec
}
catch(e){
    console.log(e);
}
}

////////////visit to library ////////////////
export const visittolibraryRecords=async(empId)=>{
    try{
        const res=await axios.get(`${url}/setaf/visittolibrarylist/${empId}`)
    console.log(res.data.rows)
    return res
    }
    catch(e){
        console.log(e);
    }
}

/////hod///
export const VisitRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/visittolibrary/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
    
}

///principal view
export const visitToLibraryPrincipalView=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/visittolibraryrecs`)
    return rec
}
catch(e){
    console.log(e);
}
}


////////Award at national and international

export const AwardAtNationalList=async(empId)=>{
    const res=await axios.get(`${url}/setaf/awardatnationallist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const AwardAtNationalDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/awardatnational/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
  
}

export const AwardAtNationalPrincipal=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/awardatnational/principaldashboard`)
    return rec
}
catch(e){
    console.log(e);
}
}




////////BOOKS CHAPTER AUTHORSHIP

export const BooksList=async(empId)=>{
    const res=await axios.get(`${url}/setaf/bookslist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const BooksDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/books/hoddashboard/${deptID}`)
    return res
}
catch(e){
    console.log(e);
}
  
}

export const BooksPrincipal=async()=>{
    let rec;
try{
    rec=await axios.get(`${url}/setaf/books/principaldashboard`)
    return rec
}
catch(e){
    console.log(e);
}
}


export const Filters=async(empId)=>{
    const res=await axios.get(`${url}setaf/filterSetaf/data_setaf_journal_publication/${empId}`)
    console.log(res.data.rows)
    return res
}



//////Student Motivation for paper presentation 

export const MotivationViewRecs=async(empId)=>{
    try{
        const res=await axios.get(`${url}/setaf/Motivationlist/${empId}`)
    console.log(res.data.rows)
    return res
    }
    catch(e){
        console.log(e);
    }
}

//principal
export const MotivationPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/Motivationrecs`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}

//hod
export const MotivationRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/Motivationlist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}

////////ptofessional////

export const professionalRecords=async(empId)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/professionallist/${empId}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///hod view
export const professionalRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/professionallist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///principal view
export const professionalPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/professionalrecs`)
}
catch(e){
    console.log(e);
}
    
return res
}

/////student field work

export const StudentFieldworkRecords=async(empId)=>{
    try{
        const res=await axios.get(`${url}/setaf/Fieldworklist/${empId}`)
    console.log(res.data.rows)
    return res
    }
    catch(e){
        console.log(e);
    }
}

///principal view
export const StudentFieldworkPrincipal=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/fieldworkrecs`)
}
catch(e){
    console.log(e);
}
    
return res
}


export const FieldworkRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/Fieldwork/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}


///fdpsdp////
export const fdpSdpRecords=async(empId)=>{
    try{
        const res=await axios.get(`${url}/setaf/fdpsdplist/${empId}`)
    console.log(res.data.rows)
    return res
    }
    catch(e){
        console.log(e);
    }
}


////hod view////
export const fdpSdpRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/fdpsdplist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    return res
}

/////principal////
export const fdpSdpRecordsPrincipal=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/fdpsdp/principalrecs`)
}
catch(e){
    console.log(e);
}
    return res
}
