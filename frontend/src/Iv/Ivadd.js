import { useEffect, useState } from "react"
import "../sty.css";
import { onProposalsLoad, onPropose,Venue,Major,SubReport,Academic} from "../connect"
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import Select from 'react-select';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ivadd=()=>{

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [option, setOptions] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:1234/seminar/find')
        .then((response) => {
        //   console.log(response);
          setOptions(response.data.rows);
        })
        .catch((error) => {
          console.error('Error fetching options:', error);
        });
  },[])

    let[info,setInfo]=useState("")

    const options = option.map((val, key) => ({
      value: val.faculty_id+'-'+val.faculty_name,
      label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
    }));

    const logged=JSON.parse(sessionStorage.getItem("person"))

    // ==========================

    const [iv,setIv]=useState({
        "date_of_visit_from":""  ,
    "date_of_visit_to":"" ,
    "details_of_the_industry_1":"" ,
    "details_of_the_industry_2":"", 
    "details_of_the_industry_3":"", 
    "name_of_the_contact_person_1":"", 
    "designation_of_the_contact_person_1":"" ,
    "phone_no_of_the_contact_person_1":0, 
    "email_of_the_contact_person_1":"", 
    "name_of_the_contact_person_2":"",
    "designation_of_the_contact_person_2":"" , 
    "phone_no_of_the_contact_person_2":0,
    "email_of_the_contact_person_2":"", 
    "name_of_the_contact_person_3":"",
    "designation_of_the_contact_person_3":"", 
    "phone_no_of_the_contact_person_3":0, 
    "email_of_the_contact_person_3":"" ,
    "name_of_the_inn":"", 
    "address_of_the_inn":"" , 
    "phone_no_of_the_inn":0,
    "students_count":0,
    "faculty_count":0, 
    "event_coordinator":"" ,
    "name_of_the_travel_1":"" , 
    "address_of_the_travel_1":"", 
    "bus_no_of_the_travel_1":"",
    "operator_of_the_travel_1":"", 
    "operator_contact_of_the_travel_1":0, 
    "name_of_the_travel_2":"",
    "address_of_the_travel_2":"", 
    "bus_no_of_the_travel_2":"" ,
    "operator_of_the_travel_2":"",
    "operator_contact_of_the_travel_2" :0, 
    "name_of_the_travel_3":"" , 
    "address_of_the_travel_3" :"", 
    "bus_no_of_the_travel_3":"", 
    "operator_of_the_travel_3":"", 
    "operator_contact_of_the_travel_3":0, 
    "faculty_accompanied" :"",
    "undertaking_from_parents": "" ,
    "acdyr_id":null,
    "sem_id":null,
    "sem_of_students_visited":"",
    "year_of_students_visited":"",
    "proposal_date":""
     })
     console.log(iv)
     const navigate = useNavigate()
     
     const[facid,setFacid]=useState([])

     const infoCollect=(eve)=>{
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
    
      setIv((old) => {
        return {
          ...old,
          event_coordinator: updatedFacidString
        }
      })
        setIv((old) => {
          return {
            ...old,
            dept_id: logged.dept_id
          }
        })
     }

     const[facl,setFacl]=useState([])
     const [selectOptions, setSelectOptions] = useState([]);

     const informCollect=(eve)=>{
      let updatedString = facl;
      for (var i = 0; i < eve.length; i++) {
        const valueToAdd = eve[i].value;
    
        if (!updatedString.includes(valueToAdd)) {
          if (updatedString && updatedString.length>1) {

            updatedString += ','; // Add a comma as a separator
          }
          updatedString += valueToAdd;
          // alert("setFacid works");
        }
      }
      setFacl(updatedString);
      setSelectOptions(eve);
    
      setIv((old) => {
        return {
          ...old,
          faculty_accompanied: updatedString
        }
      })
     }


     const handlechange=(eve)=>{
        const{name,value}=eve.target
        setIv((old) => {
            const date = new Date(); // Replace with your actual date value
            const currentDate = format(date, 'dd-MM-yyyy');
            return {
              ...old,
              proposal_date: currentDate
            }
          })
        setIv((old)=>{
            if(name==="phone_no_of_the_contact_person_1"||name==="phone_no_of_the_contact_person_2"||name==="phone_no_of_the_contact_person_3"||name==="phone_no_of_the_inn"||name==="students_count"||name==="faculty_count"||name==="operator_contact_of_the_travel_1"||name==="operator_contact_of_the_travel_2"||name==="operator_contact_of_the_travel_3"||name==="acdyr_id"||name==="sem_id"){
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:value
                }
            }
        })
    }
    const callPropose = async() => {
        const jsonData = JSON.stringify(iv, (key, value) => {
          if (key === '__reactInternalInstance$zw213f') {
            // Ignore internal React properties
            return undefined;
          } else {
            return value;
          }
        });
        const data=JSON.parse(jsonData);
        console.log(typeof(data))
        try{
            console.log(data)
            info = await axios.post(`http://localhost:1234/iv/proposeIV`,data)
        }
        catch(err){
            console.log(err)
        }
        window.location.assign("/iv")
    };

    const[year,setYear]=useState([])

    const Acad=async()=>{
      let sid=3186;
      try{
      const t = await Academic(sid)
      // alert(t)
      setYear(t)
      }
      catch(err){
          // alert("Not Found")
      }
      
  }

        console.log(iv)


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
 



 <div class="report-header">
    <h1 class="recent-Articles">Details of the Industry</h1>
    </div> 

