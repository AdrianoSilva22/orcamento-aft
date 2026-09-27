// Gerenciador da Aplicação AFT Reforma Engenharia - Dashboard e Geração de PDF

let currentData = JSON.parse(JSON.stringify(defaultProposalData));
let currentZoom = 0.5; // 50% scale for comfortable viewing of 1920x1080 slides

document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados salvos se houver
  const saved = localStorage.getItem('aft_proposal_data');
  if (saved) {
    try {
      currentData = JSON.parse(saved);
      syncInputsWithData();
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
    }
  }

  // Render inicial
  renderAllSlides();

  // Escutar alterações nos campos
  setupInputListeners();

  // Configurar Zoom
  setupZoomControls();

  // Configurar Ações dos Botões
  setupActions();

  // Carregar lista de orçamentos salvos
  // renderSavedProposalsList(); // disabled – sidebar removed
});

function syncInputsWithData() {
  document.getElementById('clientName').value = currentData.proposal.clientName || '';
  document.getElementById('proposalTitle').value = currentData.proposal.title || '';
  document.getElementById('proposalVersion').value = currentData.proposal.version || '';
  document.getElementById('proposalDate').value = currentData.proposal.date || '';
  document.getElementById('validityDays').value = currentData.proposal.validityDays || 30;

  // Pricing
  const p = currentData.pricingOptions;
  if (p && p.length >= 4) {
    document.getElementById('opt1-name').value = p[0].name;
    document.getElementById('opt1-unit').value = p[0].unitValue;
    document.getElementById('opt1-total').value = p[0].totalValue;
    document.getElementById('opt1-down').value = p[0].downPayment;
    document.getElementById('opt1-inst').value = p[0].installments;

    document.getElementById('opt2-name').value = p[1].name;
    document.getElementById('opt2-unit').value = p[1].unitValue;
    document.getElementById('opt2-total').value = p[1].totalValue;
    document.getElementById('opt2-down').value = p[1].downPayment;
    document.getElementById('opt2-inst').value = p[1].installments;

    document.getElementById('opt3-name').value = p[2].name;
    document.getElementById('opt3-unit').value = p[2].unitValue;
    document.getElementById('opt3-total').value = p[2].totalValue;
    document.getElementById('opt3-down').value = p[2].downPayment;
    document.getElementById('opt3-inst').value = p[2].installments;

    document.getElementById('opt4-name').value = p[3].name;
    document.getElementById('opt4-unit').value = p[3].unitValue;
    document.getElementById('opt4-total').value = p[3].totalValue;
    document.getElementById('opt4-down').value = p[3].downPayment;
    document.getElementById('opt4-inst').value = p[3].installments;
  }

  // Company
  document.getElementById('companyPhone').value = currentData.company.phone || '';
  document.getElementById('companyEmail').value = currentData.company.email || '';
  document.getElementById('companyEngineer').value = currentData.company.engineer || '';
  document.getElementById('companyCrea').value = currentData.company.crea || '';
}

function updateDataFromInputs() {
  currentData.proposal.clientName = document.getElementById('clientName').value;
  currentData.proposal.title = document.getElementById('proposalTitle').value;
  currentData.proposal.version = document.getElementById('proposalVersion').value;
  currentData.proposal.date = document.getElementById('proposalDate').value;
  currentData.proposal.validityDays = document.getElementById('validityDays').value;

  // Options
  currentData.pricingOptions[0].name = document.getElementById('opt1-name').value;
  currentData.pricingOptions[0].unitValue = document.getElementById('opt1-unit').value;
  currentData.pricingOptions[0].totalValue = document.getElementById('opt1-total').value;
  currentData.pricingOptions[0].downPayment = document.getElementById('opt1-down').value;
  currentData.pricingOptions[0].installments = document.getElementById('opt1-inst').value;

  currentData.pricingOptions[1].name = document.getElementById('opt2-name').value;
  currentData.pricingOptions[1].unitValue = document.getElementById('opt2-unit').value;
  currentData.pricingOptions[1].totalValue = document.getElementById('opt2-total').value;
  currentData.pricingOptions[1].downPayment = document.getElementById('opt2-down').value;
  currentData.pricingOptions[1].installments = document.getElementById('opt2-inst').value;

  currentData.pricingOptions[2].name = document.getElementById('opt3-name').value;
  currentData.pricingOptions[2].unitValue = document.getElementById('opt3-unit').value;
  currentData.pricingOptions[2].totalValue = document.getElementById('opt3-total').value;
  currentData.pricingOptions[2].downPayment = document.getElementById('opt3-down').value;
  currentData.pricingOptions[2].installments = document.getElementById('opt3-inst').value;

  currentData.pricingOptions[3].name = document.getElementById('opt4-name').value;
  currentData.pricingOptions[3].unitValue = document.getElementById('opt4-unit').value;
  currentData.pricingOptions[3].totalValue = document.getElementById('opt4-total').value;
  currentData.pricingOptions[3].downPayment = document.getElementById('opt4-down').value;
  currentData.pricingOptions[3].installments = document.getElementById('opt4-inst').value;

  // Company
  currentData.company.phone = document.getElementById('companyPhone').value;
  currentData.company.email = document.getElementById('companyEmail').value;
  currentData.company.engineer = document.getElementById('companyEngineer').value;
  currentData.company.crea = document.getElementById('companyCrea').value;

  localStorage.setItem('aft_proposal_data', JSON.stringify(currentData));
  renderAllSlides();
}

function setupInputListeners() {
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      updateDataFromInputs();
    });
  });
}

function renderAllSlides() {
  const container = document.getElementById('preview-container');
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = generateSlidesHTML(currentData);

  const slides = Array.from(tempDiv.querySelectorAll('.slide'));
  container.innerHTML = '';

  const scale = currentZoom;
  const containerWidth = 1920 * scale;
  const containerHeight = 1080 * scale;

  slides.forEach((slide, index) => {
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

  btnPdf.addEventListener('click', async () => {
    toast.classList.add('active');
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
        throw new Error('Falha na geração do PDF');
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
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o PDF via servidor. Você pode usar a opção "Imprimir / Salvar PDF Navegador" como alternativa imediata!');
    } finally {
      toast.classList.remove('active');
      btnPdf.disabled = false;
    }
  });

  // Imprimir pelo navegador direto
  const btnPrint = document.getElementById('btn-browser-print');
  btnPrint.addEventListener('click', () => {
    window.open('/print.html', '_blank');
  });

  // Modo Apresentação em Tela Cheia
  const btnFullscreen = document.getElementById('btn-fullscreen-mode');
  btnFullscreen.addEventListener('click', () => {
    window.open('/print.html', '_blank');
  });

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
    // btnReset.addEventListener('click', () => { // disabled – sidebar removed
      // if (confirm('Deseja restaurar os valores padrão da proposta?')) {
        // currentData = JSON.parse(JSON.stringify(defaultProposalData));
        // localStorage.setItem('aft_proposal_data', JSON.stringify(currentData));
        // syncInputsWithData();
        // renderAllSlides();
      // }
    // });
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
  const date = currentData.proposal.date || new Date().toLocaleDateString('pt-BR');
  
  const existingIdx = library.findIndex(item => item.proposal.clientName.trim().toUpperCase() === name.trim().toUpperCase());
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
  select.innerHTML = '<option value="">-- Selecionar Orçamento Salvo --</option>';
  library.forEach((item, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${item.proposal.clientName} (${item.proposal.date || ''})`;
    select.appendChild(opt);
  });

  select.onchange = (e) => {
    if (e.target.value !== '') {
      loadProposalFromLibrary(Number(e.target.value));
    }
  };
}
