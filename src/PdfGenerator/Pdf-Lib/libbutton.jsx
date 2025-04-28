import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const PDFButton = () => {
  const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Embed Helvetica font
    const font = await pdfDoc.embedStandardFont('Helvetica');

    // Define headers
    const headers = ['Student Name', 'Subject', 'Marks'];
    const subHeaders = ['Theory', 'Practical']; // Sub-columns under 'Subject'

    // Sample data for rows
    const rows = [
      ['John Doe', ['90', '85'], '175'],
      ['Jane Smith', ['95', '88'], '183'],
      ['Tom Lee', ['78', '80'], '158'],
    ];

    // Table formatting options
    const columnWidth = 120;
    const subColumnWidth = 60; // Width for sub-columns (Theory and Practical)
    const rowHeight = 20;
    let yPosition = height - 100; // Start drawing from 100 units from the top

    // Draw headers
    headers.forEach((header, index) => {
      page.drawText(header, {
        x: 50 + index * columnWidth,
        y: yPosition,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      if (header === 'Subject') {
        // If it's the "Subject" column, we need to draw sub-columns (Theory and Practical)
        page.drawText(subHeaders[0], {
          x: 50 + index * columnWidth, 
          y: yPosition - rowHeight, // Move down for the sub-header
          font,
          size: 10,
          color: rgb(0, 0, 0),
        });

        page.drawText(subHeaders[1], {
          x: 50 + index * columnWidth + subColumnWidth, // Move right for the second sub-column
          y: yPosition - rowHeight,
          font,
          size: 10,
          color: rgb(0, 0, 0),
        });
      }
    });

    // Draw the table rows
    yPosition -= rowHeight; // Move down to the next row
    rows.forEach((row) => {
      row.forEach((cell, index) => {
        if (Array.isArray(cell)) {
          // If it's an array (sub-column data for 'Subject')
          page.drawText(cell[0], {
            x: 50 + index * columnWidth,
            y: yPosition,
            font,
            size: 10,
            color: rgb(0, 0, 0),
          });
          page.drawText(cell[1], {
            x: 50 + index * columnWidth + subColumnWidth, // Move right for the second sub-column
            y: yPosition,
            font,
            size: 10,
            color: rgb(0, 0, 0),
          });
        } else {
          page.drawText(cell, {
            x: 50 + index * columnWidth,
            y: yPosition,
            font,
            size: 10,
            color: rgb(0, 0, 0),
          });
        }
      });
      yPosition -= rowHeight; // Move down to the next row
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and trigger the download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-pdf.pdf'; // The name of the downloaded PDF
    link.click(); // Trigger the download
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PDFButton;
