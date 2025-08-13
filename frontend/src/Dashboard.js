import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FacultyMenu } from "./FacultyMenu"
import { CreateEvent } from "./CreateEvent"
import { useEffect, useState } from "react"
import { HodDashboard } from "./HodDashboard"
import { FacultyPage } from "./FacultyPage"
import { Add } from "./Add"
import { PrincipalDashboard } from "./PrincipalDashboard"
import { EcrInput } from "./ecrInput"
import PDFGenerator from "./pdfGenerator"
import SeSTAadd from "./Sesta/SestaAdd"
import SeSTAbuttons from "./Sesta/SestaButtons"
import { Intership, NptelCertification, OnlineCertification, StudentTechTalks, StudentsParticipation, ValueAdded } from "./Sesta/SestaFacultyView"
import { HodECRPage } from "./HodECRPage"
import Iv from "./Iv/Iv"
import Ivadd from "./Iv/Ivadd"
import IvInput from "./Iv/IvInput"
import Setafbutton from "./Setaf/Setafbuttons"
import { ConferencePublication, JournalPublication, Techtalk, Workshop,Nptel, FacultyGuestTalk, Proposal, Taste, Industry, Seed, Consultancy, Patentsfilled, Collabrative, Econtent, VisitToLibrary, Award, BooksFaculty, StudentsMotivation, Professionalpublication, StudentFieldworkFaculty, FdpSdpFaculty } from "./Setaf/SetafFAcultyView"
import { Facultyfront, Conferencefront, Journalfront, Nptelfront, Techtalks, Workshopfront, Proposalfront, Tastefront, Industryfront, Seedfront, Consultancyfront, Patentfilledfront, Collabrativefront, VisittoIndustryfront, Econtentfront, VisittoLibraryfront, AwardAtNational, Books, Motivationfront, Professionalfront, StudentFieldwork, FdpSdpFront} from "./Setaf/SetafForms"
import SetafConsolidation from "./Setaf/SetafConsolidate"



export const Dashboard=()=>{
    const[hodLog,setHodLog]=useState(false)
    const[principalLog,setPrincipalLog]=useState(false)

    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_desig===403){
            setHodLog(true)
        }
    },[])
    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_desig===401){
            setPrincipalLog(true)
        }
    },[])

    return(
        <>
            {
                (principalLog) ?
                <>
                <PrincipalDashboard/>
                </>
                :
                (hodLog) ?
                <>
                <HodDashboard/>
                </>
                :
                <>
                    <BrowserRouter>
                        <FacultyMenu/>
                        <Routes>
                        <Route path="" element={<FacultyPage/>} />

                        {/* ECR routers */}
                            <Route path="ecr" element={<CreateEvent/>} />
                            <Route path="add" element={<Add/>} />
                            {/* <Route path="setaf" element={} /> */}
                            <Route path="ecrInput" element={<EcrInput/>} />
                            <Route path="viewPdf" element={<PDFGenerator/>} />
                            
                            {/* setaf */}
                            <Route path="/Setaf" element={<Setafbutton/>}/>  
                            <Route path="/setaf/journalpublication" element={<JournalPublication/>}/>
                            <Route path="/Setaf/SetafForms/Journalfront" element={<Journalfront/>}/>
                            <Route path="/conferencepublication" element={<ConferencePublication/>}/>
                            <Route path="/Setaf/SetafForms/Conferencefront" element={<Conferencefront/>}/>
                            <Route path="/workshop" element={<Workshop/>}/>
                            <Route path="/Setaf/SetafForms/Workshopfront" element={<Workshopfront/>}/>
                            <Route path="/techtalk" element={<Techtalk/>}/>
                            <Route path="/Setaf/SetafForms/techtalks" element={<Techtalks/>}/>
                            <Route path="/facultly" element={<FacultyGuestTalk/>}/>
                            <Route path="/Setaf/SetafForms/facultyfront" element={<Facultyfront/>}/>
                            <Route path="/nptelcertification" element={<Nptel/>}/>
                            <Route path="/Setaf/SetafForms/nptelform" element={<Nptelfront/>}/>
                            <Route path="/taste" element={<Taste/>}/>
                            <Route path="/Setaf/SetafForms/tastefront" element={<Tastefront/>}/>
                            <Route path="/industry" element={<Industry/>}/>
                            <Route path="/Setaf/SetafForms/visitindustry" element={<VisittoIndustryfront/>}/>
                            <Route path="/consultancy" element={<Consultancy/>}/>
                            <Route path="/Setaf/SetafForms/consultancyfront" element={<Consultancyfront/>}/>
                            <Route path="/patent" element={<Patentsfilled/>}/>
                            <Route path="/Setaf/SetafForms/patentfront" element={<Patentfilledfront/>}/>
                            <Route path="/collabrative" element={<Collabrative/>}/>
                            <Route path="/Setaf/SetafForms/collabrative" element={<Collabrativefront/>}/>
                            <Route path="/seed" element={<Seed/>}/>
                            <Route path="/Setaf/SetafForms/seed" element={<Seedfront/>}/>
                            <Route path="/econtent" element={<Econtent/>}/>
                            <Route path="/Setaf/SetafForms/Econtentfront" element={<Econtentfront/>}/>
                            <Route path="/Proposal" element={<Proposal/>}/>
                            <Route path="/Setaf/SetafForms/proposalfront" element={<Proposalfront/>}/>
                            <Route path="/visittolibrary" element={<VisitToLibrary/>}/>
                            <Route path="/Setaf/SetafForms/visittolibraryfront" element={<VisittoLibraryfront/>}/>
                            <Route path="/award" element={<Award/>}/>
                            <Route path="/Setaf/SetafForms/award" element={<AwardAtNational/>}/>
                            <Route path="/books" element={<BooksFaculty/>}/>
                            <Route path="/Setaf/SetafForms/books" element={<Books/>}/>
                            <Route path="/motivationfront" element={<Motivationfront/>}/>
                            <Route path="/setaf/studentsmotivation" element={<StudentsMotivation/>}/>
                            <Route path="/professionalfront" element={<Professionalfront/>}/>
                            <Route path="/setaf/professionalpublication" element={<Professionalpublication/>}/>
                            <Route path="/studentfieldwork" element={<StudentFieldwork/>}/>
                            <Route path="/setaf/studentfieldwork" element={<StudentFieldworkFaculty/>}/>
                            <Route path="/fdpsdp" element={<FdpSdpFaculty/>}/>
                            <Route path="/fdpsdp/front" element={<FdpSdpFront/>}/>

                        {/* SeSTA routers */}
                            <Route path="/consolidation" element={<SetafConsolidation/>}/>  
                            <Route path="sesta" element={<SeSTAbuttons/>}/>
                            <Route path="sesta/addform" element={<SeSTAadd/>}/>
                            <Route path="/nptelcertification" element={<NptelCertification/>}/>
                            <Route path="/onlinecertification" element={<OnlineCertification/>}/>
                            <Route path="/studenttechtalks" element={<StudentTechTalks/>}/>
                            <Route path="/studentsparticipation" element={<StudentsParticipation/>}/>
                            <Route path="/intership" element={<Intership/>}/>
                            <Route path="/valueadded" element={<ValueAdded/>}/>
                            <Route path="/studenttechtalk" element={<StudentTechTalks/>}/>

                        {/* Iv routers */}
                            <Route path="/iv" element={<Iv/>}/>
                            <Route path="/ivproposal" element={<Ivadd/>}/>
                            <Route path="/ivinput" element={<IvInput/>}/>
                        </Routes>
                    </BrowserRouter>
                </>
            }
        </>
    )
}