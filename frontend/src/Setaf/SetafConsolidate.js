// src/components/SeTAFPage.js
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './SetafConsolidate.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import jsPDF from "jspdf";
import Image from '../logo.png';
import Image2 from '../logo2.png';
import Image3 from '../logo3.jpg';
import Image4 from '../logo4.jpg';

const SetafConsolidation = () => {

//////////////pdf generator//////////////////
const logged=JSON.parse(sessionStorage.getItem("person"))
const empName=logged.faculty_name;
const empDesig=logged.designation

const generatePDF = async ()=> {
  try{

  // const res = await axios.get(`http://localhost:1234/setaf/journallist/${empId}`);
  //   const data = res.data;
  const doc = new jsPDF();
  
  doc.addImage(Image, 'PNG', 10, 3, 20, 20);
  doc.addImage(Image2, 'PNG', 12,23, 15, 15);
  doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
  doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

  doc.setFontSize(18);
  doc.setFont("times", "bold");
  doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
  doc.setFontSize(10);
  doc.setFont("times", "");
  doc.text('(An Autonomous Institution)', 80, 20);
  doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
  doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
  doc.setFont("times", "bold");
  
doc.rect(10,60,40,8).stroke.apply()
doc.setFontSize(10)
doc.setFont("times","bold")
doc.text('Name of the faculty',11,66)
doc.rect(50,60,65,8).stroke.apply()
doc.text(`${empName}`,66,66)
doc.rect(115,60,35,8).stroke.apply()
doc.text('Designation',118,66)
doc.rect(150,60,48,8).stroke.apply()
doc.text(`${empDesig}`,156,66)

doc.rect(10,68,10,9).stroke.apply()
doc.text('S.no',11,75)
doc.rect(20,68,133,9).stroke.apply()
doc.getFontSize()
doc.text('Contributors',75,72)
doc.text('(Score Points Alloted)',73,76)
doc.rect(153,68,23,9).stroke.apply()
doc.text('Target',158,72)
doc.text('Number',157,76)
doc.rect(176,68,22,9).stroke.apply()
doc.text('Score',182,74)
// doc.text(180,76)


doc.rect(10,77,10,8).stroke.apply()
doc.setFont("times","")
doc.text('1',14,83)
doc.rect(20,77,133,8).stroke.apply()
doc.text("Journal Publications",23,83)
doc.rect(153,77,23,8).stroke.apply()
doc.rect(176,77,22,8).stroke.apply()
doc.text('1',162,83)
doc.text(`${journ}`,185,83)

doc.rect(10,85,10,8).stroke.apply()
doc.setFont("times","")
doc.text('2',14,91)
doc.rect(20,85,133,8).stroke.apply()
doc.text("Conference Publications and Presentations",23,91)
doc.rect(153,85,23,8).stroke.apply()
doc.rect(176,85,22,8).stroke.apply()
doc.text('1',162,90)
doc.text(`${conf}`,185,90)
// doc.text(`${data.semester}`,185,80)

doc.rect(10,93,10,8).stroke.apply()
doc.setFont("times","")
doc.text('3',14,99)
doc.rect(20,93,133,8).stroke.apply()
doc.text("Workshop/Seminar Participation",23,99)
doc.rect(153,93,23,8).stroke.apply()
doc.rect(176,93,22,8).stroke.apply()
doc.text('2',162,98)
doc.text(`${work}`,185,98)



doc.rect(10,101,10,8).stroke.apply()
doc.setFont("times","")
doc.text('4',14,107)
doc.rect(20,101,133,8).stroke.apply()
doc.text("Workshop/Seminar organized as a Coordinator",23,107)
doc.rect(153,101,23,8).stroke.apply()
doc.rect(176,101,22,8).stroke.apply()
doc.text('1',162,106)


doc.rect(10,109,10,8).stroke.apply()
doc.setFont("times","")
doc.text('5',14,115)
doc.rect(20,109,133,8).stroke.apply()
doc.text("TechTalks to be delivered Multidisciplinary Lectures (MuDiL)",23,115)
doc.rect(153,109,23,8).stroke.apply()
doc.rect(176,109,22,8).stroke.apply()
doc.text('2',162,114)
doc.text(`${techtalk}`,185,114)


doc.rect(10,117,10,8).stroke.apply()
doc.setFont("times","")
doc.text('6',14,123)
doc.rect(20,117,133,8).stroke.apply()
doc.text("Faculty Guest Talk in other Institutions",23,123)
doc.rect(153,117,23,8).stroke.apply()
doc.rect(176,117,22,8).stroke.apply()
doc.text('1',162,122)
doc.text(`${faculty}`,185,122)


doc.rect(10,125,10,8).stroke.apply()
doc.setFont("times","")
doc.text('7',14,131)
doc.rect(20,125,133,8).stroke.apply()
doc.text("NPTEL Certification",23,131)
doc.rect(153,125,23,8).stroke.apply()
doc.rect(176,125,22,8).stroke.apply()
doc.text('1',162,130)
doc.text(`${nptel}`,185,130)


doc.rect(10,133,10,8).stroke.apply()
doc.setFont("times","")
doc.text('8',14,139)
doc.rect(20,133,133,8).stroke.apply()
doc.text("Participation in TASTE",23,139)
doc.rect(153,133,23,8).stroke.apply()
doc.rect(176,133,22,8).stroke.apply()
doc.text('10',162,138)
doc.text(`${taste}`,185,138)


doc.rect(10,141,10,8).stroke.apply()
doc.setFont("times","")
doc.text('9',14,147)
doc.rect(20,141,133,8).stroke.apply()
doc.text("FDPs/SDPS Certificates ",23,147)
doc.rect(153,141,23,8).stroke.apply()
doc.rect(176,141,22,8).stroke.apply()
doc.text('2',162,146)
doc.text(`${fdpsdp}`,185,146)


doc.rect(10,149,10,8).stroke.apply()
doc.setFont("times","")
doc.text('10',12,155)
doc.rect(20,149,133,8).stroke.apply()
doc.text("e-Content/(Video Lecture)",23,155)
doc.rect(153,149,23,8).stroke.apply()
doc.rect(176,149,22,8).stroke.apply()
doc.text('4',162,154)
doc.text(`${econtent}`,185,154)


doc.rect(10,157,10,8).stroke.apply()
doc.setFont("times","")
doc.text('11',12,163)
doc.rect(20,157,133,8).stroke.apply()
doc.text("Visit to Industries/Institution",23,163)
doc.rect(153,157,23,8).stroke.apply()
doc.rect(176,157,22,8).stroke.apply()
doc.text('1',162,162)
doc.text(`${visittoindustry}`,185,162)


doc.rect(10,165,10,8).stroke.apply()
doc.setFont("times","")
doc.text('12',12,171)
doc.rect(20,165,133,8).stroke.apply()
doc.text("Seed Money Proposal for Research",23,171)
doc.rect(153,165,23,8).stroke.apply()
doc.rect(176,165,22,8).stroke.apply()
doc.text('1',162,170)
doc.text(`${seed}`,185,170)


doc.rect(10,173,10,8).stroke.apply()
doc.setFont("times","")
doc.text('13',12,179)
doc.rect(20,173,133,8).stroke.apply()
doc.text("Awards at National /International Level ",23,179)
doc.rect(153,173,23,8).stroke.apply()
doc.rect(176,173,22,8).stroke.apply()
doc.text('1',162,178)
doc.text(`${award}`,185,178)


doc.rect(10,181,10,8).stroke.apply()
doc.setFont("times","")
doc.text('14',12,187)
doc.rect(20,181,133,8).stroke.apply()
doc.text("Proposals Submission for Grants",23,187)
doc.rect(153,181,23,8).stroke.apply()
doc.rect(176,181,22,8).stroke.apply()
doc.text('2',162,186)
doc.text(`${proposal}`,185,186)


doc.rect(10,189,10,8).stroke.apply()
doc.setFont("times","")
doc.text('15',12,195)
doc.rect(20,189,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,195)
doc.rect(153,189,23,8).stroke.apply()
doc.rect(176,189,22,8).stroke.apply()
doc.text('1',162,194)
doc.text(`${books}`,185,194)


doc.rect(10,197,10,8).stroke.apply()
doc.setFont("times","")
doc.text('16',12,203)
doc.rect(20,197,133,8).stroke.apply()
doc.text("Consultancy and Corporate Training",23,203)
doc.rect(153,197,23,8).stroke.apply()
doc.rect(176,197,22,8).stroke.apply()
doc.text('1',162,202)
doc.text(`${consultancy}`,185,202)


doc.rect(10,205,10,8).stroke.apply()
doc.setFont("times","")
doc.text('17',12,211)
doc.rect(20,205,133,8).stroke.apply()
doc.text("Patents Filed/Published/Granted",23,211)
doc.rect(153,205,23,8).stroke.apply()
doc.rect(176,205,22,8).stroke.apply()
doc.text('1',162,210)
doc.text(`${patent}`,185,210)


doc.rect(10,213,10,8).stroke.apply()
doc.setFont("times","")
doc.text('18',12,219)
doc.rect(20,213,133,8).stroke.apply()
doc.text("Collaborative Activities with MoU Signed Industries/Institutions",23,219)
doc.rect(153,213,23,8).stroke.apply()
doc.rect(176,213,22,8).stroke.apply()
doc.text('1',162,218)
doc.text(`${collabrative}`,185,218)


doc.rect(10,221,10,8).stroke.apply()
doc.setFont("times","")
doc.text('19',12,227)
doc.rect(20,221,133,8).stroke.apply()
doc.text("PSDeG / LSDeG Activities Organized",23,227)
doc.rect(153,221,23,8).stroke.apply()
doc.rect(176,221,22,8).stroke.apply()
doc.text('1',162,226)


doc.rect(10,229,10,8).stroke.apply()
doc.setFont("times","")
doc.text('20',12,235)
doc.rect(20,229,133,8).stroke.apply()
doc.text("Visits to the Library",23,235)
doc.rect(176,229,22,8).stroke.apply()
doc.rect(153,229,23,8).stroke.apply()
doc.text('40 days',157,234)
doc.text(`${visittolibrary}`,185,234)


doc.rect(10,237,10,8).stroke.apply()
doc.setFont("times","")
doc.text('21',12,243)
doc.rect(20,237,133,8).stroke.apply()
doc.text("Alumni Interaction arranged",23,243)
doc.rect(153,237,23,8).stroke.apply()
doc.rect(176,237,22,8).stroke.apply()
doc.text('1',162,242)


doc.rect(10,245,10,8).stroke.apply()
doc.setFont("times","")
doc.text('22',12,251)
doc.rect(20,245,133,8).stroke.apply()
doc.text("Students Motivation for Paper Presentation/Project Submission/Other Contests",23,251)
doc.rect(153,245,23,8).stroke.apply()
doc.rect(176,245,22,8).stroke.apply()
doc.text('5',162,250)
doc.text(`${studentmotivation}`,185,250)


doc.rect(10,253,10,8).stroke.apply()
doc.setFont("times","")
doc.text('23',12,259)
doc.rect(20,253,133,8).stroke.apply()
doc.text("Professional Society Membership",23,259)
doc.rect(153,253,23,8).stroke.apply()
doc.rect(176,253,22,8).stroke.apply()
doc.text('1',162,258)
doc.text(`${professional}`,185,258)


doc.rect(10,261,10,8).stroke.apply()
doc.setFont("times","")
doc.text('24',12,267)
doc.rect(20,261,133,8).stroke.apply()
doc.text("Students Field Work/Internship Guidance",23,267)
doc.rect(153,261,23,8).stroke.apply()
doc.rect(176,261,22,8).stroke.apply()
doc.text('5',162,266)
doc.text(`${studentfieldwork}`,185,266)


doc.rect(10,269,10,8).stroke.apply()
doc.setFont("times","")
doc.text('25',12,275)
doc.rect(20,269,133,8).stroke.apply()
doc.text("Extension and Outreach Activities Organized",23,275)
doc.rect(153,269,23,8).stroke.apply()
doc.rect(176,269,22,8).stroke.apply()
doc.text('1',162,274)

  // Generate a data URI for the PDF
  const pdfDataUri = doc.output('datauristring');

  // Open the PDF in a new tab or window
  const newWindow = window.open();
  newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
}
catch(e)
{
  console.log(e);
}
}



////////////////////ui count code///////////////
  const [journ,setJourn]=useState("")

  let res;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"

const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;

   
try{
    res=await axios.get(`${url}/setaf/journallist/${empId}`)
    // alert(JSON.stringify(res.data.length))
    setJourn(JSON.stringify(res.data.length))
    console.log(res.data)
}
catch(e){
    console.log(e);
}


// alert(JSON.stringify(res))

    }
    demo();
  })
  

   
