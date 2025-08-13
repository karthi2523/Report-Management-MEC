
import { useEffect, useState } from "react"
import "./sty.css";
import { onProposalsLoad, onPropose,Venue,Major,SubReport,Academic} from "./connect"
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import Select from 'react-select';
import axios from "axios";
import jsPDF from 'jspdf';
import Image from './logo.png';
import Image2 from './logo2.png';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';

export const Add=()=>{
    const[isChecked,setIsChecked]=useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selected, setSelected] = useState();
    const [option, setOptions] = useState([]);
    // console.log(option)
  
    useEffect(() => {
        Ven();
        Maj();
        fillPorposals()
       
     
      axios.get('http://localhost:1234/seminar/find')
        .then((response) => {
        //   console.log(response);
          setOptions(response.data.rows);
        })
        .catch((error) => {
          console.error('Error fetching options:', error);
        });
        
    
    }, []);
  
 

    const options = option.map((val, key) => ({
        value: val.faculty_id+'-'+val.faculty_name,
        label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
      }));
    // console.log(facultySelect);
  
        const logged=JSON.parse(sessionStorage.getItem("person"))
      
    const[information,setInformation]=useState("")

    const[seminar,setSeminar]=useState({
        "major_id":0,
        "report_id":"",
        "event_name":"",
        "event_title":"",
        "event_organizer":"",
        "event_sponsor":"",
        "event_date":"",
        "event_venue":"",
        "guest_name":"",
        "guest_designation":"",
        "guest_address":"",
        "guest_phone_number":null,
        "guest_email":"",
        "student_count":0,
        "faculty_count":0,
        "others_count":0,
        "event_budget":0,
        "event_coordinator":"",
        "coordinator_emp_id":0,
        "coordinator_phone_number":0,
        "coordinator_designation":0,
        "event_date_from":"0000-00-00",
        "event_date_to":"0000-00-00",
        "proposal_date":"",
        "completion_date":"",
        "acdyr_id":0,
        "dept_id":0,
        "sem_id":0
        
    })
    // console.log(seminar);

    const[proposable,setProposable]=useState([])
    const[venue,setVenue]=useState([])

    const fillPorposals=async()=>{
        const temp = await onProposalsLoad()
        setProposable(temp)
    }

    
    // useEffect(()=>{
        
    // })
    const[major,setMajor]=useState([])
        
        const Ven=async()=>{
            const t = await Venue()
            setVenue(t)
            // alert(t)
        }
    const[year,setYear]=useState([])
    const[maj,setMaj]=useState("")
    
       const Acad=async()=>{
            let sid=seminar.event_name;
            try{
            const t = await Academic(sid)
            // alert(t)
            setYear(t)
            }
            catch(err){
                // alert("Not Found")
            }
            
        }
        const Maj=async(eve)=>{
            const t = await Major()
            
            // setSeminar((old) => {
            //     return{
            //         ...old,
            //         event_sponsor:eve.target
            //     }
            //   })
            setMajor(t)
            // alert(t)
        }
        const[sub,setSub]=useState([])
        // alert(JSON.stringify(sub))
        const Sub=async(mid)=>{
            const t = await SubReport(mid)
            setSub(t)
            // alert(t)
        }
       
        const major_ = major.map((val, key) => ({
            value: val.major_report_id,
            label: val.major_report,
          }));
    const[facid,setFacid]=useState([])
    const handle = (eve) => {
        
        
       
            try{
               
                setSelected(eve.value)
                Sub(eve.value)

        }
        catch(e){
          
            console.log(e)
        }
            
        
    
        setSeminar((old) => {
            return {
              ...old,
              major_id:selected
            }
          })
    }


    const handleChange = (eve) => {
        let updatedFacidString = facid;
        for (var i = 0; i < eve.length; i++) {
          const valueToAdd = eve[i].value;
      
          if (!updatedFacidString.includes(valueToAdd)) {
            if (updatedFacidString && updatedFacidString.length>1) {

              updatedFacidString += ','; // Add a comma as a separator
            }
            updatedFacidString += valueToAdd;
            // alert("setFacid works");
          }
        }
        setFacid(updatedFacidString);
        setSelectedOptions(eve);
      
        setSeminar((old) => {
          return {
            ...old,
            event_coordinator: updatedFacidString
          }
        })
        setSeminar((old) => {
            return {
              ...old,
              coordinator_emp_id: logged.faculty_id
            }
          })
          setSeminar((old) => {
            return {
              ...old,
              dept_id: logged.dept_id
            }
          })
          setSeminar((old) => {
            const date = new Date(); // Replace with your actual date value
            const currentDate = format(date, 'dd-MM-yyyy');
            return {
              ...old,
              proposal_date: currentDate
            }
          })
      }
    
  console.log(seminar)
  
