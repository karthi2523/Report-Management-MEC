// import './style.css';
// import '../sty.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { onTable } from "../connect"
import dateFormat, { masks } from "dateformat";

const Iv=()=>{

    

    useEffect(()=>{
        fetchIvReports()
    },[])

    const [ivRecords,setIvRecords]=useState([])

    const fetchIvReports=async()=>{
        const res=await axios.get(`http://localhost:1234/iv/fetchIv`)
        // alert(JSON.stringify(res.data))
        if(res.data.error){
            console.log("No records")
        }
        else{
            console.log("iv data", res.data.records);
            const iv = res.data.records;
            for(let i of iv)
            {
                console.log("iv for", dateFormat(i.date_of_visit_from, "dd.mmm.yyyy"));

            }

            setIvRecords(res.data.records)
        }
    }


    const [id, setId] = useState('');

    const viewPdf=async(report_id)=>{
     const report=JSON.parse(sessionStorage.getItem("report_id"))
     setId(report.report_id)
     // alert("view Working")
    //  handleDownload();
     
 }
 const [id1, setId1] = useState('');
 const viewPdf1=async(report_id)=>{
   const report=JSON.parse(sessionStorage.getItem("report_id"))
   setId1(report.report_id)
   // alert("view Working")
//    handleDownload1();
   
 }

    const accept=async(report_id,table)=>{
        const temp=await onTable(report_id,table)
    if(temp.report_id){
        sessionStorage.setItem("report_id",JSON.stringify(temp))
        
    }

    }
    const pdfAccept=async(report_id,table)=>{
        const temp=await onTable(report_id,table)
    if(temp.report_id){
        sessionStorage.setItem("report_id",JSON.stringify(temp))
        
    }
    viewPdf(temp.report_id);

    }

    const ecr=async(report_id,table)=>{
        const temp=await onTable(report_id,table)
    if(temp.report_id){
        sessionStorage.setItem("report_id",JSON.stringify(temp))
        
    }
    viewPdf1(temp.report_id);

    } 

    return(
        <>
            <div class="overallcontent">
            <div class="report-header">
            <h1 class="recent-Articles">Your Reports</h1>
            <a href="/ivproposal">
            <button class="menu-buttons" data-category="iv_proposal">+ADD</button>
            </a>

            <a href="/ivinput">
            <button class="menu-buttons" data-category="iv_report">Create </button></a>

            </div>
            <table className='table table-striped '>
            <thead>
            <tr>
                <th>ID</th>
                <th>Date of visit</th>
                <th>Industry</th>
                <th>Year/Sem</th>
                <th>Co-ordinator</th>
                <th></th>
                <th>Proposal</th>
                <th></th>
                <th></th>
                <th>Completion</th>
                <th></th>
                <th>Details</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Submitted on</th>
                <th>HoD</th>
                <th>Principal</th>
                <th>Submitted on</th>
                <th>HoD</th>
                <th>Principal</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {
                    (ivRecords?.length||0!=0)?
                    ivRecords.map((data)=>(
                        <tr>
                            <td>{data.report_id}</td>
                            <td>{dateFormat(data.date_of_visit_from, "dd-mm-yyyy")}</td>
                            <td>{data.details_of_the_industry_1}</td>
                            <td>{`${data.year_of_students_visited}/${data.sem_of_students_visited}`}</td>
                            <td>{data.event_coordinator}</td>
                            <td>{data.proposal_date}</td>
                            {(data.report_proposal_status===0) ?
                                <>
               
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        {/* <td></td> */}
                                        <td></td>
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(data.workshop_id+" "+data.dept_id)
                                                        pdfAccept(data.report_id,data.event_name);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===1 && data.report_completion_status===0 ) ? 
                                        <>
                                        
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>🕒Pending</td>
                                        <td></td>

                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(data.workshop_id+" "+data.dept_id)
                                                        pdfAccept(data.report_id,data.event_name);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===2 && data.report_completion_status===0 ) ?
                                        <>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><a className="topic-heading" href="/ecrInput"><button
  style={{
    backgroundColor: ' #00997a', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        accept(data.report_id,data.event_name);
                                                    }} >Create ECR</button></a></td>
                                        </>
                                        :
                                        (data.report_proposal_status===-1) ?
                                        <>
                                           <td><h3 style={{color:'red'}}>Rejected</h3></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>

                                        </>
                                        :
                                        (data.report_completion_status===1)?

                                        <>
                                          <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>🕒Pending</td>
                                        <td><button
  style={{
    backgroundColor: ' #f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecr(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                       
                                        :
                                        (data.report_completion_status===2)?

                                        <>
                                          <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><button
  style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecr(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                        :
                                        <></>
                                                }
                        </tr>
                    )):
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>No records</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                }
            </tbody>
            </table>
        </div>

        </>
    )
}

export default Iv