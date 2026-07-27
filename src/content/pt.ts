/**
 * Dicionário de conteúdo — pt-BR.
 * Toda a copy do site vive aqui para facilitar i18n futura:
 * basta criar `en.ts` com o mesmo shape e trocar o import.
 */

export const site = {
  name: "Machado Labs",
  legalName: "Daniel Joaquim Machado",
  cnpj: "48.487.283/0001-74",
  url: "https://machadolabs.com.br",
  /** Título usado em <title>, Open Graph e resultados de busca. */
  title: "Machado Labs — Desenvolvimento de Software, IA e Automações",
  /** Meta description: até ~155 caracteres, com as palavras-chave principais. */
  description:
    "Desenvolvimento de software sob medida, inteligência artificial, automações e sistemas web. Estúdio de tecnologia premium para empresas que querem escalar.",
  /** Resumo em uma frase — usado por IAs e no llms.txt. */
  tagline:
    "Estúdio brasileiro de engenharia de software que constrói sistemas, aplicativos, automações e soluções de inteligência artificial sob medida.",
  keywords: [
    "desenvolvimento de software",
    "desenvolvimento de sistemas web",
    "criação de sites",
    "inteligência artificial para empresas",
    "automação de processos",
    "desenvolvimento de aplicativos",
    "ERP sob medida",
    "CRM personalizado",
    "software house",
    "fábrica de software",
    "desenvolvimento de software em São José SC",
    "desenvolvimento de software em Santa Catarina",
    "Machado Labs",
  ],
  email: "contato@machadolabs.com.br",
  phone: "+55 48 99223-4557",
  /** E.164 — formato exigido pelo schema.org e por discadores. */
  phoneE164: "+5548992234557",
  whatsapp:
    "https://wa.me/5548992234557?text=Ol%C3%A1!%20Quero%20iniciar%20um%20projeto%20com%20a%20Machado%20Labs.",
  /**
   * Localização para SEO local. O DDD 48 corresponde a Santa Catarina.
   * Preencha `city` com a cidade real para ativar o SEO local completo
   * (aparecer em buscas do tipo "desenvolvimento de software em <cidade>").
   */
  location: {
    city: "São José",
    state: "Santa Catarina",
    stateCode: "SC",
    country: "BR",
    countryName: "Brasil",
  },
  foundingYear: "2018",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/machadolabs.br/" },
  ],
} as const;

