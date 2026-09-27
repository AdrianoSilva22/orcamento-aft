// Gerenciador da Aplicação AFT Reforma Engenharia - Dashboard e Geração de PDF

let currentData = JSON.parse(JSON.stringify(defaultProposalData));
let currentZoom = 0.5; // 50% scale for comfortable viewing of 1920x1080 slides

document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados salvos se houver
  const saved = localStorage.getItem('aft_proposal_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Garantir mesclagem com dados padrão para não faltar nenhum campo
      currentData = Object.assign({}, defaultProposalData, parsed);
      if (parsed.company) currentData.company = Object.assign({}, defaultProposalData.company, parsed.company);
      if (parsed.proposal) currentData.proposal = Object.assign({}, defaultProposalData.proposal, parsed.proposal);
      if (parsed.pricingOptions && parsed.pricingOptions.length === 4) currentData.pricingOptions = parsed.pricingOptions;
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
      currentData = JSON.parse(JSON.stringify(defaultProposalData));
    }
  }

  // Garantir telefone e whatsapp atualizados (81 9 92382246)
  if (!currentData.company.phone || currentData.company.phone.includes('8213')) {
    currentData.company.phone = "(81) 9 9238-2246";
    currentData.company.whatsappLink = "https://wa.me/5581992382246";
  }

  // Sincronizar inputs
  syncInputsWithData();

  // Render inicial dos 14 slides
  renderAllSlides();

  // Escutar alterações nos campos
  setupInputListeners();

  // Configurar Zoom
  setupZoomControls();

  // Configurar Ações dos Botões
  setupActions();

  // Carregar lista de orçamentos salvos
  renderSavedProposalsList();
});

function syncInputsWithData() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : '';
  };

  setVal('clientName', currentData.proposal.clientName || 'EDIFÍCIO CARVALHO');
  setVal('proposalTitle', currentData.proposal.title || 'Proposta Reforma e Revitalização de Fachada');
  setVal('proposalVersion', currentData.proposal.version || 'versão 1');
  setVal('proposalDate', currentData.proposal.date || '26/09/2026');
  setVal('validityDays', currentData.proposal.validityDays || 30);

  const topbarName = document.getElementById('topbar-client-display');
  if (topbarName) {
    topbarName.textContent = currentData.proposal.clientName || 'EDIFÍCIO CARVALHO';
  }

  // Pricing
  const p = currentData.pricingOptions;
  if (p && p.length >= 4) {
    setVal('opt1-name', p[0].name);
    setVal('opt1-unit', p[0].unitValue);
    setVal('opt1-total', p[0].totalValue);
    setVal('opt1-down', p[0].downPayment);
    setVal('opt1-inst', p[0].installments);

    setVal('opt2-name', p[1].name);
    setVal('opt2-unit', p[1].unitValue);
    setVal('opt2-total', p[1].totalValue);
    setVal('opt2-down', p[1].downPayment);
    setVal('opt2-inst', p[1].installments);

    setVal('opt3-name', p[2].name);
    setVal('opt3-unit', p[2].unitValue);
    setVal('opt3-total', p[2].totalValue);
    setVal('opt3-down', p[2].downPayment);
    setVal('opt3-inst', p[2].installments);

    setVal('opt4-name', p[3].name);
    setVal('opt4-unit', p[3].unitValue);
    setVal('opt4-total', p[3].totalValue);
    setVal('opt4-down', p[3].downPayment);
    setVal('opt4-inst', p[3].installments);
  }

  // Company
  setVal('companyPhone', currentData.company.phone || '(81) 9 9238-2246');
  setVal('companyEmail', currentData.company.email || 'aaftreforma@gmail.com');
  setVal('companyEngineer', currentData.company.engineer || 'Engº Josias Celestino');
  setVal('companyCrea', currentData.company.crea || 'CREA/PE Nº 1806255200');
}

