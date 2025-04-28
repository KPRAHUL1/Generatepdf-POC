

import './App.css'
import ExamReportPDF from './PdfGenerator/Pdfrender/examReport'
// import StudentMarksPDFGenerator from './PdfGenerator/Pdfrender/Pdfrender'
// import PDFButton from './PdfGenerator/Pdf-Lib/libbutton'
// import PDFButton from './PdfGenerator/Pdfrender/Pdfrender'
// import JitsiMeetingRoom from './meeting/jitsiMeet'
// import PDFDownloadButton from './PdfGenerator/pdfMake/pdfButton'
import { examData } from './PdfGenerator/Pdfrender/data';
 import { subjectData } from './PdfGenerator/Pdfrender/data'; 




function App() {

  return (
    <>
    
      {/* <JitsiMeetingRoom/> */}
      <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>PDFMake POC (JSX)</h1>
      {/* <StudentMarksPDFGenerator /> */}
      <ExamReportPDF examData={examData} subjectData={subjectData}/>
    </div>
  

    </>
  )
}

export default App
