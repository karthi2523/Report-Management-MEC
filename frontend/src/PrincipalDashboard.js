import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrincipalMenu } from "./PrincipalMenu"

import PDFGenerator from "./pdfGenerator"
import { ViewReqPrincipal } from "./ViewReqPriincipal"
import { PrincipalECRPage } from "./PrincipalECRPage"
import Setafbutton from "./Setaf/Setafbuttons"
import { AwardPrincipal, BooksPrincipalDashboard, CollabrativePrincipal, ConferencePublicationPrincipalDashboard, ConsultancyPrincipalDashboard, Econtent_principal, FacultyGuestTalkPrincipalDashboard, FdpSdpPrincipal, FieldworkPrincipalDashboard, IndustryPrincipalDashboard, JournalPublicationPrincipalDashboard, MotivationPrincipalDashboard, NptelprincipalDashboard, PatentsfilledPrincipalDashboard, ProfessionalPrincipalDashboard, ProposalPrincipaldashboard, SeedPrincipalDashboard, TasteprincipalDashboard, TechtalPrincipalView,  VisitToLibraryPrincipal,  WorkshopPrincipalDashboard } from "./Setaf/SetafPrincipalView"
import SetafConsolidationPrincipal from "./Setaf/SetafConsolidatePrincipal"
import { Conferencefront, Facultyfront, Techtalks, Workshopfront } from "./Setaf/SetafForms"

export const PrincipalDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <PrincipalMenu/>
                <Routes>
                <Route path="/Setaf" element={<Setafbutton/>}/> 
                <Route path="/setaf/journalpublication" element={<JournalPublicationPrincipalDashboard/>}/>
                <Route path="/consolidation" element={<SetafConsolidationPrincipal/>}/> 
                <Route path="/conferencepublication" element={<ConferencePublicationPrincipalDashboard/>}/>
                <Route path="/workshop" element={<WorkshopPrincipalDashboard/>}/>
                <Route path="/Setaf/SetafForms/Workshopfront" element={<Workshopfront/>}/>
                <Route path="/facultly" element={<FacultyGuestTalkPrincipalDashboard/>}/>
                <Route path="/Setaf/SetafForms/facultyfront" element={<Facultyfront/>}/>
                <Route path="/techtalk" element={<TechtalPrincipalView/>}/>
                <Route path="/Setaf/SetafForms/techtalks" element={<Techtalks/>}/>                            
                <Route path="/nptelcertification" element={<NptelprincipalDashboard/>}/>
                <Route path="/taste" element={<TasteprincipalDashboard/>}/>
                <Route path="/consultancy" element={<ConsultancyPrincipalDashboard/>}/>
                <Route path="/patent" element={<PatentsfilledPrincipalDashboard/>}/>
                <Route path="/seed" element={<SeedPrincipalDashboard/>}/>
                <Route path="/econtent" element={<Econtent_principal/>}/>
                <Route path="/industry" element={<IndustryPrincipalDashboard/>}/>
                <Route path="/visittolibrary" element={<VisitToLibraryPrincipal/>}/>
                <Route path="/award" element={<AwardPrincipal/>}/>
                <Route path="/books" element={<BooksPrincipalDashboard/>}/>
                <Route path="/proposal" element={<ProposalPrincipaldashboard/>}/>
                <Route path="/collabrative" element={<CollabrativePrincipal/>}/>
                <Route path="/setaf/studentsmotivation" element={<MotivationPrincipalDashboard/>}/>
                <Route path="/setaf/professionalpublication" element={<ProfessionalPrincipalDashboard/>}/>
                <Route path="/setaf/studentfieldwork" element={<FieldworkPrincipalDashboard/>}/>
                <Route path="/fdpsdp" element={<FdpSdpPrincipal/>}/>
                

                <Route path="" element={<ViewReqPrincipal/>} />
                <Route path="viewPdf" element={<PDFGenerator/>} />
                <Route path="principalecr" element={<PrincipalECRPage/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}