function updateDataFromInputs() {
  const getVal = (id, fallback = '') => {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  };

  currentData.proposal.clientName = getVal('clientName', 'EDIFÍCIO CARVALHO');
  currentData.proposal.title = getVal('proposalTitle', 'Proposta Reforma e Revitalização de Fachada');
  currentData.proposal.version = getVal('proposalVersion', 'versão 1');
  currentData.proposal.date = getVal('proposalDate', '26/09/2026');
  currentData.proposal.validityDays = getVal('validityDays', 30);

  const topbarName = document.getElementById('topbar-client-display');
  if (topbarName) {
    topbarName.textContent = currentData.proposal.clientName || 'EDIFÍCIO CARVALHO';
  }

  // Options
  currentData.pricingOptions[0].name = getVal('opt1-name', 'RECUPERAÇÃO PONTUAL');
  currentData.pricingOptions[0].unitValue = getVal('opt1-unit', 'R$ 3.800,00 / pilar');
  currentData.pricingOptions[0].totalValue = getVal('opt1-total', 'R$ 38.000,00');
  currentData.pricingOptions[0].downPayment = getVal('opt1-down', 'R$ 7.600,00');
  currentData.pricingOptions[0].installments = getVal('opt1-inst', '5 parcelas de R$ 6.080,00');

  currentData.pricingOptions[1].name = getVal('opt2-name', 'REVITALIZAÇÃO BÁSICA');
  currentData.pricingOptions[1].unitValue = getVal('opt2-unit', 'R$ 68,00 / m²');
  currentData.pricingOptions[1].totalValue = getVal('opt2-total', 'R$ 74.800,00');
  currentData.pricingOptions[1].downPayment = getVal('opt2-down', 'R$ 14.960,00');
  currentData.pricingOptions[1].installments = getVal('opt2-inst', '6 parcelas de R$ 9.973,33');

  currentData.pricingOptions[2].name = getVal('opt3-name', 'REFORMA COMPLETA');
  currentData.pricingOptions[2].unitValue = getVal('opt3-unit', 'R$ 95,00 / m²');
  currentData.pricingOptions[2].totalValue = getVal('opt3-total', 'R$ 104.500,00');
  currentData.pricingOptions[2].downPayment = getVal('opt3-down', 'R$ 20.900,00');
  currentData.pricingOptions[2].installments = getVal('opt3-inst', '8 parcelas de R$ 10.450,00');

  currentData.pricingOptions[3].name = getVal('opt4-name', 'PREMIUM INTEGRAL');
  currentData.pricingOptions[3].unitValue = getVal('opt4-unit', 'R$ 128,00 / m²');
  currentData.pricingOptions[3].totalValue = getVal('opt4-total', 'R$ 140.800,00');
  currentData.pricingOptions[3].downPayment = getVal('opt4-down', 'R$ 28.160,00');
  currentData.pricingOptions[3].installments = getVal('opt4-inst', '10 parcelas de R$ 11.264,00');

  // Company
  currentData.company.phone = getVal('companyPhone', '(81) 9 9238-2246');
  currentData.company.email = getVal('companyEmail', 'aaftreforma@gmail.com');
  currentData.company.engineer = getVal('companyEngineer', 'Engº Josias Celestino');
  currentData.company.crea = getVal('companyCrea', 'CREA/PE Nº 1806255200');

  localStorage.setItem('aft_proposal_data', JSON.stringify(currentData));
  renderAllSlides();
}

function setupInputListeners() {
  const inputs = document.querySelectorAll('.form-input, .form-input-large, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      updateDataFromInputs();
    });
  });
}

function renderAllSlides() {
  const container = document.getElementById('preview-container');
  if (!container) return;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = generateSlidesHTML(currentData);

  const slides = Array.from(tempDiv.querySelectorAll('.slide'));
  container.innerHTML = '';

  const scale = currentZoom;
  const containerWidth = 1920 * scale;
  const containerHeight = 1080 * scale;

  slides.forEach((slide) => {
    const scaleContainer = document.createElement('div');
    scaleContainer.className = 'slide-scale-container';
    scaleContainer.style.width = `${containerWidth}px`;
    scaleContainer.style.height = `${containerHeight}px`;

    const scaleInner = document.createElement('div');
    scaleInner.className = 'slide-scale-inner';
    scaleInner.style.transform = `scale(${scale})`;

    scaleInner.appendChild(slide);
    scaleContainer.appendChild(scaleInner);
    container.appendChild(scaleContainer);
  });
}