<div className="form-group">
        <label>Name of the Industry 1 with Address:</label>
        <input type='text' name="details_of_the_industry_1" onChange={handlechange} placeholder='Industry Details 1'/>
     </div>

     
<div className="form-group">
        <label>Name of the Industry 2 with Address (Optional):</label>
        <input type='text' name="details_of_the_industry_2" onChange={handlechange} placeholder='Industry Details 2'/>
     </div>


     <div className="form-group">
        <label>Name of the Industry 3 with Address (Optional):</label>
        <input  type='text' name="details_of_the_industry_3" onChange={handlechange} placeholder='Industry Details 3'/>
     </div>

     <div class="report-header">
    <h1 class="recent-Articles">Date of the Visit</h1>
    </div> 

     <div className='form-group'>
        <label>Date of the Industrial Visit Planned from</label>
        <input type='date' name='date_of_visit_from' onChange={handlechange} placeholder='Industrial Visit Date From'/>
        </div>

        <div className='form-group'>
        <label>Date of the Industrial Visit Planned to</label>
        <input type='date' name='date_of_visit_to' onChange={handlechange} placeholder='Industrial Visit Date To'/>
        </div>

        <div class="report-header">
    <h1 class="recent-Articles">Contact Person of the Industry</h1>
    </div>

    <div>
        <label style={{fontSize:"20px",color:"green"}}>Details of the Contact Person 1</label>
        </div>

    <div className='form-group'>
        <label>Name of the Contact Person 1</label>
        <input type='text' name='name_of_the_contact_person_1' onChange={handlechange} placeholder='Name'/>
        </div>

        <div className='form-group'>
        <label>Designation of the Contact Person1</label>
        <input type='text' name='designation_of_the_contact_person_1' onChange={handlechange}placeholder='Designation'/>
        </div>
   
        <div className='form-group'>
        <label>Mobile No of the Contact Person 1</label>
        <input type='number' name='phone_no_of_the_contact_person_1' onChange={handlechange} placeholder='Mobile No'/>
        </div>

        <div className='form-group'>
        <label>Mail Id of the Contact person 1</label>
        <input type='email' name='email_of_the_contact_person_1'onChange={handlechange} placeholder='Mail Id'/>
        </div>

        <div>
        <label style={{fontSize:"20px",color:"green"}}>Details of the Contact Person 2 (Optional)</label>
        </div>

        <div className='form-group'>
        <label>Name of the Contact Person 2</label>
        <input type='text' name='name_of_the_contact_person_2' onChange={handlechange} placeholder='Name'/>
        </div>

        <div className='form-group'>
        <label>Designation of the Contact Person 2</label>
        <input type='text' name='designation_of_the_contact_person_2' onChange={handlechange}placeholder='Designation'/>
        </div>
   
        <div className='form-group'>
        <label>Mobile No of the Contact Person 2</label>
        <input type='number' name='phone_no_of_the_contact_person_2' onChange={handlechange} placeholder='Mobile No'/>
        </div>

        <div className='form-group'>
        <label>Mail Id of the Contact person 2 </label>
        <input type='email' name='email_of_the_contact_person_2'onChange={handlechange} placeholder='Mail Id'/>
        </div>
        
        <div>
        <label style={{fontSize:"20px",color:"green"}}>Details of the Contact Person 3 (Optional)</label>
        </div>

        <div className='form-group'>
        <label>Name of the Contact Person 3</label>
        <input type='text' name='name_of_the_contact_person_3' onChange={handlechange} placeholder='Name'/>
        </div>

        <div className='form-group'>
        <label>Designation of the Contact Person 3</label>
        <input type='text' name='designation_of_the_contact_person_3' onChange={handlechange}placeholder='Designation'/>
        </div>
   
        <div className='form-group'>
        <label>Mobile No of the Contact Person 3</label>
        <input type='number' name='phone_no_of_the_contact_person_3' onChange={handlechange} placeholder='Mobile No'/>
        </div>

        <div className='form-group'>
        <label>Mail Id of the Contact person 3</label>
        <input type='email' name='email_of_the_contact_person_3'onChange={handlechange} placeholder='Mail Id'/>
        </div>


        <div class="report-header">
    <h1 class="recent-Articles">Details of Lodging Planned</h1>
    </div> 


        <div className='form-group'>
        <label>Name of the Inn</label>
        <input type='text'name='name_of_the_inn' onChange={handlechange} placeholder='Hotel Name'/>
        </div>

        <div className='form-group'>
        <label>Address</label>
        <input type='text' name='address_of_the_inn' onChange={handlechange} placeholder='Hotel Address'/>
        </div>

        <div className='form-group'>
        <label>Phone No</label>
        <input type='number' name='phone_no_of_the_inn' onChange={handlechange} placeholder='Hotel Phone Number'/>
        </div>
         
        <div class="report-header">
    <h1 class="recent-Articles">No of Persons Visited</h1>
    </div> 
       
    <div className='form-group'>
        <label>Students Count</label>
        <input type='number' name='students_count' placeholder='No of students visited' onChange={handlechange}/>
       </div>
        
        
        <div className='form-group'>
        <label>Faculty Count</label>
        <input type='number' name='faculty_count' onChange={handlechange} placeholder='No of Faculty Visited'/>
        </div>

        