/////////////////////////////////conference///////////
const [conf,setConf]=useState("")
let cres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  cres=await axios.get(`${url}/setaf/conferencelist/${empId}`)
  setConf(JSON.stringify(cres.data.length))
  console.log(cres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

/////////////////////////workshop/////////////////////////
const [work,setWork]=useState("")
  let resw;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    resw=await axios.get(`${url}/setaf/workshoplist/${empId}`)
    // alert(JSON.stringify(reswork.data.length))
    setWork(JSON.stringify(resw.data.length))
    console.log(resw.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })
  
//////////////////Tech Talk////////////////////////
const [techtalk,setTechtalk]=useState("")

  let rest;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"

const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    rest=await axios.get(`${url}/setaf/techtalklist/${empId}`)
    setTechtalk(JSON.stringify(rest.data.length))
    console.log(rest.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })

//////////////////Faculy Guest talk in other institutions////////////////

const [faculty,setFaculty]=useState("")

  let resf;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    resf=await axios.get(`${url}/setaf/facultylist/${empId}`)
    // alert(JSON.stringify(reswork.data.length))
    setFaculty(JSON.stringify(resf.data.length))
    console.log(resf.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })


//////////////////Nptel certificate/////////////

const [nptel,setnptel]=useState("")

  let nesf;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    nesf=await axios.get(`${url}/setaf/nptellist/${empId}`)
    // alert(JSON.stringify(reswork.data.length))
    setnptel(JSON.stringify(nesf.data.length))
    console.log(nesf.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })
