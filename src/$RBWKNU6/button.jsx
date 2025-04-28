import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import generatePDF from './pdf';  // Import the PDF generation logic

const DownloadPDFButton = ({ subjectData, examData }) => {
 
  
  return (
    <div>
      <h1>Generate and Download Marks PDF</h1>
      <PDFDownloadLink
  document={subjectData && examData ? generatePDF(subjectData, examData) : null}
  fileName="student-marks.pdf"
>
  {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
</PDFDownloadLink>

    </div>
  );
};

export default DownloadPDFButton;
