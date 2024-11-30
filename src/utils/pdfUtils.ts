import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Process each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    const cleanedText = fullText
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n');
    
    if (!cleanedText) {
      throw new Error('No readable text found in the PDF');
    }
    
    return cleanedText;
  } catch (error) {
    console.error('Error processing PDF:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process PDF file. Please try again.');
  }
}