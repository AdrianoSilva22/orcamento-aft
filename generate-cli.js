const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('Iniciando geração direta do PDF oficial AFT Reforma Engenharia...');
  const printFilePath = path.join(__dirname, 'public', 'print.html');
  const outputPath = path.join(__dirname, 'Proposta_AFT_Reforma_Oficial.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--allow-file-access-from-files',
      '--enable-local-file-accesses'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    const fileUrl = `file://${printFilePath.replace(/\\/g, '/')}`;
    console.log(`Carregando modelo: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    await page.waitForSelector('#slide-14', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));

    console.log('Exportando arquivo PDF em 1920x1080 (16:9 widescreen)...');
    const pdfBuffer = await page.pdf({
      path: outputPath,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log(`====================================================`);
    console.log(`✅ PDF gerado com sucesso em: ${outputPath}`);
    console.log(`📊 Tamanho do arquivo: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`====================================================`);
  } catch (err) {
    console.error('Erro na geração direta do PDF:', err);
  } finally {
    await browser.close();
  }
}

generatePDF();