<label for="event_coordinator">Event Co-ordinator : </label>
 <Select
 className="form-group"
        isMulti
        id="event_coordinator"
        name="event_coordinator"
        options={options}
        value={selectedOptions}
        onChange={infoCollect}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
      />

        
        <div class="report-header">
    <h1 class="recent-Articles">Details of the Travels</h1>
    </div> 


{/* ----------------------------------- */}
<div>
        <label style={{fontSize:"20px",color:"green"}}>Travels 1</label>
        </div>

        <div className='form-group'>
        <label>Name of The Travel 1</label>
        <input type='text' name='name_of_the_travel_1' onChange={handlechange} placeholder='Travels Name'/>
        </div>

        <div className='form-group'>
        <label>Address of the Travel 1</label>
        <input type='text' name='address_of_the_travel_1' onChange={handlechange} placeholder='Travels Address'/>
        </div>

        <div className='form-group'>
        <label>Bus No of the Travel 1</label>
        <input type='text' name='bus_no_of_the_travel_1' onChange={handlechange} placeholder='Reg Number of the Vehicle'/>
        </div>

        
        <div className='form-group'>
        <label>Name of the Travel Operator 1</label>
        <input type='text' name='operator_of_the_travel_1' onChange={handlechange} placeholder='Travel Operator Name'/>
        </div>

        <div className='form-group'>
        <label>Operator Contact Number 1</label>
        <input type='number' name='operator_contact_of_the_travel_1' onChange={handlechange} placeholder='Contact Number'/>
        </div>

        {/* ---------------------------------- */}
        
        <div>
        <label style={{fontSize:"20px",color:"green"}}>Travels 2</label>
        </div>

        <div className='form-group'>
        <label>Name of The Travel 2</label>
        <input type='text' name='name_of_the_travel_2' onChange={handlechange} placeholder='Travel Name'/>
        </div>

        <div className='form-group'>
        <label>Address of the Travel 2</label>
        <input type='text' name='address_of_the_travel_2' onChange={handlechange} placeholder='Travel Address'/>
        </div>

        <div className='form-group'>
        <label>Bus No of the Travel 2</label>
        <input type='text' name='bus_no_of_the_travel_2' onChange={handlechange} placeholder='Reg Number of the Vehicle'/>
        </div>

        
        <div className='form-group'>
        <label>Name of the Travel Operator 2</label>
        <input type='text' name='operator_of_the_travel_2' onChange={handlechange} placeholder='Travel Operator Name'/>
        </div>

        <div className='form-group'>
        <label>Operator Contact Number 2</label>
        <input type='number' name='operator_contact_of_the_travel_2' onChange={handlechange} placeholder='Contact Number'/>
        </div>

        {/* --------------------------------- */}

        <div>
        <label style={{fontSize:"20px",color:"green"}}>Travels 3</label>
        </div>

        <div className='form-group'>
        <label>Name of The Travel 3</label>
        <input type='text' name='name_of_the_travel_3' onChange={handlechange} placeholder='Travel Name'/>
        </div>

        <div className='form-group'>
        <label>Address of the Travel 3</label>
        <input type='text' name='address_of_the_travel_3' onChange={handlechange} placeholder='Travel Address'/>
        </div>

        <div className='form-group'>
        <label>Bus No of the Travel 3</label>
        <input type='text' name='bus_no_of_the_travel_3' onChange={handlechange} placeholder='Reg Number of the Vehicle'/>
        </div>

        
        <div className='form-group'>
        <label>Name of the Travel Operator 3</label>
        <input type='text' name='operator_of_the_travel_3' onChange={handlechange} placeholder='Travel Operator Name'/>
        </div>

        <div className='form-group'>
        <label>Operator Contact Number 3</label>
        <input type='number' name='operator_contact_of_the_travel_3' onChange={handlechange} placeholder='Contact Number'/>
        </div>

        {/* ------------------------------------------------ */}

        <div class="report-header">
    <h1 class="recent-Articles">Academic Details</h1>
    </div> 

        
             <div className="form-group">
             <label htmlFor="acdyr_id">Academic Year:</label>
      <select name="acdyr_id" className="form-group" onChange={handlechange}>
                        <option value="">Select Academic Year</option>
                        <option value="1"> 2023</option>
                   <option value="2"> 2024</option>                            
                        </select></div>

                            <div className="form-group">
      <label htmlFor="sem">Semester :</label>
      <select name="sem_id" onChange={handlechange}>
        <option value="0">Odd Sem</option>
        <option value="1">Even Sem</option>
      </select><br />      
    </div>
    
    <div className="form-group">
      <label htmlFor="sem">Semester of student studying :</label>
      <select name="sem_of_students_visited" onChange={handlechange}>
        <option value="">Select semester...</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
        <option value="V">V</option>
        <option value="VI">VI</option>
        <option value="VII">VII</option>
        <option value="VIII">VIII</option>
      </select><br/>
    </div>

    
    <div className="form-group">
      <label htmlFor="year">Year of student studying :</label>
      <select name="year_of_students_visited" onChange={handlechange}>
        <option value="">Select year...</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>        
      </select><br/>
    </div>        
        
{/* 
    <div className='form-group'>
        <label>Faculties accompanying</label>
        <select type='text' name='faculty_accompanied' onChange={handlechange}>
        <option value="">Select Faculty...</option>
                    <option value="1"> Sridhar</option>
                   <option value="2"> Pragadheesh</option> 
        </select>
        </div> */}

        
<label for="faculty_accompanied">Faculties Accompanying: </label>
 <Select
 className="form-group"
        isMulti
        id="faculty_accompanied"
        name="faculty_accompanied"
        options={options}
        value={selectOptions}
        onChange={informCollect}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
      />

        
        <div className="form-group">
                <label>Undertaking from Parents Collected for all Students</label>
                <select name="undertaking_from_parents" onChange={handlechange}>
                <option value="">Select Yes or No...</option>
                   <option value="YES"> YES</option>
                   <option value="NO"> NO</option> 
                </select>
             </div>

         
         

             

   
     

      
    </div>
    

    <h1 style={{color:'red'}}>{info}</h1>
         
    <div className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Send Proposal" className='col-3 btn btn-primary' />
                        <input type='button' onClick={()=>{
                                    window.location.assign("/ivproposal")


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

export default Ivadd