import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HodMenu } from "./HodMenu"
import { ViewSeminar } from "./ViewSeminar"
import PDFGenerator from "./pdfGenerator"
import { HodECRPage } from "./HodECRPage"
import Setafbutton from "./Setaf/Setafbuttons"
import SetafConsolidation from "./Setaf/SetafConsolidate"
import SetafConsolidationHod from "./Setaf/SetafConsolidateHod"
import { JournalPublication, StudentFieldworkFaculty } from "./Setaf/SetafFAcultyView"
import { AwardAtNational, Books, Collabrativefront, Conferencefront, Consultancyfront, Econtentfront, Facultyfront, FdpSdpFront, Journalfront, Motivationfront, Nptelfront, Patentfilledfront, Professionalfront, Proposalfront, Seedfront, StudentFieldwork, Tastefront, Techtalks, VisittoIndustryfront, VisittoLibraryfront, Workshopfront } from "./Setaf/SetafForms"
import { AwardHod, BooksHod, CollabrativeHod, ConferencePublicationHodDashboard, ConsultancyHodDashboard, Econtent, FacultyGuestTalkHodDashboard, FdpSdpHod, FieldworkHodDashboard, IndustryHodDashboard, JournalPublicationHodDashboard, MotivationPublicationHodDashboard, NptelhodDashboard, PatentsfilledHod, ProfessionalHodDashboard, ProfessionalpublicationHodDashboard, Proposal, ProposalHodView, SeedHodDashboard, TastehodDashboard, TechtalkHodView, VisitToLibrary, VisitToLibraryHod, WorkshopHodDashboard } from "./Setaf/SetafHodView"

export const HodDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <HodMenu/>
                {/* <ViewSeminar/> */}
                <Routes >
               
               
                
                <Route path="" element={<ViewSeminar/>} />
                <Route path="viewPdf" element={<PDFGenerator/>} />
                <Route path="hodecr" element={<HodECRPage/>} />
                {/* setaf */}
                <Route path="/consolidation" element={<SetafConsolidationHod/>}/> 
                <Route path="/Setaf" element={<Setafbutton/>}/> 
                <Route path="/setaf/journalpublication" element={<JournalPublicationHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/Journalfront" element={<Journalfront/>}/>
                <Route path="/conferencepublication" element={<ConferencePublicationHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/Conferencefront" element={<Conferencefront/>}/>
                <Route path="/workshop" element={<WorkshopHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/Workshopfront" element={<Workshopfront/>}/>
                <Route path="/techtalk" element={<TechtalkHodView/>}/>
                <Route path="/Setaf/SetafForms/techtalks" element={<Techtalks/>}/>            
                <Route path="/facultly" element={<FacultyGuestTalkHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/facultyfront" element={<Facultyfront/>}/>
                <Route path="/Nptelcertification" element={<NptelhodDashboard/>}/>
                <Route path="Setaf/SetafForms/nptelform" element={<Nptelfront/>}/>
                <Route path="/taste" element={<TastehodDashboard/>}/>
                <Route path="/Setaf/SetafForms/tastefront" element={<Tastefront/>}/>
                <Route path="/consultancy" element={<ConsultancyHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/consultancyfront" element={<Consultancyfront/>}/>
                <Route path="/patent" element={<PatentsfilledHod/>}/>
                <Route path="/Setaf/SetafForms/patentfront" element={<Patentfilledfront/>}/>
                <Route path="/seed" element={<SeedHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/seedfront" element={<Seedfront/>}/>
                <Route path="/econtent" element={<Econtent/>}/>
                <Route path="/Setaf/SetafForms/Econtentfront" element={<Econtentfront/>}/>
                <Route path="/Proposal" element={<ProposalHodView/>}/>
                <Route path="/Setaf/SetafForms/proposalfront" element={<Proposalfront/>}/>
                <Route path="/industry" element={<IndustryHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/visittoindustry" element={<VisittoIndustryfront/>}/>
                <Route path="/collabrative" element={<CollabrativeHod/>}/>
                <Route path="/Setaf/SetafForms/collabrative" element={<Collabrativefront/>}/>  
                <Route path="/visittolibrary" element={<VisitToLibraryHod/>}/>
                <Route path="/Setaf/SetafForms/visittolibraryfront" element={<VisittoLibraryfront/>}/>
                <Route path="/award" element={<AwardHod/>}/>
                <Route path="/Setaf/SetafForms/award" element={<AwardAtNational/>}/>
                <Route path="/books" element={<BooksHod/>}/>
                <Route path="/Setaf/SetafForms/books" element={<Books/>}/>
                <Route path="/motivationfront" element={<Motivationfront/>}/>
                <Route path="/setaf/studentsmotivation" element={<MotivationPublicationHodDashboard/>}/>
                <Route path="/professionalfront" element={<Professionalfront/>}/>
                <Route path="/setaf/professionalpublication" element={<ProfessionalHodDashboard/>}/>
                <Route path="/studentfieldwork" element={<StudentFieldwork/>}/>
                <Route path="/setaf/studentfieldwork" element={<FieldworkHodDashboard/>}/>
                <Route path="/fdpsdp" element={<FdpSdpHod/>}/>
                <Route path="/fdpsdp/front" element={<FdpSdpFront/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}