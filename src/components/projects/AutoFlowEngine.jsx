const AutoFlowEngine = {
  number: '005',
  category: 'Automation',
  title: 'AutoFlow Engine',
  status: 'Shipped',
  year: '2023',
  role: 'Automation Engineer',
  image: null,

  description:
    'n8n-based automation suite connecting Google Sheets, email, Slack, REST APIs, and IoT webhooks.',

  overview: [
    'A suite of n8n automation workflows designed for business-critical data pipelines. Includes custom n8n nodes written in TypeScript for specialized API integrations.',
    'Supports multi-step error handling and fallback paths, scheduled triggers via Cron, and real-time event-driven flows from IoT webhooks and Slack commands.',
    'The engine currently processes over 2,000 automated events per day across three client environments, with zero human intervention required.',
  ],

  highlights: [
    'Custom n8n nodes written in TypeScript',
    'Multi-step pipelines with error handling & fallbacks',
    'Cron-scheduled and event-driven triggers',
    'IoT webhook → Slack alert routing',
    'Google Sheets, email, and REST API integration',
    '2,000+ automated events processed per day',
  ],

  tech: ['n8n', 'TypeScript', 'Webhooks', 'REST APIs', 'Cron', 'Slack API', 'Google Sheets API'],

  links: {
    github: 'https://github.com',
    live: null,
  },
}

export default AutoFlowEngine