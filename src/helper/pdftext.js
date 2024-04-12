import React, { useState } from 'react';
import { Document, Page, pdfjs } from '@react-pdf/renderer/dist/react-pdf.es.js';

// Set workerSrc property to load PDF.js worker from cdn
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfTextExtractor({ pdfFile }) {
    const [text, setText] = useState('');

    // Function to handle text extraction
    const handleTextExtraction = () => {
        // Create a new FileReader
        const reader = new FileReader();

        // Read the contents of the PDF file as ArrayBuffer
        reader.readAsArrayBuffer(pdfFile);

        // When the reading operation is complete
        reader.onload = async () => {
            try {
                // Load the PDF document
                const pdf = await pdfjs.getDocument({ data: reader.result }).promise;

                // Initialize an empty string to store the extracted text
                let extractedText = '';

                // Iterate through each page of the PDF document
                for (let i = 1; i <= pdf.numPages; i++) {
                    // Retrieve the text content of the current page
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    
                    // Concatenate the text content of the current page to the extracted text
                    extractedText += content.items.map(item => item.str).join(' ');
                }

                // Update the state with the extracted text
                setText(extractedText);
            } catch (error) {
                console.error('Error extracting text from PDF:', error);
            }
        };
    };

    return (
        <div>
            <button onClick={handleTextExtraction}>Extract Text</button>
            <div>{text}</div>
        </div>
    );
}

export default PdfTextExtractor;
