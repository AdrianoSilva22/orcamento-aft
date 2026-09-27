// api/generate-pdf.js
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const proposalData = req.body;
  console.log('Generating PDF for:', proposalData?.proposal?.clientName || 'default');

  let browser = null;
  try {
    const executablePath = await chrome.executablePath;
    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath,
      headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    // Pass data to frontend via localStorage
    await page.evaluateOnNewDocument((data) => {
      if (data) {
        localStorage.setItem('aft_proposal_data', JSON.stringify(data));
      }
    }, proposalData);

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`;
    const printUrl = `${baseUrl}/print.html`;
    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('#slide-14', { timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1200));

    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    });

    const clientName = proposalData?.proposal?.clientName || 'Cliente';
    const safeClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Proposta_AFT_Reforma_${safeClientName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    res.status(500).json({ error: 'Erro ao gerar o PDF', details: err.message });
  } finally {
    if (browser) await browser.close();
  }
};
