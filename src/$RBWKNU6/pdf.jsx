import React from 'react';
import { PDFDocument } from 'pdf-lib';

const subjects = ['Tamil', 'English', 'Maths', 'Science', 'Social'];

const generatePDF = async (subjectData, examData) => {
  // Check if required data is present
  if (!subjectData || !examData) {
    console.error("Subject data or Exam data is missing!");
    return;
  }

  // Log the data to verify it's being passed correctly
  console.log("Subject Data: ", subjectData);
  console.log("Exam Data: ", examData);

  // Create a new PDF document using pdf-lib
  const pdfDoc = await PDFDocument.create();

  // Add a page to the PDF document
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();

  // Add title and subtitle (no custom font)
  page.drawText('ARUNACHALAM HIGHER SECONDARY SCHOOL', {
    x: 50,
    y: height - 50,
    size: 14,
    fontSize: 12, // Default font size without custom font
  });

  page.drawText(
    `Class VI - Section A (${examData?.month || 'Exam'})`,
    {
      x: 50,
      y: height - 70,
      size: 12,
      fontSize: 12,
    }
  );

  // Draw table headers
  let yPosition = height - 120; // Starting Y position for table headers
  page.drawText('#', { x: 50, y: yPosition, size: 10 });
  page.drawText('Student Name', { x: 100, y: yPosition, size: 10 });
  page.drawText('Section', { x: 250, y: yPosition, size: 10 });

  // Draw subject headers (SA and Tot for each subject)
  let xPosition = 300;
  subjects.forEach((subject) => {
    page.drawText(`${subject} SA`, { x: xPosition, y: yPosition, size: 10 });
    page.drawText(`${subject} Tot`, { x: xPosition + 50, y: yPosition, size: 10 });
    xPosition += 100;
  });

  page.drawText('Total', { x: xPosition, y: yPosition, size: 10 });
  page.drawText('Rank', { x: xPosition + 50, y: yPosition, size: 10 });

  // Draw student data
  yPosition -= 20; // Move down for the first student row
  subjectData.forEach((student, index) => {
    // Log individual student data for debugging
    console.log("Student: ", student);

    // Draw student row
    page.drawText(`${index + 1}`, { x: 50, y: yPosition, size: 10 });
    page.drawText(student.firstName, { x: 100, y: yPosition, size: 10 });
    page.drawText(student.section, { x: 250, y: yPosition, size: 10 });

    let total = 0;
    xPosition = 300;

    subjects.forEach((subject) => {
      const subj = student.subjects.find((s) => s.name === subject);
      const sa = subj?.marks?.[0] || 0; // Default to 0 if marks are undefined
      const tot = subj?.marks?.[1] || 0; // Default to 0 for total marks if undefined
      total += tot;

      // Ensure that the values being passed to drawText are strings
      page.drawText(`${sa} / ${tot}`, { x: xPosition, y: yPosition, size: 10 });
      xPosition += 50;
    });

    page.drawText(`${total}`, { x: xPosition, y: yPosition, size: 10 });
    page.drawText('Rank', { x: xPosition + 50, y: yPosition, size: 10 });

    yPosition -= 20; // Move down for the next student row
  });

  // Save the PDF
  try {
    const pdfBytes = await pdfDoc.save();
    console.log("Generated PDF Bytes: ", pdfBytes);

    // Create a Blob from the generated PDF and trigger download
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'student-marks.pdf';
    link.click();
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const DownloadPDFButton = ({ subjectData, examData }) => {
  const handleDownload = async () => {
    if (subjectData && examData) {
      await generatePDF(subjectData, examData);
    } else {
      console.error("Missing data for PDF generation.");
    }
  };

  return (
    <div>
      <h1>Generate and Download Marks PDF</h1>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default DownloadPDFButton;
