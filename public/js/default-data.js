// Dados padrão para a proposta comercial e orçamento da AFT Reforma Engenharia
const defaultProposalData = {
  company: {
    name: "AFT REFORMA",
    category: "ENGENHARIA",
    engineer: "Engº Josias Celestino",
    crea: "CREA/PE Nº 1806255200",
    email: "aaftreforma@gmail.com",
    phone: "(81) 9 9238-2246",
    whatsappLink: "https://wa.me/5581992382246",
    instagram: "@aftreforma",
    website: "www.aftreforma.com.br",
    cidade: "Recife - PE"
  },
  proposal: {
    clientName: "EDIFÍCIO CARVALHO",
    title: "Proposta Reforma e Revitalização de Fachada",
    version: "versão 1",
    date: "26/09/2026",
    validityDays: 30,
    scopeSummary: "Recuperação estrutural profunda, ensaio à percussão em 100% da área, substituição de pastilhas cerâmicas e impermeabilização."
  },
  services: [
    "Revitalização de Fachadas",
    "Recuperação Estrutural",
    "Reformas Prediais",
    "Individualização de Hidrômetros",
    "Impermeabilizações",
    "Construção"
  ],
  pricingOptions: [
    {
      id: "opcao1",
      name: "RECUPERAÇÃO PONTUAL",
      badge: "ESSENCIAL",
      unitValue: "R$ 3.800,00 / pilar",
      totalValue: "R$ 38.000,00",
      downPayment: "R$ 7.600,00",
      installments: "5 parcelas de R$ 6.080,00",
      highlight: false
    },
    {
      id: "opcao2",
      name: "REVITALIZAÇÃO BÁSICA",
      badge: "PADRÃO",
      unitValue: "R$ 68,00 / m²",
      totalValue: "R$ 74.800,00",
      downPayment: "R$ 14.960,00",
      installments: "6 parcelas de R$ 9.973,33",
      highlight: false
    },
    {
      id: "opcao3",
      name: "REFORMA COMPLETA",
      badge: "RECOMENDADA",
      unitValue: "R$ 95,00 / m²",
      totalValue: "R$ 104.500,00",
      downPayment: "R$ 20.900,00",
      installments: "8 parcelas de R$ 10.450,00",
      highlight: true
    },
    {
      id: "opcao4",
      name: "PREMIUM INTEGRAL",
      badge: "COMPLETA + GARANTIA 5 ANOS",
      unitValue: "R$ 128,00 / m²",
      totalValue: "R$ 140.800,00",
      downPayment: "R$ 28.160,00",
      installments: "10 parcelas de R$ 11.264,00",
      highlight: false
    }
  ],
  schedule: [
    { period: "Mês 01", desc: "Montagem de andaimes/balancins, isolamento e ensaio de percussão em 100% da área" },
    { period: "Mês 02", desc: "Tratamento de armaduras oxidadas e reconstituição estrutural com argamassa tixotrópica" },
    { period: "Mês 03", desc: "Substituição de pastilhas ocas com ACIII-E e rejuntamento impermeabilizante resinado" },
    { period: "Mês 04", desc: "Aplicação de hidrofugante, desmobilização, limpeza geral e entrega com laudo técnico final" }
  ],
  clientReferences: [
    { col1: "Ed. Saint Louis, Boa Viagem", col2: "Ed. Vita Residencial Clube, Imbiribeira" },
    { col1: "Ed. Golden Home Service, Boa Viagem", col2: "Ed. Quinta de São José, San Martin" },
    { col1: "Ed. Sítio Rosarinho, Rosarinho", col2: "Ed. Quinta de Santo Antônio, San Martin" },
    { col1: "Ed. Vita Praia Residence, Piedade", col2: "Ed. Quinta de Casa Forte, San Martin" },
    { col1: "Ed. Jardim Caxangá, Várzea", col2: "Ed. Via Brescia, Torre" },
    { col1: "Ed. Quinta das Graças, San Martin", col2: "Ed. Maison Matisse, Torre" },
    { col1: "Ed. Portal do Janga, Janga", col2: "Ed. Estação do Sol Tower, Candeias" },
    { col1: "Ed. San Giminiano, Torre", col2: "Ed. Piazza dos Carvalhos, Olinda" },
    { col1: "Ed. Rio Sena, Candeias", col2: "Ed. Piazza Armando Cavani, Olinda" },
    { col1: "Ed. Arcadia, Olinda", col2: "Ed. Village Iputinga, Iputinga" },
    { col1: "Ed. Portal do Engenho, Iputinga", col2: "Ed. Nossa Senhora do Pilar, Boa Vista" },
    { col1: "Ed. Ilha de Santo Aleixo, Jaqueira", col2: "Vila da Aeronáutica, Boa Viagem" },
    { col1: "Ed. Empresarial Beira Rio, Ilha do Leite", col2: "Ed. Empresarial Unicenter, Imbiribeira" },
    { col1: "Ed. Morumbi Residence, Casa Amarela", col2: "Ed. Golden Gate, Boa Viagem" },
    { col1: "Ed. Sítio das Roseiras, Rosarinho", col2: "Ed. Porto das Dunas, Piedade" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = defaultProposalData;
}
