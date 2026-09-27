// Renderizador de todos os 14 slides da apresentação e orçamento AFT Reforma Engenharia

function generateSlidesHTML(data) {
  const d = data || defaultProposalData;
  const company = d.company;
  const proposal = d.proposal;
  const pricing = d.pricingOptions;
  const schedule = d.schedule;

  const headerHTML = (title) => `
    <div class="slide-header">
      <div class="header-left">
        <div class="header-company-tag">
          <span class="check-badge">✓</span>
          <span>${company.name} ${company.category}</span>
        </div>
        <div class="slide-title">${title}</div>
      </div>
      <div class="header-logo">
        <img src="./assets/logo-aft-white.svg" alt="${company.name}" />
      </div>
    </div>
  `;

  const footerHTML = `
    <div class="slide-footer">
      <div class="footer-item">
        <span>📞 ${company.phone}</span>
      </div>
      <div class="footer-item">
        <span>✉️ ${company.email}</span>
      </div>
      <div class="footer-item">
        <span>🌐 ${company.website || 'www.aftreforma.com.br'}</span>
      </div>
      <div class="footer-item">
        <span>📸 ${company.instagram}</span>
      </div>
    </div>
  `;

  return `
    <!-- SLIDE 1: CAPA -->
    <div class="slide slide-cover" id="slide-1">
      <div class="cover-left">
        <img src="./assets/images/recife_building.jpg" alt="Fachada Recife" />
      </div>
      <div class="cover-right">
        <div class="cover-badge-top">
          <div class="badge-arrow-icon">➔</div>
          <div class="badge-headline">
            A SOLUÇÃO INTELIGENTE EM ENGENHARIA<br>
            PARA RECUPERAR E VALORIZAR<br>
            A FACHADA DO SEU PRÉDIO.
          </div>
        </div>

        <div class="cover-logo-box">
          <img src="./assets/logo-aft-white.svg" alt="${company.name}" style="width: 100%; height: auto; max-height: 90px;" />
        </div>

        <div class="cover-client-section">
          <div class="client-name-title">${proposal.clientName}</div>
          <div class="proposal-subtitle">${proposal.title} – ${proposal.version}</div>
          <div class="proposal-date">${proposal.date}</div>
        </div>
      </div>
    </div>

    <!-- SLIDE 2: A EVOLUÇÃO DAS REFORMAS -->
    <div class="slide" id="slide-2">
      ${headerHTML('A EVOLUÇÃO E SEGURANÇA EM REFORMAS PREDIAIS')}
      <div class="slide-content">
        <div class="slide-grid-two">
          <div class="feature-image-card">
            <img src="./assets/images/balancim_obra.jpg" alt="Balancim em Obra" />
            <div class="image-label">Execução em Altura Certificada NR-35 e NR-18</div>
          </div>
          <div class="check-list-container">
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Engenharia especializada em restauração e impermeabilização predial</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Inspeção diagnóstica com ensaio à percussão em 100% da fachada</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Recuperação estrutural profunda com tratamento anticorrosivo de armaduras</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Argamassas poliméricas tixotrópicas de alto desempenho estrutural</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Substituição e recolocação de pastilhas com argamassa flexível ACIII-E</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Tratamento de juntas de dilatação com mastique elastomérico de Poliuretano</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Individualização de hidrômetros com laudo e aprovação técnica</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Mão de obra própria qualificada e 100% treinada em trabalho em altura</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Responsável Técnico com emissão de ART registrada no CREA/PE</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Modernização estética que valoriza o condomínio imediatamente</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Proteção definitiva contra infiltrações, lodo e fissuras</span></div>
            <div class="check-item"><span class="check-item-icon">✓</span><span class="check-item-text">Garantia técnica documentada de até 5 anos para toda a obra</span></div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 3: O MAIOR ESPECIALISTA / MAPA -->
    <div class="slide" id="slide-3">
      ${headerHTML('EMPRESA DESTAQUE EM ENGENHARIA E RECUPERAÇÃO PREDIAL')}
      <div class="slide-content">
        <div class="slide-map-grid">
          <div class="map-card">
            <img src="./assets/images/mapa_pe.jpg" alt="Mapa de Atuação em Pernambuco" />
          </div>
          <div class="authority-content">
            <div class="authority-title">
              A MAIOR ESPECIALISTA EM RECUPERAÇÃO<br>E FACHADAS NO RECIFE E RMR.
            </div>
            <div class="authority-bracket-box">
              <div class="authority-bullet">DIAGNÓSTICO TÉCNICO PRECISO E LAUDO PERICIAL INICIAL</div>
              <div class="authority-bullet">METODOLOGIA EXCLUSIVA COM MÍNIMO IMPACTO AOS MORADORES</div>
              <div class="authority-bullet">RESPONSÁVEL TÉCNICO: ${company.engineer} (${company.crea})</div>
              <div class="authority-bullet">CRONOGRAMA RIGOROSO E TRANSPARÊNCIA TOTAL NAS MEDIÇÕES</div>
            </div>
            <div class="stats-list">
              <div class="stat-item"><span class="check-badge">✓</span> <span>Sólida atuação no mercado da engenharia e reformas</span></div>
              <div class="stat-item"><span class="check-badge">✓</span> <span>Atuação em Recife, Olinda, Jaboatão, Paulista e Região Metropolitana</span></div>
              <div class="stat-item"><span class="check-badge">✓</span> <span>Corpo técnico próprio com engenheiro residente e encarregados</span></div>
              <div class="stat-item"><span class="check-badge">✓</span> <span>Mais de 120 condomínios e edifícios revitalizados com sucesso</span></div>
              <div class="stat-item"><span class="check-badge">✓</span> <span>Milhares de famílias beneficiadas com segurança e valorização</span></div>
            </div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 4: ESTRUTURA OPERACIONAL -->
    <div class="slide" id="slide-4">
      ${headerHTML('ESTRUTURA OPERACIONAL PRÓPRIA = MÁXIMA CREDIBILIDADE')}
      <div class="slide-content">
        <div class="full-photo-slide">
          <img src="./assets/images/balancim_obra.jpg" alt="Estrutura de Balancins" />
          <div class="callout-badge top-right">Balancins Elétricos Certificados NR-18 e NR-35</div>
          <div class="callout-badge bottom-right">Capacidade Operacional Simultânea em Múltiplas Fachadas</div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 5: CENTRAL DE LOGÍSTICA E SUPORTE TÉCNICO -->
    <div class="slide" id="slide-5">
      ${headerHTML('CENTRAL DE LOGÍSTICA E SUPORTE TÉCNICO A OBRAS')}
      <div class="slide-content">
        <div class="full-photo-slide">
          <img src="./assets/images/area_operacional.jpg" alt="Parque Operacional" />
          <div class="callout-badge top-right">Controle e Armazenamento Técnico de Materiais</div>
          <div class="callout-badge bottom-right">Estoque Próprio de Segurança e Equipamentos Industriais</div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 6: DIFERENCIAIS E SEGURANÇA TÉCNICA -->
    <div class="slide" id="slide-6">
      ${headerHTML('DIFERENCIAIS TÉCNICOS E SEGURANÇA NA EXECUÇÃO')}
      <div class="slide-content">
        <div class="technical-diagram-layout">
          <div class="tech-column">
            <div class="tech-card">
              <div class="tech-card-title"><span>💧</span> Lavagem e Hidrojateamento</div>
              <div class="tech-card-desc">Pressão regulada para limpeza profunda de fuligem e fungos sem agredir o emboço estrutural.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>🔨</span> Teste de Percussão 100%</div>
              <div class="tech-card-desc">Mapeamento acústico de cada m² para identificar pastilhas e rebocos descolados antes da queda.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>🛡️</span> Tratamento de Armaduras</div>
              <div class="tech-card-desc">Escovação mecânica do aço oxidado seguida de primer convertedor de ferrugem e passivador de zinco.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>🧱</span> Argamassa Tixotrópica</div>
              <div class="tech-card-desc">Reconstituição geométrica do concreto com argamassa polimérica estrutural reforçada com fibras.</div>
            </div>
          </div>

          <div class="tech-center-image">
            <img src="./assets/images/fachada_placa.jpg" alt="Engenharia AFT Fachada" />
            <div class="tech-center-label">SISTEMA INTEGRAL DE RECUPERAÇÃO PREDIAL AFT</div>
          </div>

          <div class="tech-column">
            <div class="tech-card">
              <div class="tech-card-title"><span>🧩</span> Pastilhas com ACIII-E</div>
              <div class="tech-card-desc">Argamassa colante especial de altíssima elasticidade para suportar variações térmicas intensas.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>🔒</span> Rejunte Resinado Impermeável</div>
              <div class="tech-card-desc">Barreira total contra infiltrações de água pluvial, formação de limo e proliferação de mofo.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>↔️</span> Juntas de Dilatação em PU</div>
              <div class="tech-card-desc">Preenchimento com fita dessolidarizadora e mastique de Poliuretano para absorver dilatações prediais.</div>
            </div>
            <div class="tech-card">
              <div class="tech-card-title"><span>✨</span> Proteção Hidrofugante</div>
              <div class="tech-card-desc">Aplicação de resina hidrorrepelente que protege a fachada contra maresia, poeira e intempéries.</div>
            </div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 7: TESTES DE SEGURANÇA E QUALIDADE -->
    <div class="slide" id="slide-7">
      ${headerHTML('ÚNICA COM DIVERSOS TESTES DE SEGURANÇA E QUALIDADE')}
      <div class="slide-content">
        <div class="tests-grid">
          <div class="feature-image-card">
            <img src="./assets/images/ensaio_percussao.jpg" alt="Ensaio de Percussão" />
            <div class="image-label">Diagnóstico com Instrumentação Calibrada</div>
          </div>
          <div class="tests-list">
            <div class="test-row">
              <span class="check-badge">✓</span>
              <div>
                <div class="test-title">Ensaio de Percussão Acústica em 100% da Área</div>
                <div class="test-desc">Identificação precisa de todas as placas cerâmicas ocas e com risco iminente de descolamento.</div>
              </div>
            </div>
            <div class="test-row">
              <span class="check-badge">✓</span>
              <div>
                <div class="test-title">Teste de Aderência à Tração (Arrancamento)</div>
                <div class="test-desc">Validação da resistência de aderência do emboço e pastilhas conforme parâmetros da ABNT NBR 13755.</div>
              </div>
            </div>
            <div class="test-row">
              <span class="check-badge">✓</span>
              <div>
                <div class="test-title">Ensaio de Esclerometria e Carbonatação do Concreto</div>
                <div class="test-desc">Avaliação da dureza superficial das vigas e determinação da profundidade de neutralização do concreto.</div>
              </div>
            </div>
            <div class="test-row">
              <span class="check-badge">✓</span>
              <div>
                <div class="test-title">Teste de Estanqueidade e Aderência dos Selantes</div>
                <div class="test-desc">Verificação da perfeita vedação elástica nas juntas de dilatação, peitoris de janelas e platibandas.</div>
              </div>
            </div>
            <div class="test-row">
              <span class="check-badge">✓</span>
              <div>
                <div class="test-title">Inspeção e Carga de Linhas de Vida (NR-35)</div>
                <div class="test-desc">Testes estáticos nos pontos de ancoragem do edifício garantindo segurança irrestrita à equipe e condôminos.</div>
              </div>
            </div>

            <div class="test-guarantee-banner">
              SEGURANÇA JURÍDICA E PATRIMONIAL TOTAL COM EMISSÃO DE ART CREA/PE
            </div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 8: RESPONSABILIDADE TÉCNICA E ART CREA-PE -->
    <div class="slide" id="slide-8">
      ${headerHTML('RESPONSABILIDADE TÉCNICA E CONFORMIDADE COM NORMAS')}
      <div class="slide-content">
        <div class="patent-grid">
          <div class="authority-content">
            <div class="check-list-container">
              <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Empresa de Engenharia com registro ativo e regular no CREA-PE</span></div>
              <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Anotação de Responsabilidade Técnica (ART) recolhida para cada etapa da obra</span></div>
              <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Responsável Técnico: <strong>${company.engineer} (${company.crea})</strong></span></div>
            </div>

            <div class="authority-bracket-box" style="margin-top: 20px;">
              <div style="font-size: 20px; font-weight: 900; color: var(--primary-blue); margin-bottom: 8px;">
                EM CONFORMIDADE COM AS PRINCIPAIS NORMAS BRASILEIRAS (ABNT):
              </div>
              <div class="authority-bullet">• NBR 16280: Reforma em Edificações — Sistema de Gestão de Reformas</div>
              <div class="authority-bullet">• NBR 5674: Manutenção de Edificações — Requisitos para Gestão</div>
              <div class="authority-bullet">• NBR 13755: Revestimento de Paredes Externas com Placas Cerâmicas</div>
              <div class="authority-bullet">• NBR 9575 / 9574: Seleção e Execução de Impermeabilizações</div>
              <div class="authority-bullet">• NR-18 e NR-35: Condições de Segurança e Trabalho em Altura</div>
            </div>

            <div style="background: #ffffff; padding: 20px; border-radius: 10px; border-left: 6px solid var(--accent-yellow); margin-top: 10px;">
              <div style="font-weight: 800; font-size: 18px; color: var(--primary-blue);">Como consultar a regularidade técnica:</div>
              <div style="font-size: 16px; color: var(--text-muted); margin-top: 6px;">
                Portal oficial do CREA-PE: <span style="color: var(--secondary-blue); font-weight: 700;">www.creape.org.br</span><br>
                Registro Técnico do Engenheiro: <strong>${company.crea}</strong>
              </div>
            </div>
          </div>

          <div class="patent-doc-frame">
            <img src="./assets/images/crea_art.jpg" alt="Certificado ART CREA" />
            <div class="patent-badge-top">DOCUMENTO OFICIAL CREA-PE<br>ART REGISTRADA</div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 9: SEGURANÇA VALIDADA NA PRÁTICA -->
    <div class="slide" id="slide-9">
      ${headerHTML('SEGURANÇA VALIDADA NA PRÁTICA = PREVENÇÃO DE RISCOS GRAVES')}
      <div class="slide-content" style="flex-direction: column; gap: 20px;">
        <div style="background: #ffffff; padding: 16px 24px; border-radius: 10px; border-left: 6px solid #ef4444; font-size: 20px; font-weight: 700; color: var(--text-dark);">
          ⚠️ A maresia e o intemperismo aceleram a corrosão e descolamento de fachadas. A intervenção técnica preventiva da AFT elimina riscos de tragédias e interdições!
        </div>

        <div class="cases-triptych">
          <div class="case-card">
            <div class="case-card-img">
              <img src="./assets/images/recife_building.jpg" alt="Risco de Queda de Pastilhas" />
              <div class="case-tag">Prevenção Crítica</div>
            </div>
            <div class="case-body">
              <div class="case-text">
                <strong>Queda de Pastilhas Cerâmicas:</strong> Descolamentos de revestimento em pavimentos altos atingem veículos e áreas de pedestres com força letal.
              </div>
              <div class="case-resolution">
                ✅ <strong>Solução AFT:</strong> Percussão integral e fixação elástica com ACIII-E eliminam 100% dos pontos de risco.
              </div>
            </div>
          </div>

          <div class="case-card">
            <div class="case-card-img">
              <img src="./assets/images/balancim_obra.jpg" alt="Corrosão de Armaduras" />
              <div class="case-tag">Estrutura & Vida Útil</div>
            </div>
            <div class="case-body">
              <div class="case-text">
                <strong>Corrosão e Oxidação de Vigas e Pilares:</strong> A penetração de cloretos degrada as barras de aço, causando trincas e perda de sustentação.
              </div>
              <div class="case-resolution">
                ✅ <strong>Solução AFT:</strong> Escovação mecânica, primer inibidor de corrosão e reconstituição com argamassa tixotrópica.
              </div>
            </div>
          </div>

          <div class="case-card">
            <div class="case-card-img">
              <img src="./assets/images/ensaio_percussao.jpg" alt="Infiltrações e Mofo" />
              <div class="case-tag">Saúde & Conforto</div>
            </div>
            <div class="case-body">
              <div class="case-text">
                <strong>Infiltrações em Unidades e Garagens:</strong> Juntas de dilatação ressecadas permitem entrada maciça de água, danificando os apartamentos.
              </div>
              <div class="case-resolution">
                ✅ <strong>Solução AFT:</strong> Selamento elástico com Poliuretano e impermeabilização química de alta durabilidade.
              </div>
            </div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 10: METODOLOGIA EXCLUSIVA -->
    <div class="slide" id="slide-10">
      ${headerHTML('METODOLOGIA EXCLUSIVA COM MÍNIMO IMPACTO')}
      <div class="slide-content">
        <div class="slide-grid-two">
          <div class="feature-image-card">
            <img src="./assets/images/balancim_obra.jpg" alt="Metodologia AFT" />
            <div class="image-label">Organização e Respeito à Rotina dos Moradores</div>
          </div>
          <div class="check-list-container">
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Bandejas e telas fachadeiras de proteção evitando qualquer projeção de detritos</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Isolamento inteligente de vagas de garagem sem bloquear a circulação de veículos</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Limpeza diária e organização rigorosa dos pilotis e áreas de acesso comum</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Relatórios fotográficos semanais de evolução enviados ao síndico e comissão</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Colaboradores 100% uniformizados, identificados com crachá e seguro de vida</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Descarte ambientalmente correto de entulhos com caçambas licenciadas</span></div>
            <div class="check-item"><span class="check-badge">✓</span><span class="check-item-text">Pontualidade no início e término dos turnos de trabalho respeitando a Lei do Silêncio</span></div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 11: REFERÊNCIAS DE CLIENTES -->
    <div class="slide" id="slide-11">
      ${headerHTML('ALGUMAS REFERÊNCIAS DE CLIENTES NO RECIFE E RMR')}
      <div class="slide-content">
        <div class="client-ref-grid">
          <div class="client-list-column">
            ${d.clientReferences.map(r => `<div class="client-entry">${r.col1}</div>`).join('')}
          </div>
          <div class="client-list-column">
            ${d.clientReferences.map(r => `<div class="client-entry">${r.col2}</div>`).join('')}
          </div>
          <div class="client-banner-total">
            + DE 120 CONDOMÍNIOS E EDIFÍCIOS ATENDIDOS EM RECIFE / JABOATÃO / OLINDA COM SUCESSO!
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 12: MODERNIZA E VALORIZA OS CONDOMÍNIOS -->
    <div class="slide" id="slide-12">
      ${headerHTML('MODERNIZA E VALORIZA OS CONDOMÍNIOS')}
      <div class="slide-content">
        <div class="building-showcase-container">
          <img src="./assets/images/recife_tres_edificios.jpg" alt="Edifícios Modernizados" />
          <div class="building-labels-row">
            <div class="building-label-badge">Ed. Saint Louis - Recife</div>
            <div class="building-label-badge">Ed. Golden Home Service - Recife</div>
            <div class="building-label-badge">Ed. Sítio Rosarinho - Recife</div>
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 13: PROPOSTA COMERCIAL / ORÇAMENTO DETALHADO -->
    <div class="slide" id="slide-13">
      ${headerHTML('PROPOSTA COMERCIAL E ORÇAMENTO DETALHADO')}
      <div class="slide-content">
        <div class="proposal-table-wrapper">
          <div class="proposal-cards-header">
            ${pricing.map(opt => `
              <div class="scope-thumbnail-card ${opt.highlight ? 'featured' : ''}">
                <div class="scope-thumb-img">
                  <img src="./assets/images/${opt.id === 'opcao1' ? 'fachada_placa.jpg' : opt.id === 'opcao2' ? 'balancim_obra.jpg' : opt.id === 'opcao3' ? 'recife_building.jpg' : 'recife_tres_edificios.jpg'}" alt="${opt.name}" />
                </div>
                <div class="scope-thumb-label">${opt.badge}</div>
              </div>
            `).join('')}
          </div>

          <div class="proposal-matrix-container">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th style="width: 280px; text-align: left; padding-left: 24px;">ESCOPO DA OBRA</th>
                  ${pricing.map(opt => `<th style="${opt.highlight ? 'background: #f8c300; color: #09387e;' : ''}">${opt.name}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-header">VALOR UNITÁRIO / M²</td>
                  ${pricing.map(opt => `<td class="value-cell ${opt.highlight ? 'highlight-col' : ''}">${opt.unitValue}</td>`).join('')}
                </tr>
                <tr class="total-row">
                  <td class="row-header">VALOR TOTAL DA OBRA</td>
                  ${pricing.map(opt => `<td class="value-cell ${opt.highlight ? 'highlight-col' : ''}">${opt.totalValue}</td>`).join('')}
                </tr>
                <tr>
                  <td class="row-header">SINAL / ENTRADA</td>
                  ${pricing.map(opt => `<td class="value-cell ${opt.highlight ? 'highlight-col' : ''}">${opt.downPayment}</td>`).join('')}
                </tr>
                <tr>
                  <td class="row-header">PARCELAMENTO</td>
                  ${pricing.map(opt => `<td class="value-cell ${opt.highlight ? 'highlight-col' : ''}">${opt.installments}</td>`).join('')}
                </tr>
              </tbody>
            </table>

            <div class="schedule-box">
              <div class="schedule-header">CRONOGRAMA DE ENTREGA</div>
              <div class="schedule-list">
                ${schedule.map(s => `
                  <div class="schedule-item">
                    <div class="schedule-period">${s.period}</div>
                    <div class="schedule-desc">${s.desc}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="validity-strip">
            PROPOSTA VÁLIDA POR ${proposal.validityDays || 30} DIAS
          </div>
        </div>
      </div>
      ${footerHTML}
    </div>

    <!-- SLIDE 14: CONTATO E ENCERRAMENTO -->
    <div class="slide slide-contact" id="slide-14">
      <div class="contact-center-box">
        <div class="contact-logo-box">
          <img src="./assets/logo-aft-white.svg" alt="${company.name}" style="width: 100%; max-width: 550px; height: auto;" />
        </div>

        <div class="contact-slogan">
          A solução inteligente em engenharia<br>para proteger e valorizar o seu condomínio.
        </div>

        <a href="${company.whatsappLink}" target="_blank" style="text-decoration: none;">
          <div class="cta-button-card">
            <div class="cta-text">Fale com nosso Engenheiro Responsável</div>
            <div class="cta-arrow">➔</div>
          </div>
        </a>

        <div class="contact-phone-badge">
          ${company.phone}
        </div>

        <div class="contact-meta-info">
          <div>✉️ ${company.email} | 🌐 ${company.website} | 📸 ${company.instagram}</div>
          <div style="font-weight: 700; color: #f8c300; margin-top: 6px;">
            Responsável Técnico: ${company.engineer} — ${company.crea}
          </div>
          <div style="font-size: 16px; color: #94a3b8; margin-top: 4px;">
            Recife / Olinda / Jaboatão dos Guararapes - Pernambuco
          </div>
        </div>
      </div>
    </div>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSlidesHTML };
}