//   const[subid,setSubId]=useState([])

 
//   Acad(subid);
//   console.log(selectedOptions)
function toCamelCaseWithSpaces(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return (index > 0 ? " " : "") + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  }
 
// alert(op)
const [showInput, setShowInput] = useState(false);

    const infoCollect=(eve)=>{
        // const { value } = eve.target;
        
        

        setSeminar((old)=>{
           
            return {
                ...old,
                // eve[0].target.major_id:eve[0].target.value
            }
        })
        const{name,value}=eve.target
        if (value === 'Others') {
           
            
            setShowInput(true);
            return

          } 
        setSeminar((old)=>{
            if(name==="event_name"||name==="event_venue"||name==="event_sponsor"||name==="guest_name"||name==="guest_designation"||name==="guest_address"||name==="proposal_date"||name==="acdyr_id"){
                
                return{
                    ...old,
                   
                        event_sponsor:maj,
                        
                    [name]:value
                }
            }
            else if(name==="event_organizer"){
                return{
                    ...old,
                   
                      
                        
                    [name]:value.toUpperCase()
                }
            }
            else if(name==="guest_email"){
               
                return{
                    ...old,
                        
                    [name]:value
                }
            }
            else if(name==="event_title"){
                
                
                return{
                    ...old,
                   
                      

                        [name]:value
                    
                    // [name]:temp+rest
                }
            }
            else if(name==="major_id"){
                Sub(value)
                major.map((item)=>{
                    try{
                    if(item.major_report_id==value){
                        setMaj(item.major_report)
                        

                        
                    }
                    // setMaj(item.major_report)
                }
                catch(e){
                    console.log(e)
                }
                    // console.log(value)
                
                })
                console.log(maj)
                // return{
                //     ...old,
                //     event_sponsor:maj
                // }
                // alert(sub.major_report)
                
                // alert(major.major_report[value])
               
                
                return{
                    ...old,
                   
                    [name]:parseInt(value)
                }
            }
           
            else if(name==="event_coordinator"){
                // alert("called")
                
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="event_date"){
                // Maj()
               
               
            // Ven()
                return{
                    ...old,
                    [name]:value
                }
            }
          else if(name==="student_count"){
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(seminar.guest_email);
            if (!isValidEmail) {
              alert("Invalid Email ID")
            }
            return{
                ...old,
                [name]:parseInt(value)
            }
          }
          
          else if(name==="guest_phone_number"){
            

            if (value.length > 10) {
                
                alert("Mobile number cannot be greater than 10 digits.");
            }
            return{
                ...old,
                [name]:parseInt(value)
            }
          }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
    }
    // console.log(seminar)

    const callPropose=async()=>{
        const result = toCamelCaseWithSpaces(seminar.event_title);
        setSeminar((old)=>{
        return{
            ...old,
            event_title:result
        }
    }
        )
        if(seminar.student_count==null ||seminar.faculty_count==null||seminar.event_budget==null || seminar.event_coordinator==""){
            alert("Please fill all the fields");
        }
        else{
            let temp
            try{
            temp = await onPropose(seminar)
            }
            catch(e){
                alert("Error : "+e)
            }
        if(temp.message===404||temp.message===500){
            alert("Error in entering data")
        }
        setInformation(temp.message)
        window.location.assign("/ecr")
        }

       

        
        

    }
    
    const handleDownload = async () => {
        try {
        
          // console.log("hai");
          const data = seminar;
          //var sign = 'D:\\React\\Muthayammal\\MuthayammalAutomation\\MineEcrWorkshopModules\\react-seminar-client\\src\\'+`${data.lvl_1_proposal_sign}`+'.jpeg';
          var sign = `/Project_images/${data.lvl_1_proposal_sign}.jpeg`;
          // alert(sign);
          
          const newPdf = new jsPDF();
           
          
       
        newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
    newPdf.addImage(Image2, 'PNG', 12,23, 15, 15);
    newPdf.addImage(Image3, 'JPG', 175, 3, 20, 15);
    newPdf.addImage(Image4, 'JPG', 175, 20, 20, 15);
    
    newPdf.setFontSize(18);
    newPdf.setFont("times", "bold");
    newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
    newPdf.setFontSize(10);
    newPdf.setFont("times", "");
    newPdf.text('(An Autonomous Institution)', 80, 20);
    newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
    newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
    
    
    newPdf.setFontSize(12);
    newPdf.setFont("times", "bold");
    newPdf.rect(10, 40, 20, 7);
    newPdf.text(`${data.event_organizer}`, 15, 45);///Department
    
    newPdf.rect(80, 40, 50, 7);
    newPdf.text('EVENT PROPOSAL', 85, 45);
    
    newPdf.rect(170, 40, 30, 7);
    newPdf.text(`${data.acd_yr}`, 173, 45);//academic year
    
    newPdf.setFont("times","")
    newPdf.rect(10, 55, 10, 20).stroke();
    newPdf.text('1.', 12, 65);
    newPdf.rect(20, 55, 90, 20).stroke();
    newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 61);
    newPdf.rect(110, 55, 90, 20).stroke();
try{
    const found=await axios.get(`http://localhost:1234/seminar/proposalSub/${data.event_name}`)
   
    newPdf.text(`${found.data.rows[0].sub_report}`, 113, 65);//Nature of the Event

    

}
catch(e){
    console.log(e);
}
    
    newPdf.rect(10, 75, 10, 10).stroke();
    newPdf.text('2.', 12, 81);
    newPdf.rect(20, 75, 90, 10).stroke();
    newPdf.text('Title of the event',22, 81);
    newPdf.rect(110, 75, 90, 10).stroke();
    newPdf.text(`${data.event_title}`, 113, 81);//Event Title
    
    
    newPdf.rect(10, 85, 10, 10).stroke();
    newPdf.text('3.', 12, 91);
    newPdf.rect(20, 85, 90, 10).stroke();
    newPdf.text('Organized by',22, 91);
    newPdf.rect(110, 85, 90, 10).stroke();
    newPdf.text(`${data.event_organizer}`, 113, 91);//Event Organizer
    
    
    
    newPdf.rect(10, 95, 10, 10).stroke();
    newPdf.text('4.', 12, 101);
    newPdf.rect(20, 95, 90, 10).stroke();
    newPdf.text('Collaboration/Sponsoring Agency',22, 101);
    newPdf.rect(110, 95, 90, 10).stroke();
    newPdf.text(`${data.event_sponsor}`, 113, 101);//Sponsor Name
    
    
    newPdf.rect(10, 105, 10, 10).stroke();
    newPdf.text('5.', 12, 111);
    newPdf.rect(20, 105, 90, 10).stroke();
    newPdf.text('Date of the Event Planned',22, 111);
    newPdf.rect(110, 105, 90, 10).stroke();
    newPdf.text(`${data.proposal_date}`, 113, 111);//Event Date
    
    newPdf.rect(10, 115, 10, 10).stroke();
    newPdf.text('6.', 12, 121);
    newPdf.rect(20, 115, 90, 10).stroke();
    newPdf.text('Venue',22, 121);
    newPdf.rect(110, 115, 90, 10).stroke();
    newPdf.text(`${data.event_venue}`, 113, 121);
    
    
    newPdf.rect(10, 125, 10, 50).stroke();
    newPdf.text('7.', 12, 141);
    newPdf.rect(20, 125, 90, 50).stroke();
    newPdf.text('Details of the Guest',22, 141);
    
    newPdf.rect(110, 125, 23, 10).stroke();
    newPdf.text('Name', 111, 131);
    newPdf.rect(133, 125,67, 10).stroke();
    newPdf.text(`${data.guest_name}`, 135, 131);///Name of the Guest 
    newPdf.rect(110, 135, 23, 10).stroke();
    newPdf.text('Designation', 111, 141);
    newPdf.rect(133, 135,67, 10).stroke();
    newPdf.text(`${data.guest_designation }`, 135, 141);///Guest Designation
    newPdf.rect(110, 145, 23, 10).stroke();
    newPdf.text('Address', 111, 151);
    const x = 133;
    let y = 145;
    const address = `${data.guest_address}`;
    const contentWidth = newPdf.getStringUnitWidth(address) * 12; // Initial font size: 12
    const contentHeight = newPdf.getTextDimensions(address, { fontSize: 12 }).h;
    
    // Determine font size to fit within specified dimensions
    const maxWidth = 100; // Adjust based on your requirements
    const maxHeight = 100; // Adjust based on your requirements
    const fontSize = Math.min(12, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
     // Adjust the width as needed
    // Set font size and add text to the PDF
    newPdf.setFontSize(fontSize);
    
    console.log(contentHeight);
    
    const textLines = newPdf.splitTextToSize(address, 60);
    newPdf.rect(x , y , maxWidth-33  , maxHeight - 90);
    newPdf.text(x+2, y+5, textLines);
    // newPdf.rect(133, 140,67, 10).stroke();
    // newPdf.text(textLines,135, 145);/////Address
    newPdf.setFontSize(12);
    
    
    newPdf.rect(110, 155, 23, 10).stroke();
    newPdf.text('Contact No', 111, 161);
    newPdf.rect(133, 155,67, 10).stroke();
    newPdf.text(`${data.guest_phone_number}`, 135, 161);//Contact no
    newPdf.rect(110, 165, 23, 10).stroke();
    newPdf.text('Mail-id', 111, 171);
    newPdf.rect(133, 165,67, 10).stroke();
    newPdf.text(`${data.guest_email}`, 135, 171);/////Guest Mail id
    
    newPdf.rect(10, 175, 10, 30).stroke();
    newPdf.text('8.', 12, 190);
    newPdf.rect(20, 175, 90, 30).stroke();
    newPdf.text('Total Participants expected',22, 190);
    
    newPdf.rect(110, 175, 23, 10).stroke();
    newPdf.text('MEC\nStudents', 110.5, 179);
    newPdf.rect(133, 175,67, 10).stroke();
    newPdf.text(`${data.student_count}`, 135, 181);//Count of the Student
    
    newPdf.rect(110, 185, 23, 10).stroke();
    newPdf.text('MEC\nFaculty', 110.5, 189);
    newPdf.rect(133, 185,67, 10).stroke();
    newPdf.text(`${data.faculty_count}`, 135, 191);//COunt of the Faculty
    
    newPdf.rect(110, 195, 23, 10).stroke();
    newPdf.text('Others', 110.5, 201);
    newPdf.rect(133, 195,67, 10).stroke();
    newPdf.text(`${data.others_count}`, 135, 201);//Count of Others
    
    newPdf.rect(10, 205, 10, 10).stroke();
    newPdf.text('9.', 12, 211);
    newPdf.rect(20, 205, 90, 10).stroke();
    newPdf.text('Proposed Budget',22, 211);
    newPdf.rect(110, 205, 90, 10).stroke();
    newPdf.text(`${data.event_budget}`, 113, 211);//Event Budget
    
    
    
    newPdf.rect(10, 215, 10, 10).stroke();
    newPdf.text('10.', 12, 220);
    newPdf.rect(20, 215, 180, 10).stroke();
    newPdf.text('Co-ordinator of the Event',22, 220);
    
    newPdf.rect(10, 225, 70, 5).stroke();
    newPdf.text('Name', 35, 229);
    
    newPdf.rect(80, 225, 60, 5).stroke();
    newPdf.text('Designation', 100, 229);
    
    newPdf.rect(140, 225, 60, 5).stroke();
    newPdf.text('Phone Number', 155, 229);
    
    newPdf.rect(10, 230, 70, 10).stroke();
    newPdf.text(`${logged.faculty_name}`, 12, 235);//coordinator Name
    
    newPdf.rect(80, 230, 60, 10).stroke();
    newPdf.text(` ${logged.faculty_desig}`, 83, 235);//coordinator Desgination
    
    newPdf.rect(140, 230, 60, 10).stroke();
    newPdf.text(``, 142, 235);//coordinator Phone_num
    
    newPdf.rect(10, 240, 70, 10).stroke();
    newPdf.text('', 35, 229);//coordinator Name
    
    newPdf.rect(80, 240, 60, 10).stroke();
    newPdf.text('', 100, 229);//cordinator  Desgination
    
    newPdf.rect(140, 240, 60, 10).stroke();
    newPdf.text('', 155, 229);//coordinator Phone_num
    
    newPdf.rect(10, 250, 70, 10).stroke();
    newPdf.text('', 35, 229);//coordinator Name
    
    newPdf.rect(80, 250, 60, 10).stroke();
    newPdf.text('', 100, 229);//coordinator Desgination
    
    newPdf.rect(140, 250, 60, 10).stroke();
    newPdf.text('', 155, 229);//coordinator 
    
    // newPdf.rect(10, 225, 70, 5).stroke();
    // newPdf.text('Name', 35, 229);
    
    // newPdf.rect(80, 225, 60, 5).stroke();
    // newPdf.text('Designation', 100, 229);
    
    // newPdf.rect(140, 225, 60, 5).stroke();
    // newPdf.text('Phone Number', 155, 229);
    // newPdf.rect(10, 225, 70, 5).stroke();
    // newPdf.text('Name', 35, 229);
    
    // newPdf.rect(80, 225, 60, 5).stroke();
    // newPdf.text('Designation', 100, 229);
    
    // newPdf.rect(140, 225, 60, 5).stroke();
    // newPdf.text('Phone Number', 155, 229);
    
    
    
    
    newPdf.setFont("times","bold");
    
    newPdf.text('HoD', 15, 290);
    
    newPdf.text('Principal', 155, 290);
    
    
        // Generate a data URI for the PDF
        const pdfDataUri = newPdf.output('datauristring');
    
        // Open the PDF in a new tab or window
        const newWindow = window.open();
        newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
      
      }
          
         catch (err) {
          console.error(err);
        }
      }
    
    const preview=async()=>{
        const result = toCamelCaseWithSpaces(seminar.event_title);
        setSeminar((old)=>{
        return{
            ...old,
            event_title:result
        }
    })
        handleDownload();
    }

   
    // (document).ready(function=>(){
    //     ('#event_name').select2();
    // });


    return(
        <>
         <body>
        <div class="main" >

            
         


<div className="report-container" style={{justifyContent:'center'}}>
    <div class="report-header">
        <h1 class="recent-Articles" style={{backgroundColor:"transparent"}}>EVENT PROPOSAL</h1>
    </div>
    <div className="addform" style={{justifyContent:'center'}}>

    {/* <label htmlFor="event-type">Select Event Type:</label>
    <select id="event-type" onChange={handleChange} value={eventType}>
        <option value="seminar">Seminar</option>
        <option value="workshop">Workshop</option>
      </select> */}
 



 <label for="major_id">Major Type : </label>
 {/* <Select
 className="form-group"
        isMulti
        id="event_coordinator"
        name="event_coordinator"
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
      /> */}
 <Select
 className="form-group"

        id="major_id"
        name="major_id"
        options={major_}
        value={selected}
          onChange={handle}
        isSearchable
        placeholder="Select option..."
        closeMenuOnSelect={true}
      />
    <label for="major_id">Major Type :</label>
    <select  name="major_id" value={seminar.major_id} onChange={infoCollect} >
    <option value="">Select Major Type .......</option>
    {
    // let t=0;
                                major.map((val,key)=>{
                                    return (<option key={val.major_report_id}  value={val.major_report_id}>{val.major_report}</option>)
                                })
                            }
</select>

<label for="event_name">Nature of The Event :</label>
<select name="event_name" value={seminar.event_name} onChange={infoCollect}>
    <option value="">Select Event Nature .......</option>
    {
                                sub.map((val,key)=>{
                                    // temp=val.sub_report_id
                                    return (<option key={val.sub_report_id} value={`${val.table_name}`}>{val.sub_report}</option>)
                                })

                                // setSubId(temp)
                            }
</select>


    
                    
                
            
                        <label for="event_title">Title of the Event :</label>
                        <input onClick={Acad} onChange={infoCollect} value={seminar.event_title} type="text" name="event_title" placeholder="Event Title" className="form-control"  required />
                  
                    
                   
                    <label for="event_organizer">Organised By (eg : CSE,ECE):</label>
                    <input onChange={infoCollect} value={seminar.event_organizer} type="text" name="event_organizer" placeholder="Event Organizer" className="form-control"  required  />
                   

                 
      <label htmlFor="event_sponsor">Colloborating/Sponsored Agency 1:</label>
      <input type="text" name="event_sponsor" value={maj} required onChange={infoCollect}placeholder="Event Sponsor" className="form-control" readOnly/><br />
     
      <label htmlFor="event_sponsor">Colloborating/Sponsored Agency 2:</label>
      <input type="text" name="event_sponsor1"  placeholder="Event Sponsor" className="form-control" /><br />
      
     
      <label htmlFor="event_date">Date of The Event Planned:</label>
      <input type="date" name="event_date" value={seminar.event_date} required onChange={infoCollect}  /><br />

      <label htmlFor="event_venue">Venue:</label>
      <select name="event_venue" value={seminar.event_venue} onChange={infoCollect} hidden={showInput}>
        
      <option value="">Select Venue ......</option>
      {
                                venue.map((val,key)=>{
                                    return (<option value={val.venue_name}>{val.venue_name}</option>)
                                })
                            }
        <option value="Others">Others</option>
       
      </select>
      {showInput && (
        <input
          type="text"
          name="event_venue"
          value={seminar.event_venue}
          onChange={infoCollect}
          placeholder="Enter other venue"
        />
      )}
      <br />

      <h1>Details of The Guest</h1>
      <label htmlFor="guest_name">Name:</label>
      <input type="text" name="guest_name" placeholder="Name of the Guest" value={seminar.guest_name} required onChange={infoCollect}  /><br />

      <label htmlFor="guest_designation">Designation:</label>
      <input type="text" name="guest_designation" placeholder="Designation of the Guest" value={seminar.guest_designation} required onChange={infoCollect}   /><br />

      <label htmlFor="guest_address">Address:</label>
      <input type="text" name="guest_address" placeholder="Address of the Guest" value={seminar.guest_address} required onChange={infoCollect} /><br />

      <label htmlFor="guest_phone_number">Mobile Number:</label>
      <input type="number" name="guest_phone_number" placeholder="Phone Number of the Guest" value={seminar.guest_phone_number} required onChange={infoCollect} /><br />

      <label htmlFor="guest_email">Mail ids</label>
      <input type="text" name="guest_email" placeholder="E-mail of the Guest" value={seminar.guest_email} required onChange={infoCollect} /><br />

      <h1>No of Participants (Expected)</h1>
      <label htmlFor="student_count">MEC Students:</label>
      <input type="number" name="student_count" value={seminar.student_count} required onChange={infoCollect} /><br />

      <label htmlFor="faculty_count">MEC Faculty:</label>
      <input type="number" name="faculty_count" value={seminar.faculty_count} required onChange={infoCollect} /><br />

      <label htmlFor="others_count">Others:</label>
      <input type="number" name="others_count" value={seminar.others_count} required onChange={infoCollect} /><br />

      <label htmlFor="event_budget">Proposed Budget:</label>
      <input type="number" name="event_budget" value={seminar.event_budget} required onChange={infoCollect} /><br />

      <h1>Co-ordinator of the Event</h1>

      {/* <label htmlFor="dept_id">Department:</label>
      <select name="dept_id" value={seminar.dept_id} onChange={infoCollect}>
      <option value="">Select Department ......</option>
        <option value="1">CSE</option>
        <option value="2">ECE</option>
        <option value="3">EEE</option>
        <option value="4">IT</option>
        <option value="5">CY</option>
        <option value="6">AIDS</option>
      </select><br /> */}

      {/* <label>Event Coordinator</label>
                        <select name="event_coordinator" className="form-group" onChange={handleChange} value={selectedOptions}>
                        <option value="">Select Faculty</option>
                            {
                                proposable.map((val,key)=>{
                                    return (<option value={val.faculty_id}>{val.faculty_id}{'-'}{val.faculty_name}{'-'}{val.dept}</option>)
                                })
                            }
        
        </select> */}

<label for="event_coordinator">Event Co-ordinator : </label>
<Select
 className="form-group"
        isMulti
        id="event_coordinator"
        name="event_coordinator"
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
      />

        
      <label htmlFor="acdyr_id">Academic Year:</label>
      <select name="acdyr_id" className="form-group" onChange={infoCollect} value={seminar.acad_yr_id}>
                        <option value="">Select Academic Year</option>
                            {
                                year.map((val,key)=>{
                                   
                                    return (<option key={val.acd_yr_id} value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            }
                        </select>

      <label htmlFor="sem">Semester :</label>
      <select name="sem" value={seminar.sem} onChange={infoCollect}>
        <option value="0">Odd Sem</option>
        <option value="1">Even Sem</option>
      </select><br />
      <input type='button' style={{color:'white',backgroundColor:'#1d4d0b',marginLeft:'36%'}} onClick={preview} value="Preview Proposal" className='col-3 btn btn-primary' />
      <br></br>
      <div style={{display:'flex'}}>
       
      <input type="checkbox" checked={isChecked} onChange={()=>setIsChecked(!isChecked)}/><h6 style={{marginTop:'6px'}}><span>&nbsp;&nbsp;</span>I confirm that the details I filled out are accurate</h6>

      </div>
  
     <br></br>
      
      
    </div>
    

    <h1 style={{color:'red'}}>{information}</h1>
         
    <div className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Send Proposal" className='col-3 btn btn-primary' disabled={!isChecked} />
                        <input type='button' onClick={()=>{
                                    window.location.assign("/add")

                        }}
        //                 onClick={()=>{
        //                     setSeminar(()=>{
        //                         return{
        
      
        // "event_name":"",
        // "event_title":"",
        // "event_organizer":"",
        // "event_sponsor":"",
        // "event_date":"",
        // "event_venue":"",
        // "guest_name":"",
        // "guest_designation":"",
        // "guest_address":"",
        // "guest_phone_number":0,
        // "guest_email":"",
        // "student_count":0,
        // "faculty_count":0,
        // "others_count":0,
        // "proposal_date":"",
        // "proposal_hod":"",
        // "proposal_principal":"",
        // "event_budget":0,
        // "event_coordinator":"",
        // "coordinator_designation":406,
        // "acdyr_id":"",
        // "dept_id":0,
        // "sem_id":0
        
        //                         }
        //                     })
        //                 }}
                        value="Clear" className='col-3 btn btn-danger' />
                    </div>   
        
         
    
      

 </div>
 
 </div>
        
 </body>
        </>
    )
}