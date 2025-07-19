import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertHTMLToPDF(htmlFilePath, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to presentation size
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });

    // Load the HTML file
    const htmlPath = path.resolve(htmlFilePath);
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for any animations/QR codes to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get total number of slides
    const totalSlides = await page.evaluate(() => {
      return document.querySelectorAll('.slide').length;
    });

    console.log(`Found ${totalSlides} slides`);

    // Create images directory
    const imagesDir = path.join(path.dirname(outputPath), 'slide-images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    const imageFiles = [];

    // Take screenshot of each slide
    for (let i = 0; i < totalSlides; i++) {
      console.log(`Processing slide ${i + 1}/${totalSlides}`);
      
      // Navigate to slide
      await page.evaluate((slideIndex) => {
        window.showSlide(slideIndex);
      }, i);

      // Wait for slide transition
      await new Promise(resolve => setTimeout(resolve, 800));

      // Take screenshot
      const imagePath = path.join(imagesDir, `slide-${i + 1}.png`);
      await page.screenshot({
        path: imagePath,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 1920,
          height: 1080
        }
      });
      
      imageFiles.push(imagePath);
    }

    console.log('Creating PDF from images...');

    // Create a simple HTML file with all images
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif;
          }
          .slide-page { 
            width: 100vw;
            height: 100vh;
            page-break-after: always;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            box-sizing: border-box;
          }
          .slide-page:last-child { 
            page-break-after: avoid;
          }
          .slide-image { 
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          @page {
            size: A4 landscape;
            margin: 0.5cm;
          }
        </style>
      </head>
      <body>
    `;

    // Add each image as a page
    for (let i = 0; i < imageFiles.length; i++) {
      const imageData = fs.readFileSync(imageFiles[i], { encoding: 'base64' });
      htmlContent += `
        <div class="slide-page">
          <img class="slide-image" src="data:image/png;base64,${imageData}" alt="Slide ${i + 1}">
        </div>
      `;
    }

    htmlContent += '</body></html>';

    // Create new page for PDF generation
    const pdfPage = await browser.newPage();
    await pdfPage.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF
    await pdfPage.pdf({
      path: outputPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0.5cm',
        right: '0.5cm',
        bottom: '0.5cm',
        left: '0.5cm'
      }
    });

    // Clean up image files
    console.log('Cleaning up temporary files...');
    for (const imageFile of imageFiles) {
      fs.unlinkSync(imageFile);
    }
    fs.rmdirSync(imagesDir);

    console.log(`PDF saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error converting to PDF:', error);
  } finally {
    await browser.close();
  }
}

// Usage
const htmlFile = process.argv[2];
const outputFile = process.argv[3];

if (!htmlFile || !outputFile) {
  console.log('Usage: node html-to-pdf.js <input.html> <output.pdf>');
  console.log('Example: node html-to-pdf.js presentation.html presentation.pdf');
  process.exit(1);
}

if (!fs.existsSync(htmlFile)) {
  console.error(`Error: File ${htmlFile} not found`);
  process.exit(1);
}

convertHTMLToPDF(htmlFile, outputFile);