/////////////////Participation in taste
const [taste,settaste]=useState("")

  let tesf;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    tesf=await axios.get(`${url}/setaf/tastelist/${empId}`)
    // alert(JSON.stringify(reswork.data.length))
    settaste(JSON.stringify(tesf.data.length))
    console.log(tesf.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })
////////////////////////seed money
const [seed,setseed]=useState("")

  let sres;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    sres=await axios.get(`${url}/setaf/seedlist/${empId}`)
    setseed(JSON.stringify(sres.data.length))
    console.log(sres.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })

/////////////////////////consultancy//////////////////////////
const [consultancy,setconsultancy]=useState("")

  let sesf;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
    sesf=await axios.get(`${url}/setaf/consultancylist/${empId}`)
    // alert(JSON.stringify(reswork.data.length))
    setconsultancy(JSON.stringify(sesf.data.length))
    console.log(sesf.data)
}
catch(e){
    console.log(e);
}
    }
    demo();
  })
///////////////////////////////////////////////patent
const [patent,setpatent]=useState("")

let pesf;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  pesf=await axios.get(`${url}/setaf/patentlist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setpatent(JSON.stringify(pesf.data.length))
  console.log(pesf.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})


///////////////////////////////////////////////patent
const [fdpsdp,setfdpsdp]=useState("")

let fdpres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  fdpres=await axios.get(`${url}/setaf/fdpsdplist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setfdpsdp(JSON.stringify(fdpres.data.length))
  console.log(fdpres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///////////////////////////////////////////////econtent
const [econtent,setecontent]=useState("")

let eres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  eres=await axios.get(`${url}/setaf/econtentlist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setecontent(JSON.stringify(eres.data.length))
  console.log(eres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///////////////////////////////////////////////visit to industry
const [visittoindustry,setvisittoindustry]=useState("")

let vres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  eres=await axios.get(`${url}/setaf/industrylist/${empId}`)
  setvisittoindustry(JSON.stringify(eres.data.length))
  console.log(eres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///////////////////////////////////////////////award
const [award,setaward]=useState("")

let ares;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  ares=await axios.get(`${url}/setaf/awardatnationallist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setaward(JSON.stringify(ares.data.length))
  console.log(ares.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})



///////////////////////////////////////////////proposal
const [proposal,setproposal]=useState("")

let pres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  pres=await axios.get(`${url}/setaf/proposallist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setproposal(JSON.stringify(pres.data.length))
  console.log(pres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})


///books
const [books,setbooks]=useState("")

let bres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  bres=await axios.get(`${url}/setaf/bookslist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setbooks(JSON.stringify(bres.data.length))
  console.log(bres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///collabrative
const [collabrative,setcollabrative]=useState("")

let colres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  colres=await axios.get(`${url}/setaf/collabrativelist/${empId}`)
  // alert(JSON.stringify(olreswork.data.length))
  setcollabrative(JSON.stringify(colres.data.length))
  console.log(colres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///visittolibrary
const [visittolibrary,setvisittolibrary]=useState("")

let vlres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  vlres=await axios.get(`${url}/setaf/visittolibrarylist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setvisittolibrary(JSON.stringify(vlres.data.length))
  console.log(vlres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///motivation
const [studentmotivation,setstudentmotivation]=useState("")

let smres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  smres=await axios.get(`${url}/setaf/Motivationlist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setstudentmotivation(JSON.stringify(smres.data.length))
  console.log(smres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///professional
const [professional,setprofessional]=useState("")

let psres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  psres=await axios.get(`${url}/setaf/professionallist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setprofessional(JSON.stringify(psres.data.length))
  console.log(psres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})

///professional
const [studentfieldwork,setstudentfieldwork]=useState("")

let sfres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;
try{
  sfres=await axios.get(`${url}/setaf/Fieldworklist/${empId}`)
  // alert(JSON.stringify(reswork.data.length))
  setstudentfieldwork(JSON.stringify(sfres.data.length))
  console.log(sfres.data)
}
catch(e){
  console.log(e);
}
  }
  demo();
})


////////////////
  return (
<div className="overallcontent"  style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
 <div className="container">

<p>&nbsp;</p>

<h2 style={{marginLeft:"33%"}}>Faculty Contributions Table</h2>
<table className="table table-bordered" style={{border:"1px solid black"}}>
  <thead>
    <tr>
      <th>S. No.</th>
      <th>Contributions (Score Points Allotted)</th>
      <th>Target Number</th>
      <th>Target Completed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Journal Publications (International-25, National -20)</td>
      <td>1</td>
      <td>{journ}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Conference Publications and Presentations (International-20, National -10)</td>
      <td>1</td>
      <td>{conf}</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Workshop/Seminar Participation (Internal - 5 per Day, External -10 per Day)</td>
      <td>2</td>
      <td>{work}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Workshop/Seminar organized as a Coordinator (10 per Day)</td>
      <td>1</td>
      <td></td>
    </tr>
    <tr>
      <td>5</td>
      <td>TechTalks to be delivered Multidisciplinary Lectures (MuDIL) (5 per Lecture)</td>
      <td>2</td>
      <td>{techtalk}</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Faculty Guest Talk in other Institutions (15 per Lecture)</td>
      <td>1</td>
      <td>{faculty}</td>
    </tr>
    <tr>
      <td>7</td>
      <td>NPTEL Certification (Max. 25 per Certificate; Gold/Topper 25, Silver 20, Elite 15, Pass 10)</td>
      <td>2</td>
      <td>{nptel}</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Participation in TASTE (2 for each TASTE; Capped to Max. 30)</td>
      <td>10</td>
      <td>{taste}</td>
    </tr>
    <tr>
      <td>9</td>
      <td>FDPs/SDPs Certificates (5 per Day)</td>
      <td>2</td>
      <td>{fdpsdp}</td>
    </tr>
    <tr>
      <td>10</td>
      <td>e-Content/Video Lecture (5 per Lecture, Lecture Materials-2 (per Material))</td>
      <td>4</td>
      <td>{econtent}</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Visit to Industries/Institution (10 per Day)</td>
      <td>1</td>
      <td>{visittoindustry}</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Seed Money Proposal for Research (15 per Proposal)</td>
      <td>1</td>
      <td>{seed}</td>
    </tr>
    <tr>
      <td>13</td>
      <td>Awards at National/International Level (International-15, National -10)</td>
      <td>2</td>
      <td>{award}</td>
    </tr>
    <tr>
      <td>14</td>
      <td>Proposals Submission for Grants (100 per Proposal if Sanctioned otherwise 25 per Proposal; 10 per Seminar Proposal if Sanctioned)</td>
      <td>1</td>
      <td>{proposal}</td>
    </tr>
    <tr>
      <td>15</td>
      <td>Books/Chapters Authorship (International-15, National -10)</td>
      <td>1</td>
      <td>{books}</td>
    </tr>
    <tr>
      <td>16</td>
      <td>Consultancy and Corporate Training done for Revenue Generation (15 per Consultancy)</td>
      <td>1</td>
      <td>{consultancy}</td>
    </tr>
    <tr>
      <td>17</td>
      <td>Patents Filed/Published/Granted (Published - 5 Points, Granted - 25 Points)</td>
      <td>1</td>
      <td>{patent}</td>
    </tr>
    <tr>
      <td>18</td>
      <td>Collaborative Activities with MoU Signed Industries/Institutions (25 per Industry/Insti.)</td>
      <td>2</td>
      <td>{collabrative}</td>
    </tr>
    <tr>
      <td>19</td>
      <td>PSDeG / LSDeG Activities Organized (10 per Day)</td>
      <td>2</td>
      <td></td>
    </tr>
    <tr>
      <td>20</td>
      <td>Visits to the Library (.5 per Day)</td>
      <td>40 Days</td>
      <td>{visittolibrary}</td>
    </tr>
    <tr>
      <td>21</td>
      <td>Alumni Interaction arranged (10 per Alumni Interaction)</td>
      <td>1</td>
      <td></td>
    </tr>
    <tr>
      <td>22</td>
      <td>Students Motivation for Paper Presentation/Project Submission/Other Contests (for every Participation by individual Student 2Points)</td>
      <td>5</td>
      <td>{studentmotivation}</td>
    </tr>
    <tr>
      <td>23</td>
      <td>Professional Society Membership (10 Per Membership)</td>
      <td>1</td>
      <td>{professional}</td>
    </tr>
    <tr>
      <td>24</td>
      <td>Students Field Work/Internship Guidance (10 Points per Student)</td>
      <td>5</td>
      <td>{studentfieldwork}</td>
    </tr>
    <tr>
      <td>25</td>
      <td>Extension and Outreach Activities Organized (10 Points)</td>
      <td>1</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<button style={{marginLeft:"85%",marginBottom:"20px"}} onClick={generatePDF}>Download Pdf</button>
</div> 
</div>
  );
};

export default SetafConsolidation;