function setupZoomControls() {
  const zoomText = document.getElementById('zoom-text');
  const btnIn = document.getElementById('btn-zoom-in');
  const btnOut = document.getElementById('btn-zoom-out');

  if (!zoomText || !btnIn || !btnOut) return;

  const updateZoomDisplay = () => {
    zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
    renderAllSlides();
  };

  btnIn.addEventListener('click', () => {
    if (currentZoom < 0.9) {
      currentZoom += 0.1;
      updateZoomDisplay();
    }
  });

  btnOut.addEventListener('click', () => {
    if (currentZoom > 0.3) {
      currentZoom -= 0.1;
      updateZoomDisplay();
    }
  });
}

function setupActions() {
  // Gerar PDF oficial via Puppeteer Backend
  const btnPdf = document.getElementById('btn-generate-pdf');
  const toast = document.getElementById('toast-loading');

  if (btnPdf) {
    btnPdf.addEventListener('click', async () => {
      if (toast) toast.classList.add('active');
      btnPdf.disabled = true;

      try {
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentData)
        });

        if (!response.ok) {
          throw new Error('Falha no servidor ao gerar PDF');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const safeName = (currentData.proposal.clientName || 'Cliente').replace(/[^a-zA-Z0-9_-]/g, '_');
        a.href = downloadUrl;
        a.download = `Proposta_AFT_Reforma_${safeName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } catch (err) {
        console.warn('Erro ao gerar PDF no backend:', err);
        // Fallback imediato: abre a página de impressão formatada em 16:9
        const usarNavegador = confirm('O serviço em nuvem demorou para responder. Deseja abrir a visualização oficial e salvar em PDF direto pelo seu navegador agora?');
        if (usarNavegador) {
          window.open('/print.html', '_blank');
        }
      } finally {
        if (toast) toast.classList.remove('active');
        btnPdf.disabled = false;
      }
    });
  }

  // Imprimir pelo navegador direto
  const btnPrint = document.getElementById('btn-browser-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.open('/print.html', '_blank');
    });
  }

  // Modo Apresentação em Tela Cheia
  const btnFullscreen = document.getElementById('btn-fullscreen-mode');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      window.open('/print.html', '_blank');
    });
  }

  // Salvar novo cliente / proposta no histórico
  const btnSaveClient = document.getElementById('btn-save-client');
  if (btnSaveClient) {
    btnSaveClient.addEventListener('click', () => {
      saveCurrentProposalToLibrary();
    });
  }

  // Restaurar dados padrão de fábrica
  const btnReset = document.getElementById('btn-reset-data');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Deseja restaurar todos os valores para o modelo padrão (Edifício Carvalho)?')) {
        currentData = JSON.parse(JSON.stringify(defaultProposalData));
        localStorage.setItem('aft_proposal_data', JSON.stringify(currentData));
        syncInputsWithData();
        renderAllSlides();
        alert('Modelo de exemplo restaurado com sucesso!');
      }
    });
  }
}

// Histórico de Orçamentos Salvos
function getSavedProposals() {
  try {
    return JSON.parse(localStorage.getItem('aft_saved_library') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCurrentProposalToLibrary() {
  const library = getSavedProposals();
  const name = currentData.proposal.clientName || 'Novo Condomínio';
  
  const existingIdx = library.findIndex(item => (item.proposal?.clientName || '').trim().toUpperCase() === name.trim().toUpperCase());
  if (existingIdx >= 0) {
    library[existingIdx] = JSON.parse(JSON.stringify(currentData));
  } else {
    library.push(JSON.parse(JSON.stringify(currentData)));
  }
  localStorage.setItem('aft_saved_library', JSON.stringify(library));
  renderSavedProposalsList();
  alert(`Orçamento para "${name}" salvo com sucesso no navegador!`);
}

function loadProposalFromLibrary(index) {
  const library = getSavedProposals();
  if (library[index]) {
    currentData = JSON.parse(JSON.stringify(library[index]));
    localStorage.setItem('aft_proposal_data', JSON.stringify(currentData));
    syncInputsWithData();
    renderAllSlides();
  }
}

function renderSavedProposalsList() {
  const select = document.getElementById('saved-proposals-select');
  if (!select) return;

  const library = getSavedProposals();
  select.innerHTML = '<option value="">📂 Meus Orçamentos Salvos</option>';
  library.forEach((item, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${item.proposal?.clientName || 'Proposta'} (${item.proposal?.date || ''})`;
    select.appendChild(opt);
  });

  select.onchange = (e) => {
    if (e.target.value !== '') {
      loadProposalFromLibrary(Number(e.target.value));
    }
  };
}
