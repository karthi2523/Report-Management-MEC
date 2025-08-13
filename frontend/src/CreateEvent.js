import {Major, SubReport, Table,onTable} from './connect';
import React,{ useState,useEffect,CSSProperties, FunctionComponent } from 'react'; 
import "./sty.css"
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist/webpack';
import jsPDF from 'jspdf';
import Image from './logo.png';
import Image2 from './logo2.png';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';
import './facultyEcrFilter.css';
import Select from 'react-select';
import { callAddFont } from "./calibri-regular-normal";
import { callAddBoldFont } from "./calibri-bold-normal";
import { CSSObject } from '@emotion/serialize';
// import { colourOptions } from '../data';
// import { ColourOption, colourOptions } from './data';


//import Img6001 from'./6001.jpeg';
const CustomClearText = () => <>X</>;

const ClearIndicator = (props) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'blue' : 'black',
});


export const CreateEvent=()=>{
///______________________
const [ecr, setEcr] = useState([]);


//////

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  // Add more options as needed
];

/////////////////////

const [currentPage, setCurrentPage] = useState(1);
const [currentRecords, setCurrentRecords] = useState([]);
const [totalPages, setTotalPages] = useState(1);
  useEffect(()=>{
    try{
    doSomething();
    sessionStorage.removeItem("report_id")
    Maj()
    Acad()
    GetCurrAcd()
    
       
    fetchData(currentPage);
    }
    catch(e){
      console.log(e)
    }
 
},[currentPage])
const fetchData = async (page) => {
  try {
    const logged = JSON.parse(sessionStorage.getItem("person"));
    const empId = logged.faculty_id;
    
    // Fetch data from backend API
    const response = await axios.get(`http://localhost:1234/seminar/dept/${empId}?page=${page}`);

   
    if (response.status === 200) {
    
      setCurrentRecords(response.data.recordsArr);
      
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } else {
      console.log('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const logged=sessionStorage.getItem("person")
const loggedUser = JSON.parse(logged)

const[allvalues,setAllvalues]=useState([]);

    const doSomething = async() =>{
        const res=await Table(`${loggedUser.faculty_id}`)
        // alert(JSON.stringify(res.data.recordsArr))
            setAllvalues(res.data.recordsArr)
        }
        // console.log(allvalues)

const GetCurrAcd=async()=>{
    const t = await axios.get("http://localhost:1234/ecrFilter/getAcdYrList")
    // alert(JSON.stringify(t.data.result))
    const temp=t.data.result
    let valueYr=0
    temp.map(item=>{
        // console.log(item.acd_status)
        if(item.acd_status==1){
            valueYr = JSON.stringify(item.acd_yr_id)
            setFilter(old=>{
                return{
                    ...old,
                    "acdyr_id":valueYr
                }
            })
        }
    })
}
const[selectedAcd,setSelectedAcd]=useState([])
const[selectedSem,setSelectedSem]=useState([])
const[selectedMajor,setSelectedMajor]=useState([])
const[selectedSub,setSelectedSub]=useState([])

const [selectedFile, setSelectedFile] = useState(null);

const [ecr1, setEcr1] = useState([]); 
const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
      fetchData(currentPage); // Increment currentPage by 1
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage(currentPage - 1);
      fetchData(currentPage); // Decrement currentPage by 1
    }
  };

  const[filter,setFilter]=useState({
    "acdyr_id":"",
    "sem_id":"",
    "major_id":"",
    "sub_id":"",
    "dept_id":`${loggedUser.dept_id}`,
    "emp_id":`${loggedUser.faculty_id}`
    // "dept_id":null,
    // "emp_id":null
})
// console.log(filter)
const onClickFilter=async()=>{
    // alert("clicked")
    // alert(JSON.stringify(filter))
    try{
        const filteredRecords=await axios.post("http://localhost:1234/cfilter/filterReportsWithParticular/1001",filter)
        setCurrentRecords(filteredRecords.data.resultArray)

    }
    catch(err){
        alert("No Reports in the selected filter")
        console.log(err)
    }
}
function test(n) {
    if (n < 0)
      return false;
    let single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    let double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    let below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    if (n === 0) return 'Zero'
    function translate(n) {
        let word = ""
        if (n < 10) {
            word = single_digit[n] + ' '
        }
        else if (n < 20) {
            word = double_digit[n - 10] + ' '
        }
        else if (n < 100) {
            let rem = translate(n % 10)
            word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
        }
        else if (n < 1000) {
            word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
        }
        else if (n < 100000) {
            word = translate(Math.trunc(n / 1000)) + ' Thousand ' + translate(n % 1000)
        }
        else if (n < 10000000) {
            word = translate(Math.trunc(n / 100000)) + ' Lakh ' + translate(n % 100000)
        }
        else {
            word = translate(Math.trunc(n / 10000000)) + ' Crore ' + translate(n % 10000000)
        }
        return word
    }
    let result = translate(n)
    return result.trim()+''
}


const[major,setMajor]=useState([])
const Maj=async()=>{
    const t = await Major()
    // alert(JSON.stringify(t))
    setMajor(t)
    // alert(JSON.stringify(major))

}
const majors=major.map((val)=>({
    value: val.major_report_id,
    label: val.major_report,
    extraInfo: "major_id"
}))
// alert("HIII"+JSON.stringify(majors))

// console.log(majors)

const[sub,setSub]=useState([])
let [subs,setSubs]=useState([])

    const Sub=async(mid)=>{
        const t = await SubReport(mid)
        // alert(t)
        // alert(JSON.stringify(t))
        setSub(t)
    }
    subs=sub.map((val)=>({
        value: val.table_name,
        label: val.sub_report,
        extraInfo: "sub_id"
    }))

    const[year,setYear]=useState([])
    const Acad=async()=>{
        const t = await axios.get("http://localhost:1234/ecrFilter/getAcdYrList")
        // alert(JSON.stringify(t.data.result))
        setYear(t.data.result)
    }
    const years = year.map((val) => ({
        value: val.acd_yr_id,
        label: val.acd_yr,
        extraInfo: "acdyr_id"
        }));
    // console.log(years)
    // alert(JSON.stringify(years))

    const semester = [
        {sem_id:1,sem:"Odd"},
        {sem_id:2,sem:"Even"},
        {sem_id:3,sem:"Both"},
    ]
    let sems = semester.map((val)=>({
        value: val.sem_id,
        label: val.sem,
        extraInfo: "sem_id"
    }))
let [majorVals,setMajorVals]=useState("")
let [AcdVals,setAcdVals]=useState("")
let [subVals,setSubVals]=useState("")

const acdInfoCollect=(eve)=>{
  if(eve.length==0){
    setFilter((old)=>({
      ...old,
      acdyr_id:""
  }))
  }else{

    const label = eve.label
    const value = eve.value
    const extraInfo = eve.extraInfo

    let isArray = Array.isArray(eve);
    // alert(JSON.stringify(eve))
    if(eve.length==1){
        if(eve[0].extraInfo=="major_id"){
            // alert(eve[0].value)
            Sub(eve[0].value)
        }
        if(typeof eve[0].value === 'string'){
            setFilter((old)=>({
                ...old,
                [eve[0].extraInfo]:eve[0].value
            }))
        }else{
        setFilter((old)=>({
            ...old,
            [eve[0].extraInfo]:JSON.stringify(eve[0].value)
        }))}
    }
    if(isArray){
        // if(eve.length==1){
        //     if(eve[0].extraInfo=="major_id"){
        //         Sub(eve[0].value)
        //     }
        //     setFilter((old)=>({
        //         ...old,
        //         [eve[0].extraInfo]:eve[0].value
        //     }))
        // }
        if(eve.length!=1){
        if(eve[0].extraInfo=="major_id"){
            Sub(0)
            for(let i=0;i<eve.length;i++){
                majorVals+=eve[i].value
                if(i!=eve.length-1){
                    majorVals+=","
                }
                setFilter((old)=>({
                    ...old,
                    [eve[i].extraInfo]:majorVals,
                    sub_id:""
                }))
            }
            // alert(majorVals)
        
    }
    if(eve[0].extraInfo=="acdyr_id"){
        
            // alert(JSON.stringify(eve))
            for(let i=0;i<eve.length;i++){
                // alert(JSON.stringify(eve[i].value))
                AcdVals+=eve[i].value
                if(i!=eve.length-1){
                    AcdVals+=","
                }
                setFilter((old)=>({
                    ...old,
                    [eve[i].extraInfo]:AcdVals
                }))
            }
            // alert(majorVals)
        
    }
    if(eve[0].extraInfo=="sub_id"){
        
        // alert(JSON.stringify(eve))
        for(let i=0;i<eve.length;i++){
            // alert(JSON.stringify(eve[i].value))
            subVals+=eve[i].value
            if(i!=eve.length-1){
                subVals+=","
            }
            setFilter((old)=>({
                ...old,
                [eve[i].extraInfo]:subVals
            }))
        }
        // alert(majorVals)
    
}
    }
    }
    else if(extraInfo=="sem_id"){
        setSelectedSem(value)
        // handleChange(value)
        setFilter((old)=>({
            ...old,
            [extraInfo]:JSON.stringify(value)
        }))
    }
    else if(extraInfo=="sub_id"){
        setSelectedSub(value)
        // handleChange(value)
        setFilter((old)=>({
            ...old,
            [extraInfo]:value
        }))
    }
}
}
const semInfoCollect=(eve)=>{
  if(eve.length==0){
    setFilter((old)=>({
      ...old,
      sem_id:""
  }))
  }else{

  const label = eve.label
  const value = eve.value
  const extraInfo = eve.extraInfo

  let isArray = Array.isArray(eve);
  // alert(JSON.stringify(eve))
  if(eve.length==1){
      if(eve[0].extraInfo=="major_id"){
          // alert(eve[0].value)
          Sub(eve[0].value)
      }
      if(typeof eve[0].value === 'string'){
          setFilter((old)=>({
              ...old,
              [eve[0].extraInfo]:eve[0].value
          }))
      }else{
      setFilter((old)=>({
          ...old,
          [eve[0].extraInfo]:JSON.stringify(eve[0].value)
      }))}
  }
  if(isArray){
      // if(eve.length==1){
      //     if(eve[0].extraInfo=="major_id"){
      //         Sub(eve[0].value)
      //     }
      //     setFilter((old)=>({
      //         ...old,
      //         [eve[0].extraInfo]:eve[0].value
      //     }))
      // }
      if(eve.length!=1){
      if(eve[0].extraInfo=="major_id"){
          Sub(0)
          for(let i=0;i<eve.length;i++){
              majorVals+=eve[i].value
              if(i!=eve.length-1){
                  majorVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:majorVals,
                  sub_id:""
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="acdyr_id"){
      
          // alert(JSON.stringify(eve))
          for(let i=0;i<eve.length;i++){
              // alert(JSON.stringify(eve[i].value))
              AcdVals+=eve[i].value
              if(i!=eve.length-1){
                  AcdVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:AcdVals
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="sub_id"){
      
      // alert(JSON.stringify(eve))
      for(let i=0;i<eve.length;i++){
          // alert(JSON.stringify(eve[i].value))
          subVals+=eve[i].value
          if(i!=eve.length-1){
              subVals+=","
          }
          setFilter((old)=>({
              ...old,
              [eve[i].extraInfo]:subVals
          }))
      }
      // alert(majorVals)
  
}
  }
  }
  else if(extraInfo=="sem_id"){
      setSelectedSem(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:JSON.stringify(value)
      }))
  }
  else if(extraInfo=="sub_id"){
      setSelectedSub(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:value
      }))
  }
}}

const majorInfoCollect=(eve)=>{
  if(eve.length==0){
    setFilter((old)=>({
      ...old,
      major_id:""
  }))
  }else{

  const label = eve.label
  const value = eve.value
  const extraInfo = eve.extraInfo

  let isArray = Array.isArray(eve);
  // alert(JSON.stringify(eve))
  if(eve.length==1){
      if(eve[0].extraInfo=="major_id"){
          // alert(eve[0].value)
          Sub(eve[0].value)
      }
      if(typeof eve[0].value === 'string'){
          setFilter((old)=>({
              ...old,
              [eve[0].extraInfo]:eve[0].value
          }))
      }else{
      setFilter((old)=>({
          ...old,
          [eve[0].extraInfo]:JSON.stringify(eve[0].value)
      }))}
  }
  if(isArray){
      // if(eve.length==1){
      //     if(eve[0].extraInfo=="major_id"){
      //         Sub(eve[0].value)
      //     }
      //     setFilter((old)=>({
      //         ...old,
      //         [eve[0].extraInfo]:eve[0].value
      //     }))
      // }
      if(eve.length!=1){
      if(eve[0].extraInfo=="major_id"){
          Sub(0)
          for(let i=0;i<eve.length;i++){
              majorVals+=eve[i].value
              if(i!=eve.length-1){
                  majorVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:majorVals,
                  sub_id:""
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="acdyr_id"){
      
          // alert(JSON.stringify(eve))
          for(let i=0;i<eve.length;i++){
              // alert(JSON.stringify(eve[i].value))
              AcdVals+=eve[i].value
              if(i!=eve.length-1){
                  AcdVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:AcdVals
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="sub_id"){
      
      // alert(JSON.stringify(eve))
      for(let i=0;i<eve.length;i++){
          // alert(JSON.stringify(eve[i].value))
          subVals+=eve[i].value
          if(i!=eve.length-1){
              subVals+=","
          }
          setFilter((old)=>({
              ...old,
              [eve[i].extraInfo]:subVals
          }))
      }
      // alert(majorVals)
  
}
  }
  }
  else if(extraInfo=="sem_id"){
      setSelectedSem(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:JSON.stringify(value)
      }))
  }
  else if(extraInfo=="sub_id"){
      setSelectedSub(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:value
      }))
  }
}}

const subInfoCollect=(eve)=>{
  if(eve.length==0){
    setFilter((old)=>({
      ...old,
      sub_id:""
  }))
  }else{

  const label = eve.label
  const value = eve.value
  const extraInfo = eve.extraInfo

  let isArray = Array.isArray(eve);
  // alert(JSON.stringify(eve))
  if(eve.length==1){
      if(eve[0].extraInfo=="major_id"){
          // alert(eve[0].value)
          Sub(eve[0].value)
      }
      if(typeof eve[0].value === 'string'){
          setFilter((old)=>({
              ...old,
              [eve[0].extraInfo]:eve[0].value
          }))
      }else{
      setFilter((old)=>({
          ...old,
          [eve[0].extraInfo]:JSON.stringify(eve[0].value)
      }))}
  }
  if(isArray){
      // if(eve.length==1){
      //     if(eve[0].extraInfo=="major_id"){
      //         Sub(eve[0].value)
      //     }
      //     setFilter((old)=>({
      //         ...old,
      //         [eve[0].extraInfo]:eve[0].value
      //     }))
      // }
      if(eve.length!=1){
      if(eve[0].extraInfo=="major_id"){
          Sub(0)
          for(let i=0;i<eve.length;i++){
              majorVals+=eve[i].value
              if(i!=eve.length-1){
                  majorVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:majorVals,
                  sub_id:""
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="acdyr_id"){
      
          // alert(JSON.stringify(eve))
          for(let i=0;i<eve.length;i++){
              // alert(JSON.stringify(eve[i].value))
              AcdVals+=eve[i].value
              if(i!=eve.length-1){
                  AcdVals+=","
              }
              setFilter((old)=>({
                  ...old,
                  [eve[i].extraInfo]:AcdVals
              }))
          }
          // alert(majorVals)
      
  }
  if(eve[0].extraInfo=="sub_id"){
      
      // alert(JSON.stringify(eve))
      for(let i=0;i<eve.length;i++){
          // alert(JSON.stringify(eve[i].value))
          subVals+=eve[i].value
          if(i!=eve.length-1){
              subVals+=","
          }
          setFilter((old)=>({
              ...old,
              [eve[i].extraInfo]:subVals
          }))
      }
      // alert(majorVals)
  
}
  }
  }
  else if(extraInfo=="sem_id"){
      setSelectedSem(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:JSON.stringify(value)
      }))
  }
  else if(extraInfo=="sub_id"){
      setSelectedSub(value)
      // handleChange(value)
      setFilter((old)=>({
          ...old,
          [extraInfo]:value
      }))
  }
}}

console.log(filter)

// ---------------------------------------------------


    const [id, setId] = useState('');

   const viewPdf=async(report_id)=>{
    const report=JSON.parse(sessionStorage.getItem("report_id"))
    setId(report.report_id)
    // alert("view Working")
    handleDownload(report.event_name);
    
}
const [id1, setId1] = useState('');
const viewPdf1=async(report_id)=>{
  const report=JSON.parse(sessionStorage.getItem("report_id"))
  setId1(report.report_id)
  // alert("view Working")
  handleDownload1(report.event_name);
  
}

   

  const handleDownload = async (table) => {
    try {
      const res = await axios.get(`http://localhost:1234/seminar/data/${id}/${table}`);
      // console.log("hai");
      const data = res.data;
      //var sign = 'D:\\React\\Muthayammal\\MuthayammalAutomation\\MineEcrWorkshopModules\\react-seminar-client\\src\\'+`${data.lvl_1_proposal_sign}`+'.jpeg';
   

      // alert(sign);
      
      const newPdf = new jsPDF();
       
      jsPDF.API.events.push(["addFonts", callAddFont]);
      jsPDF.API.events.push(["addFonts", callAddBoldFont]);
      const centerTextInsideBox = (newPdf,word,rectxaxis,rectyaxis)=>{
        const text = word;
      var textwidth = newPdf.getTextDimensions(text).w;
      var textheight = newPdf.getTextDimensions(text).h;
      var rectWidth = textwidth + 5; // Adding some padding for better visibility
      var rectHeight = textheight + 5;
      var rectX = rectxaxis;
      var rectY = rectyaxis;
      newPdf.rect(rectX, rectY, rectWidth, rectHeight);
      newPdf.text(word, rectX + rectWidth / 2, rectY + rectHeight / 2, { align: "center", baseline: "middle" });
      }
      
   
     
      newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
      newPdf.addImage(Image2, 'PNG', 12,25, 17, 10);
      newPdf.addImage(Image3, 'JPG', 175, 5, 22, 12);
      newPdf.addImage(Image4, 'JPG', 175, 20, 20, 14);
  
      const hod = `/Project_Images/${data.lvl_1_proposal_sign}.jpg`;
      const princi = `/Project_Images/${data.lvl_2_proposal_sign}.jpg`;
    
      newPdf.setFontSize(20);
      newPdf.setFont("calibri-bold", "normal");
      newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
      newPdf.setFontSize(10);
      newPdf.setFont("calibri-regular", "normal");
      newPdf.text('(An Autonomous Institution)', 85, 20);
      newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
      newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);
      
    
    
    newPdf.setFontSize(12);
    newPdf.setFont("calibri-bold", "normal");
    // newPdf.rect(10, 40, 20, 7);
    // newPdf.text(`${data.event_organizer}`, 15, 45);///Department
    centerTextInsideBox(newPdf,`${data.event_organizer}`,10,40);
    newPdf.rect(80, 40, 50, 7);
    newPdf.text('EVENT PROPOSAL', 90, 45);
    newPdf.rect(180, 40, 20, 10).stroke();
    newPdf.text(`${data.acd_yr}`, 183, 46);
    // centerTextInsideBox(newPdf,`${data.acd_yr}`,170,40);
    
    
    
    newPdf.setFont("calibri-regular","normal")
    newPdf.rect(10, 55, 10, 20).stroke();
    newPdf.text('1.', 12, 65);
    newPdf.rect(20, 55, 90, 20).stroke();
    newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 61);
    newPdf.rect(110, 55, 90, 20).stroke();
    newPdf.text(`${data.sub_report}`, 113, 66);//Nature of the Event
    
    
    newPdf.rect(10, 75, 10, 10).stroke();
    newPdf.text('2.', 12, 81);
    newPdf.rect(20, 75, 90, 10).stroke();
    newPdf.text('Title of the event',22, 81);
    newPdf.rect(110, 75, 90, 10).stroke();
    const event_title = `${data.event_title}`; 
    if(event_title.length <=60)
    {
      newPdf.text(event_title, 113, 81);
    }
    else{
    newPdf.setFontSize(10);
    const title = newPdf.splitTextToSize(event_title, 80);
    newPdf.text(title, 113, 74);///Title of the Event
    }
    
    
    
    
    newPdf.setFontSize(12);
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
    newPdf.text('7.', 12, 149);
    newPdf.rect(20, 125, 90, 50).stroke();
    newPdf.text('Details of the Guest',22, 149);
    
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
    newPdf.rect(133, 145,67, 10).stroke();
    
    const address1 = `${data.guest_address}`;
    if(address1.length >=30)
    {
    //////////////////////////////////text//////////////////////////////
    const x = 133;
    let y = 170;
    const address1 = `${data.guest_address}`;
    const contentWidth = newPdf.getStringUnitWidth(address1) * 12; // Initial font size: 12
    const contentHeight = newPdf.getTextDimensions(address1, { fontSize: 10}).h;
    
    // Determine font size to fit within specified dimensions
    const maxWidth = 100; // Adjust based on your requirements
    const maxHeight = 100; // Adjust based on your requirements
    const fontSize = Math.min(10, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
     // Adjust the width as needed
    // Set font size and add text to the PDF
    newPdf.setFontSize(fontSize);
    
    console.log(contentHeight);
    
    const textLines = newPdf.splitTextToSize(address1, 60);
    newPdf.rect(x , y , maxWidth-33  , maxHeight - 90);
    newPdf.text(x+2, y+4, textLines);
    }
    else{
      newPdf.setFontSize(12);
      newPdf.text(`${data.guest_address}`, 135, 151);
    }
    
    
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
    newPdf.setFontSize(10);
    newPdf.rect(110, 175, 23, 10).stroke();
    newPdf.text('MEC Students', 110.7, 182);
    newPdf.rect(133, 175,67, 10).stroke();
    newPdf.text(`${data.student_count}`, 135, 181);//Count of the Student
    
    newPdf.rect(110, 185, 23, 10).stroke();
    newPdf.text('MEC Faculty', 110.7, 192);
    newPdf.rect(133, 185,67, 10).stroke();
    newPdf.text(`${data.faculty_count}`, 135, 191);//COunt of the Faculty
    
    newPdf.rect(110, 195, 23, 10).stroke();
    newPdf.text('Others', 110.7, 201);
    newPdf.rect(133, 195,67, 10).stroke();
    newPdf.text(`${data.others_count}`, 135, 201);//Count of Others
    newPdf.setFontSize(12);
    newPdf.rect(10, 205, 10, 10).stroke();
    newPdf.text('9.', 12, 211);
    newPdf.rect(20, 205, 90, 10).stroke();
    newPdf.text('Proposed Budget',22, 211);
    newPdf.rect(110, 205, 90, 10).stroke();
    newPdf.text(`\u20B9  ${data.event_budget}`, 113, 211);//Event Budget
    
    
    
    newPdf.rect(10, 215, 10, 10).stroke();
    newPdf.text('10.', 12, 220);
    newPdf.rect(20, 215, 180, 10).stroke();
    newPdf.text('Co-ordinator of the Event',22, 220);
    
    newPdf.rect(10, 225, 80, 5).stroke();
    newPdf.text('Name', 38, 229);
    
    newPdf.rect(90, 225, 60, 5).stroke();
    newPdf.text('Designation', 108, 229);
    
    newPdf.rect(150, 225, 50, 5).stroke();
    newPdf.text('Phone Number', 163, 229);
    
    newPdf.rect(10, 230, 80, 10).stroke();
    newPdf.text('R. Vijay', 14, 236);//Name of coordinator
    
    newPdf.rect(90, 230, 60, 10).stroke();
    newPdf.text('Assistant Professor', 95, 236);//Designation of coordinator
    
    newPdf.rect(150, 230, 50, 10).stroke();
    newPdf.text('9568475213', 165, 236);//Phone Number of coordinator
    
    newPdf.rect(10, 240, 80, 10).stroke();
    newPdf.text('Lalitha', 14, 246);//Name of coordinator
    
    newPdf.rect(90, 240, 60, 10).stroke();
    newPdf.text('Assistant Professor', 95, 246);//Designation of coordinator
    
    newPdf.rect(150, 240, 50, 10).stroke();
    newPdf.text('8547569125', 165, 246);//Phone Number of coordinator
    
    newPdf.rect(10, 250, 80, 10).stroke();
    newPdf.text('', 14, 256);//Name of coordinator
    
    newPdf.rect(90, 250, 60, 10).stroke();
    newPdf.text('', 95, 256);//Designation of coordinator
    
    newPdf.rect(150, 250, 50, 10).stroke();
    newPdf.text('', 165, 256);//Phone Number of coordinator
    
    try{
    
    
    newPdf.addImage(princi, 'JPEG', 150, 277, 25, 10);
  
    newPdf.addImage(hod, 'JPEG', 15, 275, 15, 10);
 
  }
  catch(e){
    console.log(e);
  }
    
    newPdf.setFont("calibri-bold","normal");
    
    newPdf.text('HoD', 15, 290);
    
    newPdf.text('Principal', 155, 290);

  
      // newPdf.addPage();
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



      // conts[getname(variable),setname(FUNCTION)]=useState(initialized)
      

        // const onClicked=async(report)=>{
            
        //     const temp=await onTable(report)
        //     sessionStorage.setItem("report_id",JSON.stringify(temp))
        //     // window.location.assign("/ecr")
        // }
        const accept=async(report_id,table)=>{
            const temp=await onTable(report_id,table)

        if(temp.report_id){
            // alert(temp.report_id)
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
      //   const ecr=async(report_id,table)=>{
      //     const temp=await onTable(report_id,table)
      // if(temp.report_id){
      //     sessionStorage.setItem("report_id",JSON.stringify(temp))
          
      //     setId1(temp.report_id)
      //   //   alert(temp.report_id)
          
      // }
      // viewPdf1(temp.report_id);

      // } 
      
      

      const handleDownload1= async (table) => {
        try {
          const doc = new jsPDF();
          const generateCenteredText = (doc,text,fontsize,y,font,style,color)=>{
            doc.setFontSize(fontsize);
            const textwidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize())/2.83465;
            const textcenter = (doc.internal.pageSize.width-textwidth)/2;
            doc.setFont(font,style);
            doc.setTextColor(color[0],color[1],color[2]);
            doc.text(text,textcenter,y);
          }

          const centerTextInsideBox = (newPdf,word,rectxaxis,rectyaxis)=>{
                const text = word;
            var textwidth = newPdf.getTextDimensions(text).w;
            var textheight = newPdf.getTextDimensions(text).h;
            var rectWidth = textwidth + 5; // Adding some padding for better visibility
            var rectHeight = textheight + 5;
            var rectX = rectxaxis;
            var rectY = rectyaxis;
            newPdf.rect(rectX, rectY, rectWidth, rectHeight);
            newPdf.text(word, rectX + rectWidth / 2, rectY + rectHeight / 2, { align: "center", baseline: "middle" });
          }
          
        
          const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
          };
          
          const res = await axios.get(`http://localhost:1234/seminar/data/${id1}/${table}`);
          // console.log("hai");
          const data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key) && (data[key] === null || data[key] === undefined || data[key] === '' )) {
              // Set the value to 0 if it's null, empty, or NaN
              data[key] = 0;
            }
          }
        //   var atten = `/Project_images/attendence.jpg`;
          const picture1 = `/Project_Images/${data.event_photo_1}.jpg`;
          const picture2 = `/Project_Images/${data.event_photo_2_id}.jpg`;
          const coordi = `/Project_Images/${data.coordinator_emp_id}.jpg`;
          const hod = `/Project_Images/${data.lvl_1_proposal_sign}.jpg`;
          const princi = `/Project_Images/${data.lvl_2_proposal_sign}.jpg`;
       
      
     
          const newPdf = new jsPDF();
         
          const POs = `${data.event_po}`;//
        //   console.log(data.event_po);
          let arr=POs.split(",");
        
           arr=arr.sort();
        //    alert(arr[1]);
           let pdfDocument;

           try{
            const pdfUrl = `/Pdf/${data.pdf}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument1;
           
           try{
            const pdfUrl = `/requestMail/${data.reqMail}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument1 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument2;
           
           try{
            const pdfUrl = `/acceptMail/${data.accMail}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument2 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument3;
           
           try{
            const pdfUrl = `/resPerson/${data.resPerson}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument3 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument4;
           
           try{
            const pdfUrl = `/partiFeedback/${data.particiFeedback}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument4 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument5;
           
           try{
            const pdfUrl = `/resProfile/${data.resProfile}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument5 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

           let pdfDocument6;
           
           try{
            const pdfUrl = `/ppt/${data.ppt}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument6 = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }

        
          jsPDF.API.events.push(["addFonts", callAddFont]);
          jsPDF.API.events.push(["addFonts", callAddBoldFont]);
          newPdf.setFont("calibri-regular","normal");
               
    ////////////////////////////////////////////////////////    
    newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
newPdf.addImage(Image2, 'PNG', 12,25, 17, 10);
newPdf.addImage(Image3, 'JPG', 175, 5, 22, 12);
newPdf.addImage(Image4, 'JPG', 175, 20, 20, 14);
newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);
newPdf.setFontSize(12);
newPdf.setFont("calibri-bold", "normal");
centerTextInsideBox(newPdf,`${data.event_organizer}`,10,40);
centerTextInsideBox(newPdf,'EVENT COMPLETION REPORT',80,40);
// centerTextInsideBox(newPdf,`${data.acd_yr}`,170,40);

newPdf.rect(180, 40, 20, 10).stroke();
newPdf.text(`${data.acd_yr}`, 183, 46);
newPdf.setFont("calibri-regular","normal")
newPdf.setFontSize(11);
newPdf.rect(10, 55, 10, 15).stroke();
newPdf.text('1.', 13, 63);
newPdf.rect(20, 55, 90, 15).stroke();
newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 59.5);
newPdf.rect(110, 55, 90, 15).stroke();
newPdf.setFontSize(11);
newPdf.text(`${data.sub_report}`, 113, 64);///Nature of the Event 
newPdf.setFontSize(12);


newPdf.rect(10, 70, 10, 10).stroke();
newPdf.text('2.', 13, 76.5);
newPdf.rect(20, 70, 90, 10).stroke();
newPdf.text('Title of the event',22, 76.5);
newPdf.rect(110, 70, 90, 10).stroke();
const event_title = `${data.event_title}`; 
const title = newPdf.splitTextToSize(event_title, 80);


if(event_title.length <=60)
{
  newPdf.text(event_title, 113, 76);
}
else{
newPdf.setFontSize(10);
const title = newPdf.splitTextToSize(event_title, 80);
newPdf.text(title, 113, 74);///Title of the Event
}


newPdf.setFontSize(12);

newPdf.rect(10, 80, 10, 10).stroke();
newPdf.text('3.', 13, 86.5);
newPdf.rect(20, 80, 90, 10).stroke();
newPdf.text('Organized by',22, 86.5);
newPdf.rect(110, 80, 90, 10).stroke();
newPdf.text(`${data.event_organizer}`, 113, 86.5);//Event Organizer



newPdf.rect(10, 90, 10, 10).stroke();
newPdf.text('4.', 13, 96.5);
newPdf.rect(20, 90, 90, 10).stroke();
newPdf.text('Collaboration/Sponsoring Agency',22, 96.5);
newPdf.rect(110, 90, 90, 10).stroke();
newPdf.text(`${data.event_sponsor}`, 113, 96.5);///Event Sponsor


newPdf.rect(10, 100, 10, 10).stroke();
newPdf.text('5.', 13, 106.5);
newPdf.rect(20, 100, 90, 10).stroke();
newPdf.text('Date of the Event Planned',22, 106.5);
newPdf.rect(110, 100, 90, 10).stroke();
newPdf.text(`${data.proposal_date}`, 113, 106.5);////Date of the Event 

newPdf.rect(10, 110, 10, 10).stroke();
newPdf.text('6.', 13, 116.5);
newPdf.rect(20, 110, 90, 10).stroke();
newPdf.text('Venue',22, 116.5);
newPdf.rect(110, 110, 90, 10).stroke();
newPdf.text(`${data.event_venue}`, 113, 116.5);//////Event Venue


newPdf.rect(10, 120, 10, 50).stroke();
newPdf.text('7.', 13, 145);
newPdf.rect(20, 120, 90, 50).stroke();
newPdf.text('Details of the Guest',22, 145);

newPdf.rect(110, 120, 23, 10).stroke();
newPdf.text('Name', 111, 126.5);
newPdf.rect(133, 120,67, 10).stroke();
newPdf.text(`${data.guest_name}`, 135, 126.5);//Name of the Guest
newPdf.rect(110, 130, 23, 10).stroke();
newPdf.text('Designation', 111, 136.5);
newPdf.rect(133, 130,67, 10).stroke();
newPdf.text(`${data.guest_designation}`, 135, 136.5);//////Designation
newPdf.rect(110, 140, 23, 10).stroke();

newPdf.text('Address', 111, 146.5);

const address = `${data.guest_address}`;

if(address.length >=40)
{
//////////////////////////////////text//////////////////////////////
const x = 133;
let y = 140;
const address = `${data.guest_address}`;
const contentWidth = newPdf.getStringUnitWidth(address) * 12; // Initial font size: 12
const contentHeight = newPdf.getTextDimensions(address, { fontSize: 10}).h;

// Determine font size to fit within specified dimensions
const maxWidth = 100; // Adjust based on your requirements
const maxHeight = 100; // Adjust based on your requirements
const fontSize = Math.min(10, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
 // Adjust the width as needed
// Set font size and add text to the PDF
newPdf.setFontSize(fontSize);

console.log(contentHeight);

const textLines = newPdf.splitTextToSize(address, 60);
newPdf.rect(x , y , maxWidth-33  , maxHeight - 90);
newPdf.text(x+2, y+4, textLines);
}
else{
  newPdf.setFontSize(12);
  newPdf.rect(133, 140,67, 10).stroke();
  newPdf.text(`${data.guest_address}`, 135, 146.5);
}

// newPdf.rect(133, 140,67, 10).stroke();
// newPdf.text(textLines,135, 145);/////Address
newPdf.setFontSize(12);
newPdf.rect(110, 150, 23, 10).stroke();
newPdf.text('Contact No', 111, 156.5);
newPdf.rect(133, 150,67, 10).stroke();
newPdf.text(`${data.guest_phone_number}`, 135, 156.5);//
newPdf.rect(110, 160, 23, 10).stroke();
newPdf.text('Mail-id', 111, 166.5);
newPdf.rect(133, 160,67, 10).stroke();
newPdf.text(`${data.guest_email}`, 135, 166.5);

newPdf.rect(10, 170, 10, 21).stroke();
newPdf.text('8.', 13, 182);
newPdf.rect(20, 170, 90, 21).stroke();
newPdf.text('Total Participants expected',22, 182);

newPdf.setFontSize(10);
newPdf.rect(110, 170, 23, 7).stroke();
newPdf.text('MEC Students', 111, 175);
newPdf.rect(133, 170,67, 7).stroke();
newPdf.text(`${data.student_count}`, 135, 175);

newPdf.rect(110, 177, 23, 7).stroke();
newPdf.text('MEC Faculty', 111, 182);
newPdf.rect(133, 177,67, 7).stroke();
newPdf.text(`${data.faculty_count}`, 135, 182);

newPdf.rect(110, 184, 23, 7).stroke();
newPdf.text('Others', 111, 189);



newPdf.rect(133, 184,67, 7).stroke();
newPdf.text(`${data.others_count}`, 135, 189);

newPdf.setFontSize(11);
newPdf.rect(10, 191, 10, 10).stroke();
newPdf.text('9.', 13, 197.5);
newPdf.rect(20, 191, 90, 10).stroke();
newPdf.text('Proposed Budget\n(Attach Details in Annexure)',22, 195 );
newPdf.rect(110, 191, 90, 10).stroke();
newPdf.text(`\u20B9 ${data.event_budget}`, 113, 197.5);////Event Budget

newPdf.rect(10, 201, 100, 50).stroke();
newPdf.addImage(picture1,"JPEG",15,205,90,40);
newPdf.rect(110, 201, 90, 50).stroke();
newPdf.addImage(picture2,"JPEG",115,205,80,40);

newPdf.rect(10, 251, 190, 7).stroke();
newPdf.text('POs and PSOs Mapping',90,255)


newPdf.rect(10, 258, 12, 9).stroke();
newPdf.text('PO1',13,264);
newPdf.rect(22, 258, 12, 9).stroke();
newPdf.text('PO2',25,264);
newPdf.rect(34, 258, 12, 9).stroke();
newPdf.text('PO3',37,264);
newPdf.rect(46, 258, 12, 9).stroke();
newPdf.text('PO4',49,264);
newPdf.rect(58, 258, 12, 9).stroke();
newPdf.text('PO5',61,264);
newPdf.rect(70, 258, 12, 9).stroke();
newPdf.text('PO6',73,264);
newPdf.rect(82, 258, 12, 9).stroke();
newPdf.text('PO7',85,264);
newPdf.rect(94, 258, 12, 9).stroke();
newPdf.text('PO8',97,264);
newPdf.rect(106, 258, 12, 9).stroke()
newPdf.text('PO9',109,264);
newPdf.rect(118, 258, 12, 9).stroke()
newPdf.text('PO10',120,264);
newPdf.rect(130, 258, 12, 9).stroke()
newPdf.text('PO11',132,264);
newPdf.rect(142, 258, 12, 9).stroke()
newPdf.text('PO12',144,264);
newPdf.rect(154, 258, 15, 9).stroke()
newPdf.text('PSO1',157,264);
newPdf.rect(169, 258, 15, 9).stroke()
newPdf.text('PSO2',172,264);
newPdf.rect(184, 258, 16, 9).stroke()
newPdf.text('PSO3',187,264);
let x1=0;
let y1=0;
let j=0;
// let size=arr.length();
for(let i=0;i<12;i++){
  let k=i+1;
  let temp='PO'+k.toString();
  if(i==0)
  {
    x1=x1+10;
    y1=y1+13;
    
  }
  else{
    x1=x1+12;
    y1=y1+12;
   
  }
  console.log(arr[j]+'-----'+temp);
  if(arr[j]===temp)
  {
    newPdf.rect(x1,267,12,9).stroke();
    newPdf.setFontSize(13)
    newPdf.text("X",y1+1,273);
    j++;
  }
  else{
    newPdf.rect(x1,267,12,9).stroke();
    newPdf.text('',y1+1,273);
  }
}

// let j1=0;

for(let i=0;i<arr.length;i++){
  
  let temp2='PSO1'
  let temp3='PSO2'
  let temp4='PSO3'
  newPdf.setFontSize(13)

  if(arr[i]==temp2)
  {
    newPdf.text("X",160,273);
  }
  else if(arr[i]==temp3)
  {
    newPdf.text("X",176,273);
  }
  else if(arr[i]==temp4)
  {
    newPdf.text("X",193,273);
  }
  
   
}
    

newPdf.rect(154, 267, 15, 9).stroke();
newPdf.rect(169, 267, 15, 9).stroke();
newPdf.rect(184, 267, 16, 9).stroke();



// newPdf.text('* Attach enclosures', 15, 280);
newPdf.setFont("calibri-bold","normal");
newPdf.setFontSize(11);
newPdf.addImage(coordi, 'JPEG', 13, 283, 25, 10);

try{
    
    
  newPdf.addImage(princi, 'JPEG', 163, 283, 25, 10);

  newPdf.addImage(hod, 'JPEG', 100, 280, 15, 10);

}
catch(e){
  console.log(e);
}

newPdf.text('HoD', 100, 295);
newPdf.text('Event Coordinator(s)', 10, 295);
newPdf.text('Principal', 170, 295);

////////////////////////////////////// ECR ENCLOSURE /////////////////////////////////////


newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);

newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);

 
newPdf.setFontSize(13);
newPdf.setFont('calibri-bold', "normal");
newPdf.text("ECR-Enclosures", 90, 40);
newPdf.text("Name of the Event:", 10, 50);
newPdf.setFont('calibri-regular', "normal");
newPdf.text(`${data.sub_report}`, 50, 50); //name of the event
newPdf.setFont('calibri-bold', 'normal');
newPdf.text("Date of the Event Conducted:", 10, 57);
newPdf.setFont("calibri-regular", "normal");
newPdf.text(`${data.proposal_date}`, 70, 57); //Date

newPdf.setFont("calibri-bold", "normal");
newPdf.rect(10, 65, 10, 10).stroke();
newPdf.text('S.no', 11, 71);
newPdf.rect(20, 65, 90, 10).stroke();
newPdf.text('Description', 50, 71);
newPdf.rect(110, 65, 90, 10).stroke();
newPdf.text('Please tick Enclosure', 140, 71);

newPdf.setFont('calibri-regular', 'normal');
newPdf.rect(10, 75, 10, 10).stroke();
newPdf.text('1.', 13, 81);
newPdf.rect(20, 75, 90, 10).stroke();
newPdf.text('Event Proposal (EP)', 22, 81);
newPdf.rect(110, 75, 90, 10).stroke();
newPdf.text('', 155, 81);

newPdf.rect(10, 85, 10, 10).stroke();
newPdf.text('2.', 13, 91);
newPdf.rect(20, 85, 90, 10).stroke();
newPdf.text('Budget Proposed', 22, 91);
newPdf.rect(110, 85, 90, 10).stroke();
newPdf.text('', 155, 91);

newPdf.rect(10, 95, 10, 10).stroke();
newPdf.text('3.', 13, 101);
newPdf.rect(20, 95, 90, 10).stroke();
newPdf.text('Event Planner', 22, 101);
newPdf.rect(110, 95, 90, 10).stroke();
newPdf.text('', 155, 101);

newPdf.rect(10, 105, 10, 10).stroke();
newPdf.text('4.', 13, 111);
newPdf.rect(20, 105, 90, 10).stroke();
newPdf.text('Resource Person Invitation & Thanks letter', 22, 111);
newPdf.rect(110, 105, 90, 10).stroke();
newPdf.text('', 155, 111);

newPdf.rect(10, 115, 10, 10).stroke();
newPdf.text('5.', 13, 121);
newPdf.rect(20, 115, 90, 10).stroke();
newPdf.text('Acceptance Letter from Resource Person', 22, 121);
newPdf.rect(110, 115, 90, 10).stroke();
newPdf.text('', 155, 121);

newPdf.rect(10, 125, 10, 10).stroke();
newPdf.text('6.', 13, 131);
newPdf.rect(20, 125, 90, 10).stroke();
newPdf.text('Resource Person\'s Profile', 22, 131);
newPdf.rect(110, 125, 90, 10).stroke();
newPdf.text('', 155, 131);

newPdf.rect(10, 135, 10, 10).stroke();
newPdf.text('7.', 13, 141);
newPdf.rect(20, 135, 90, 10).stroke();
newPdf.text('Invitation', 22, 141);
newPdf.rect(110, 135, 90, 10).stroke();
newPdf.text('', 155, 141);

newPdf.rect(10, 145, 10, 10).stroke();
newPdf.text('8.', 13, 151);
newPdf.rect(20, 145, 90, 10).stroke();
newPdf.text('Agenda', 22, 151);
newPdf.rect(110, 145, 90, 10).stroke();
newPdf.text('', 155, 151);

newPdf.rect(10, 155, 10, 10).stroke();
newPdf.text('9.', 13, 161);
newPdf.rect(20, 155, 90, 10).stroke();
newPdf.text('Handouts of the Talk', 22, 161);
newPdf.rect(110, 155, 90, 10).stroke();
newPdf.text('', 155, 161);


newPdf.rect(10, 165, 10, 10).stroke();
newPdf.text('10.', 13, 171);
newPdf.rect(20, 165, 90, 10).stroke();
newPdf.text('Participants Attendance', 22, 171);
newPdf.rect(110, 165, 90, 10).stroke();
newPdf.text('', 155, 171);

newPdf.rect(10, 175, 10, 10).stroke();
newPdf.text('11.', 13, 181);
newPdf.rect(20, 175, 90, 10).stroke();
newPdf.text('Resource Person\'s Feedback', 22, 181);
newPdf.rect(110, 175, 90, 10).stroke();
newPdf.text('', 155, 181);

newPdf.rect(10, 185, 10, 10).stroke();
newPdf.text('12.', 13, 191);
newPdf.rect(20, 185, 90, 10).stroke();
newPdf.text('Participants Feedback', 22, 191);
newPdf.rect(110, 185, 90, 10).stroke();
newPdf.text('', 155, 191);

newPdf.rect(10, 195, 10, 10).stroke();
newPdf.text('13.', 13, 201);
newPdf.rect(20, 195, 90, 10).stroke();
newPdf.text('Event Photos', 22, 201);
newPdf.rect(110, 195, 90, 10).stroke();
newPdf.text('', 155, 201);

newPdf.rect(10, 205, 10, 10).stroke();
newPdf.text('14.', 13, 211);
newPdf.rect(20, 205, 90, 10).stroke();
newPdf.text('Budget Utilization', 22, 211);
newPdf.rect(110, 205, 90, 10).stroke();
newPdf.text('', 155, 211);

newPdf.rect(10, 215, 10, 10).stroke();
newPdf.text('15.', 13, 221);
newPdf.rect(20, 215, 90, 10).stroke();
newPdf.text('News published in Papers', 22,221);
newPdf.rect(110, 215, 90, 10).stroke();
newPdf.text('', 155, 221);

newPdf.rect(10, 225, 10, 10).stroke();
newPdf.text('16.', 13, 231);
newPdf.rect(20, 225, 90, 10).stroke();
newPdf.text('News published in College Website)', 22, 231);
newPdf.rect(110, 225, 90, 10).stroke();
newPdf.text('', 155, 231);

newPdf.rect(10, 235, 10, 10).stroke();
newPdf.text('17.', 13, 241);
newPdf.rect(20, 235, 90, 10).stroke();
newPdf.text('One PPT slide about the program', 22, 241);
newPdf.rect(110, 235, 90, 10).stroke();
newPdf.text('', 155, 241);
newPdf.addImage(coordi, 'JPEG', 15, 255, 25, 10);

try{
    
  newPdf.addImage(hod, 'JPEG', 155, 255, 15, 10);
}
catch(e){
  console.log(e);
}

newPdf.setFont('calibri-bold', 'normal');
newPdf.text('Event Coordinator', 20, 267);
newPdf.text('HoD', 160, 267);
///////////////////////////////////////////Event Proposal //////////////////////////////
newPdf.addPage();
      newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
  newPdf.addImage(Image2, 'PNG', 12,25, 17, 10);
  newPdf.addImage(Image3, 'JPG', 175, 5, 22, 12);
  newPdf.addImage(Image4, 'JPG', 175, 20, 20, 14);

  newPdf.setFontSize(20);
  newPdf.setFont("calibri-bold", "normal");
  newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
  newPdf.setFontSize(10);
  newPdf.setFont("calibri-regular", "normal");
  newPdf.text('(An Autonomous Institution)', 85, 20);
  newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
  newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);
  


newPdf.setFontSize(12);
newPdf.setFont("calibri-bold", "normal");
// newPdf.rect(10, 40, 20, 7);
// newPdf.text(`${data.event_organizer}`, 15, 45);///Department
centerTextInsideBox(newPdf,`${data.event_organizer}`,10,40);
newPdf.rect(80, 40, 50, 7);
newPdf.text('EVENT PROPOSAL', 90, 45);
newPdf.rect(180, 40, 20, 10).stroke();
newPdf.text(`${data.acd_yr}`, 183, 46);
// centerTextInsideBox(newPdf,`${data.acd_yr}`,170,40);



newPdf.setFont("calibri-regular","normal")
newPdf.rect(10, 55, 10, 20).stroke();
newPdf.text('1.', 12, 65);
newPdf.rect(20, 55, 90, 20).stroke();
newPdf.text('Nature of the Event:\nConference/Technical Symposium/Workshop/\nSeminar/Guest/Lecture/FDP/Any other',22, 61);
newPdf.rect(110, 55, 90, 20).stroke();
newPdf.text(`${data.sub_report}`, 113, 66);//Nature of the Event


newPdf.rect(10, 75, 10, 10).stroke();
newPdf.text('2.', 12, 81);
newPdf.rect(20, 75, 90, 10).stroke();
newPdf.text('Title of the event',22, 81);
newPdf.rect(110, 75, 90, 10).stroke();

if(event_title.length <=60)
{
  newPdf.text(event_title, 113, 81);
}
else{
newPdf.setFontSize(10);
const title = newPdf.splitTextToSize(event_title, 80);
newPdf.text(title, 113, 74);///Title of the Event
}




newPdf.setFontSize(12);
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
newPdf.text('7.', 12, 149);
newPdf.rect(20, 125, 90, 50).stroke();
newPdf.text('Details of the Guest',22, 149);

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
newPdf.rect(133, 145,67, 10).stroke();

const address1 = `${data.guest_address}`;
if(address1.length >=40)
{
//////////////////////////////////text//////////////////////////////
const x = 133;
let y = 145;
const address1 = `${data.guest_address}`;
const contentWidth = newPdf.getStringUnitWidth(address1) * 12; // Initial font size: 12
const contentHeight = newPdf.getTextDimensions(address1, { fontSize: 10}).h;

// Determine font size to fit within specified dimensions
const maxWidth = 100; // Adjust based on your requirements
const maxHeight = 100; // Adjust based on your requirements
const fontSize = Math.min(10, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
 // Adjust the width as needed
// Set font size and add text to the PDF
newPdf.setFontSize(fontSize);

console.log(contentHeight);

const textLines = newPdf.splitTextToSize(address1, 60);
newPdf.rect(x , y , maxWidth-33  , maxHeight - 90);
newPdf.text(x+2, y+4, textLines);
}
else{
  newPdf.setFontSize(12);
  newPdf.text(`${data.guest_address}`, 135, 151);
}


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
newPdf.setFontSize(10);
newPdf.rect(110, 175, 23, 10).stroke();
newPdf.text('MEC Students', 110.7, 182);
newPdf.rect(133, 175,67, 10).stroke();
newPdf.text(`${data.student_count}`, 135, 181);//Count of the Student

newPdf.rect(110, 185, 23, 10).stroke();
newPdf.text('MEC Faculty', 110.7, 192);
newPdf.rect(133, 185,67, 10).stroke();
newPdf.text(`${data.faculty_count}`, 135, 191);//COunt of the Faculty

newPdf.rect(110, 195, 23, 10).stroke();
newPdf.text('Others', 110.7, 201);
newPdf.rect(133, 195,67, 10).stroke();
newPdf.text(`${data.others_count}`, 135, 201);//Count of Others
newPdf.setFontSize(12);
newPdf.rect(10, 205, 10, 10).stroke();
newPdf.text('9.', 12, 211);
newPdf.rect(20, 205, 90, 10).stroke();
newPdf.text('Proposed Budget',22, 211);
newPdf.rect(110, 205, 90, 10).stroke();
newPdf.text(`\u20B9  ${data.event_budget}`, 113, 211);//Event Budget



newPdf.rect(10, 215, 10, 10).stroke();
newPdf.text('10.', 12, 220);
newPdf.rect(20, 215, 180, 10).stroke();
newPdf.text('Co-ordinator of the Event',22, 220);

newPdf.rect(10, 225, 80, 5).stroke();
newPdf.text('Name', 38, 229);

newPdf.rect(90, 225, 60, 5).stroke();
newPdf.text('Designation', 108, 229);

newPdf.rect(150, 225, 50, 5).stroke();
newPdf.text('Phone Number', 163, 229);

newPdf.rect(10, 230, 80, 10).stroke();
newPdf.text('', 14, 236);//Name of coordinator

newPdf.rect(90, 230, 60, 10).stroke();
newPdf.text('', 95, 236);//Designation of coordinator

newPdf.rect(150, 230, 50, 10).stroke();
newPdf.text('', 165, 236);//Phone Number of coordinator

newPdf.rect(10, 240, 80, 10).stroke();
newPdf.text('', 14, 246);//Name of coordinator

newPdf.rect(90, 240, 60, 10).stroke();
newPdf.text('', 95, 246);//Designation of coordinator

newPdf.rect(150, 240, 50, 10).stroke();
newPdf.text('', 165, 246);//Phone Number of coordinator

newPdf.rect(10, 250, 80, 10).stroke();
newPdf.text('', 14, 256);//Name of coordinator

newPdf.rect(90, 250, 60, 10).stroke();
newPdf.text('', 95, 256);//Designation of coordinator

newPdf.rect(150, 250, 50, 10).stroke();
newPdf.text('', 165, 256);//Phone Number of coordinator



try{
    
  newPdf.addImage(hod, 'JPEG', 15, 275, 15, 10);
  newPdf.addImage(princi, 'JPEG', 150, 277, 25, 10);
}
catch(e){
  console.log(e);
}




newPdf.setFont("calibri-bold","normal");

newPdf.text('HoD', 15, 290);

newPdf.text('Principal', 155, 290);

///////////////////////////////////reqmail////////////////////////////////////////////
try{ 
  // Add pages from the original PDF

  for (let pageNumber = 1; pageNumber <= pdfDocument1.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}

///////////////////////////////////////accMail//////////////////////////////////////
try{ 
  // Add pages from the original PDF
  for (let pageNumber = 1; pageNumber <= pdfDocument2.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}
/////////////////////////////////////resProfile////////////////////////// /////////////
try{ 
  // Add pages from the original PDF
  for (let pageNumber = 1; pageNumber <= pdfDocument5.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}
    
      // newPdf.addPage();
      /////////////////////////////////////////////// BUDGET PROPOSAL //////////////////////////
      newPdf.addPage();
      newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
      newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);
      
      newPdf.setFontSize(20);
      newPdf.setFont("calibri-bold", "normal");
      newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
      newPdf.setFontSize(10);
      newPdf.setFont("calibri-regular", "normal");
      newPdf.text('(An Autonomous Institution)', 85, 20);
      newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
      newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);
newPdf.setFont("calibri-bold", "normal");
// newPdf.setFontSize(12);
// newPdf.text('Budget Proposal', 100, 45);
generateCenteredText(newPdf,'Budget Proposal',12,45,'calibri-bold','normal',[0,0,0]);
newPdf.setFontSize(12);
newPdf.text('Date of the Event:', 15, 60);
newPdf.setFont("calibri-regular", "normal"); 
newPdf.text(`${data.proposal_date}`,50, 60);
newPdf.setFont("calibri-regular", "normal"); 
newPdf.setFontSize(10);
newPdf.text('To the Management through Principal', 15, 67);
newPdf.setFontSize(12);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('Total Paticipants:', 15, 90);
newPdf.setFont("calibri-regular", "normal");
newPdf.text(`${data.student_count}`, 49, 90);

newPdf.setFont("calibri-bold", "normal");
newPdf.rect(15, 100, 15, 12).stroke();
newPdf.text('S.no', 17, 106);
newPdf.rect(30, 100, 125, 12).stroke();
newPdf.text('Details', 75, 106);
newPdf.rect(155, 100, 45, 12).stroke();
newPdf.text('Cost (in Rs)', 157, 106);
newPdf.setFont("calibri-regular", "normal");
newPdf.rect(15, 112, 15, 12).stroke();
newPdf.text('1.', 19, 120);
newPdf.rect(30, 112, 125, 12).stroke();
newPdf.text('Overall Budget', 35, 120);
newPdf.rect(155, 112, 45, 12).stroke();
newPdf.text(`\u20B9  ${data.event_budget}`, 157, 120);// budget amount
newPdf.rect(15, 124, 15, 12).stroke();
newPdf.text('', 19, 132);
newPdf.rect(30, 124, 125, 12).stroke();
newPdf.text('Total', 35, 132);
newPdf.rect(155, 124, 45, 12).stroke();
newPdf.text(`\u20B9  ${data.event_budget}`, 157, 132);// total budget amount
newPdf.rect(15, 136, 185, 12).stroke();
newPdf.setFont("calibri-bold", "normal");
newPdf.text('In Words:', 19, 144);
newPdf.setFont("calibri-regular", "normal");
newPdf.text(`${test(data.event_budget)+' only'}`,37,144);//In words budget
newPdf.setFontSize(12);
newPdf.setFont('calibri-bold','normal');
newPdf.addImage(coordi, 'JPEG', 10, 220, 25, 10);


try{
    
  newPdf.addImage(hod, 'JPEG', 100, 220, 15, 10);
  newPdf.addImage(princi, 'JPEG', 167, 220, 25, 10);
}
catch(e){
  console.log(e);
}


newPdf.text('Event Coordinator(s)', 15, 234);
newPdf.text('HoD', 100, 234);
newPdf.text('Principal', 167, 234);

/////////////////////////////////////////////////EventPlanner/////////////////////////////////////////////

newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);

newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);;

newPdf.setFontSize(13);
newPdf.setFont('calibri-regular', 'normal');
generateCenteredText(newPdf,'Event Planner',15,40,'calibri-bold','normal',[0,0,0]);

generateCenteredText(newPdf,`Department of ${data.event_dept_fullname}`,18,50,'calibri-bold','normal',[0,0,0]);
newPdf.setFontSize(14);
newPdf.setFont('calibri-bold', 'normal');
newPdf.rect(15,58,60,10).stroke();
newPdf.text('Event Date: ',21,65);
newPdf.setFont('calibri-regular', 'normal');
newPdf.text(`${data.proposal_date}`,47,65);////Event Date
newPdf.setFont('calibri-bold', 'normal'); 
// centerTextInsideBox(newPdf,`${data.acd_yr}`,175,58);///Academic Year

newPdf.rect(175, 58, 25, 10).stroke();
newPdf.text(`${data.acd_yr}`, 179, 65);



newPdf.setFont('calibri-regular', 'normal');
var plan = '\nThis is to inform the Faculty member that,the following committees have been formed for smooth conductance of '+`${data.sub_report}`+' has organize by our Department of '+`${data.event_organizer}`+' and ,the commitee member are requested to carry out their resposibilities to perfection.';
const planner = newPdf.splitTextToSize(plan,150);
newPdf.text(planner,30,75);
newPdf.setFont('calibri-bold', 'normal');
newPdf.rect(15,110,15,12).stroke()
newPdf.text('S.NO',17,117)
newPdf.rect(30,110,70,12).stroke();
newPdf.text('Name of the committee',40,117)
newPdf.rect(100,110,60,12).stroke()
newPdf.text('In charge(s)',110,117)
newPdf.rect(160,110,40,12).stroke()
newPdf.text('Remark',170,117)
newPdf.setFont('calibri-regular', 'normal');
newPdf.rect(15,122,15,15).stroke()
newPdf.text('1',19,129)
newPdf.rect(30,122,70,15).stroke()
newPdf.text('Organization Secretary',34,130)


try{
  const names = data.event_organizing_secretary.split(',').map(entry => {
    const [code, name] = entry.split('-');
    return { name };
  });
  
  const fontsize = 12;
  const textX = 105;
  let textY = 128;
  names.forEach(entry => {
  
    if(names.length==1){
      newPdf.text(entry.name, textX, 130);
      textY += 5;
    }
    else{
  newPdf.text(entry.name, textX, textY);
    textY += 5;
    } // Move to the next line
  });
 
  const textx = 105;
  let texty = 143;
  names.forEach(entry => {
  
    if(names.length==1){
      newPdf.text(entry.name, textx, 143);
      texty += 5;
    }
    else{
  newPdf.text(entry.name, textx, texty);
    texty += 5;
    } // Move to the next line
  });




}
catch(e){
  console.log(e);
}



newPdf.rect(100,122,60,15).stroke()
// newPdf.text(`${data.event_organizing_secretary}`,103,130)//////Event Organization seretary
newPdf.rect(160,122,40,32).stroke()
newPdf.text('',163,130)//event_organizing_secretary

newPdf.rect(15,137,15,17).stroke()
newPdf.text('2',19,144)
newPdf.rect(30,137,70,17).stroke()
newPdf.text('Permission & Report Preparation \nInvitation Flux Designing',33,143)
newPdf.rect(100,137,60,17).stroke()
// newPdf.text(`${data.event_organizing_secretary}`,103,146)////Event Report Preparation




newPdf.setFont('calibri-bold', 'normal');
newPdf.addImage(coordi, 'JPEG', 30, 205, 25, 10);

try{
    
  newPdf.addImage(hod, 'JPEG', 170, 205, 15, 10);

}
catch(e){
  console.log(e);
}
newPdf.text('Coordinator',30,220)
newPdf.text('HoD',170,220)


//////////////////////////////////////////////// Invitation ////////////////////////////////////////
newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);

newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);
    generateCenteredText(newPdf,'Department of',15,45,'calibri-regular','normal',[254,0,102]);
    generateCenteredText(newPdf,'in Association with',12,51,'calibri-regular','normal',[151, 92, 203]);
    generateCenteredText(newPdf,'',15,55,'calibri-regular','normal',[151, 92, 203]);
    generateCenteredText(newPdf,'The Management, Principal, Faculty and Students Cardially Invite you to the',14,65,'calibri-regular','normal',[0, 0, 255]);
    generateCenteredText(newPdf,`${data.sub_report}`,16,75,'calibri-regular','normal',[150, 6, 6]);
    generateCenteredText(newPdf,'On',14,81,'calibri-regular','normal',[202, 37, 197]);
    generateCenteredText(newPdf,`${data.event_title}`,17,88,'calibri-regular','normal',[202, 37, 197]);
    generateCenteredText(newPdf,'Resource Person',16,95,'calibri-regular','normal',[150,6,6]);
    generateCenteredText(newPdf,`${data.guest_name}`,17,105,'calibri-regular','normal',[0, 0, 153]);
    generateCenteredText(newPdf,`${data.guest_designation}`,15,112,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Dr.K.Gunasekaran',17,125,'calibri-regular','normal',[0, 0, 153]);/////Secretary
    generateCenteredText(newPdf,'Secretary & Managing Trustee ',15,132,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Muthayammal Educational Trust and Research Foundation ',15,138,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'will preside over the function',15,144,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Dr.M. Madheshwaran',17,157,'calibri-regular','normal',[0, 0, 153]);/////Principal
    generateCenteredText(newPdf,'Principal',15,164,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Muthayammal Engineering College',15,170,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'will feliciate the function',15,176,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'',17,190,'calibri-regular','normal',[0, 0, 153]);/////HoD
    generateCenteredText(newPdf,'HoD-',15,197,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Will Welcome The Gathering',15,203,'calibri-regular','normal',[0, 102, 0]);
    generateCenteredText(newPdf,'Time: '+`${data.event_time}`,12,220,'calibri-regular','normal',[180, 0, 0]);//////Time of the Event
    
    newPdf.setFont('calibri-regular','normal');
    newPdf.setFontSize(12);
    newPdf.setTextColor(180, 0, 0);
    newPdf.text('Date:',15,220);
    newPdf.text(`${data.proposal_date}`,26,220);////// Date of the Event
    newPdf.text('Venue:',150,220);////////Venue
    const venue = `${data.event_venue}`;
    const venueline = doc.splitTextToSize(venue, 50);//////////////Venue Variable store
    newPdf.text(165,220,venueline);
    //////////////// Last Left Green wordings /////
    newPdf.setFont('calibri-regular','normal');
    newPdf.setFontSize(14);
    newPdf.setTextColor(0,102,0);
    newPdf.text('',15,245);
    newPdf.text('',15,250);
    newPdf.text('Co-Ordinator',15,255);

///////////////////////////////////////////////////////////////////////////////
    try{ 
      // Add pages from the original PDF
      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const pdfWidth = page.view[2];
        const pdfHeight = page.view[3];

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = pdfWidth;
        canvas.height = pdfHeight;

        await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

        const imageDataUrl = canvas.toDataURL('image/jpeg');
        try{newPdf.addPage();
        newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
        }catch(error){
          console.error(error);
        }
      }
    }
    catch(e){
      console.log(e);
    }
/////////////////////////////////////Participant feedback///////////////////////////////

try{ 
  // Add pages from the original PDF
  for (let pageNumber = 1; pageNumber <= pdfDocument4.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}

/////////////////////////////////////////Resource Person Feedback///////////////////////
try{ 
  // Add pages from the original PDF
  for (let pageNumber = 1; pageNumber <= pdfDocument3.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}
////////////////////////////////////////Event photos///////////////////////////////////
newPdf.setTextColor(0,0,0);
newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);

newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);

newPdf.setFontSize(12);
newPdf.setFont("calibri-bold", "normal");
centerTextInsideBox(newPdf,`${data.event_organizer}`,10,40);
// centerTextInsideBox(newPdf,`${data.event_title}`,55,40);
generateCenteredText(newPdf,`${data.event_title}`,12,47,'calibri-bold','normal',[0, 0, 0])
centerTextInsideBox(newPdf,`${data.acd_yr}`,180,40);

generateCenteredText(newPdf,'Event Photos',15,65,'calibri-bold','normal',[0, 0, 0]);

newPdf.rect(10,90,95,95)
newPdf.addImage(picture2,"JPEG",15,107,85,60);
newPdf.rect(105,90,95,95)
newPdf.addImage(picture1,"JPEG",110,107,85,60);

////////////////////////////////////////Budget Utilized//////////////////////////////////


newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 7, 25, 25);
newPdf.addImage(Image2, 'PNG', 173, 9, 25, 19);

newPdf.setFontSize(20);
newPdf.setFont("calibri-bold", "normal");
  newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',45, 15);
newPdf.setFontSize(10);
newPdf.setFont("calibri-regular", "normal");
newPdf.text('(An Autonomous Institution)', 85, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 43, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 70, 30);

newPdf.setFont("calibri-regular", "normal");
newPdf.setFontSize(12);
generateCenteredText(newPdf,'Budget Utilized',12,45,'calibri-bold','normal',[0,0,0]);
newPdf.setFontSize(12);
newPdf.text('Date of the Event:', 15, 60);
newPdf.setFont("calibri-regular","normal");
newPdf.text(`${data.proposal_date}`,50, 60);//date

newPdf.setFont("calibri-regular", "normal");
newPdf.setFontSize(10);
newPdf.text('To the Management through Principal', 15, 65);
newPdf.setFont("calibri-regular", "normal");
newPdf.setFontSize(12);
newPdf.setFont("calibri-bold", "normal");
newPdf.text('Total Paticipants:', 15, 90);
newPdf.text(`${data.student_count}`, 50, 90);
// ////newPdf.setFont("calibri-regular","");
// newPdf.text('',57, 90);
newPdf.setFont("calibri-bold", "normal");
newPdf.rect(15, 100, 15, 12).stroke();
newPdf.text('S.no', 17, 108);
newPdf.rect(30, 100, 125, 12).stroke();
newPdf.text('Details', 80, 108);
newPdf.rect(155, 100, 45, 12).stroke();
newPdf.text('Cost (in Rs)', 165, 108);

newPdf.setFont("calibri-regular", "normal");
newPdf.rect(15, 112, 15, 12).stroke();
newPdf.text('1', 19, 120);
newPdf.rect(30, 112, 125, 12).stroke();
newPdf.text('Overall Budget', 35, 120);
newPdf.rect(155, 112, 45, 12).stroke();
// var rupees = "U+20B9";
// console.log('\u20B9');
newPdf.text(`\u20B9  ${data.event_budget_utilized}`, 157, 120); // budget


newPdf.rect(15, 124, 15, 12).stroke();
newPdf.text('', 19, 132);
newPdf.rect(30, 124, 125, 12).stroke();
newPdf.text('Total', 35, 132);
newPdf.rect(155, 124, 45, 12).stroke();
newPdf.text(`\u20B9  ${data.event_budget_utilized}`, 157, 132); //total budget
newPdf.rect(15, 136, 185, 12).stroke();
newPdf.setFont("calibri-bold", "normal");
newPdf.text('In Words:', 19, 144);
newPdf.setFont("calibri-regular", "normal");
newPdf.text(`${test(data.event_budget)+' only'}`,37,144);//In words budget

newPdf.setFont("calibri-bold","normal");
newPdf.addImage(coordi, 'JPEG', 10, 220, 25, 10);


try{
    
  newPdf.addImage(hod, 'JPEG', 100, 220, 15, 10);
  newPdf.addImage(princi, 'JPEG', 167, 220, 25, 10);

}
catch(e){
  console.log(e);
}
newPdf.text('Event Coordinator(s)', 15, 234);
newPdf.text('HoD', 100, 234);
newPdf.text('Principal', 167, 234);

//////////////////////////////////////////PPT////////////////////////////////////
      
    
try{ 
  // Add pages from the original PDF
  for (let pageNumber = 1; pageNumber <= pdfDocument6.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const pdfWidth = page.view[2];
    const pdfHeight = page.view[3];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;

    await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    try{newPdf.addPage();
    newPdf.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
    }catch(error){
      console.error(error);
    }
  }
}
catch(e){
  console.log(e);
}
    
   

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
      const ecrf=async(report_id,table)=>{
        const temp=await onTable(report_id,table)
    if(temp.report_id){
        sessionStorage.setItem("report_id",JSON.stringify(temp))
        
        setId1(temp.report_id)
      //   alert(temp.report_id)
        
    }
    viewPdf1(temp.report_id);

    } 



      ///////////////////////
      const [loading, setLoading] = useState(false);





   
// console.log(allvalues)
    return(
        <>
      
        <div class="main">
 
            <div class="searchbar2">
                <input type="text"
                       name=""
                       id=""
                       placeholder="Search"/>
                <div class="searchbtn">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                        class="icn srchicn"
                        alt="search-button"/>
                    </div>
            </div>
<div class="sel">
<style>
    </style>
        <div class="button-container">
          {/* <FacultyEcrFilter/> */}
          <>
        <div className="filter-dropdowns" style={{width:'100%',display:'flex',marginTop:"120px",alignItems:'center',marginLeft:'-5%',justifyContent:'center'}}>
       
{/* Filter of Academic year--------------------------------------------------- */}

        <label for="acdyr_id">Academic Year : </label>
<Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[]}
      name="acdyr_id"
      onChange={acdInfoCollect}
      isSearchable
      isMulti
      options={years}
    />
       
    

{/* Filter of Sem--------------------------------------------------------- */}
<label for="sem_id">Semester : </label>
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[]}
      name="sem_id"
      onChange={semInfoCollect}
      isSearchable
      // isMulti
      options={sems}
    />

    

    {/* Filter of Major Id-------------------------------------------------- */}
    <label for="major_id">Major Type : </label>
<Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[]}
      name="major_id"
      onChange={majorInfoCollect}
      isSearchable
      isMulti
      options={majors}
    />
    
    {/* Filter of Sub ID---------------------------------------------------- */}
    

    <label for="sub_id">Sub Type : </label>
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[]}
      name="sub_id"
      onChange={subInfoCollect}
      isSearchable
      isMulti
      options={subs}
    />
    
           <input
  className='filter-button'
  type='button'
  value="Filter"
  onClick={onClickFilter}
  style={{
  
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '12px'
  }}
/>



            </div>
    </>

        </div>
</div>
            <div class="report-container1">
                <div class="report-header">
                    <h1 class="recent-Articles">Your Reports</h1>
                    <a className="topic-heading" href="/add"><button class="view" id="addButton">+ Add</button></a>
                              </div>
                              <div className='table-responsive text-nowrap'>
   <table className='table table-striped '>
                    <thead>
                    <tr>
                            <th>ID</th>
                            <th>Event Title</th>
                            <th>Date</th>
                            <th>Major Type <br></br>Sub Type</th>
                            <th>Event Coordinator</th>
                            {/* <th></th> */}
                            
                            <th>Proposal</th>
                            

                            <th>Completion</th><th>Status</th><th>Details</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                            ecr?.length ||0 > 0 ? (

                                ecr.map((data, key) => (
                                  <tr>
                                    
                                    <tr>
                                    
                                    <td><br></br>{data.report_id}</td>
                                    
                                    <td style={{ whiteSpace: 'pre-wrap' }}>
        <br></br>
        {data.event_title}
      </td>
      
                                    <td><br></br>{data.event_date.split('-').reverse().join('-')}</td>
                                    <td>
                                          <h6 style={{border:'none',fontSize:'small',}}>{data.major_report}</h6>
                                          
                                          <h6 style={{justifyContent:'center',justifyItems:'center',border:'none',fontSize:'small'}}><br></br>{(data.sub_report)}</h6>
                                          </td>  
                                          <td>
        <br></br>
        {data.event_coordinator.split(',').map(entry => {
          const [code, name] = entry.split('-');
          return <div>{name}</div>;
        })}
      </td>
      </tr>
                                                                       {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                                    
                                
                                  
                                    {
                                (data.report_proposal_status===0) ?
                                <>
                                <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                </td>
                                <td >
                                <button type="button"style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

                                    <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id,data.event_name);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===1 && data.report_completion_status===0 ) ? 
                                        <>
                                        
                                        <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                    <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id,data.event_name);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===2 && data.report_completion_status===0 ) ?
                                        <>
                                        <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr> 
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                 
<td><button
   style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id,data.event_name);
                                                       
                                                    }} >View Proposal</button></td>
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
                                        (data.report_completion_status===0 && data.lvl_1_completion_sign==null)?

                                        <>
                                       <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr> 
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button"style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

     
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecrf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                       
                                        :
                                        (data.report_completion_status===1)?

                                        <>
                                       <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

     
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecrf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                                    </>
                                        :
                                        (data.report_completion_status===2)?

                                        <>
                                     <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                    
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecrf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                        :
                                        <></>
}
                                    
                                </tr>
                            ))
                        ):(  <tr>
                          <td colSpan="7" style={{ textAlign: 'center' }}>
               No Proposal requests Found
               </td>
               <td>

               </td>
               <td>

               </td>
                      </tr>)
                                        }

{
                            ecr1?.length ||0 > 0 ? (

                                ecr1.map((data, key) => (
                                  <tr>
                                    
                                  <td><br></br>{data.report_id}</td>
                                  
                                  <td style={{ whiteSpace: 'pre-wrap' }}>
      <br></br>
      {data.event_title}
    </td>
    
                                  <td><br></br>{data.event_date.split('-').reverse().join('-')}</td>
                                  <td>
                                        <h6 style={{border:'none',fontSize:'small',}}>{data.major_report}</h6>
                                        
                                        <h6 style={{justifyContent:'center',justifyItems:'center',border:'none',fontSize:'small'}}><br></br>{(data.sub_report)}</h6>
                                        </td>  
                                        <td>
      <br></br>
      {data.event_coordinator.split(',').map(entry => {
        const [code, name] = entry.split('-');
        return <div>{name}</div>;
      })}
    </td>                                  {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                                  
                              
                                
                                  {
                              (data.report_proposal_status===0) ?
                              <>
                              <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button"style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

                                  <td><button
style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id,data.event_name);
                                                     
                                                  }} >View Proposal</button></td>
                                      </>
                                      :
                                      (data.report_proposal_status===1 && data.report_completion_status===0 ) ? 
                                      <>
                                      
                                      <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                  <td><button
style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id,data.event_name);
                                                     
                                                  }} >View Proposal</button></td>
                                      </>
                                      :
                                      (data.report_proposal_status===2 && data.report_completion_status==0 &&data.event_organizer==null ) ?
                                      <>
                                      <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr> 
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                               
<td><button
 style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id,data.event_name);
                                                     
                                                  }} >View Proposal</button></td>
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
                                      (data.report_completion_status==0 || data.lvl_2_completion_sign!=null)?

                                      <>
                                     <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                              </td>
                              <td >
                              <button type="button"style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

   
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                     ecrf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                      </>
                                     
                                      :
                                      (data.report_completion_status===1)?

                                      <>
                                     <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

   
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                     ecrf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                                  </>
                                      :
                                      (data.report_completion_status===2)?

                                      <>
                                   <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                  
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                     ecrf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                      </>
                                      :
                                      <></>
}
                                  
                              </tr>
                          ))
                      ):( <tr>
                                  <td colSpan="7" style={{ textAlign: 'center' }}>
                       No Completion requests Found
                       </td>
                       <td>

               </td>
               <td>

               </td>
                              </tr>)
                                      }
                 
                        {
                          currentRecords?.length||0>0?(
                            currentRecords.map((data)=>
                            (
                          
                              <tr>
                                    
                              <td><br></br>{data.report_id}</td>
                              
                              <td style={{ whiteSpace: 'pre-wrap' }}>
  <br></br>
  {data.event_title}
</td>

                              <td><br></br>{data.event_date.split('-').reverse().join('-')}</td>
                              <td>
                                    <h6 style={{border:'none',fontSize:'small',}}>{data.major_report}</h6>
                                    
                                    <h6 style={{justifyContent:'center',justifyItems:'center',border:'none',fontSize:'small'}}><br></br>{(data.sub_report)}</h6>
                                    </td>  
                                    <td>
  <br></br>
  {data.event_coordinator.split(',').map(entry => {
    const [code, name] = entry.split('-');
    return <div>{name}</div>;
  })}
</td>
{/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                              {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                              
                          
                            
                              {
                          (data.report_proposal_status===0) ?
                          <>
                          <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',backgroundColor:'red',
justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Pending</button></td>

                              <td><button
style={{
backgroundColor: '#0000ff', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  pdfAccept(data.report_id,data.event_name);
                                                 
                                              }} >View Proposal</button></td>
                                  </>
                                  :
                                  (data.report_proposal_status===1 && data.report_completion_status===0 ) ? 
                                  <>
                                  
                                  <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                              <td><button
style={{
backgroundColor: '#0000ff', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  pdfAccept(data.report_id,data.event_name);
                                                 
                                              }} >View Proposal</button></td>
                                  </>
                                  :
                                  (data.report_completion_status===0 ) ?
                                  <>
                                  <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</tr> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button>
</td>

                           
<td><a className="topic-heading" href="/ecrInput"><button
style={{
backgroundColor: '#41def0', // Background color
color: 'black', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  // pdfAccept(data.report_id,data.event_name);
                                                  accept(data.report_id,data.event_name);
                                                 
                                              }} >Create Ecr</button></a></td>
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
                                  (data.report_completion_status===0 && data.lvl_1_completion_sign==null)?

                                  <>
                                 <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button"style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>


                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ecrf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                  </>
                                 
                                  :
                                  (data.report_completion_status===1)?

                                  <>
                                 <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</tr> 
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>


                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ecrf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                              </>
                                  :
                                  (data.report_completion_status===2)?

                                  <>
                               <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6> 
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

              
                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ecrf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                  </>
                                  :
                                  <></>
}
                              
                          </tr>
                      ))
                  ):( <tr>
                              <td colSpan="7" style={{ textAlign: 'center' }}>
                   No  Reports Found
                   </td>
                   <td>

               </td>
               <td>

               </td>
                          </tr>)
                                  }
                    </tbody>
                </table>
                <div className="pagination" style={{gap:"50px", alignItems:"center", marginLeft:'35%',textAlign:'bottom'}}>
                <div className="pagination">
        <button className='page-btn' onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>&nbsp;&nbsp;</span>
     
        <span style={{marginTop:'8px'}}>{`Page ${currentPage} of ${totalPages}`}</span>
        
        <span>&nbsp;&nbsp;</span>
        <button className='page-btn' onClick={handleNextPage} disabled={currentPage === totalPages}>
        
          Next
        </button>
      </div>
      {loading && (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
)}
      </div>
                </div>
                </div>
                   </div>
       
        </>
    )
}