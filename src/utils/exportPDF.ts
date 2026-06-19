import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string = 'dashboard.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    alert('Dashboard content not found. Please refresh and try again.');
    return;
  }

  // Show loading indicator (optional)
  const loadingToast = document.createElement('div');
  loadingToast.innerText = 'Generating PDF, please wait...';
  loadingToast.style.position = 'fixed';
  loadingToast.style.bottom = '20px';
  loadingToast.style.left = '50%';
  loadingToast.style.transform = 'translateX(-50%)';
  loadingToast.style.backgroundColor = '#333';
  loadingToast.style.color = '#fff';
  loadingToast.style.padding = '8px 16px';
  loadingToast.style.borderRadius = '8px';
  loadingToast.style.zIndex = '9999';
  document.body.appendChild(loadingToast);

  try {
    // Capture the element as PNG
    const dataUrl = await toPng(element, {
      quality: 1,
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      cacheBust: true,
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297;
    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgHeight = (img.height * imgWidth) / img.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF with a valid filename
    pdf.save(filename);
    
    // Remove loading toast
    document.body.removeChild(loadingToast);
  } catch (error) {
    console.error('PDF export failed:', error);
    document.body.removeChild(loadingToast);
    alert('PDF export failed. Please try again or use a different browser.\n\nError: ' + (error as Error).message);
  }
};