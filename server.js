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

// Endpoint para gerar e baixar o PDF em alta resolução via Puppeteer
app.post('/api/generate-pdf', async (req, res) => {
  const proposalData = req.body;
  console.log('Recebida solicitação de geração de PDF para:', proposalData?.proposal?.clientName || 'Cliente Padrão');

  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    // Injetar os dados no localStorage antes de carregar print.html
    await page.evaluateOnNewDocument((data) => {
      if (data) {
        localStorage.setItem('aft_proposal_data', JSON.stringify(data));
      }
    }, proposalData);

    // Carregar a página de impressão
    const printUrl = `http://localhost:${PORT}/print.html`;
    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    // Aguardar imagens e fontes renderizarem completamente
    await page.waitForSelector('#slide-14', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));

    // Gerar o PDF no formato 16:9 widescreen em alta fidelidade
    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    const clientName = proposalData?.proposal?.clientName || 'Edificio_Carvalho';
    const safeClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Proposta_AFT_Reforma_${safeClientName}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length
    });

    console.log(`PDF gerado com sucesso: ${filename} (${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Erro na geração do PDF:', err);
    res.status(500).json({ error: 'Erro ao gerar o PDF', details: err.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Sistema AFT Reforma Engenharia - Orçamentos em PDF`);
  console.log(`📍 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📄 Editor Interativo:   http://localhost:${PORT}`);
  console.log(`🖨️ Prévia para Impressão: http://localhost:${PORT}/print.html`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = PORT + 1;
    console.log(`Porta ${PORT} em uso, tentando porta ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error('Erro no servidor:', err);
  }
});
