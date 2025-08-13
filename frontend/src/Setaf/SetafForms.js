import React, { useEffect, useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./SetafAddForm.css"
import { Academic } from '../connect';
import Select from 'react-select';

export const Journalfront=()=>{

  useEffect(()=>{
    Acad()
  },[])
const logged = JSON.parse(sessionStorage.getItem("person"))
console.log(logged)
    const[journal,setjournal]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",
        "semester":"",
        "name_of_author":"",
        "title_of_paper":"",
        "name_of_journal":"",
        "date_of_publication":"",
        "issn_number":"",
        "volume_no":"",
        "issue_no":"",
        "page_no":"",
        "journal_listed_in":"",
        "link_to_website_of_journal":"",
        "journal_first_page_PDF":""
        })


      useEffect(()=>{
        Acad()
      },[])

      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      

      useEffect(()=>{
        Sems()
      },[])
      const [sem,setsem] = useState([])

      const Sems=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
        // console.log(temp.data.row)
        setsem(temp.data.row)
      }

      console.log(journal)
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(journal.name_of_author);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=journal.name_of_author+'_journal_'+dateTimeString+'_'+random+'.pdf';
       
        setjournal((old)=>{
        return{
        ...old,
        journal_first_page_PDF:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, journal.journal_first_page_PDF);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    
 ////////
      const log=JSON.parse(sessionStorage.getItem('person'));
      
      const infoCollect=(eve)=>{
        setjournal((old)=>{
          return {
            ...old,
            dept_id:log.dept_id
          }
        })
        const{name,value}=eve.target
        setjournal((old)=>{
            if(name==="academic_year"||name==="semester"||name==="name_of_author"||name==="title_of_paper"||name==="name_of_journal"||name==="date_of_publication"||name==="issn_number"||name==="volume_no"||name==="issue_no"||name==="page_no"||name==="journal_listed_in"||name==="link_to_website_of_journal"||name==="journal_first_page_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value),
                   
                }
            }
        })   
       
    }
    const Submit=async()=>{
      try{
            
        // const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/journalnewrecord/${log.faculty_id}`,journal)
        navigate("/setaf/journalpublication")
        }
    catch(err){
          alert(err)
        }
        
    }
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(true);
   
    return(
        <>
        <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%",maxHeight:"80%"}}>
        <div className="style" style={{justifyContent:"center",marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"70px"}}>JOURNAL PUBLICATIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select name="academic_year" value={journal.academic_year} onChange={infoCollect}>
              <option value="">Select The Academic Year</option>
              {
    // let t=0;
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            }          
            </select>

            <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={journal.semester}>
            {
    // let t=0;
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Name of the Author's</label>
            <input type="text" placeholder="Enter the Author's Name" name='name_of_author' onChange={infoCollect} value={journal.name_of_author}/>
            
            <label>Title of Paper</label>
            <input type='text' placeholder='Title of Paper' name='title_of_paper' onChange={infoCollect} value={journal.title_of_paper}/>

            <label>Name of Journal</label>
            <input type="text" placeholder="Enter the Journal Name" name='name_of_journal' onChange={infoCollect} value={journal.name_of_journal}/>

            <label>Date of Publication</label>
            <input type="date" placeholder="Enter the Date" name='date_of_publication' onChange={infoCollect} value={journal.date_of_publication}/>

            <label>ISSN Number</label>
            <input type="text" placeholder="Enter the Number" name='issn_number' onChange={infoCollect} value={journal.issn_number}/>

            <label>Volume No</label>
            <input type="text" placeholder="Enter the Number" name='volume_no' onChange={infoCollect} value={journal.volume_no}/>

            <label>Issue No</label>
            <input type="text" placeholder="Enter the Number" name='issue_no' onChange={infoCollect} value={journal.issue_no}/>

            <label>Page No</label>
            <input type="text" placeholder="Enter the Number" name='page_no' onChange={infoCollect} value={journal.page_no}/>

            <label>Journal listed in</label>
            <select name='journal_listed_in' onChange={infoCollect} value={journal.journal_listed_in}>
                <option value="">Select the Journal</option>
                <option>SCI</option>
                <option>Scopus</option>
                <option>WoS</option>
                <option>Others</option>
            </select>

            <label>Link to Website of the Journal</label>
            <input type="text" placeholder="Enter the Link" name='link_to_website_of_journal' onChange={infoCollect} value={journal.link_to_website_of_journal}/>

                <option>UGC CARE</option>
              {file&&(<div>
                <label>Journal First Page - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div style={{marginRight:"100px"}} className='row mt-5 justify-content-around'>
          <input type='button' onClick={Submit} value="Submit"  className='col-3 btn btn-primary' />
          
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div>  
        </div>
        </div>
        </div>
        </>
    )
}


//conference
export const Conferencefront=()=>{

  useEffect(()=>{
    Acad()
  },[])
const logged = JSON.parse(sessionStorage.getItem("person"))
console.log(logged)

    const[conference,setconference]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",	
        "semester":"",	
        "name_of_the_authors":"",
        "title_of_the_conference_paper":"",
        "name_of_the_conference":"",
        "place_of_the_conference":"",
        "conference_type":"",
        "date_of_conference":"",
        "isbn_of_the_conference_proceeding":"",
        "conference_certificate_and_proceeding_pdf":""	
      })
        
          ///autofetch code for academic from db
         
          
          const [acd,setAcd] = useState([])
    
          const Acad=async()=>{
            const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
            // console.log(temp.data.row)
            setAcd(temp.data.row)
          }

          
  useEffect(()=>{
    Sems()
  },[])
  const [sem,setsem] = useState([])

  const Sems=async()=>{
    const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
    // console.log(temp.data.row)
    setsem(temp.data.row)
  }

      console.log(conference)
      const navigate = useNavigate()


      const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(conference.name_of_the_conference);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=conference.name_of_the_conference+'_conference_'+dateTimeString+'_'+random+'.pdf';
       
        setconference((old)=>{
        return{
        ...old,
        conference_certificate_and_proceeding_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, conference.conference_certificate_and_proceeding_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    

      ////////////////////////////
console.log(conference)
const navi=useNavigate()


const log=JSON.parse(sessionStorage.getItem('person'));
const handlechange=(eve)=>{
  setconference((old)=>{
    return {
      ...old,
      dept_id:log.dept_id
    }
  })
  const{name,value}=eve.target
  setconference((old)=>{
      if(name==="dept_id"||name==="academic_year"||name==="semester"||name==="name_of_the_authors"||name==="title_of_the_conference_paper"||name==="name_of_the_conference"||name==="place_of_the_conference"||name==="conference_type"||name==="date_of_conference"||name==="isbn_of_the_conference_proceeding"||name==="conference_certificate_and_proceeding_pdf"){
          return{
              ...old,
              [name]:value
          }
      }
      else if(name==="s_no"){
          // fillPorposals(value)
          return{
              ...old,
              [name]:parseInt(value)
          }
      }
      else{
          return{
              ...old,
              [name]:parseInt(value),
             
          }
      }
  })   

}

    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/conferencenewrecord/${log.faculty_id}`,conference)
            navi("/conferencepublication")
            }
            catch(err){
              alert("Error in axios")
            }
     
         }

    return(
        <>
        <div className='overallcontent'style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>CONFERENCE PUBLICATIONS AND PRESENTATIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select  value={conference.academic_year} onChange={handlechange}  name='academic_year' >
                 <option value="">Select The Academic Year</option>
              {
    // let t=0;
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
              } 
            </select>

            <label>Semester</label>
            <select name='semester' onChange={handlechange} value={conference.semester}>
              <option>Select the Semester</option>
            {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
         
            {/* <label>Department</label>
            <input type="text" placeholder="Enter the Department" value={conference.department} name='department' onChange={(e)=>handlechange(e)}/> */}

            <label>Name of the Author</label>
            <input type="text" placeholder="Enter the Name" value={conference.name_of_the_authors} name='name_of_the_authors' onChange={handlechange}/>

            <label>Title of the Conference Paper</label>
            <input type="text" placeholder="Enter the Title" value={conference.title_of_the_conference_paper} name='title_of_the_conference_paper' onChange={handlechange}/>

            <label>Name of the Conference</label>
            <input type="text" placeholder="Enter the Name" value={conference.name_of_the_conference} name='name_of_the_conference' onChange={handlechange}/>

            <label>Venue of the Conference</label>
            <input type="text" placeholder="Enter the Place" value={conference.place_of_the_conference} name='place_of_the_conference' onChange={handlechange}/>

            <label>Conference Type</label>
            <select value={conference.conference_type} name='conference_type' onChange={handlechange}>
                <option>Select the Type</option>
                <option >National</option>
                <option >International</option>
            </select>

            <label>Date of Conference</label>
            <input type="date" value={conference.date_of_conference} name='date_of_conference' onChange={handlechange}/>

            <label>ISBN of the Conference Proceeding</label>
            <input type="text" placeholder="Enter the ISBN" value={conference.isbn_of_the_conference_proceeding} name='isbn_of_the_conference_proceeding' onChange={handlechange}/>

           
              {file&&(<div>
                <label>Conference Certificate</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

////////////////workshop///////////////////
 export const Workshopfront=()=>{

const logged = JSON.parse(sessionStorage.getItem("person"))
console.log(logged)
  const [workshop,setworkshop]=useState({
    "dept_id":`${logged.dept_id}`,
    "name_of_the_faculty": `${logged.faculty_name}`,
    "academic_year":"",
    "semester":"",
    "designation":"",
    "nature_of_the_program":"",
    "title_of_the_program":"",
    "duration_from":"",
    "duration_to":"",
    "participation":"",
    "name_of_the_organization_and_place":""	,
    "location_of_organization":"",
    "amount_provided_by_the_HEI":"",
    "certificates_pdf":""	
		
    })
 
console.log(workshop)
const log=JSON.parse(sessionStorage.getItem('person'));
const navi=useNavigate()

const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(workshop.title_of_the_program);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=workshop.title_of_the_program+'_workshop_'+dateTimeString+'_'+random+'.pdf';
       
        setworkshop((old)=>{
        return{
        ...old,
        certificates_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, workshop.certificates_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
///faculty name fetch

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
const [selectedOptions, setSelectedOptions] = useState([]);  
const[facid,setFacid]=useState([])
const [option, setOptions] = useState([]);

const options = option.map((val, key) => ({
  value: val.faculty_id+'-'+val.faculty_name,
  label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
}));
const handleFacchange=(eve)=>{
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

  setworkshop((old) => {
    return {
      ...old,
      name_of_the_faculty: updatedFacidString
    }
  })

}
const handlechange=(eve)=>{
  setworkshop((old)=>{
    return {
      ...old,
      dept_id:log.dept_id
    }
  })
  setworkshop((old)=>{
    return {
      ...old,
      name_of_the_faculty:logged.faculty_name
    }
  })
  const{name,value}=eve.target
  setworkshop((old)=>{
      if(name==="dept_id"||name==="name_of_the_faculty"||name==="academic_year"||name==="semester"||name==="designation"||name==="nature_of_the_program"||name==="title_of_the_program"||name==="duration_from"||name==="duration_to"||name==="participation"||name==="name_of_the_organization_and_place"||name==="location_of_organization"||name==="amount_provided_by_the_HEI"||name==="certificates_pdf"){
          return{
              ...old,
              [name]:value
          }
      }
      else if(name==="s_no"){
          // fillPorposals(value)
          return{
              ...old,
              [name]:parseInt(value)
          }
      }
      else{
          return{
              ...old,
              [name]:parseInt(value),
             
          }
      }
  })   

}

    
  const handleclick=async(e)=>{
    e.preventDefault()
     try{
      //alert(workshop)
      const log=JSON.parse(sessionStorage.getItem('person'));
      await axios.post(`http://localhost:1234/setaf/workshopnewrecord/${log.faculty_id}`,workshop)
      navi('/workshop')
    }
  
      catch(err){
      console.log(err)
    } 

  }

  ////academic year
  useEffect(()=>{
    Acad()
  },[])
  const [acd,setAcd] = useState([])
    
  const Acad=async()=>{
    const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
    // console.log(temp.data.row)
    setAcd(temp.data.row)
  }

  useEffect(()=>{
    Sems()
  },[])
  const [sem,setsem] = useState([])

  const Sems=async()=>{
    const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
    // console.log(temp.data.row)
    setsem(temp.data.row)
  }


  return (
  <>
  <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"40px",marginRight:"300px"}}>WORKSHOP,SEMINAR,FDPs,SDPs PARTICIPATION</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
              
                  <label>Academic Year</label>
                   <select  value={workshop.academic_year} onChange={handlechange}  name='academic_year' >
                 <option value="">Select The Academic Year</option>
              {
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
              } 
            </select>

            <label>Semester</label>
            <select name='semester' onChange={handlechange} value={workshop.semester}>
              <option>Select the Semester</option>
            {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
               
                  <label>Designation </label>
                  <input type='text' name='designation'  value={setworkshop.ndesignation} placeholder='Enter Designation'  onChange={handlechange}/>
                 
               
                  <label> Nature of the program</label>
                  <select name="nature_of_the_program" onClick={handlechange} value={setworkshop.nature_of_the_program}>
                  <option>Select the Nature of the Program...</option>
                  <option >Workshop</option>
                  <option >Seminar</option>
                  <option>FDP</option>
                  <option>SDP</option>
                  <option>STTP</option>
                  <option>Webinar</option>
                  </select>
               
        
                  <label> Title of the program</label>
                  <input type='text' name='title_of_the_program'  value={setworkshop.title_of_the_program} placeholder='Enter Title of the Program' onChange={handlechange}  />
               
               
                  <label> Duration From</label>
                  <input type='date' name='duration_from'  value={setworkshop.duration_from} placeholder='' onChange={handlechange}  />


                  <label> Duration TO</label>
                  <input type='date' name='duration_to'  value={setworkshop.duration_to} placeholder='' onChange={handlechange}  />
           
                
               
                  
                  <label>Participation</label>
                  <select name="participation" onClick={handlechange} value={setworkshop.participation}>
                  <option>Select the Participation type...</option>
                  <option >Internal</option>
                  <option >External</option>
                  </select>
               
                  <label>Name of the organization and place</label>
                  <input type='text' name='name_of_the_organization_and_place' value={setworkshop.name_of_the_organization_and_place} placeholder='Enter name of the Organization and Place' onChange={handlechange}  />
         
                
               
                  <label>Location of organization</label>
                  <input type='text' name='location_of_organization' value={setworkshop.location_of_organization} placeholder='Enter the Location of organization' onChange={handlechange}  />
                 
               
                
                  <label>Amount provided by the HEI</label>
                  <input type='text' name='amount_provided_by_the_HEI' value={setworkshop.amount_provided_by_the_HEI} placeholder='Enter the Amount' onChange={handlechange}  />


                  {file&&(<div>
                <label>Certificate PDF</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
                  </div>
        
        <div style={{marginRight:"100px"}}  className='row mt-5 justify-content-around'>
          <input type='button' onClick={handleclick} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div> 
        </div>
        </div>
        </div>

  
  </>

  )
}

//////////////////////////////tech talk //////////////////////////////////////

export const Techtalks=()=>{
    const logged = JSON.parse(sessionStorage.getItem("person"))
    const[techtalk,settechtalk]=useState({
        "dept_id":`${logged.dept_id}`,
        "name_of_the_faculty":`${logged.faculty_name}`,
        "MuDiL_number":"",
        "lecture_delivered_to_branch":"",
        "academic_year":"",
        "semester":"",
        "section":"",
        "data_of_lecture_delivered":"",
        "period":"",
        "topic_of_discussion":"",
        "no_of_beneficiaries":"",
        "detail_of_discussion_made":"",
        "outcome_of_the_discussion":"",
        "outcome_of_the_activity":"",
        "PO_and_PSO":"",
        "attendance_sheet_pdf":"",
        "handout_of_lecture_pdf":""	

      })
      console.log(techtalk)
      const navi=useNavigate()
////////////////////PO and PSO//////////////////////
      const handlePoChange = (e) => {
        const { name, checked } = e.target;
        
        if (checked) {
        settechtalk({
        ...techtalk,
        PO_and_PSO: [...techtalk.PO_and_PSO, name],
        });
        } else {
          settechtalk({
        ...techtalk,
        PO_and_PSO: techtalk.PO_and_PSO.filter((PO_and_PSO) => PO_and_PSO !== name),
        });
        }
        };

        
        useEffect(()=>{
          Dept()
        },[])
        const [dept,setDept] = useState([])
          
        const Dept=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getDept`)
          // console.log(temp.data.row)
          setDept(temp.data.row)
        }
   ///////////////////////////////////////Fetch code/////////////
      const handlechange=(eve)=>{
        settechtalk((old)=>{
          return {
            ...old,
            dept_id:logged.dept_id
          }
        })
        settechtalk((old)=>{
          return {
            ...old,
            name_of_the_faculty:logged.faculty_name
          }
        })
        const{name,value}=eve.target
        settechtalk((old)=>{
            if(name==="dept_id"||name==="name_of_the_faculty"||name==="MuDiL_number"||name==="lecture_delivered_to_branch"||name==="academic_year"||name==="semester"||name==="section"||name==="data_of_lecture_delivered"||name==="period"||name==="topic_of_discussion"||name==="no_of_beneficiaries"||name==="detail_of_discussion_made"||name==="outcome_of_the_discussion"||name==="outcome_of_the_activity"||name==="PO_and_PSO"||name==="attendance_sheet_pdf"||name==="handout_of_lecture_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value),
                   
                }
            }
        })   
    }
    
    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/techtalknewrecord/${log.faculty_id}`,techtalk)
            navi('/techtalk')
            }
            catch(err){
              alert("Error in axios")
            }
        }

/////////////////////pdf code////////////////////////
        
      const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);
      const [selectedFile2, setSelectedFile2] = useState(null);
      const [selectedFile1, setSelectedFile1] = useState(null);
      const handleFileChange1 = (e) => {
 
        setNewFileName(techtalk.topic_of_discussion);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; 
        return;
        }
        else{
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
        let random =Math.random()*Math.random()*1;
        const name1=techtalk.topic_of_discussion+'_techtalk_'+dateTimeString+'_'+random+'.pdf';
        const name2=techtalk.dept+'_techtalk_'+dateTimeString+'_'+random+'.pdf';
        settechtalk((old)=>{
        return{
        ...old,
        attendance_sheet_pdf:name1,
        handout_of_lecture_pdf:name2
        }
        });
        }
        setSelectedFile1(e.target.files[0]);
      }
      const handleFileChange2 =(e) => {
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500KB.");
        e.target.value = null; // Reset the file input
        return;
        } 
        setSelectedFile2(e.target.files[0]);
      }
