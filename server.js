const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

let puppeteer;
let chrome;
try {
  puppeteer = require('puppeteer-core');
  chrome = require('chrome-aws-lambda');
} catch (e) {
  puppeteer = require('puppeteer');
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota de status do servidor
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    system: 'Gerador de Propostas AFT Reforma Engenharia',
    version: '1.0.0'
  });
});

// Singleton browser pool para respostas ultra-rápidas em desenvolvimento
let sharedBrowser = null;
async function getBrowser() {
  if (sharedBrowser && sharedBrowser.isConnected()) {
    return sharedBrowser;
  }
  try {
    sharedBrowser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--font-render-hinting=none'
      ]
    });
    sharedBrowser.on('disconnected', () => { sharedBrowser = null; });
    return sharedBrowser;
  } catch (err) {
    console.warn('Fallback para novo browser launch:', err);
    return await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  }
}

// Endpoint otimizado para gerar e baixar o PDF em alta definição
app.post('/api/generate-pdf', async (req, res) => {
  const proposalData = req.body;
  const clientName = proposalData?.proposal?.clientName || 'Edificio_Carvalho';
  console.log(`[PDF] Solicitado para: ${clientName}`);

  const startTime = Date.now();
  let page = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    // 1920x1080 com scaleFactor otimizado (alta nitidez vetorial com 3x mais velocidade)
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1.25 });

    // Injetar os dados no localStorage antes de carregar print.html
    await page.evaluateOnNewDocument((data) => {
      if (data) {
        localStorage.setItem('aft_proposal_data', JSON.stringify(data));
      }
    }, proposalData);

    const printUrl = `http://localhost:${PORT}/print.html`;
    await page.goto(printUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Aguardar o último slide renderizar e fontes estarem prontas
    await page.waitForSelector('#slide-14', { timeout: 10000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));

    // Gerar o PDF no formato 16:9 widescreen
    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    const safeClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Proposta_AFT_Reforma_${safeClientName}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[PDF] Gerado com sucesso em ${elapsed}s: ${filename} (${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Erro na geração do PDF:', err);
    res.status(500).json({ error: 'Erro ao gerar o PDF', details: err.message });
  } finally {
    if (page) {
      try { await page.close(); } catch (e) {}
    }
  }
});

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Sistema AFT Reforma Engenharia - Orçamentos em PDF`);
  console.log(`📍 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = PORT + 1;
    app.listen(ALT_PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error('Erro no servidor:', err);
  }
});
