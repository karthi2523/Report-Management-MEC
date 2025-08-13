import "./setafsty.css"


function Setafbutton(){
    return(
        <>
        <div>
             <div class="sels">

                <a href="/consolidation"><div className="consold-btn"><a><button class="bg-danger text-center" style={{color:"white"}}>Consolidated SeTAF</button></a></div></a>      
                <div class="button-containers" style={{marginTop:"-150px"}}>  

                    <a href="/setaf/journalpublication"><button class="menu-buttons" data-category="Journal Publications" style={{width:"250px"}}>Journal Publications</button></a>
                    <a href="/conferencepublication"><button class="menu-buttons" data-category="Conference Publications and Presentations" style={{width:"350px"}}>Conference Publications and Presentations</button></a>
                    <a href="/workshop"> <button class="menu-buttons" data-category="Workshop" style={{width:"250px"}}>Workshop and Seminar</button></a>
                    <a href="/techtalk"> <button class="menu-buttons" data-category="TechTalks to be delivered Multidisciplinary Lectures" style={{width:"400px"}}>TechTalks to be delivered Multidisciplinary Lectures</button></a>
                    <a href="/facultly"><button class="menu-buttons" data-category="Faculty Guest Talk in other Institutions" style={{marginLeft:"80px", width:"300px"}}>Faculty Guest Talk in other Institutions</button></a>
                    <a href="/nptelcertification"> <button class="menu-buttons" data-category="NPTEL Certification">NPTEL Certification</button></a>
                    <a href="/taste"><button class="menu-buttons" data-category="Participation in TASTE">Participation in TASTE</button></a>
                    <a href="/fdpsdp"><button class="menu-buttons" data-category="FDPs or SDPs Certificate" >FDPs/SDPs Certificate</button></a>
                    <a href="/econtent"><button class="menu-buttons" data-category="e-Content,(Video Lecture)">e-Content,(Video Lecture)</button></a>
                    <a href="/industry"><button class="menu-buttons" data-category="Visit to Industries,Institution">Visit to Industries,Institution</button></a>
                    <a href="/seed"><button class="menu-buttons" data-category="Seed Money Proposal for Research">Seed Money Proposal for Research</button></a>
                    <a href="/proposal"><button class="menu-buttons" data-category="Proposals  Submission for Grants">Proposals  Submission for Grants</button></a>
                    <a href="/award"><button class="menu-buttons" data-category="Awards at National,International Level">Awards at National,International Level</button></a>
                    <a href="/books"><button class="menu-buttons" data-category="Books, Chapters Authorship">Books, Chapters Authorship</button></a>
                    <a href="/consultancy"><button class="menu-buttons" data-category="Consultancy and Corporate Training done for Revenue Generation">Consultancy and Corporate Training done for Revenue Generation</button></a>
                    <a href="/patent"><button class="menu-buttons" data-category="Patents Filled,Published,Granted">Patents Filled,Published,Granted</button></a>
                    <a href="/collabrative"><button class="menu-buttons" data-category="Collaborative Activities with MoU Signed Industries,Institutions">Collaborative Activities with MoU Signed Industries,Institutions</button></a>
                    <a href="/visittolibrary"><button class="menu-buttons" data-category="Visits to the Library">Visits to the Library</button></a>
                    <a href="/setaf/studentsmotivation"><button class="menu-buttons" data-category="Students Motivation for Paper Presentation,Project Submission,Other Contests">Students Motivation for Paper Presentation,Project Submission,Other Contests</button></a>
                    <a href="/setaf/professionalpublication"><button class="menu-buttons" data-category="Professional Society Membership">Professional Society Membership</button></a>
                    <a href="/setaf/studentfieldwork"><button class="menu-buttons" data-category="Students Field Work,Internship Guidance">Students Field Work,Internship Guidance</button></a>
                </div>
             </div>
        </div>
        </>
    )
}
export default Setafbutton;