const call=async()=>{
  if(selectedFile1){
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, techtalk.attendance_sheet_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
  }

  if (selectedFile2) {
    const formData6 = new FormData();  
    formData6.append('file', selectedFile2, techtalk.handout_of_lecture_pdf);
    fetch('http://localhost:1234/setaf/uploadPdf', {
      method: 'POST',
      body: formData6,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
            });
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error('Error uploading the PDF:', error);
        alert('Error uploading the PDF: ' + error.message);
      });
  }
  else{
    alert("Error")
  }
}
const pdfUpload = async () => {
  try {
    setLoading(true);
    await Promise.all([call()]);
    setLoading(false);
    setFile(false);
  } catch (error) {
    console.error('Error during image uploads:', error);
    setFile(false);
    setLoading(false);
  }
 }

 useEffect(()=>{
  Acad()
},[])

const [acd,setAcd] = useState([])

const Acad=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
  // console.log(temp.data.row)
  setAcd(temp.data.row)
}


useEffect(()=>{
  Sems()
},[])
const [sem,setsem] = useState([])

const Sems=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
  // console.log(temp.data.row)
  setsem(temp.data.row)
}


    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"100px"}}>TECHTALKS TO BE DELIVERED MULTIDISCIPLINARY LECTURES</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
          
            <label>MuDiL Number</label>
            <input type="text" placeholder="Enter the Number" value={settechtalk.MuDiL_number} name='MuDiL_number' onChange={handlechange}/>

            <label>Lecture Delivered to Branch</label>
            <select value={settechtalk.lecture_delivered_to_branch} name='lecture_delivered_to_branch' onClick={handlechange}>
            <option value="">Select the Branch</option>
            {
                                dept.map((val,key)=>{
                                    return (<option key={val.dept_id}  value={val.dept_id}>{val.dept}</option>)
                                })
              }
            </select>

            <label>Academic Year</label>
            <select value={techtalk.academic_year} name='academic_year' onChange={handlechange}>
                <option >Select the Academic Year</option>
             {
                  acd.map((val,key)=>{
                  return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                  })
                }       

            </select>

            <label>Semester</label>
            <select value={settechtalk.semester} name='semester' onClick={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Section</label>
            <select value={settechtalk.section} name='section' onClick={handlechange}>
                <option >Select the Section</option>
                <option >A</option>
                <option >B</option>
                <option >C</option>
            </select>

            <label>Date of Lecture Delivered</label>
            <input type="date" name='data_of_lecture_delivered' value={settechtalk.data_of_lecture_delivered} onChange={handlechange}/>

            <label>Period</label>
            <select name='period' value={settechtalk.period} onClick={handlechange}>
                <option >Select the Period</option>
                <option >1</option>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
                <option >6</option>
                <option >7</option>
                <option >8</option>
                <option >9</option>
            </select>

            <label>Topic of Discussion</label>
            <input type="text" placeholder="Enter the Topic" name='topic_of_discussion' value={settechtalk.topic_of_discussion} onChange={handlechange}/>

            <label>No.of.Beneficiaries</label>
            <input type="number" placeholder="Enter the Number" name='no_of_beneficiaries' value={settechtalk.no_of_beneficiaries} onChange={handlechange}/>

            <label>Details of the Discussion made</label>
            <input type="text" placeholder="Enter the Details" name='detail_of_discussion_made' value={settechtalk.detail_of_discussion_made} onChange={handlechange}/>

            <label>Outcome of the Discussion</label>
            <input type="text" placeholder="Enter the Outcome" name='outcome_of_the_discussion' value={settechtalk.outcome_of_he_activity} onChange={handlechange}/>

            <label>Outcome of the Activity</label>
            <input type="text" placeholder="Enter the Outcome" name='outcome_of_the_activity' value={settechtalk.outcome_of_the_activity} onChange={handlechange}/>

                <label htmlFor="event_po">Program Outcomes:</label>
                <div>
                <label>

                <input className='po-checkbox' type="checkbox" name="PO1" checked={techtalk.PO_and_PSO.includes('PO1')} onChange={handlePoChange} />
                PO1
                
                <input className='po-checkbox' type="checkbox" name="PO2" checked={techtalk.PO_and_PSO.includes('PO2')} onChange={handlePoChange} />
                PO2
                
                <input className='po-checkbox' type="checkbox" name="PO3" checked={techtalk.PO_and_PSO.includes('PO3')} onChange={handlePoChange} />
                PO3
                
                <input className='po-checkbox' type="checkbox" name="PO4" checked={techtalk.PO_and_PSO.includes('PO4')} onChange={handlePoChange} />
                PO4
                
                <input className='po-checkbox' type="checkbox" name="PO5" checked={techtalk.PO_and_PSO.includes('PO5')} onChange={handlePoChange} />
                PO5
                
                <input className='po-checkbox' type="checkbox" name="PO6" checked={techtalk.PO_and_PSO.includes('PO6')} onChange={handlePoChange} />
                PO6
                </label>
                <label>
                <input className='po-checkbox' type="checkbox" name="PO7" checked={techtalk.PO_and_PSO.includes('PO7')} onChange={handlePoChange} />
                PO7
                
                <input className='po-checkbox' type="checkbox" name="PO8" checked={techtalk.PO_and_PSO.includes('PO8')} onChange={handlePoChange} />
                PO8
                
                <input className='po-checkbox' type="checkbox" name="PO9" checked={techtalk.PO_and_PSO.includes('PO9')} onChange={handlePoChange} />
                PO9
                
                <input className='po-checkbox' type="checkbox" name="PO10" checked={techtalk.PO_and_PSO.includes('PO10')} onChange={handlePoChange} />
                PO10
                
                <input className='po-checkbox' type="checkbox" name="PO11" checked={techtalk.PO_and_PSO.includes('PO11')} onChange={handlePoChange} />
                PO11
                
                <input className='po-checkbox' type="checkbox" name="PO12" checked={techtalk.PO_and_PSO.includes('PO12')} onChange={handlePoChange} />
                PO12
                </label>
                </div>

                {file&&(<div>
                <label>Attednance Sheet PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          {/* <button onClick={call}>Upload</button> */}
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            {file&&(<div>
                <label>Attednance Sheet PDF</label>
          <input type="file" onChange={handleFileChange2}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={pdfUpload}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
        </div>
        
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}


///////////////////////Facult Guest Talk in other institutions////////////////////

export const Facultyfront=()=>{
    const logged = JSON.parse(sessionStorage.getItem("person"))
    const[faculty,setfaculty]=useState({
        "dept_id":`${logged.dept_id}`,
        "name_of_the_faculty":`${logged.faculty_name}`,
        "academic_year":"",
        "semester":"",
        "date":"",
        "topic_of_guest_talk":"",
        "name_of_institution_or_industry":"",
        "place_of_institution_or_industry":"",
        "no_of_beneficaries":"",
        "letter_of_appreciation_or_certificate_pdf":""
      })
    ///////////////////////////////////////Faculty name fetch code
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
const [selectedOptions, setSelectedOptions] = useState([]);  
const[facid,setFacid]=useState([])
const [option, setOptions] = useState([]);

const options = option.map((val, key) => ({
  value: val.faculty_id+'-'+val.faculty_name,
  label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
}));
const handleFacchange=(eve)=>{
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

  setfaculty((old) => {
    return {
      ...old,
      name_of_the_faculty: updatedFacidString
    }
  })

}
///////////////////////////////////////////////////upto this/////////////////

///////////////////////////////////////////////////file upload code/////////////

const [newFileName, setNewFileName] = useState('');

      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(faculty.topic_of_guest_talk);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=faculty.topic_of_guest_talk+'_faculty_guest_talk_'+dateTimeString+'_'+random+'.pdf';
       
        setfaculty((old)=>{
        return{
        ...old,
        letter_of_appreciation_or_certificate_pdf:name1
        
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, faculty.letter_of_appreciation_or_certificate_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
  }
  else{
    alert("Error")
  }
}
///////////////////////////////////////////////////up to this///////////////////
      console.log(faculty)
      const navi=useNavigate()
      const infoCollect=(eve)=>{
        setfaculty((old)=>{
          return {
            ...old,
            dept_id:logged.dept_id
          }
        })
        setfaculty((old)=>{
          return {
            ...old,
            name_of_the_faculty:logged.faculty_name
          }
        })
        const{name,value}=eve.target
        setfaculty((old)=>{
            if(name==="dept_id"||name==="name_of_the_faculty"||name==="academic_year"||name==="semester"||name==="date"||name==="topic_of_guest_talk"||name==="name_of_institution_or_industry"||name==="place_of_institution_or_industry"||name==="no_of_beneficaries"||name==="letter_of_appreciation_or_certificate_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                   // fillPorposals(value)
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
     const callPropose=async()=>{
        try{
            const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/facultynewrecord/${log.faculty_id}`,faculty)
            navi('/facultly')
            }
            catch(err){
              console.log(err)
            }
            
        }

        ////Academic Year fetch code
        useEffect(()=>{
          Acad()
        },[])
        const [acd,setAcd] = useState([])
          
        const Acad=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
          // console.log(temp.data.row)
          setAcd(temp.data.row)
        }
        useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
        
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        
      
      

    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"140px"}}>FACULTY GUEST TALK IN OTHER INSTITUTIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
       
               <label>Academic Year</label>
            <select  value={faculty.academic_year} onChange={infoCollect}  name='academic_year' >
                 <option value="">Select The Academic Year</option>
              {
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
              } 
            </select>

            <label>Semester</label>
            <select value={setfaculty.semester} name='semester' onClick={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Date</label>
            <input type="date" value={setfaculty.date} name='date' onChange={infoCollect}/>

            <label>Topic of Guest Talk</label>
            <input type="text" placeholder="Enter the Topic" value={setfaculty.topic_of_guest_talk} name='topic_of_guest_talk' onChange={infoCollect}/>

            <label>Name of the Institution/Industry</label>
            <input type="text" placeholder="Enter the Name" value={setfaculty.name_of_institution_or_industry} name='name_of_institution_or_industry' onChange={infoCollect}/>

            <label>Place of the Institution/Industry</label>
            <input type="text" placeholder="Enter the Place" value={setfaculty.place_of_institution_or_industry} name='place_of_institution_or_industry' onChange={infoCollect}/>

            <label>No.of.Beneficiaries</label>
            <input type="text" placeholder="Enter the Number" value={setfaculty.no_of_beneficaries} name='no_of_beneficaries' onChange={infoCollect}/>

            {file&&(<div>
                <label>Letter of Appreciation and Certificate PDF</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
             </div>
        
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}

/////////////////////NPTEL///////////////////////////////////////////////////////////////////////////////////////////


export const Nptelfront=()=>{

    const[nptel,setnptel]=useState({
        "academic_year":"",
        "semester":"",
        "name_of_the_faculty":"",
        "year":"",
        "session":"",
        "course_name":"",
        "score_obtained":"",
        "certificate_type":"",
        "certificate_pdf":"",
        "dept_id":"",
      })
      console.log(nptel)
      useEffect(()=>{
        Acad()
      },[])

      

      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      
      
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(nptel.course_name);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=nptel.course_name+'_nptel_'+dateTimeString+'_'+random+'.pdf';
       
        setnptel((old)=>{
        return{
        ...old,
        certificate_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        // call();
      }

const call=async(err)=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, nptel.certificate_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    console.log(err)

  }
  // window.location.reload(false);
}
    
 ////////
      const log=JSON.parse(sessionStorage.getItem('person'));
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setnptel((old)=>{
          return {
            ...old,
            dept_id:log.dept_id
          }
        })
        setnptel((old)=>{
          return {
            ...old,
            name_of_the_faculty:log.faculty_name
          }
        })
        setnptel((old)=>{
            if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="year"||name==="session"||name==="course_name"||name==="score_obtained"||name==="certificate_type"||name==="certificate_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
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
    
    const callPropose=async()=>{
        try{
            await axios.post(`http://localhost:1234/setaf/nptelnewrecord/${log.faculty_id}`,nptel)
            navigate("/nptelcertification")
            }
            catch(err){
              alert("Error in axios")
            }
          
        }
        const [loading, setLoading] = useState(false);
        const [file, setFile] = useState(true);

        useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
        
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        
    return(
        <>
        
        <div class="overallcontent" style={{maxWidth:"50%",marginLeft:"25%"}} >
        <div className="style" style={{justifyContent:'center',marginLeft:"110px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"80px"}}>NPTEL CERTIFICATION</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select name="academic_year" onChange={infoCollect} value={setnptel.academic_year}>
            <option>Select The Academic Year</option>
            {
               acd.map((val,key)=>{
                return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
            })
            }
            </select>

            <label>Semester</label>
            <select value={setnptel.semester} name='semester' onClick={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
        </div>

     <div className="ej">
     <label >Year</label>
     <input  type="text" name="year" placeholder="Enter the year" className="form-control" onChange={infoCollect} value={setnptel.year}/>
     </div>


     <div className="ej">
     <label >Session</label>
     <input  type="text" name="session" placeholder="Enter The Session" className="form-control" onChange={infoCollect} value={setnptel.session}/>
     </div>

     <div className="ej">
     <label >Course Name</label>
     <input  type="text" name="course_name" placeholder="Enter The Session" className="form-control" onChange={infoCollect} value={setnptel.course_name}/>
     </div>


     <div className="ej">
     <label >Score Obtained</label>
     <input  type="text" name="score_obtained" placeholder="Score Obtained" className="form-control" onChange={infoCollect} value={setnptel.score_obtained}/>
     </div>
     
     
     <div className="ej">
   <label >Certificate Type</label>
    <select onClick={infoCollect} value={setnptel.certificate_type} name='certificate_type'>
    <option value="">select The Type</option>
    <option value="Gold">Gold</option>
    <option value="Silver">Silver</option>
    <option value="Elite">Elite</option>
    <option value="Successfully Completed">Successfully Completed</option>
    </select>
                            
     </div>

     {file&&(<div>
                <label>Certificate PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          {/* <input type='button' value='Upload' onClick={call}/> */}
          <button value='Upload' onClick={call}> Upload </button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
 </div>
    {/*  */}
      <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
        <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div>   
    
 </div>
 
 </div>
        
        </>
    )
}


//////Participation in Taste
export const Tastefront=()=>{
  const logged = JSON.parse(sessionStorage.getItem("person"))
    const[taste,setTaste]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",
        "semester":"",
        "name_of_the_faculty":`${logged.faculty_name}`,
        "date":"",
        "taste_number":"",
        "seminar_topic":"",
        "resource_person_name":"",
        "outcome_of_the_activity":""
        
      })
    
      console.log(taste)
      // const navi=useNavigate()
      useEffect(()=>{
        Acad()
      },[])

      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      
      
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(taste.seminar_topic);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=taste.course_name+'_taste_'+dateTimeString+'_'+random+'.pdf';
       
        setTaste((old)=>{
        return{
        ...old,
        certificate_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        // call();
      }

const call=async(err)=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, taste.certificate_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    console.log(err)

  }
  // window.location.reload(false);
}
    
 ////////
      const log=JSON.parse(sessionStorage.getItem('person'));
    
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setTaste((old)=>{
            if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="date"||name==="taste_number"||name==="seminar_topic"||name==="resource_person_name"||name==="outcome_of_the_activity"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
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
    
    const callPropose=async()=>{
        try{
            await axios.post(`http://localhost:1234/setaf/tastenewrecord/${log.faculty_id}`,taste)
            navigate('/taste')
            }
            catch(err){
              // alert("Error in axios")
              console.log(err)
            }
        }
        useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
        
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        

    return(
        <>
        <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"80px"}}>PARTICIPATION IN TASTE</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">

            <label>Academic Year</label>
            <select name="academic_year" value={setTaste.academic_year} onChange={infoCollect}>
              <option value="">Select The Academic Year</option>
              {
    
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            }          
            </select>

            <label>Semester</label>
            <select value={setTaste.semester} name='semester' onClick={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Date</label>
            <input type="date" name='date' onChange={infoCollect} value={setTaste.date} placeholder='Date' />

            <label>Taste Number</label>
            <input type="text" onChange={infoCollect} value={setTaste.taste_number} name='taste_number' placeholder="Enter the Number"/>

            <label>Seminar Topic</label>
            <input type="text" name='seminar_topic' onChange={infoCollect} value={setTaste.seminar_topic} placeholder="Enter the Topic"/>

            <label>Resource Person Name</label>
            <input type="text" name='resource_person_name' onChange={infoCollect} value={setTaste.resource_person_name} placeholder="Enter the Name"/>

            <label>Outcome of the Activity</label>
            <input type="text" name='outcome_of_the_activity' onChange={infoCollect} value={setTaste.outcome_of_the_activity} placeholder="Enter the Outcome"/>
        </div>
        <h1 style={{color:'red',}}></h1>
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}

////////////////////////////e-content///////////////////////////////////////////////////////////

export const Econtentfront=()=>{
 
  const[econtent,setecontent]=useState({
      "dept_id":"",
      "emp_id":"",
      "academic_year":"",
      "semester":"",
      "name_of_the_faculty":"",
      "name_of_the_module_developed":"",
      "module_of_platform":"",
      "date_of_launching_e_content":"",
      "link_to_the_module_developed":""
     
    })
  
    console.log(econtent)
    const navi=useNavigate()

  
    const infoCollect=(eve)=>{
      const{name,value}=eve.target
      setecontent((old)=>{
     
      if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_module_developed"||name==="module_of_platform"||name==="date_of_launching_e_content"||name==="link_to_the_module_developed"){
              return{
                  ...old,
                  [name]:value
              }
          }
          else if(name==="s_no"){
                 // fillPorposals(value)
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

    const logged = JSON.parse(sessionStorage.getItem("person"))
    useEffect(()=>{
      setecontent((prev)=>({
        ...prev,
        dept_id:`${logged.dept_id}`
      }))

      setecontent((prev)=>({
        ...prev,
        name_of_the_faculty:`${logged.faculty_name}`
      }))
      
      
      setecontent((prev)=>({
        ...prev,
        emp_id:`${logged.faculty_id}`
      }))

   },[])
  
  const callEcontent=async()=>{
      try{
          await axios.post(`http://localhost:1234/setaf/econtentnewrecord`,econtent)
          navi('/econtent')
          }
          catch(err){
            console.log(err)
          }
         setecontent(()=>{
          return{
            "academic_year":"",   
            "semester":"",
            "name_of_the_faculty":"",
            "name_of_the_module_developed":"",
            "module_of_platform":"",
            "date_of_launching_e_content":"",
            "link_to_the_module_developed":""
                }  
      })
      }

      useEffect(()=>{
        Acad()
      },[])
      
      
      
      const [acd,setAcd] = useState([])
      
      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }

      useEffect(()=>{
        Sems()
      },[])
      const [sem,setsem] = useState([])
      
      const Sems=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
        // console.log(temp.data.row)
        setsem(temp.data.row)
      }
      

  return(
      <>
      <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
      <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
      <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"150px"}}>E- Content</h1></div>
      <div className="row justify-content-center"style={{justifyContent:'center'}}>
      <div className="ej">
      

      <label>Academic Year</label>
            <select name="academic_year" onChange={infoCollect} value={econtent.academic_year}>
            <option>Select The Academic Year</option>
            {
               acd.map((val,key)=>{
                return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
            })
            }
            </select>

            <label>Semester</label>
            <select value={setecontent.semester} name='semester' onClick={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

          
          <label>Name of the Module Developed</label>
          <input type="text" placeholder="Enter the Name of the Module" value={econtent.name_of_the_module_developed} name='name_of_the_module_developed' onChange={infoCollect}/>

          <label>Module of Platform</label>
          <input type="text" placeholder="Enter the Module of Platform" value={econtent.module_of_platform} name='module_of_platform' onChange={infoCollect}/>

          <label>Date of launching e-Content</label>
          <input type="date" placeholder="Enter the Launching Date" value={econtent.date_of_launching_e_content} name='date_of_launching_e_content' onChange={infoCollect}/>
     

          <label>Link to the Module Developed</label>
          <input type="text" placeholder="Enter the Link" value={econtent.link_to_the_module_developed} name='link_to_the_module_developed' onChange={infoCollect}/>


      </div>
     
      <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
        <input type='button' onClick={callEcontent} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div> 
      </div>
      </div>
      </div>
      </>
  )
}

//////////////////////////////proposal submission for grants////////////////////////////////////////////////////////
export const Proposalfront=()=>{
  const logged = JSON.parse(sessionStorage.getItem("person"))
  const[proposal,setproposal]=useState({
      "dept_id":`${logged.dept_id}`,
      "academic_year":"",
      "semester":"",
      "name_of_the_faculty":`${logged.faculty_name}`,
      "name_of_the_funding_agency":"",
      "date_of_submission":"",
      "type":"",
      "title_of_the_proposal_submitted":"",
      "duration":"",
      "amount_quoted_in_lakhs":"",
      "grant_sanctioned":"",
      "proposal_proof_pdf":"",
      "grant_sanctioned_proof_pdf":""
    })
  
    console.log(proposal)
    const navi=useNavigate()

  
    const infoCollect=(eve)=>{
      const{name,value}=eve.target
      setproposal((old)=>{
          if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_funding_agency"||name==="date_of_submission"||name==="type"||name==="title_of_the_proposal_submitted"||name==="duration"||name==="amount_quoted_in_lakhs"||name==="grant_sanctioned"||name==="proposal_proof_pdf"||name==="grant_sanctioned_proof_pdf"){
              return{
                  ...old,
                  [name]:value
              }
          }
          else if(name==="s_no"){
                 // fillPorposals(value)
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
  
  const callPropose=async()=>{
      try{
          await axios.post(`http://localhost:1234/setaf/proposalnewrecord/${logged.faculty_id}`,proposal)
          navi('/proposal')
          }
          catch(err){
            console.log(err)
          }
      }


    useEffect(()=>{
      setproposal((prev)=>({
        ...prev,
        dept_id:`${logged.dept_id}`
      }))
  
      
      setproposal((prev)=>({
        ...prev,
        emp_id:`${logged.faculty_id}`
      }))
  
    },[])

    useEffect(()=>{
      Acad()
    },[])
  
    const [acd,setAcd] = useState([])
  
    const Acad=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
      // console.log(temp.data.row)
      setAcd(temp.data.row)
    }
    ///////////////////////////pdf/////////////////////////////
    const [newFileName, setNewFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(true);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {

      setNewFileName(proposal.proposal_proof_pdf);
      const file = e.target.files[0];
      if (file && file.size > 500 * 1024) {
      alert("Please choose an image with a size below 500kb.");
      e.target.value = null; 
      return;
      }
      else{
      const currentDate = new Date();
     
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
      const yyyy = currentDate.getFullYear();
      
      const hh = String(currentDate.getHours()).padStart(2, '0');
      const min = String(currentDate.getMinutes()).padStart(2, '0');
      const ss = String(currentDate.getSeconds()).padStart(2, '0');
      
      const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
      let random =Math.random()*Math.random()*1;
      const name1=proposal.name_of_the_funding_agency+'_proposal_pdf_1_'+dateTimeString+'_'+random+'.pdf';
      const name2=proposal.name_of_the_funding_agency+'_proposal_pdf_2_'+dateTimeString+'_'+random+'.pdf';
      setproposal((old)=>{
      return{
      ...old,
      proposal_proof_pdf:name1,
      grant_sanctioned_proof_pdf:name2
      }
      });
      }
      setSelectedFile1(e.target.files[0]);
    }
    const handleFileChange2 =(e) => {
      const file = e.target.files[0];
      if (file && file.size > 500 * 1024) {
      alert("Please choose an image with a size below 500KB.");
      e.target.value = null; // Reset the file input
      return;
      } 
      setSelectedFile2(e.target.files[0]);
    }
const call=async()=>{
if(selectedFile1){
  const formData6 = new FormData();
formData6.append('file', selectedFile1,proposal.proposal_proof_pdf);
fetch('http://localhost:1234/setaf/uploadPdf', {
  method: 'POST',
  body: formData6,
})
  .then((response) => {
    if (!response.ok) {
      if (response.status === 400) {
        return response.json().then((errorData) => {
          throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
        });
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.text();
  })
  .then((data) => {
    alert(data);
    setFile(false)
    
  })
  .catch((error) => {
    console.error('Error uploading the PDF:', error);
    alert('Error uploading the PDF: ' + error.message);
  });
}

if (selectedFile2) {
  const formData6 = new FormData();  
  formData6.append('file', selectedFile2, proposal.grant_sanctioned_proof_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
}
else{
  alert("Error")
}
}
const pdfUpload = async () => {
try {
  setLoading(true);
  await Promise.all([call()]);
  setLoading(false);
  setFile(false);
} catch (error) {
  console.error('Error during image uploads:', error);
  setFile(false);
  setLoading(false);
}
}
useEffect(()=>{
  Sems()
},[])
const [sem,setsem] = useState([])

const Sems=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
  // console.log(temp.data.row)
  setsem(temp.data.row)
}


  return(
      <>
      <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
      <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
      <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>PROPOSAL SUBMISSION FOR GRANTS</h1></div>
      <div className="row justify-content-center"style={{justifyContent:'center'}}>
      <div className="ej">
      <label>Academic Year</label>
          <select value={proposal.academic_year} name='academic_year' onChange={infoCollect}>
              <option >Select the Academic Year</option>
           {
                acd.map((val,key)=>{
                return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                })
              }       

          </select>

          <label>Semester</label>
            <select value={proposal.semester} name='semester' onChange={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
          
         <label>Name of the Funding Agency</label>
          <input type="text" placeholder="Enter the Name of Funding Agency" value={proposal.name_of_the_funding_agency} name='name_of_the_funding_agency' onChange={infoCollect}/>

          <label>Date of Submission</label>
          <input type="date" value={proposal.date_of_submission} name='date_of_submission' onChange={infoCollect}/>

          <label>Type</label>
          <select name='type' onChange={infoCollect} value={proposal.type}>
              <option >Select the type</option>
              <option >Government</option>
              <option >Non-Government</option>
          </select>

          <label>Title of The Proposal Submitted</label>
          <input type="text" placeholder="Enter the Title" value={proposal.title_of_the_proposal_submitted} name='title_of_the_proposal_submitted' onChange={infoCollect}/>

          <label>Duration</label>
          <input type="date" value={proposal.duration} name='duration' onChange={infoCollect}/>

          <label>Amount Quoted(in lakhs)</label>
          <input type="text" placeholder="Amount Quoted" value={proposal.amount_quoted_in_lakhs} name='amount_quoted_in_lakhs' onChange={infoCollect}/>

          <label>Grant Sanctioned</label>
          <select name='grant_sanctioned' onChange={infoCollect} value={proposal.grant_sanctioned}>
              <option >Select the type</option>
              <option >Yes</option>
              <option >No</option>
          </select>
          
          {file&&(<div>
              <label>Proposal proof - PDF</label>
        <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
        {/* <button onClick={call}>Upload</button> */}
            </div>)}
       
         {loading && (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    )}
          {file&&(<div>
              <label>Grant sanctioned proof - PDF</label>
        <input type="file" onChange={handleFileChange2}  id="event" name="pdf" accept = "application/pdf"/>
        <button onClick={pdfUpload}>Upload</button>
            </div>)}
       
         {loading && (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    )}
      </div>
     
      <div  style={{marginRight:"100px"}} className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div> 
      </div>
      </div>
      </div>
      </>
  )
}

////////////////////visit to industry////////////////////////////
export const VisittoIndustryfront=()=>{

  useEffect(()=>{
    Acad()
  },[])
  const logged = JSON.parse(sessionStorage.getItem("person"))
  
    const [industry,setindustry]=useState({
      "dept_id":`${logged.dept_id}`,
      "faculty_name":`${logged.faculty_name}`,
      "academic_year":"",
      "semester":"",
      "date_of_visit":"", 
      "name_of_industry":"",  
      "location_of_industry":"",  
      "website_link_of_industry":"",  
      "name_of_insdustry_instution_person_interacted":"", 
      "designation_of_industry_instution_person_interacted":"", 
      "purpose_of_the_visite":"",
      "outcome_of_the_activity":"",
      "report_of_visit_pdf":"",
      "photo_jpg":"",
     " geotagged_photos_jpg":"" 
      })
      console.log(industry)

      
      useEffect(()=>{
        Acad()
      },[])

      const [acd,setAcd] = useState([])


      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');
    
      const [file, setFile] = useState(true);
      const [loading, setLoading] = useState(false);
       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
       const [selectedFile2, setSelectedFile2] = useState(null);
       const [selectedFile3, setSelectedFile3] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(industry.name_of_industry);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=industry.name_of_industry+'_industry_'+dateTimeString+'_'+random+'.pdf';
        const name2=industry.name_of_industry+'_photo_industry_'+dateTimeString+'_'+random+'.jpeg';
        const name3=industry.name_of_industry+'_geotagged_industry_'+dateTimeString+'_'+random+'.jpeg';
       
        setindustry((old)=>{
        return{
        ...old,
        report_of_visit_pdf:name1,
        photo_jpg:name2,
        geotagged_photos_jpg:name3
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);
        // call();
      }
      const handleFileChange2 =(e) => {
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500KB.");
        e.target.value = null; // Reset the file input
        return;
        } 
        setSelectedFile2(e.target.files[0]);
      }

      const handleFileChange3 =(e) => {
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500KB.");
        e.target.value = null; // Reset the file input
        return;
        } 
        setSelectedFile3(e.target.files[0]);
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, industry.report_of_visit_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }

  if (selectedFile2) {
    const formData6 = new FormData();  
    formData6.append('file', selectedFile2, industry.photo_jpg);
    fetch('http://localhost:1234/setaf/uploadPdf', {
      method: 'POST',
      body: formData6,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
            });
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error('Error uploading the PDF:', error);
        alert('Error uploading the PDF: ' + error.message);
      });
  }

  if (selectedFile3) {
    const formData6 = new FormData();  
    formData6.append('file', selectedFile3, industry.geotagged_photos_jpg);
    fetch('http://localhost:1234/setaf/uploadPdf', {
      method: 'POST',
      body: formData6,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
            });
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error('Error uploading the PDF:', error);
        alert('Error uploading the PDF: ' + error.message);
      });
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    
const pdfUpload = async () => {
  try {
    setLoading(true);
    await Promise.all([call()]);
    setLoading(false);
    setFile(false);
  } catch (error) {
    console.error('Error during image uploads:', error);
    setFile(false);
    setLoading(false);
  }
 }
    
  console.log(industry)
  const navi=useNavigate()

    const log=JSON.parse(sessionStorage.getItem('person'));
    const handlechange=(e)=>{
      setindustry((old)=>{
        return {
          ...old,
          dept_id:log.dept_id
        }
      })
      setindustry((old)=>{
        return {
          ...old,
          name_of_the_faculty:log.faculty_name
        }
      })
        setindustry((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
      
        const{name,value}=e.target
        setindustry((old)=>{
          if(name==="academic_year"||name==="semester"||name==="date_of_visit"||name==="name_of_industry"||name==="location_of_industry"||name==="website_link_of_industry"||name==="name_of_insdustry_instution_person_interacted"||name==="designation_of_industry_instution_person_interacted"||name==="purpose_of_the_visite"||name==="outcome_of_the_activity"||name==="report_of_visit_pdf"||name==="photo_jpg"||name==="geotagged_photos_jpg"){
              return{
                  ...old,
                  [name]:value
              }
          }
          else if(name==="s_no"){
              // fillPorposals(value)
              return{
                  ...old,
                  [name]:parseInt(value)
              }
          }
          else{
              return{
                  ...old,
                  [name]:parseInt(value),
                 
              }
          }
      })  
    }
    const handleclick=async(e)=>{
      //e.preventDefault()
       try{
        const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/industryrecord/${log.faculty_id}`,industry)
        navi('/industry')
      }
      catch(err){
        console.log(err)
      } 
    }
    useEffect(()=>{
      Sems()
    },[])
    const [sem,setsem] = useState([])
    
    const Sems=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
      // console.log(temp.data.row)
      setsem(temp.data.row)
    }
    
    return (
    <>
     <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
          <div className="style" style={{justifyContent:'center',marginLeft:"125px"}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"25px"}}>VISITE TO INDUSTRIES,INSTITUTION</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
  
            
                    <label>Academic Year</label>
                      <select name="academic_year" value={industry.academic_year} onChange={handlechange}>
                        <option value="">Select The Academic Year</option>
                        {
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            }          
            </select>

            <label>Semester</label>
            <select value={industry.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
            <label>Date Of Visit </label>
            <input type='date' name='date_of_visit'  value={industry.date_of_visit} placeholder='Enter the Date of visit'onChange={handlechange}  />

  
                    <label>Name Of Industry/Insitution Visited</label>
                    <input type='text' name='name_of_industry'  value={industry.name_of_industry} placeholder='Enter the Industry_Name'onChange={handlechange}  />
     
                    <label>Location of Industry/Insitution Visited</label>
                    <input type='text' name='location_of_industry'value={industry.location_of_industry} placeholder='Enter the Location of Industry'onChange={handlechange}  />
                
                  
                    <label>Website link of Industry/Insitution Visited</label>
                    <input type='text' name='website_link_of_industry'  value={industry.website_link_of_industry} placeholder='Enter the website link'onChange={handlechange}  />
                               
                  
                    <label>Name Of Insitution person Interacted</label>
                    <input type='text' name='name_of_insdustry_instution_person_interacted' value={industry.name_of_insdustry_instution_person_interacted} placeholder='Enter the Score'onChange={handlechange}  />
                        
                    <label>Designation Of Insitution person Interacted</label>
                    <input type='text' name='designation_of_industry_instution_person_interacted' value={industry.designation_of_industry_instution_person_interacted} placeholder='Enter the Score'onChange={handlechange}  />
                  
                    <label>Purpose Of the Visite</label>
                    <input type='text' name='purpose_of_the_visite' value={industry.purpose_of_the_visite} placeholder='What purpose of visite the Industry'onChange={handlechange}  />   
                  
                    <label>Outcome Of the  Activity </label>
                    <input type='text' name='outcome_of_the_activity' value={industry.outcome_of_the_activity} placeholder='Enter the Outecome the activity 'onChange={handlechange}  />
                       {file&&(<div>    
                    <label>Report of Visit PDF </label>
                    <input type='file' name='report_of_visit_pdf'  placeholder=' 'onChange={handleFileChange1}  id='events' accept='application/pdf' />
                   </div> )} 
                   {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
  {file&&(<div>    
                    <label>Photo.jpg</label>
                    <input type='file' name='photo_jpg'  placeholder=' ' onChange={handleFileChange2}  id='events' accept='application/pdf' />
                   </div> )} 

                   {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}


{file&&(<div>    
                    <label>Geotagged Photos.jpg</label>
                    <input type='file' name='geotagged_photo_jpg'  placeholder=' ' onChange={handleFileChange3}  id='events' accept='application/pdf' />
                    <button onClick={pdfUpload}>upload</button>
                   </div> )} 

                   {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}

                </div>
                <h1 style={{color:'red',}}></h1>
          <div className='row mt-5 justify-content-around' style={{marginRight:"125px "}}>
            <input type='button' onClick={handleclick} value="Submit" className='col-3 btn btn-primary' />
            <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
          
            </div>
            </div>
         
        </div>
      </div>
    </>
    )
  }

  /////////////////////////////////Seed Money for Proposal////////////////////////////////////////////
  export const Seedfront=()=>{

    useEffect(()=>{
      Acad()
    },[])

    const logged = JSON.parse(sessionStorage.getItem("person"))

    const [Seed,setSeed]=useState({
      "dept_id":`${logged.dept_id}`,
      "academic_year":"",
      "semester":"",
      "name_of_the_faculty":`${logged.faculty_name}`,
      "title_of_the_research_project":"",
      "amount_of_seed_money":"",
      "year_of_receiving":"",
      "metrf_sanction_letter_pdf":""
      })
  
  
      console.log(Seed)

      useEffect(()=>{
        Acad()
      },[])
 
      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      
      
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(Seed.title_of_the_research_project);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=Seed.title_of_the_research_project+'_Seed_'+dateTimeString+'_'+random+'.pdf';
       
        setSeed((old)=>{
        return{
        ...old,
        metrf_sanction_letter_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, Seed.metrf_sanction_letter_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}


console.log(Seed)
  const navi=useNavigate()

const log=JSON.parse(sessionStorage.getItem('person'));
     const infocollect=(e)=>{
      setSeed((old)=>{
        return{
          ...old,
          dept_id:log.dept_id
        }
      })

      setSeed((old)=>{
        return{
          ...old,
          name_of_the_faculty:log.faculty_name
        }
      })

      setSeed((prev)=>({
        ...prev,
        [e.target.name]:e.target.value

      }))
     }
         
      const callPropose=async()=>{
        try{
        const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/seednewrecord/${log.faculty_id}`,Seed)
        navigate("/seed")
        }
        catch(err){
          alert("Error in axios")
        }
    }
    const [file, setFile] = useState(true);

    useEffect(()=>{
      Sems()
    },[])
    const [sem,setsem] = useState([])
    
    const Sems=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
      // console.log(temp.data.row)
      setsem(temp.data.row)
    }
    

    return (
      <>
       <div class="overallcontent"  style={{maxWidth:"50%",marginLeft:"25%"}} >
          <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"-45px"}}>SEED MONEY PROPOSAL FOR RESEARCH</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
              <label>Academic Year</label>
              <select name="academic_year" onChange={infocollect} value={Seed.academic_year}>
              <option >Select The Academic Year</option>
              {
    // let t=0;
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            } 
              </select>
  
              <label>Semester</label>
            <select value={Seed.semester} name='semester' onChange={infocollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
          </div>
                  
  <div className="ej">
       <label >Title of the Research Project</label>
       <input  type="text" name="title_of_the_research_project" placeholder="Title of the Research Project" value={Seed.title_of_the_research_project} onChange={infocollect}/>
       </div>   
  
       <div className="ej">
       <label >Amount of Seed Money(in lakhs)</label>
       <input  type="text" name="amount_of_seed_money" placeholder="Amount of Seed Money" className="form-control" value={Seed.amount_of_seed_money} onChange={infocollect}/>
       </div>
  
       <div className="ej">
       <label >Year of Receiving</label>
       <input  type="text" name="year_of_receiving" placeholder="YYYY" className="form-control" value={Seed.year_of_receiving} onChange={infocollect}/>
       </div>
       
       {/* <div className="ej">
       <label >METRF Sanction Letter Pdf</label>
       <input  type="file" name='metrf_sanction_letter_pdf' value={Seed.metrf_sanction_letter_pdf} onChange={infoCollect}/>
       </div> */}

       {file&&(<div>
                <label>METRF Sanction Letter Pdf</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
        
   </div>
      <h1 style={{color:'red',}}></h1>
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>   
      
   </div>
   
   </div>    
      </>
  
    )
  }

  ///////////////////Consultancy///////////////////////////

  export const Consultancyfront=()=>{

    const logged = JSON.parse(sessionStorage.getItem("person"))

    useEffect(()=>{
      setconsultancy((prev)=>({
        ...prev,
        dept_id:`${logged.dept_id}`
      }))

      setconsultancy((prev)=>({
        ...prev,
        name_of_the_faculty:`${logged.faculty_name}`
      }))
      
      setconsultancy((prev)=>({
        ...prev,
        emp_id:`${logged.faculty_id}`
      }))

    },[])
    const[consultancy,setconsultancy]=useState({
        "emp_id":"",
        "dept_id":"",
        "academic_year":"",
        "semester":"",
        "name_of_the_faculty":"",
        "name_of_consultancy_project":"", 
        "sponsoring_agency_details":"", 
        "sponsoring_agency_contact_details":"", 
        "date":"",  
        "revenue_generated":"",
        "number_to_trainees":"",
        "enclose_proof_pdf":""  
      })
    
      console.log(consultancy)
      const navi=useNavigate()

      const handlechange=(e)=>{
        setconsultancy((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
      Acad()
    },[])

    const [acd,setAcd] = useState([])

    const Acad=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
      // console.log(temp.data.row)
      setAcd(temp.data.row)
    }
    
    const callPropose=async()=>{
        try{
            const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/consultancynewrecord`,consultancy)
            navi('/Consultancy')
            }
            catch(err){
              alert("Error in axios")
            }
        }
       /////////////////////////PDF/////////////////////////////////////

       const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(consultancy.name_of_consultancy_project);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=consultancy.name_of_consultancy_project+'_Consultancy_'+dateTimeString+'_'+random+'.pdf';
       
        setconsultancy((old)=>{
        return{
        ...old,
        enclose_proof_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, consultancy.enclose_proof_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
const [loading, setLoading] = useState(false);
const [file, setFile] = useState(true);

useEffect(()=>{
  Sems()
},[])
const [sem,setsem] = useState([])

const Sems=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
  // console.log(temp.data.row)
  setsem(temp.data.row)
}

    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"-60px"}}>CONSULTANCY AND CORPORATE TRAINING</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">

            <label>Academic Year</label>
            <select value={consultancy.academic_year} name='academic_year' onChange={handlechange}>
                <option >Select the Academic Year</option>
                {/* <option value="1">2022-2023</option>
                <option value="2">2023-2024</option>  */}
             {
    // let t=0;
                  acd.map((val,key)=>{
                  return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                  })
                }       

            </select>

            <label>Semester</label>
            <select value={consultancy.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label> Name of Consultancy Project</label>
            <input type="text" placeholder="Name of Consultancy Project" value={consultancy.name_of_consultancy_project} name='name_of_consultancy_project' onChange={handlechange}/>


            <label> sponsoring agency details</label>
            <input type="text" placeholder="Enter the Sponsoring agency  details" value={consultancy.sponsoring_agency_details} name='sponsoring_agency_details' onChange={handlechange}/> 

              <label> sponsoring agency contact details</label>
            <input type="text" placeholder="Enter the Sponsoring agency contact details" value={consultancy.sponsoring_agency_contact_details} name='sponsoring_agency_contact_details' onChange={handlechange}/>                 

            <label>Date</label>
            <input type="date" name='date' value={consultancy.date} onChange={handlechange}/>

            <label>Revenue Generated</label>
            <input type="text" placeholder=" Revenue Generated" name='revenue_generated' value={consultancy.  revenue_generated} onChange={handlechange}/>

            <label>Number to trainees</label>
            <input type="number" placeholder="Enter the Number of trainees" name='number_to_trainees' value={consultancy.number_to_trainees} onChange={handlechange}/>

            {/* <label>Enclosed_Proof-PDF</label>
            <input type="file" name='enclose_proof_pdf' value={consultancy.enclose_proof_pdf} onChange={handlechange}/> */}

           {file&&(<div>
                <label>Enclose Proof - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
      
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}



//////////////////////////////////////////Patents filled/////////////////////////////////////////////


export const Patentfilledfront=()=>{

const logged = JSON.parse(sessionStorage.getItem("person"))
  const[patent,setpatent]=useState({
      "emp_id":"",
      "dept_id":`${logged.dept_id}`,
      "academic_year":"", 
      "semester":"",
      "name_of_the_faculty":`${logged.faculty_name}`, 
      "title_of_the_patent":"",
      "application_no":"",
      "date_of_application":"",
      "date_of_publication":"",
      "enclose_first_page_pdf":"" 

    })
  
    console.log(patent)
    const navi=useNavigate()


    const handlechange=(e)=>{
      setpatent((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }

  const callPropose=async()=>{
    try{
        await axios.post('http://localhost:1234/setaf/patentnewrecord',patent)
        navi('/patent')
        }
        catch(err){
          alert("Error in axios")
        }
    }


  useEffect(()=>{
    setpatent((prev)=>({
      ...prev,
      dept_id:`${logged.dept_id}`
    }))

    
    setpatent((prev)=>({
      ...prev,
      emp_id:`${logged.faculty_id}`
    }))

  },[])
 
  useEffect(()=>{
    Acad()
  },[])

  const [acd,setAcd] = useState([])

  const Acad=async()=>{
    const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
    // console.log(temp.data.row)
    setAcd(temp.data.row)
  }
  
     /////////////////////////PDF/////////////////////////////////////

     const [newFileName, setNewFileName] = useState('');


     ////image and pdf upload 
     const [selectedFile1, setSelectedFile1] = useState(null);
  const handleFileChange1 = (e) => {

  setNewFileName(patent.title_of_the_patent);
      const file = e.target.files[0];
      if (file && file.size > 500 * 1024) {
      alert("Please choose an image with a size below 500kb.");
      e.target.value = null; // Reset the file input
      return;
      }
      else{
      
        // alert("handle upload working")
      const currentDate = new Date();
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
      const yyyy = currentDate.getFullYear();
      
      const hh = String(currentDate.getHours()).padStart(2, '0');
      const min = String(currentDate.getMinutes()).padStart(2, '0');
      const ss = String(currentDate.getSeconds()).padStart(2, '0');
      
      const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
       // Maximum value for the random number
      let random =Math.random()*Math.random()*1;
      const name1=patent.title_of_the_patent+'_patent_filled_'+dateTimeString+'_'+random+'.pdf';
     
      setpatent((old)=>{
      return{
      ...old,
      enclose_first_page_pdf:name1
      }
      });
      
      }
      setSelectedFile1(e.target.files[0]);
      // call();
    }


const call=async()=>{
if(selectedFile1){
  // setLoading(true);
  const formData6 = new FormData();
formData6.append('file', selectedFile1, patent.enclose_first_page_pdf);
fetch('http://localhost:1234/setaf/uploadPdf', {
  method: 'POST',
  body: formData6,
})
  .then((response) => {
    if (!response.ok) {
      // Check if the response status is 400
      if (response.status === 400) {
        // You can parse the response JSON to get more details about the error
        return response.json().then((errorData) => {
          throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
        });
      } else {
        // For other errors, throw a general error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.text();
  })
  .then((data) => {
    // alert(formData.pdf)
    alert(data);
    setFile(false)
    
  })
  .catch((error) => {
    console.error('Error uploading the PDF:', error);
    alert('Error uploading the PDF: ' + error.message);
  });
  // setLoading(false)
}
else{
  alert("Error")
}
// window.location.reload(false);
}
const [loading, setLoading] = useState(false);
const [file, setFile] = useState(true);
useEffect(()=>{
  Sems()
},[])
const [sem,setsem] = useState([])

const Sems=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
  // console.log(temp.data.row)
  setsem(temp.data.row)
}

  return(
      <>
      <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
      <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
      <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>PATENTS FILLED,PUBLISHED,GRANTED</h1></div>
      <div className="row justify-content-center"style={{justifyContent:'center'}}>
      <div className="ej">

      <label>Academic Year</label>
            <select value={patent.academic_year} name='academic_year' onChange={handlechange}>
                <option >Select the Academic_Year</option>
                {/* <option value="1">2022-2023</option>
                <option value="2">2023-2024</option>  */}
             {
    // let t=0;
                  acd.map((val,key)=>{
                  return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                  })
                }       

            </select>

            <label>Semester</label>
            <select value={patent.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

          <label>Title of the patent</label>
          <input type="text" placeholder="Enter the title of the patent" value={patent.title_of_the_patent} name='title_of_the_patent' onChange={handlechange}/>


          <label>Application No</label>
          <input type="text" placeholder="Enter the Application No" value={patent.sponsoring_agency_with_contact_details} name='application_no' onChange={handlechange}/>         

          <label>Date of Application</label>
          <input type="date" name='date_of_application' value={patent.date_of_application} onChange={handlechange} placeholder='Enter the date of application'/>

          <label>Date of Publication</label>
          <input type="date" placeholder=" Enter the date of publication" name='date_of_publication' value={setpatent.date_of_publication} onChange={handlechange}/>
          
          {file&&(<div>
                <label>Enclose first page - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
         
      </div>
      
      <div style={{marginRight:"120px"}} className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div> 
      </div>
      </div>
      </div>
      </>
  )
}

////////////////////////////////////////////Collabrative///////////////////////////////////////////////////////////

export const Collabrativefront=()=> {
  const logged = JSON.parse(sessionStorage.getItem("person"))
  const [collabrative,setcollabrative]=useState({
       "emp_id":"",
       "dept_id":`${logged.dept_id}`,
       "academic_year":"",
       "semester":"",
       "name_of_the_faculty":`${logged.faculty_name}`,
        "name_of_the_faculty_coordinator":"",  
        "nature_of_the_activity":"", 
        "name_of_MoU_signed_industry_or_institution":"",
        "title_of_the_activity":"",
        "duration_from":"",
        "duration_to":"",
        "name_of_resource_person":"",
        "contact_details_of_resource_person":"",
        "designation_of_resource_person":"",
        "organization_details_of_resource_person":"",
        "no_of_beneficiaries":"",
        "enclose_Proof_PDF":"" 

     })
  
 console.log(collabrative)
   const handlechange=(e)=>{
       setcollabrative((prev)=>({
         ...prev,
         [e.target.name]:e.target.value
       }))
   }
   const navi=useNavigate()
   const callPropose=async()=>{
     try{
         await axios.post('http://localhost:1234/setaf/collabrativerecord',collabrative)
         navi('/Collabrative')
         }
         catch(err){
           alert("Error in axios")
         }
     }

   useEffect(()=>{
     setcollabrative((prev)=>({
       ...prev,
       dept_id:`${logged.dept_id}`
     }))
 
     
     setcollabrative((prev)=>({
       ...prev,
       emp_id:`${logged.faculty_id}`
     }))
 
   },[])

   useEffect(()=>{
     Acad()
   },[])
 
   const [acd,setAcd] = useState([])
 
   const Acad=async()=>{
     const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
     // console.log(temp.data.row)
     setAcd(temp.data.row)
   }
///////////////////pdf//////////////    
 
const [newFileName, setNewFileName] = useState('');

////image and pdf upload 
const [selectedFile1, setSelectedFile1] = useState(null);
const handleFileChange1 = (e) => {

setNewFileName(collabrative.nature_of_the_activity);
const file = e.target.files[0];
if (file && file.size > 500 * 1024) {
alert("Please choose an image with a size below 500kb.");
e.target.value = null; // Reset the file input
return;
}
else{

 // alert("handle upload working")
const currentDate = new Date();
const dd = String(currentDate.getDate()).padStart(2, '0');
const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
const yyyy = currentDate.getFullYear();

const hh = String(currentDate.getHours()).padStart(2, '0');
const min = String(currentDate.getMinutes()).padStart(2, '0');
const ss = String(currentDate.getSeconds()).padStart(2, '0');

const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
// Maximum value for the random number
let random =Math.random()*Math.random()*1;
const name1=collabrative.nature_of_the_activity+'_collabrative_activity_'+dateTimeString+'_'+random+'.pdf';

setcollabrative((old)=>{
return{
...old,
enclose_Proof_PDF:name1
}
});

}
setSelectedFile1(e.target.files[0]);
// call();
}


const call=async()=>{
if(selectedFile1){
// setLoading(true);
const formData6 = new FormData();
formData6.append('file', selectedFile1, collabrative.enclose_Proof_PDF);
fetch('http://localhost:1234/setaf/uploadPdf', {
method: 'POST',
body: formData6,
})
.then((response) => {
if (!response.ok) {
// Check if the response status is 400
if (response.status === 400) {
 // You can parse the response JSON to get more details about the error
 return response.json().then((errorData) => {
   throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
 });
} else {
 // For other errors, throw a general error
 throw new Error(`HTTP error! Status: ${response.status}`);
}
}
return response.text();
})
.then((data) => {
// alert(formData.pdf)
alert(data);
setFile(false)

})
.catch((error) => {
console.error('Error uploading the PDF:', error);
alert('Error uploading the PDF: ' + error.message);
});
// setLoading(false)
}
else{
alert("Error")
}
// window.location.reload(false);
}
const [loading, setLoading] = useState(false);
const [file, setFile] = useState(true);

useEffect(()=>{
  Sems()
},[])
const [sem,setsem] = useState([])

const Sems=async()=>{
  const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
  // console.log(temp.data.row)
  setsem(temp.data.row)
}

return (
 <>
<div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
   <div className="style" style={{justifyContent:'center',marginLeft:"125px"}}>
   <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"-100px"}}>COLLABRATIVE ACTIVITIES WITH MOU SIGNED INDUSTRIES, INSTITUTION</h1></div>
   <div className="row justify-content-center"style={{justifyContent:'center'}}>
   <div className="ej">
    
 <label>Academic Year</label>
         <select value={collabrative.academic_year} name='academic_year' onChange={handlechange}>
             <option >Select the Academic Year</option>
             {/* <option value="1">2022-2023</option>
             <option value="2">2023-2024</option>  */}
          {
 // let t=0;
               acd.map((val,key)=>{
               return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
               })
             }       

         </select>


         <label>Semester</label>
            <select value={collabrative.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

    <label>Name of the Faculty Coordinator</label>
    <input type="text" placeholder="Enter the Name" value={collabrative.name_of_the_faculty_coordinator} name='name_of_the_faculty_coordinator' onChange={handlechange}/>

    <label>Nature of the Activity</label>
    <select name='nature_of_the_activity' value={collabrative.nature_of_the_activity} onChange={handlechange}>
        <option >Select the Activity</option>
        <option>Workshop</option>
        <option >Seminar</option>
        <option >Internship</option>
        <option >In plant Training</option>
        <option >Industrial Visit</option>
        <option >Student Exchange</option>
        <option >Faculty Exchange</option>
    </select>


    
    <label>Name of MOU Signed Industry/Institution</label>
    <input type="text" placeholder="Name of Mou signed Industry" value={collabrative.name_of_MoU_signed_industry_or_institution}  name='name_of_MoU_signed_industry_or_institution' onChange={handlechange} />


    <label>Title of the Activity</label>
    <input type="text" placeholder="Enter the Title of the Activity" name='title_of_the_activity'  value={collabrative.title_of_the_activity} onChange={handlechange}/>

    <label>Duration From</label>
    <input type="date" placeholder="Enter the Duration" value={collabrative.duration_from} name='duration_from' onChange={handlechange}/>

    <label>Duration To</label>
    <input type="date" placeholder="Enter the Duration " value={collabrative.duration_to} name='duration_to' onChange={handlechange}/>

    <label>Name of the Resource Person </label>
    <input type="text" placeholder="Name of the Resource Person" value={collabrative.name_of_resource_person} name='name_of_resource_person' onChange={handlechange}/>

    <label>Contact Details of Resource Person</label>
    <input type="text" placeholder="Contact Details" value={collabrative.contact_details_of_resource_person} name='contact_details_of_resource_person' onChange={handlechange}/>

    <label>Designation of Resource Person</label>
    <input type="text" placeholder="Designation of Resource Person" value={collabrative.designation_of_resource_person} name='designation_of_resource_person' onChange={handlechange}/>

    <label>Orgnization Details of Resource Person</label>
    <input type="text" placeholder="Orgnization Details of Resource Person" value={collabrative.organization_details_of_resource_person} name='organization_details_of_resource_person' onChange={handlechange}/>

    <label>No of Benificiaries</label>
    <input type="text" placeholder="No of Benificiaries" value={collabrative.no_of_beneficiaries} name='no_of_beneficiaries' onChange={handlechange}/>

    {file&&(<div>
             <label>Enclose proof - PDF</label>
       <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
       <button onClick={call}>Upload</button>
           </div>)}
      
        {loading && (
     <div className="loading-overlay">
       <div className="loading-spinner"></div>
       <div>Loading...</div>
     </div>
   )}
     
 </div>
 {/* <h1 style={{color:'red'}}></h1> */}
 <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
  <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
  <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
 </div> 
 </div>
 </div>
 </div>
</>
)
}

//////////////////////Visit to library//////////////////////////

export const VisittoLibraryfront=()=>{
  const logged = JSON.parse(sessionStorage.getItem("person"))
  const[visittolibrary,setvisittolibrary]=useState({
      "dept_id":`${logged.dept_id}`,
      "emp_id":"",
      "academic_year":"",
      "name_of_the_faculty":`${logged.faculty_name}`,
      "date":"",
      "purpose_of_visit":""
     
    })
  
    console.log(visittolibrary)
    const navi=useNavigate()

  
    const infoCollect=(eve)=>{
      const{name,value}=eve.target
      setvisittolibrary((old)=>{
     
      if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="date"||name==="purpose_of_visit"){
              return{
                  ...old,
                  [name]:value
              }
          }
          else if(name==="s_no"){
                 // fillPorposals(value)
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

    useEffect(()=>{
      setvisittolibrary((prev)=>({
        ...prev,
        dept_id:`${logged.dept_id}`
      }))

      setvisittolibrary((prev)=>({
        ...prev,
        name_of_the_faculty:`${logged.faculty_name}`
      }))
      
      
      setvisittolibrary((prev)=>({
        ...prev,
        emp_id:`${logged.faculty_id}`
      }))

   },[])
  
  const callVisittolibrary=async()=>{
      try{
          await axios.post(`http://localhost:1234/setaf/visittolibrarynewrecord/${logged.faculty_id}`,visittolibrary)
          navi('/visittolibrary')
          }
          catch(err){
            console.log(err)
          }
         setvisittolibrary(()=>{
          return{
            "academic_year":"",   
            "semester":"",
            "name_of_the_faculty":"",
            "date":"",
            "purpose_of_visit":""
                }  
      })
      }
      
      useEffect(()=>{
        Acad()
      },[])
      
      
      
      const [acd,setAcd] = useState([])
      
      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }

      useEffect(()=>{
        Sems()
      },[])
      const [sem,setsem] = useState([])
      
      const Sems=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
        // console.log(temp.data.row)
        setsem(temp.data.row)
      }

  return(
      <>
      <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
      <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
      <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"150px"}}>VISIT TO LIBRARY</h1></div>
      <div className="row justify-content-center"style={{justifyContent:'center'}}>
      <div className="ej">

      <label>Academic Year</label>
            <select name="academic_year" onChange={infoCollect} value={visittolibrary.academic_year}>
            <option>Select The Academic Year</option>
            {
               acd.map((val,key)=>{
                return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
            })
            }
            </select>
            <label>Semester</label>
            <select value={visittolibrary.semester} name='semester' onChange={infoCollect}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Date of Publication</label>
            <input type="date" placeholder="Enter the Date" name='date' onChange={infoCollect} value={visittolibrary.date}/>

          <label>Purpose of visit</label>
          <input type="text" placeholder="Purpose of Visiting the library" value={visittolibrary.purpose_of_visit} name='purpose_of_visit' onChange={infoCollect}/>


      </div>
     
      <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
        <input type='button' onClick={callVisittolibrary} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div> 
      </div>
      </div>
      </div>
      </>
  )
}


//Award at National and International
export const AwardAtNational=()=>{

  useEffect(()=>{
    Acad()
  },[])
const logged = JSON.parse(sessionStorage.getItem("person"))
console.log(logged)

    const[award,setaward]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",	
        "semester":"",	
        "name_of_the_faculty":`${logged.faculty_name}`,
        "name_of_the_award":"",
        "category":"",
        "date_of_award":"",
        "name_of_awarding_organization":"",
        "award_certificate_pdf":""
      
      })
        
          ///autofetch code for academic from db
         
          
          const [acd,setAcd] = useState([])
    
          const Acad=async()=>{
            const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
            // console.log(temp.data.row)
            setAcd(temp.data.row)
          }
      console.log(award)
      const navigate = useNavigate()


      const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(award.name_of_the_award);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=award.name_of_the_award+'_award_'+dateTimeString+'_'+random+'.pdf';
       
        setaward((old)=>{
        return{
        ...old,
        award_certificate_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, award.award_certificate_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    

      ////////////////////////////
console.log(award)
const navi=useNavigate()


const log=JSON.parse(sessionStorage.getItem('person'));
const handlechange=(eve)=>{
  setaward((old)=>{
    return {
      ...old,
      dept_id:log.dept_id
    }
  })
  setaward((old)=>{
    return {
      ...old,
      name_of_the_faculty:log.faculty_name
    }
  })
  const{name,value}=eve.target
  setaward((old)=>{
      if(name==="dept_id"||name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_award"||name==="category"||name==="date_of_award"||name==="name_of_awarding_organization"||name==="award_certificate_pdf"){
          return{
              ...old,
              [name]:value
          }
      }
      else if(name==="s_no"){
          // fillPorposals(value)
          return{
              ...old,
              [name]:parseInt(value)
          }
      }
      else{
          return{
              ...old,
              [name]:parseInt(value),
             
          }
      }
  })   

}

    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/awardatnational/${log.faculty_id}`,award)
            navi("/award")
            }
            catch(err){
              alert("Error in axios")
            }
     
         }
         useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
        
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        

    return(
        <>
        <div className='overallcontent'style={{maxWidth:"50%",marginLeft:"25%",maxHeight:"80%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"100px"}}>AWARD AT NATIONAL AND INTERNATIONAL</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select  value={award.academic_year} onChange={handlechange}  name='academic_year' >
                 <option value="">Select The Academic Year</option>
              {
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
              } 
            </select>

            <label>Semester</label>
            <select value={award.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Name of the Award</label>
            <input type="text" placeholder="Enter the Title" value={award.name_of_the_award} name='name_of_the_award' onChange={handlechange}/>

            <label>Category</label>
            <select value={award.category} name='category' onChange={handlechange}>
                <option>Select the Type</option>
                <option >National</option>
                <option >International</option>
            </select>


            <label>Date of Award</label>
            <input type="date" placeholder="Enter the Date" value={award.date_of_award} name='date_of_award' onChange={handlechange}/>

            <label>Name of the Awarding Organization</label>
            <input type="text" placeholder="Enter the Name of Awarding Organization" value={award.name_of_awarding_organization} name='name_of_awarding_organization' onChange={handlechange}/>


           
              {file&&(<div>
                <label>Awarded Certificate</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>
        </div>
        </div>
        </div>
        </>
    )
}




//Books Chapters Authorship
export const Books=()=>{

  useEffect(()=>{
    Acad()
  },[])
const logged = JSON.parse(sessionStorage.getItem("person"))
console.log(logged)

    const[books,setbooks]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",	
        "semester":"",	
        "name_of_the_faculty":`${logged.faculty_name}`,
        "name_of_the_authors":"",
        "title_of_the_book":"",
        "date_of_publication":"",
        "isbn_number":"",
        "details_of_the_publisher":"",
        "website_link_of_the_publisher":"",
        "category":"",
        "enclose_proof_pdf":""  
      
      })
        
          ///autofetch code for academic from db
         
          
          const [acd,setAcd] = useState([])
    
          const Acad=async()=>{
            const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
            // console.log(temp.data.row)
            setAcd(temp.data.row)
          }
      console.log(books)
      const navigate = useNavigate()


      const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(books.title_of_the_book);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=books.title_of_the_book+'_books_'+dateTimeString+'_'+random+'.pdf';
       
        setbooks((old)=>{
        return{
        ...old,
        enclose_proof_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, books.enclose_proof_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    

      ////////////////////////////
console.log(books)
const navi=useNavigate()


const log=JSON.parse(sessionStorage.getItem('person'));
const handlechange=(eve)=>{
  setbooks((old)=>{
    return {
      ...old,
      dept_id:log.dept_id
    }
  })
  setbooks((old)=>{
    return {
      ...old,
      name_of_the_faculty:log.faculty_name
    }
  })
  const{name,value}=eve.target
  setbooks((old)=>{
      if(name==="dept_id"||name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_authors"||name==="title_of_the_book"||name==="date_of_publication"||name==="isbn_number"||name==="details_of_the_publisher"||name==="website_link_of_the_publisher"||name==="category"||name==="enclose_proof_pdf"){
          return{
              ...old,
              [name]:value
          }
      }
      else if(name==="s_no"){
          // fillPorposals(value)
          return{
              ...old,
              [name]:parseInt(value)
          }
      }
      else{
          return{
              ...old,
              [name]:parseInt(value),
             
          }
      }
  })   

}

    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/booksrecord/${log.faculty_id}`,books)
            navi("/books")
            }
            catch(err){
              alert("Error in axios")
            }
     
         }
         useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
        
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        

    return(
        <>
        <div className='overallcontent'style={{maxWidth:"50%",marginLeft:"25%",maxHeight:"80%"}}>
        <div className="style" style={{justifyContent:'center',marginLeft:"120px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"100px"}}>AWARD AT NATIONAL AND INTERNATIONAL</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select  value={books.academic_year} onChange={handlechange}  name='academic_year' >
                 <option value="">Select The Academic Year</option>
              {
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
              } 
            </select>

            <label>Semester</label>
            <select value={books.semester} name='semester' onChange={handlechange}>
                <option >Select the Semester</option>
                {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
         
            <label>Name of the Author</label>
            <input type="text" placeholder="Enter the Authors Name" value={books.name_of_the_authors} name='name_of_the_authors' onChange={handlechange}/>

            <label>Title of the Book</label>
            <input type="text" placeholder="Title of the Book" value={books.title_of_the_book} name='title_of_the_book' onChange={handlechange}/>


            <label>Date of Publication</label>
            <input type="date" placeholder="Enter the Date" value={books.date_of_publication} name='date_of_publication' onChange={handlechange}/>

            <label>ISBN Number</label>
            <input type="text" placeholder="Enter the ISBN Number" value={books.isbn_number} name='isbn_number' onChange={handlechange}/>

            <label>Details of the Publisher</label>
            <input type="text" placeholder="Enter the Detail of Publisher" value={books.details_of_the_publisher} name='details_of_the_publisher' onChange={handlechange}/>

            <label>Website Link of the Publisher</label>
            <input type="text" placeholder="Enter the Detail of Publisher" value={books.website_link_of_the_publisher} name='website_link_of_the_publisher' onChange={handlechange}/>
         
            <label>Category</label>
            <select value={books.category} name='category' onChange={handlechange}>
                <option>Select the Type</option>
                <option >National</option>
                <option >International</option>
            </select>

              {file&&(<div>
                <label>Enclose the Proof PDF</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div className='row mt-5 justify-content-around' style={{marginRight:"100px"}}>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>
        </div>
        </div>
        </div>
        </>
    )
}


  ////////////students_motivation///////////////

  
  export const Motivationfront=()=>{
    const logged = JSON.parse(sessionStorage.getItem("person"))
      const[Motivation,setMotivation]=useState({
       
          "emp_id":"",
          "dept_id":`${logged.dept_id}`,
          "academic_year":"",
          "semester":"",
          "name_of_the_faculty":`${logged.faculty_name}`,
          "name_of_the_student":"",
          "date":"",
          "paper_presentation_project_submission_other_contest":"",
          "no_of_beneficiaries":"",
          "certificate_PDF":""
          })
    
    
        useEffect(()=>{
          Acad()
        },[])
    
        const [acd,setAcd] = useState([])
    
        const Acad=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
          // console.log(temp.data.row)
          setAcd(temp.data.row)
        }

        useEffect(()=>{
          Sems()
        },[])
        const [sem,setsem] = useState([])
  
        const Sems=async()=>{
          const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
          // console.log(temp.data.row)
          setsem(temp.data.row)
        }
        
        console.log(Motivation)
        const navigate = useNavigate()
        const [newFileName, setNewFileName] = useState('');
    
    
         ////image and pdf upload 
         const [selectedFile1, setSelectedFile1] = useState(null);
      const handleFileChange1 = (e) => {
    
      setNewFileName(Motivation.paper_presentation_project_submission_other_contest);
          const file = e.target.files[0];
          if (file && file.size > 500 * 1024) {
          alert("Please choose an image with a size below 500kb.");
          e.target.value = null; // Reset the file input
          return;
          }
          else{
          
            // alert("handle upload working")
          const currentDate = new Date();
          const dd = String(currentDate.getDate()).padStart(2, '0');
          const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
          const yyyy = currentDate.getFullYear();
          
          const hh = String(currentDate.getHours()).padStart(2, '0');
          const min = String(currentDate.getMinutes()).padStart(2, '0');
          const ss = String(currentDate.getSeconds()).padStart(2, '0');
          
          const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
           // Maximum value for the random number
          let random =Math.random()*Math.random()*1;
          const name1=Motivation.paper_presentation_project_submission_other_contest+'_motivation_'+dateTimeString+'_'+random+'.pdf';
         
          setMotivation((old)=>{
          return{
          ...old,
          certificate_PDF:name1
          }
          });
          
          }
          setSelectedFile1(e.target.files[0]);
    
          
          // call();
        }
    
    
    const call=async()=>{
    if(selectedFile1){
      // setLoading(true);
      const formData6 = new FormData();
    formData6.append('file', selectedFile1, Motivation.certificate_PDF);
    fetch('http://localhost:1234/setaf/uploadPdf', {
      method: 'POST',
      body: formData6,
    })
      .then((response) => {
        if (!response.ok) {
          // Check if the response status is 400
          if (response.status === 400) {
            // You can parse the response JSON to get more details about the error
            return response.json().then((errorData) => {
              throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
            });
          } else {
            // For other errors, throw a general error
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then((data) => {
        // alert(formData.pdf)
        alert(data);
        setFile(false)
        
      })
      .catch((error) => {
        console.error('Error uploading the PDF:', error);
        alert('Error uploading the PDF: ' + error.message);
      });
      // setLoading(false)
    }
    else{
      alert("Error")
    }
    // window.location.reload(false);
    }
      
    ////////
        const log=JSON.parse(sessionStorage.getItem('person'));
        
        const infoCollect=(eve)=>{
          setMotivation((old)=>{
            return {
              ...old,
              dept_id:log.dept_id
            }
          })
          setMotivation((old)=>{
            return {
              ...old,
              name_of_the_faculty:log.faculty_name
            }
          })
          const{name,value}=eve.target
          setMotivation((old)=>{
              if(name==="emp_id"||name==="dept_id"||name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_student"||name==="paper_presentation_project_submission_other_contest"||name==="date"||name==="no_of_beneficiaries"||name==="certificate_pdf"){
                  return{
                      ...old,
                      [name]:value
                  }
              }
              else if(name==="s_no"){
                  // fillPorposals(value)
                  return{
                      ...old,
                      [name]:parseInt(value)
                  }
              }
              else{
                  return{
                      ...old,
                      [name]:parseInt(value),
                     
                  }
              }
          })   
         
      }
      const Submit=async()=>{
        try{
              
          // const log=JSON.parse(sessionStorage.getItem('person'));
          await axios.post(`http://localhost:1234/setaf/motivationnewrecord/${log.faculty_id}`,Motivation)
          navigate("/setaf/studentsmotivation")
          }
      catch(err){
            alert(err)
          }
          
      }
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);
     
      return(
          <>
          <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
          <div className="style" style={{justifyContent:"center",marginLeft:"100px"}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"70px"}}>STUDENTS MOTIVATION</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
    
              <label>Academic Year</label>
              <select name="academic_year" value={Motivation.academic_year} onChange={infoCollect}>
                <option value="">Select The Academic Year</option>
                {
                                  acd.map((val,key)=>{
                                      return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                  })
                              }          
              </select>
    
             
                <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={Motivation.semester}>
            <option >Select the Semester</option>
            {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

    
              <label>Name of the Student</label>
              <input type='text' placeholder='Enter the student name' name='name_of_the_student' onChange={infoCollect} value={Motivation.name_of_the_student}/>
    
              <label>Paper Presentation/Project Submission/Other Contest</label>
              <input type="text" placeholder="Enter the paper presentation/project submission/other contest" name='paper_presentation_project_submission_other_contest' onChange={infoCollect} value={Motivation.paper_presentation_project_submission_other_contest}/>
    
              <label>Date</label>
              <input type="date" placeholder="Enter the Date" name='date' onChange={infoCollect} value={Motivation.date_of_students_motivation}/>
    
              <label>No of Beneficiaries</label>
              <input type="text" placeholder="Enter the no of beneficiaries" name='no_of_beneficiaries' onChange={infoCollect} value={Motivation.no_of_beneficiaries}/>
    
                {file&&(<div>
                  <label>Certificate - PDF</label>
            <input type="file" onChange={handleFileChange1}  id="event" name="certificate_pdf" accept = "application/pdf"/>
            <button onClick={call}>Upload</button>
                </div>)}
           
             {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div>Loading...</div>
          </div>
        )}
              <br />
          </div>
          
          <div style={{marginRight:"100px"}} className='row mt-5 justify-content-around'>
            <input type='button' onClick={Submit} value="Submit"  className='col-3 btn btn-primary' />
            
            <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
          
          </div>  
          </div>
          </div>
          </div>
          </>
      )
    }
      
    
///////////////////////Professional////////////////////////////


export const Professionalfront=()=>{


  const logged = JSON.parse(sessionStorage.getItem("person"))
    const[Professional,setProfessional]=useState({
        "dept_id":`${logged.dept_id}`,
        "academic_year":"",
        "semester":"",
        "name_of_the_faculty":`${logged.faculty_name}`,
        "membership_id":"",
        "date_of_membership":"",
        "professional_society_membership":"",
        "membership_certificate_PDF":"",
        })


      useEffect(()=>{
        Acad()
      },[])

      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      
      console.log(Professional)
      const navigate = useNavigate()

     ////image and pdf upload 
const [selectedFile1, setSelectedFile1] = useState(null);
const[newFileName,setNewFileName]=useState('');
const handleFileChange1 = (e) => {

setNewFileName(Professional.membership_id);
 const file = e.target.files[0];
 if (file && file.size > 500 * 1024) {
 alert("Please choose an image with a size below 500kb.");
 e.target.value = null; // Reset the file input
 return;
 }
 else{
 
   // alert("handle upload working")
 const currentDate = new Date();
 const dd = String(currentDate.getDate()).padStart(2, '0');
 const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
 const yyyy = currentDate.getFullYear();
 
 const hh = String(currentDate.getHours()).padStart(2, '0');
 const min = String(currentDate.getMinutes()).padStart(2, '0');
 const ss = String(currentDate.getSeconds()).padStart(2, '0');
 
 const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
  // Maximum value for the random number
 let random =Math.random()*Math.random()*1;
 const name1=Professional.membership_id+'_professional_'+dateTimeString+'_'+random+'.pdf';

 setProfessional((old)=>{
 return{
 ...old,
 membership_certificate_PDF:name1
 }
 });
 
 }
 setSelectedFile1(e.target.files[0]);
 // call();
}


const call=async()=>{
if(selectedFile1){
// setLoading(true);
const formData6 = new FormData();
formData6.append('file', selectedFile1, Professional.membership_certificate_PDF);
fetch('http://localhost:1234/setaf/uploadPdf', {
method: 'POST',
body: formData6,
})
.then((response) => {
if (!response.ok) {
 // Check if the response status is 400
 if (response.status === 400) {
   // You can parse the response JSON to get more details about the error
   return response.json().then((errorData) => {
     throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
   });
 } else {
   // For other errors, throw a general error
   throw new Error(`HTTP error! Status: ${response.status}`);
 }
}
return response.text();
})
.then((data) => {
// alert(formData.pdf)
alert(data);
setFile(false)

})
.catch((error) => {
console.error('Error uploading the PDF:', error);
alert('Error uploading the PDF: ' + error.message);
});
// setLoading(false)
}
else{
alert("Error")
}
// window.location.reload(false);
}
const [loading, setLoading] = useState(false);
const [file, setFile] = useState(true);



    
 ////////
      const log=JSON.parse(sessionStorage.getItem('person'));
      
      const infoCollect=(eve)=>{
        setProfessional((old)=>{
          return {
            ...old,
            dept_id:log.dept_id
          }
        })
        setProfessional((old)=>{
          return {
            ...old,
            name_of_the_faculty:log.faculty_name
          }
        })
        const{name,value}=eve.target
        setProfessional((old)=>{
          if(name==="dept_id"||name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="membership_id"||name==="date_of_membership"||name==="professional_society_membership"||name==="membership_certificate_PDF"){
            return{ 
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value),
                   
                }
            }
        })  
       
    }
    const Submit=async()=>{
      try{
            
        // const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/professionalrecord/${log.faculty_id}`,Professional)
        navigate("/setaf/professionalpublication")
        }
    catch(err){
          alert(err)
        }
        
    }
  
    useEffect(()=>{
      Sems()
    },[])
    const [sem,setsem] = useState([])

    const Sems=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
      // console.log(temp.data.row)
      setsem(temp.data.row)
    }
   
    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:"center",marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginRight:"110px"}}>PROFESSIONAL SOCIETY MEMBERSHIP</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select name="academic_year" value={Professional.academic_year} onChange={infoCollect}>
              <option value="">Select The Academic Year</option>
              {
    // let t=0;
                                acd.map((val,key)=>{
                                    return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                })
                            }          
            </select>

            <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={Professional.semester}>
            <option >Select the Semester</option>
            {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>

            <label>Membership ID</label>
            <input type='text' placeholder='Membership id' name='membership_id' onChange={infoCollect} value={Professional.membership_id}/>

            {/* <label>Name of Journal</label>
            <input type="text" placeholder="Enter the Journal Name" name='name_of_journal' onChange={infoCollect} value={journal.name_of_journal}/>
 */}
            <label>Date of Membership</label>
            <input type="date" placeholder="Enter the Date" name='date_of_membership' onChange={infoCollect} value={Professional.date_of_membership}/>

            <label>Professional Society Membership</label>
            <select name='professional_society_membership' onChange={infoCollect} value={Professional.professional_society_membership}>
                <option value="">Select the society</option>
                <option>IEEE</option>
                <option>ISTE</option>
                <option>IE(I)</option>
                <option>IETE</option>
                <option>CSI</option>
                <option>SAE</option>
            </select>

              {file&&(<div>
                <label>Membership cerificate - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div style={{marginRight:"100px"}} className='row mt-5 justify-content-around'>
          <input type='button' onClick={Submit} value="Submit"  className='col-3 btn btn-primary' />
          
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div>  
        </div>
        </div>
        </div>
        </>
    )
}

////////////////////////fieldwork//////////////////////////


export const StudentFieldwork=()=>{
  const logged = JSON.parse(sessionStorage.getItem("person"))

    const [Fieldwork,setFieldwork]=useState({
      "emp_id":"",
      "dept_id":`${logged.dept_id}`,
      "academic_year":"",
      "semester":"",
      "name_of_the_faculty":`${logged.faculty_name}`,
      "nature_of_guidance":"",
      "duration_from":"",
      "duration_to":"",
      "number_of_students_undertaking_the_fieldwork_internship":"",
      "student_name":"",
      "certificate_report_pdf":""
      })

      
      useEffect(()=>{
        Acad()
      },[])

      const [acd,setAcd] = useState([])

      const Acad=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
        // console.log(temp.data.row)
        setAcd(temp.data.row)
      }
      
      console.log(Fieldwork)
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(Fieldwork.nature_of_guidance);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=Fieldwork.nature_of_guidance+'_fieldwork_'+dateTimeString+'_'+random+'.pdf';
       
        setFieldwork((old)=>{
        return{
        ...old,
        certificate_report_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


 const Upload=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, Fieldwork.certificate_report_pdf);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
  }
  else{
    alert("Error")
  }
}
    

  const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setFieldwork((old)=>{
          

            if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="nature_of_guidance"||name==="duration_from" ||name==="duration_to" ||name==="number_of_students_undertaking_the_fieldwork_internship" ||name==="student_name"||name==="certificate_report_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
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
       
useEffect(()=>{
  setFieldwork((prev)=>({
    ...prev,
    dept_id:`${logged.dept_id}`
  }))

  setFieldwork((prev)=>({
    ...prev,
    name_of_the_faculty:`${logged.faculty_name}`
  }))

  setFieldwork((prev)=>({
    ...prev,
    emp_id:`${logged.faculty_id}`
  }))
  
},[])
    
   
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(true);
  
  
      console.log(Fieldwork)
      
     
      const callPropose=async()=>{
        try{
        await axios.post(`http://localhost:1234/setaf/fieldwork/${logged.faculty_id}`,Fieldwork)
        navigate('/setaf/studentfieldwork')
        }
        catch(err){
          alert("Error in axios")
        }
        // setInformation(temp.message)
      }

        
      useEffect(()=>{
        Sems()
      },[])
      const [sem,setsem] = useState([])

      const Sems=async()=>{
        const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
        // console.log(temp.data.row)
        setsem(temp.data.row)
      }

    return(
      <>
       <div class="overallcontent"  style={{maxWidth:"50%",marginLeft:"25%"}} >
          <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"10px"}}>Student Fieldwork and Internship</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">

          <label>Academic Year</label>
              <select name="academic_year" value={Fieldwork.academic_year} onChange={infoCollect}>
                <option value="">Select The Academic Year</option>
                {
                                  acd.map((val,key)=>{
                                      return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                  })
                              }          
              </select>            
  
              <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={Fieldwork.semester}>
            <option >Select the Semester</option>
            {
                                sem.map((val,key)=>{
                                    return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                })
                            }  
            </select>
              </div>

  <div className="ej">
       <label >Nature of Guidance</label>
       <select name="nature_of_guidance" value={Fieldwork.nature_of_guidance} onChange={infoCollect}>
              <option>Select Guidance</option>
              <option>Field Work</option>
              <option>Internship</option>
              <option>Student Projects</option>
              <option>Research projects</option>
              </select>


       </div>   
  
       <div className="ej">
       <label >Duration From</label>
       <input  type="date" name="duration_from" placeholder="Duration_From" className="form-control" value={Fieldwork.duration_From} onChange={infoCollect}/>
       </div>
  
       <div className="ej">
       <label >Duration To</label>
       <input  type="date" name="duration_to" placeholder="Duration_To" className="form-control" value={Fieldwork.duration_To} onChange={infoCollect}/>
       </div>
       
       <div className="ej">
       <label >Number of students undertaking the Field Projects/Internships/Research Projects,etc..,</label>
       <input  type="text" name='number_of_students_undertaking_the_fieldwork_internship' value={Fieldwork.number_of_students_undertaking_the_fieldwork_internship} onChange={infoCollect}/>
       </div>

       <div className="ej">
       <label >Student Name</label>
       <input  type="text" name='student_name'  placeholder="Student name"alue={Fieldwork.student_Name} onChange={infoCollect}/>
       </div>

       {file&&(<div>
                <label>Certificate and photos uploaded - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={Upload}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
   </div>
      <h1 style={{color:'red',}}></h1>
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>   
      
   </div>

      </>
    )
  
  }
    

////////////////workshop///////////////////
export const FdpSdpFront=()=>{

  const logged = JSON.parse(sessionStorage.getItem("person"))
  console.log(logged)
    const [fdpsdp,setFdpSdp]=useState({
      "dept_id":`${logged.dept_id}`,
      "name_of_the_faculty": `${logged.faculty_name}`,
      "academic_year":"",
      "semester":"",
      "designation":"",
      "nature_of_the_program":"",
      "title_of_the_program":"",
      "duration_from":"",
      "duration_to":"",
      "participation":"",
      "name_of_the_organization_and_place":""	,
      "location_of_organization":"",
      "amount_provided_by_the_HEI":"",
      "certificates_pdf":""	
      
      })
   
  console.log(fdpsdp)
  const log=JSON.parse(sessionStorage.getItem('person'));
  const navi=useNavigate()
  
  const [newFileName, setNewFileName] = useState('');
        const [loading, setLoading] = useState(false);
        const [file, setFile] = useState(true);
  
         ////image and pdf upload 
         const [selectedFile1, setSelectedFile1] = useState(null);
      const handleFileChange1 = (e) => {
   
      setNewFileName(fdpsdp.title_of_the_program);
          const file = e.target.files[0];
          if (file && file.size > 500 * 1024) {
          alert("Please choose an image with a size below 500kb.");
          e.target.value = null; // Reset the file input
          return;
          }
          else{
          
            // alert("handle upload working")
          const currentDate = new Date();
         
          const dd = String(currentDate.getDate()).padStart(2, '0');
          const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
          const yyyy = currentDate.getFullYear();
          
          const hh = String(currentDate.getHours()).padStart(2, '0');
          const min = String(currentDate.getMinutes()).padStart(2, '0');
          const ss = String(currentDate.getSeconds()).padStart(2, '0');
          
          const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
           // Maximum value for the random number
          let random =Math.random()*Math.random()*1;
          const name1=fdpsdp.title_of_the_program+'_fdpsdp_'+dateTimeString+'_'+random+'.pdf';
         
          setFdpSdp((old)=>{
          return{
          ...old,
          certificates_pdf:name1
          }
          });
          
          }
          setSelectedFile1(e.target.files[0]);
  
          
          // call();
        }
  
  
  const call=async()=>{
    if(selectedFile1){
      // setLoading(true);
      const formData6 = new FormData();
    formData6.append('file', selectedFile1, fdpsdp.certificates_pdf);
    fetch('http://localhost:1234/setaf/uploadPdf', {
      method: 'POST',
      body: formData6,
    })
      .then((response) => {
        if (!response.ok) {
          // Check if the response status is 400
          if (response.status === 400) {
            // You can parse the response JSON to get more details about the error
            return response.json().then((errorData) => {
              throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
            });
          } else {
            // For other errors, throw a general error
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then((data) => {
        // alert(formData.pdf)
        alert(data);
        setFile(false)
        
      })
      .catch((error) => {
        console.error('Error uploading the PDF:', error);
        alert('Error uploading the PDF: ' + error.message);
      });
      // setLoading(false)
    }
    else{
      alert("Error")
    }
    // window.location.reload(false);
  }
  ///faculty name fetch
  
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
  const [selectedOptions, setSelectedOptions] = useState([]);  
  const[facid,setFacid]=useState([])
  const [option, setOptions] = useState([]);
  
  const options = option.map((val, key) => ({
    value: val.faculty_id+'-'+val.faculty_name,
    label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
  }));
  const handleFacchange=(eve)=>{
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
  
    setFdpSdp((old) => {
      return {
        ...old,
        name_of_the_faculty: updatedFacidString
      }
    })
  
  }
  const handlechange=(eve)=>{
    setFdpSdp((old)=>{
      return {
        ...old,
        dept_id:log.dept_id
      }
    })
    setFdpSdp((old)=>{
      return {
        ...old,
        name_of_the_faculty:logged.faculty_name
      }
    })
    const{name,value}=eve.target
    setFdpSdp((old)=>{
        if(name==="dept_id"||name==="name_of_the_faculty"||name==="academic_year"||name==="semester"||name==="designation"||name==="nature_of_the_program"||name==="title_of_the_program"||name==="duration_from"||name==="duration_to"||name==="participation"||name==="name_of_the_organization_and_place"||name==="location_of_organization"||name==="amount_provided_by_the_HEI"||name==="certificates_pdf"){
            return{
                ...old,
                [name]:value
            }
        }
        else if(name==="s_no"){
            // fillPorposals(value)
            return{
                ...old,
                [name]:parseInt(value)
            }
        }
        else{
            return{
                ...old,
                [name]:parseInt(value),
               
            }
        }
    })   
  
  }
  
      
    const handleclick=async(e)=>{
      e.preventDefault()
       try{
        //alert(fdpsdp)
        const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/fdpsdp/newrecord/${log.faculty_id}`,fdpsdp)
        navi('/fdpsdp')
      }
    
        catch(err){
        console.log(err)
      } 
  
    }
  
    ////academic year
    useEffect(()=>{
      Acad()
    },[])
    const [acd,setAcd] = useState([])
      
    const Acad=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getAcdyr`)
      // console.log(temp.data.row)
      setAcd(temp.data.row)
    }
  
    useEffect(()=>{
      Sems()
    },[])
    const [sem,setsem] = useState([])
  
    const Sems=async()=>{
      const temp = await axios.get(`http://localhost:1234/setaf/getsem`)
      // console.log(temp.data.row)
      setsem(temp.data.row)
    }
  
  
    return (
    <>
    <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
          <div className="style" style={{justifyContent:'center',marginLeft:"100px"}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"60px"}}>FDPs and SDPs CERTIFICATE</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
                
                    <label>Academic Year</label>
                     <select  value={setFdpSdp.academic_year} onChange={handlechange}  name='academic_year' >
                   <option value="">Select The Academic Year</option>
                {
                                  acd.map((val,key)=>{
                                      return (<option key={val.acd_yr_id}  value={val.acd_yr_id}>{val.acd_yr}</option>)
                                  })
                } 
              </select>
  
              <label>Semester</label>
              <select name='semester' onChange={handlechange} value={setFdpSdp.semester}>
                <option>Select the Semester</option>
              {
                                  sem.map((val,key)=>{
                                      return (<option key={val.sem_id}  value={val.sem_id}>{val.sem}</option>)
                                  })
                              }  
              </select>
                 
                    <label>Designation </label>
                    <input type='text' name='designation'  value={setFdpSdp.ndesignation} placeholder='Enter Designation'  onChange={handlechange}/>
                   
                 
                    <label> Nature of the program</label>
                    <select name="nature_of_the_program" onClick={handlechange} value={setFdpSdp.nature_of_the_program}>
                    <option>Select the Nature of the Program...</option>
                    <option >Workshop</option>
                    <option >Seminar</option>
                    <option>FDP</option>
                    <option>SDP</option>
                    <option>STTP</option>
                    <option>Webinar</option>
                    </select>
                 
          
                    <label> Title of the program</label>
                    <input type='text' name='title_of_the_program'  value={setFdpSdp.title_of_the_program} placeholder='Enter Title of the Program' onChange={handlechange}  />
                 
                 
                    <label> Duration From</label>
                    <input type='date' name='duration_from'  value={setFdpSdp.duration_from} placeholder='' onChange={handlechange}  />
  
  
                    <label> Duration TO</label>
                    <input type='date' name='duration_to'  value={setFdpSdp.duration_to} placeholder='' onChange={handlechange}  />
             
                  
                 
                    
                    <label>Participation</label>
                    <select name="participation" onClick={handlechange} value={setFdpSdp.participation}>
                    <option>Select the Participation type...</option>
                    <option >Internal</option>
                    <option >External</option>
                    </select>
                 
                    <label>Name of the organization and place</label>
                    <input type='text' name='name_of_the_organization_and_place' value={setFdpSdp.name_of_the_organization_and_place} placeholder='Enter name of the Organization and Place' onChange={handlechange}  />
           
                  
                 
                    <label>Location of organization</label>
                    <input type='text' name='location_of_organization' value={setFdpSdp.location_of_organization} placeholder='Enter the Location of organization' onChange={handlechange}  />
                   
                 
                  
                    <label>Amount provided by the HEI</label>
                    <input type='text' name='amount_provided_by_the_HEI' value={setFdpSdp.amount_provided_by_the_HEI} placeholder='Enter the Amount' onChange={handlechange}  />
  
  
                    {file&&(<div>
                  <label>Certificate PDF</label>
            <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
            <button onClick={call}>Upload</button>
                </div>)}
           
             {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div>Loading...</div>
          </div>
        )}
              <br />
                    </div>
          
          <div style={{marginRight:"100px"}}  className='row mt-5 justify-content-around'>
            <input type='button' onClick={handleclick} value="Submit" className='col-3 btn btn-primary' />
            <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
          
          </div> 
          </div>
          </div>
          </div>
  
    
    </>
  
    )
  }
  