export const nav = {
  links: [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Cases", href: "#cases" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Iniciar projeto",
} as const;

export const hero = {
  slides: [
    {
      kicker: "Engenharia digital",
      title: "Transformamos ideias em soluções digitais.",
      subtitle:
        "Software, design e estratégia em um único laboratório de tecnologia premium.",
      cta: { label: "Conheça a Machado Labs", href: "#sobre" },
      image: "/hero/slide-1.png",
    },
    {
      kicker: "Software sob medida",
      title: "Software sob medida para acelerar seu negócio.",
      subtitle:
        "Sistemas, ERPs e plataformas construídos exatamente para a sua operação.",
      cta: { label: "Conhecer soluções", href: "#servicos" },
      image: "/hero/slide-2.png",
    },
    {
      kicker: "Eficiência operacional",
      title: "Automações inteligentes.",
      subtitle:
        "Elimine o trabalho repetitivo. Processos que rodam sozinhos, 24 horas por dia.",
      cta: { label: "Automatizar processos", href: "#contato" },
      image: "/hero/slide-3.png",
    },
    {
      kicker: "O futuro, agora",
      title: "Inteligência Artificial.",
      subtitle:
        "Agentes, copilotos e modelos aplicados ao seu contexto — com resultado mensurável.",
      cta: { label: "Explorar IA", href: "#servicos" },
      image: "/hero/slide-4.png",
    },
    {
      kicker: "Design & tecnologia",
      title: "Experiência Digital Premium.",
      subtitle:
        "Interfaces que impressionam nos primeiros cinco segundos — e convertem nos próximos.",
      cta: { label: "Iniciar projeto", href: site.whatsapp },
      image: "/hero/slide-5.png",
    },
  ],
  scrollHint: "Role para explorar",
} as const;

export const about = {
  id: "sobre",
  kicker: "Quem somos",
  title: "Um laboratório de tecnologia, não uma fábrica de software.",
  paragraphs: [
    "A Machado Labs nasceu de uma convicção simples: tecnologia boa é invisível — ela simplesmente funciona, encanta e gera resultado. Somos um estúdio de engenharia digital que une software, design e inteligência artificial para construir produtos que elevam negócios.",
    "Cada projeto é tratado como peça única. Sem templates, sem atalhos, sem soluções genéricas. Arquitetura pensada, código limpo e uma obsessão saudável por detalhes — do primeiro pixel ao último deploy.",
  ],
  stats: [
    { value: "20+", label: "Projetos entregues" },
    { value: "4", label: "Anos de experiência" },
    { value: "99,9%", label: "Uptime em produção" },
    { value: "24/7", label: "Monitoramento" },
  ],
} as const;

export const services = {
  id: "servicos",
  kicker: "Nossos serviços",
  title: "Tudo o que o seu negócio precisa para dominar o digital.",
  subtitle:
    "Da concepção ao suporte contínuo — um portfólio completo de engenharia e design.",
  items: [
    {
      icon: "Globe",
      title: "Websites",
      description:
        "Sites institucionais rápidos, elegantes e otimizados para conversão e SEO.",
    },
    {
      icon: "Rocket",
      title: "Landing Pages",
      description:
        "Páginas de alta conversão com narrativa visual e performance impecável.",
    },
    {
      icon: "AppWindow",
      title: "Sistemas Web",
      description:
        "Plataformas robustas e escaláveis, desenhadas para a sua operação crescer.",
    },
    {
      icon: "Boxes",
      title: "ERP",
      description:
        "Gestão integrada sob medida — financeiro, estoque, vendas e relatórios em um só lugar.",
    },
    {
      icon: "Users",
      title: "CRM",
      description:
        "Relacionamento com clientes organizado, automatizado e orientado a dados.",
    },
    {
      icon: "Smartphone",
      title: "Aplicativos",
      description:
        "Apps mobile nativos e híbridos com experiência fluida em iOS e Android.",
    },
    {
      icon: "BrainCircuit",
      title: "Inteligência Artificial",
      description:
        "Agentes, copilotos e modelos de IA aplicados ao contexto real do seu negócio.",
    },
    {
      icon: "Workflow",
      title: "Automações",
      description:
        "Integrações e fluxos que eliminam tarefas repetitivas e erros humanos.",
    },
    {
      icon: "Compass",
      title: "Consultoria",
      description:
        "Diagnóstico técnico e roadmap de tecnologia para decisões seguras.",
    },
    {
      icon: "PenTool",
      title: "UX/UI Design",
      description:
        "Interfaces premium centradas no usuário — bonitas, claras e funcionais.",
    },
    {
      icon: "CloudCog",
      title: "Infraestrutura Cloud",
      description:
        "Arquitetura, deploy e observabilidade em nuvem com segurança e escala.",
    },
  ],
} as const;

export const process = {
  id: "processo",
  kicker: "Como trabalhamos",
  title: "Um processo preciso, do primeiro rascunho ao suporte contínuo.",
  steps: [
    {
      number: "01",
      title: "Descoberta",
      description:
        "Imersão no seu negócio para entender objetivos, usuários e restrições reais.",
    },
    {
      number: "02",
      title: "Planejamento",
      description:
        "Arquitetura, escopo e cronograma definidos com transparência total.",
    },
    {
      number: "03",
      title: "Desenvolvimento",
      description:
        "Sprints curtas, entregas frequentes e código revisado em cada etapa.",
    },
    {
      number: "04",
      title: "Testes",
      description:
        "Qualidade validada em automação, performance, segurança e usabilidade.",
    },
    {
      number: "05",
      title: "Implantação",
      description:
        "Deploy sem sustos: infraestrutura preparada, monitorada e documentada.",
    },
    {
      number: "06",
      title: "Suporte",
      description:
        "Evolução contínua, monitoramento 24/7 e resposta rápida sempre que precisar.",
    },
  ],
} as const;

export const differentials = {
  id: "diferenciais",
  kicker: "Diferenciais",
  title: "Por que a Machado Labs.",
  items: [
    {
      icon: "Zap",
      title: "Velocidade",
      description: "Performance obsessiva: carregamento instantâneo e 60 fps em tudo.",
    },
    {
      icon: "TrendingUp",
      title: "Escalabilidade",
      description: "Arquiteturas que crescem com o seu negócio, sem reescritas dolorosas.",
    },
    {
      icon: "ShieldCheck",
      title: "Segurança",
      description: "Boas práticas, criptografia e conformidade desde a primeira linha.",
    },
    {
      icon: "Gem",
      title: "Design",
      description: "Estética premium com propósito — cada detalhe existe por uma razão.",
    },
    {
      icon: "Cpu",
      title: "Tecnologia",
      description: "Stack de ponta, sempre atualizada e escolhida pelo problema, não pela moda.",
    },
    {
      icon: "Sparkles",
      title: "Inteligência Artificial",
      description: "IA aplicada com critério, gerando eficiência real e vantagem competitiva.",
    },
  ],
} as const;

export const cases = {
  id: "cases",
  kicker: "Cases",
  title: "Projetos que falam por nós.",
  subtitle: "Uma amostra do padrão Machado Labs em produção.",
  items: [
    {
      tag: "Turismo · Plataforma completa",
      title: "SITUR Turismo",
      description:
        "Do site institucional ao controle financeiro: vitrine de excursões, reserva online com escolha de poltrona e um painel que gerencia toda a operação da agência.",
      metrics: [
        "Next.js 15",
        "Pix e cartão em 12x",
        "Mapa de poltronas",
        "Painel administrativo",
      ],
      gallery: [
        {
          src: "/cases/situr-1.jpg",
          caption: "Home com carrossel de excursões gerenciável",
          alt: "Página inicial do site da SITUR Turismo com carrossel de excursões",
        },
        {
          src: "/cases/situr-2.jpg",
          caption: "Checkout com seleção de poltronas por ônibus",
          alt: "Tela de checkout da SITUR com o mapa de poltronas dos ônibus",
        },
        {
          src: "/cases/situr-3.jpg",
          caption: "Dashboard administrativo da operação",
          alt: "Painel administrativo da SITUR com métricas e próximas viagens",
        },
        {
          src: "/cases/situr-4.jpg",
          caption: "Gestão de reservas online",
          alt: "Tela de reservas online no painel administrativo da SITUR",
        },
      ],
    },
    {
      tag: "Educação · Aplicação web",
      title: "Quiz Bíblico — Café Cristão",
      description:
        "Quiz com níveis progressivos: o jogador sobe ou desce de dificuldade conforme o desempenho, com histórico de partidas e revisão de cada resposta.",
      metrics: [
        "React + Spring Boot",
        "Login com Google",
        "Níveis adaptativos",
        "API REST",
      ],
      gallery: [
        {
          src: "/cases/quiz-1.jpg",
          caption: "Acesso por e-mail ou conta Google",
          alt: "Tela de login da plataforma Quiz Bíblico",
        },
        {
          src: "/cases/quiz-2.jpg",
          caption: "Correção imediata a cada resposta",
          alt: "Pergunta do quiz com a alternativa correta destacada",
        },
        {
          src: "/cases/quiz-3.jpg",
          caption: "Resultado e avanço de nível",
          alt: "Tela de resultado do quiz mostrando avanço de nível",
        },
        {
          src: "/cases/quiz-4.jpg",
          caption: "Painel com histórico e regras de progressão",
          alt: "Dashboard do Quiz Bíblico com estatísticas e histórico de sessões",
        },
      ],
    },
  ],
} as const;

export const tech = {
  id: "tecnologias",
  kicker: "Stack",
  title: "Tecnologias que dominamos.",
  rowA: ["React", "Next.js", "Node.js", "TypeScript", "Docker", "AWS"],
  rowB: [
    "Firebase",
    "Supabase",
    "PostgreSQL",
    "OpenAI",
    "Claude",
    "Vercel",
    "Cloudflare",
  ],
} as const;

export const testimonials = {
  id: "depoimentos",
  kicker: "Depoimentos",
  title: "Quem trabalha conosco, recomenda.",
  items: [
    {
      quote:
        "A Machado Labs entregou em três meses o que outra empresa não conseguiu em um ano. O nível de acabamento é de outro planeta.",
      name: "Ricardo Almeida",
      role: "CEO · Grupo Almeida",
    },
    {
      quote:
        "O sistema transformou nossa operação. Processos que levavam horas hoje acontecem em segundos, sem intervenção humana.",
      name: "Fernanda Costa",
      role: "COO · LogisPrime",
    },
    {
      quote:
        "Design impecável e código impecável — raramente as duas coisas vêm juntas. Aqui vieram.",
      name: "João Pedro Santos",
      role: "CTO · FinVerse",
    },
    {
      quote:
        "Do primeiro contato ao suporte pós-lançamento, a experiência foi premium. Viraram nosso parceiro de tecnologia definitivo.",
      name: "Mariana Oliveira",
      role: "Diretora · Casa Oliveira",
    },
  ],
} as const;

export const faq = {
  id: "faq",
  kicker: "FAQ",
  title: "Perguntas frequentes.",
  items: [
    {
      question: "Quanto tempo leva para desenvolver um projeto?",
      answer:
        "Depende do escopo. Uma landing page premium leva de 2 a 4 semanas; sistemas completos, de 2 a 6 meses. Após a fase de descoberta, você recebe um cronograma detalhado — e nós cumprimos.",
    },
    {
      question: "Como funciona o orçamento?",
      answer:
        "Após uma conversa inicial gratuita, entendemos o escopo e apresentamos uma proposta fechada, sem surpresas. Você sabe exatamente o que será entregue, quando e por quanto.",
    },
    {
      question: "Vocês trabalham com empresas de qualquer porte?",
      answer:
        "Sim. Atendemos de startups a grandes operações. O que importa é a ambição do projeto: construímos soluções que acompanham o crescimento do negócio.",
    },
    {
      question: "O código-fonte fica comigo?",
      answer:
        "Sim, 100%. Ao final do projeto, todo o código, documentação e infraestrutura são seus. Sem dependência forçada e sem letras miúdas.",
    },
    {
      question: "Como funciona o suporte após o lançamento?",
      answer:
        "Oferecemos planos de suporte e evolução contínua com monitoramento 24/7, correções prioritárias e melhorias mensais. Seu produto nunca fica parado no tempo.",
    },
    {
      question: "Vocês integram IA em sistemas já existentes?",
      answer:
        "Sim. Grande parte dos nossos projetos de IA parte de sistemas legados: adicionamos agentes, automações e análise inteligente sem reescrever o que já funciona.",
    },
  ],
} as const;

export const cta = {
  id: "contato",
  kicker: "Vamos conversar",
  title: "Pronto para construir algo extraordinário?",
  subtitle:
    "Conte sua ideia. Em até 24 horas, você recebe um retorno do nosso time com os próximos passos.",
  button: "Iniciar conversa",
  secondary: "ou escreva para",
} as const;

/**
 * Política de privacidade. O texto descreve exatamente o que o site faz hoje:
 * nenhum formulário, nenhum cadastro, e um único cookie de análise sujeito a
 * aceite. Se algo mudar no site, este conteúdo precisa ser revisto junto.
 */
export const privacy = {
  slug: "politica-de-privacidade",
  title: "Política de Privacidade",
  updatedAt: "julho de 2026",
  intro:
    "Esta política explica, sem rodeios, quais dados a Machado Labs coleta neste site, por que coleta e o que você pode fazer a respeito. Ela vale apenas para o site machadolabs.com.br — projetos entregues a clientes têm suas próprias políticas.",
  sections: [
    {
      title: "Quem é o responsável",
      body: [
        "A Machado Labs, nome fantasia de Daniel Joaquim Machado, inscrita no CNPJ sob o nº 48.487.283/0001-74, é a controladora dos dados tratados neste site, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
        "Para qualquer assunto relacionado a privacidade, fale com contato@machadolabs.com.br. Respondemos em até 15 dias.",
      ],
    },
    {
      title: "O que este site NÃO faz",
      body: [
        "Não há formulários de cadastro, login ou área do cliente. O site não pede seu nome, e-mail, telefone ou qualquer dado pessoal para funcionar.",
        "Não vendemos, alugamos nem compartilhamos dados com terceiros para fins comerciais ou publicitários.",
        "Não usamos cookies de publicidade, remarketing ou rastreamento entre sites.",
      ],
    },
    {
      title: "Dados coletados",
      body: [
        "Se — e somente se — você clicar em “Aceitar” no aviso de privacidade, passamos a usar o Google Analytics para entender como o site é utilizado. Ele registra dados de navegação como páginas visitadas, tempo de permanência, tipo de dispositivo, navegador, idioma, localização aproximada (cidade/estado, nunca endereço) e de qual site ou busca você veio.",
        "Esses dados são estatísticos e não identificam você pessoalmente. Enquanto você não aceitar, nenhum script do Google é carregado e nenhum dado é enviado.",
        "Independentemente da sua escolha, nosso servidor mantém registros técnicos de acesso (endereço IP, data, hora e página solicitada) por prazo limitado. Isso é padrão de qualquer servidor web e serve para segurança e diagnóstico de falhas.",
      ],
    },
    {
      title: "Por que coletamos",
      body: [
        "Para melhorar o site: entender quais conteúdos interessam, identificar páginas com problema e ajustar a experiência.",
        "A base legal é o seu consentimento (art. 7º, I da LGPD) para os dados de análise, e o legítimo interesse (art. 7º, IX) para os registros técnicos de segurança do servidor.",
      ],
    },
    {
      title: "Com quem os dados são compartilhados",
      body: [
        "Apenas com o Google, na condição de operador, quando você autoriza o uso do Google Analytics. O tratamento segue a política de privacidade do Google, disponível em policies.google.com/privacy.",
        "A hospedagem do site é feita em servidor próprio contratado junto à Oracle Cloud.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Usamos apenas cookies de análise, criados pelo Google Analytics após o seu aceite. Eles servem para distinguir visitas novas de recorrentes e medir o uso do site.",
        "Sua escolha (aceitar ou recusar) fica guardada no seu próprio navegador para que não seja preciso responder de novo a cada visita. Recusar não limita nenhuma funcionalidade.",
      ],
    },
    {
      title: "Como revogar o consentimento",
      body: [
        "Você pode mudar de ideia a qualquer momento. Limpe os dados de navegação do site nas configurações do seu navegador: isso apaga a sua escolha e o aviso aparecerá novamente na próxima visita, permitindo recusar.",
        "Também é possível bloquear cookies diretamente nas configurações do navegador ou instalar a extensão oficial de desativação do Google Analytics.",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        "A LGPD garante a você o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou desatualizados, solicitar anonimização ou eliminação, revogar o consentimento e obter informação sobre com quem compartilhamos dados.",
        "Para exercer qualquer um desses direitos, escreva para contato@machadolabs.com.br.",
      ],
    },
    {
      title: "Segurança",
      body: [
        "O site trafega exclusivamente por conexão criptografada (HTTPS) e aplica cabeçalhos de segurança que restringem a origem de scripts e impedem que a página seja incorporada em outros sites.",
        "Nenhum sistema é perfeitamente seguro, mas mantemos o servidor atualizado e monitorado.",
      ],
    },
    {
      title: "Alterações nesta política",
      body: [
        "Se o site passar a coletar dados de forma diferente, esta página será atualizada e a data de revisão no topo mudará. Recomendamos consultá-la periodicamente.",
      ],
    },
  ],
} as const;

export const consent = {
  title: "Sua privacidade",
  description:
    "Usamos cookies de análise para entender como o site é usado e melhorá-lo. Nada é usado para publicidade, e você pode recusar sem perder nenhuma funcionalidade.",
  accept: "Aceitar",
  reject: "Recusar",
} as const;

export const footer = {
  tagline: "Engenharia de software premium.",
  sections: [
    {
      title: "Navegação",
      links: [
        { label: "Sobre", href: "#sobre" },
        { label: "Serviços", href: "#servicos" },
        { label: "Processo", href: "#processo" },
        { label: "Cases", href: "#cases" },
      ],
    },
    {
      title: "Serviços",
      links: [
        { label: "Sistemas Web", href: "#servicos" },
        { label: "Inteligência Artificial", href: "#servicos" },
        { label: "Automações", href: "#servicos" },
        { label: "Aplicativos", href: "#servicos" },
      ],
    },
  ],
  rights: "Todos os direitos reservados.",
} as const;
