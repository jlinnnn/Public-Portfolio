import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'zh' | 'es' | 'fr' | 'ar';

export const LANGS: { code: Lang; label: string; name: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'zh', label: '中文', name: '简体中文', dir: 'ltr' },
  { code: 'es', label: 'ES', name: 'Español', dir: 'ltr' },
  { code: 'fr', label: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'ع', name: 'العربية', dir: 'rtl' },
];

// ----- English (reference shape; every other language must match) -----
const en = {
  nav: {
    about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience',
    education: 'Education', interests: 'Interests', contact: 'Contact', resume: 'Résumé',
  },
  hero: {
    badge: 'Portfolio',
    title: 'Data Analyst',
    quote: '"Mathematician by foundation, data scientist by training, software developer by passion."',
    scroll: 'Scroll to explore',
  },
  about: {
    badge: 'About Me',
    heading: 'Builder by reflex, questioner by nature.',
    p1: 'Engineer from New York. B.S. in Mathematics from NYU with a minor in Computer Science, and a recent M.S. in Data Science and Analytics from Georgetown University.',
    p2: "Curious about how AI, robotics, and space can make humanity's future more promising. I approach problems with the rigor of a mathematician and the pragmatism of an engineer.",
    p3: "Outside of work I'm an aspiring streetwear designer and indie game developer. In my free time you'll find me at the gym, in the kitchen, over a chessboard, or catching up with friends through the city.",
    locationLabel: 'Location', locationValue: 'New York, NY',
    statusLabel: 'Status', statusValue: 'Open to roles',
  },
  skills: {
    badge: 'Capabilities',
    heading: 'Technical Toolkit',
    categories: [
      { title: 'Languages & Frameworks', skills: ['Python (Pandas, NumPy)', 'R (tidyverse, ggplot2)', 'SQL', 'JavaScript', 'React', 'Flask'] },
      { title: 'Machine Learning', skills: ['Scikit-learn', 'Classification (Naive Bayes, Random Forest)', 'Clustering (K-Means, RFM)', 'Recommendation Systems', 'Regression', 'Predictive Modeling'] },
      { title: 'Deep Learning & AI', skills: ['TensorFlow / Keras', 'Reinforcement Learning (DQN)', 'Probabilistic Forecasting (DeepAR, GluonTS)', 'LLMs (LLaMA 3.1, Ollama)', 'Prompt Engineering'] },
      { title: 'NLP & Statistics', skills: ['NLP', 'Sentiment & Bias Analysis', 'Time Series (Prophet)', 'Hypothesis Testing', 'Statistical Inference', 'Geospatial Analysis'] },
      { title: 'Data & Infrastructure', skills: ['MySQL', 'MongoDB', 'AWS', 'REST APIs', 'Data Wrangling', 'Data Validation'] },
      { title: 'Visualization & Workflow', skills: ['Plotly', 'Matplotlib / Seaborn', 'Streamlit', 'Quarto', 'Selenium', 'Git / GitHub'] },
      { title: 'Foundations & Languages', skills: ['Google Data Analytics (Certified)', 'Mandarin (Fluent)', 'Spanish (Beginner)'] },
    ],
  },
  projects: {
    badge: 'Selected Work',
    heading: 'Recent Projects',
    intro: 'A selection of work across risk modeling, deep learning, NLP, analytics engineering, and AI systems.',
    statuses: { Featured: 'Featured', Live: 'Live', Complete: 'Complete', Hackathon: 'Hackathon', 'Open Source': 'Open Source', Personal: 'Personal' } as Record<string, string>,
    items: {
      1: { title: 'DeepVaR: Portfolio Risk Forecasting', description: "Interactive Streamlit app that estimates a stock portfolio's 10-day Value at Risk using DeepAR, a deep-learning probabilistic forecaster (GluonTS). Pulls ~95 NASDAQ-100 tickers, runs Monte Carlo return scenarios, and reports 95% / 99% VaR, PnL, rolling volatility, and asset correlations — each with plain-language explanations." },
      2: { title: 'Fatal Compassion: Global Incident Risk', description: 'Transformed 4,337 humanitarian incident reports (1997–2025, 75+ countries) into a tactical intelligence brief on attacks against aid workers — surfacing systemic risk disparities and behavioral threat patterns, and culminating in a machine-learning prototype for real-time risk scoring.' },
      3: { title: 'Flight Delays: U.S. Airline Performance', description: 'A Quarto data story on U.S. airline on-time performance built from April 2019 U.S. DOT records. Queried the data in MySQL on AWS and analyzed it in R (tidyverse / ggplot2) to expose delay extremes, airport bottlenecks, and weather-driven cancellations — including a 43-hour maximum delay and 14,488 cancelled flights.' },
      4: { title: 'NLP Bias Detection in News Headlines', description: 'Studied New York Times coverage of the Israel–Palestine conflict using sentiment, polarity, and automated bias detection on headlines pulled from the NYT API. Machine-learning classifiers labeled ~86% of coverage pro-Israeli, and K-means clustering surfaced the linguistic features driving each label.' },
      5: { title: 'DataPulse: Retail Analytics Platform', description: "Retail analytics platform built at the CEWIT 2024 hackathon on the ~10k-order Superstore dataset. I built the React frontend — a multi-page dashboard that renders the ML backend's RFM segmentation, Prophet sales forecasts, and product-recommendation network graphs as interactive Plotly charts, plus a conversational AI assistant." },
      6: { title: 'BetterYou: AI Health & Fitness Planner', description: 'Personalized health app built at VTHax 2024. I owned two backend systems: an AI plan-generation pipeline (LLaMA 3.1 via Ollama) that turns a user profile into a structured weekly diet and workout plan under a strict JSON contract, and a reward engine that scores meals and workouts against clinical macronutrient ranges to gamify healthy habits.' },
      7: { title: 'Polymarket CLI', description: 'A fast, read-only terminal interface for Polymarket prediction markets — browse markets, inspect events, and run quantitative trade signals (momentum, SMA, mean-reversion, and cross-market ensembles) against live price history. Renders rich tables and automatically switches to JSON when piped.' },
      8: { title: 'Target Switch Bot', description: 'A Selenium automation that searches Target.com for a specific Nintendo Switch listing, adds it to the cart, and dismisses the protection-plan modal — using a stale-element-safe click helper and a bundled offline storefront for a full end-to-end demo. A browser-automation learning project; it stops at the cart.' },
      9: { title: 'Deep Q-Learning: Lunar Lander', description: "Trained a reinforcement-learning agent to land a spacecraft using a Deep Q-Network with experience replay and a target network. Solved OpenAI Gym's LunarLander-v2 in 534 episodes (~13 minutes), reaching the 200+ average-reward threshold Gym defines as “solved.”" },
    } as Record<number, { title: string; description: string }>,
  },
  experience: {
    badge: 'Work History',
    heading: 'Experience',
    groups: { professional: 'Professional Experience', additional: 'Additional Experience' },
    types: { 'Part-time': 'Part-time', 'Internship': 'Internship', 'Seasonal': 'Seasonal', 'Contract': 'Contract' } as Record<string, string>,
    communityLabel: 'Community',
    roles: {
      'Louis Li CPA PLLC': { role: 'Accounting Assistant', bullets: ['Collected, validated, and organized client financial documents to ensure data completeness and accuracy for tax preparation and audit review.'] },
      'Astera Holdings': { role: 'Software Engineer Intern', bullets: ['Diagnosed and resolved production UI issues by simplifying conditional render logic, improving application stability and user experience.', 'Collaborated with product stakeholders to implement and ship a stable, full-screen chat interface, reinforcing end-to-end system reliability.'] },
      'Accommodations Plus International': { role: 'Accounts Receivable Specialist', bullets: ['Maintained and reconciled structured financial records using Excel to support revenue tracking and discrepancy resolution.'] },
      'New York Life Insurance Company': { role: 'Insurance Agent', bullets: [] },
      'Morgen Evan': { role: 'Fall Analyst', bullets: ['Managed and cleaned client relationship data using Excel and Salesforce, supporting CRM migration and improving data accuracy and reporting workflows.', 'Analyzed and summarized global economic and financial data to develop weekly newsletter insights on IPO and M&A trends.'] },
      'GIFP': { role: 'Summer Intern', bullets: ['Analyzed market, competitor, and demographic data to support marketing strategy decisions for a tutoring center evaluating expansion into the U.S. education market.', 'Performed comparative analysis of U.S.-based tutoring providers, incorporating historical trends and projected market conditions to inform positioning and go-to-market strategy.'] },
      'Third EYE Edge, Inc': { role: 'Marketing Intern', bullets: ['Analyzed social media engagement metrics (likes, shares, comments) across Twitter, Facebook, and Instagram to support weekly data-informed marketing strategy discussions.', 'Conducted research on independent artists using platform analytics and industry benchmarks to customize marketing strategies based on artist skills, audience behavior, and platform performance.'] },
      'Teachers Federal Credit Union': { role: 'Bank Teller', bullets: [] },
      "Lowe's Companies, Inc.": { role: 'Head Cashier', bullets: [] },
    } as Record<string, { role: string; bullets: string[] }>,
  },
  education: {
    badge: 'Timeline',
    heading: 'Academic Journey',
    courseworkLabel: 'Coursework:',
    schools: {
      'Georgetown University': { degree: 'M.S. in Data Science and Analytics', highlights: ['GPA: 3.933 | Returning Student Scholarship Recipient', 'Teaching Assistant — DSAN Summer Bootcamp & Probabilistic Modeling', 'Teaching Assistant - DSAN 5100 Prob Modeling/Stat Computing', 'DSAN Graduate Peer Mentor'], coursework: 'Neural Networks & Deep Learning, Applied Time Series, Big Data & Cloud Computing, Data Visualization, Statistical Computing' },
      'New York University': { degree: 'B.S. in Mathematics', minor: 'Minor in Computer Science', highlights: [], coursework: 'Probability, Combinatorics, Discrete Mathematics, Real Analysis, Data Structures' },
      'The Stony Brook School': { degree: 'High School Diploma', highlights: ['GPA: 3.85 / 4.0 — Honor & High Honor Roll', 'NYSSMA Level 6 — All-County Ensemble', 'All-County 1600M, Track & Field — Section XI'] },
    } as Record<string, { degree: string; minor?: string; highlights: string[]; coursework?: string }>,
  },
  interests: {
    badge: 'Beyond the resume',
    heading: 'Because humans are more than their GitHub graphs.',
    items: [
      { title: 'Streetwear Design', desc: 'Exploring the intersection of geometry, algorithms, and fabric.' },
      { title: 'Indie Games', desc: 'Crafting small, intentional experiences with mechanics that feel good.' },
      { title: 'Chess', desc: 'Practicing calculated aggression and tactical foresight.' },
      { title: 'The Gym', desc: 'Physical discipline as a counterbalance to cognitive labor.' },
      { title: 'Cooking', desc: 'Finding the exact ratios that make flavors work.' },
      { title: 'Longform Reading', desc: 'Long, unhurried reads — mostly The New Yorker — on culture, politics, and the people behind the headlines.' },
    ],
  },
  contact: {
    badge: 'Connect',
    heading1: "Let's build", heading2: 'something.',
    para: "Whether it's a data challenge, a software product, or talking about the latest in streetwear — my inbox is open.",
    emailLabel: 'Email', linkedinLabel: 'LinkedIn', githubLabel: 'GitHub',
    resumeLabel: 'Résumé', resumeValue: 'Download PDF',
    rights: 'All rights reserved.', tagline: 'Designed with intention.',
  },
};

export type Dict = typeof en;

// ----- 简体中文 -----
const zh: Dict = {
  nav: { about: '关于', skills: '技能', projects: '项目', experience: '经历', education: '教育', interests: '兴趣', contact: '联系', resume: '简历' },
  hero: { badge: '作品集', title: '数据分析师', quote: '"以数学为根基，以数据科学为专业，以软件开发为热爱。"', scroll: '向下滚动探索' },
  about: {
    badge: '关于我',
    heading: '本能地构建，天性地追问。',
    p1: '来自纽约的工程师。本科毕业于纽约大学（NYU）数学专业，辅修计算机科学，近期获得乔治城大学数据科学与分析硕士学位。',
    p2: '我对人工智能、机器人和太空如何让人类的未来更有希望充满好奇。我以数学家的严谨和工程师的务实来解决问题。',
    p3: '工作之余，我是一名有志于街头潮流设计与独立游戏开发的创作者。闲暇时，你会在健身房、厨房、棋盘前，或与朋友一起漫步城市中找到我。',
    locationLabel: '所在地', locationValue: '纽约州纽约市',
    statusLabel: '状态', statusValue: '开放求职机会',
  },
  skills: {
    badge: '能力',
    heading: '技术工具箱',
    categories: [
      { title: '语言与框架', skills: ['Python (Pandas, NumPy)', 'R (tidyverse, ggplot2)', 'SQL', 'JavaScript', 'React', 'Flask'] },
      { title: '机器学习', skills: ['Scikit-learn', '分类（朴素贝叶斯、随机森林）', '聚类（K-Means、RFM）', '推荐系统', '回归', '预测建模'] },
      { title: '深度学习与人工智能', skills: ['TensorFlow / Keras', '强化学习（DQN）', '概率预测（DeepAR、GluonTS）', '大语言模型（LLaMA 3.1、Ollama）', '提示工程'] },
      { title: '自然语言处理与统计', skills: ['自然语言处理', '情感与偏见分析', '时间序列（Prophet）', '假设检验', '统计推断', '地理空间分析'] },
      { title: '数据与基础架构', skills: ['MySQL', 'MongoDB', 'AWS', 'REST API', '数据整理', '数据校验'] },
      { title: '可视化与工作流', skills: ['Plotly', 'Matplotlib / Seaborn', 'Streamlit', 'Quarto', 'Selenium', 'Git / GitHub'] },
      { title: '基础与语言', skills: ['Google 数据分析（认证）', '普通话（流利）', '西班牙语（初级）'] },
    ],
  },
  projects: {
    badge: '精选作品',
    heading: '近期项目',
    intro: '涵盖风险建模、深度学习、自然语言处理、分析工程与人工智能系统的精选作品。',
    statuses: { Featured: '精选', Live: '在线', Complete: '已完成', Hackathon: '黑客松', 'Open Source': '开源', Personal: '个人项目' },
    items: {
      1: { title: 'DeepVaR：投资组合风险预测', description: '一个交互式 Streamlit 应用，使用 DeepAR（GluonTS 的深度学习概率预测模型）估算股票投资组合的 10 天风险价值（VaR）。抓取约 95 只纳斯达克 100 成分股，运行蒙特卡洛收益情景模拟，并报告 95%/99% VaR、盈亏、滚动波动率和资产相关性——每项都配有通俗易懂的解释。' },
      2: { title: 'Fatal Compassion：全球事件风险', description: '将 4,337 份人道主义事件报告（1997–2025 年，75 个以上国家）转化为一份针对援助人员遇袭情况的战术情报简报——揭示系统性风险差异与行为威胁模式，并最终构建出一个用于实时风险评分的机器学习原型。' },
      3: { title: '航班延误：美国航空公司运营表现', description: '一个基于 2019 年 4 月美国交通部（DOT）数据的 Quarto 数据报道，分析美国航空公司的准点率。数据在 AWS 上的 MySQL 中查询，并用 R（tidyverse / ggplot2）分析，揭示延误极值、机场瓶颈以及天气导致的取消——包括长达 43 小时的最大延误和 14,488 个被取消的航班。' },
      4: { title: '新闻标题中的自然语言处理偏见检测', description: '通过 NYT API 抓取《纽约时报》关于以巴冲突的报道标题，运用情感分析、极性分析和自动化偏见检测进行研究。机器学习分类器将约 86% 的报道标记为亲以色列，K-means 聚类则揭示了驱动各类标签的语言特征。' },
      5: { title: 'DataPulse：零售分析平台', description: '在 CEWIT 2024 黑客松上基于约 1 万笔订单的 Superstore 数据集构建的零售分析平台。我负责 React 前端——一个多页面仪表盘，将机器学习后端的 RFM 分群、Prophet 销售预测和产品推荐网络图渲染为交互式 Plotly 图表，并集成对话式 AI 助手。' },
      6: { title: 'BetterYou：AI 健康与健身规划师', description: '在 VTHax 2024 上构建的个性化健康应用。我负责两个后端系统：一个 AI 计划生成流水线（通过 Ollama 运行 LLaMA 3.1），在严格的 JSON 约定下将用户资料转化为结构化的每周饮食与健身计划；以及一个奖励引擎，依据临床宏量营养素范围为餐食和运动评分，以游戏化方式培养健康习惯。' },
      7: { title: 'Polymarket 命令行工具', description: '一个快速、只读的 Polymarket 预测市场终端界面——浏览市场、查看事件，并基于实时价格历史运行量化交易信号（动量、SMA、均值回归及跨市场组合）。可渲染精美表格，并在管道输出时自动切换为 JSON。' },
      8: { title: 'Target Switch 抢购机器人', description: '一个 Selenium 自动化脚本，在 Target.com 上搜索特定的任天堂 Switch 商品，加入购物车并关闭保修计划弹窗——使用防止元素失效的点击助手，并内置离线商店以完整演示端到端流程。这是一个浏览器自动化学习项目，止步于购物车。' },
      9: { title: '深度 Q 学习：登月着陆器', description: '训练一个强化学习智能体，使用带有经验回放和目标网络的深度 Q 网络（DQN）来降落航天器。在 534 个回合（约 13 分钟）内解决了 OpenAI Gym 的 LunarLander-v2，达到 Gym 定义为"已解决"的 200+ 平均奖励阈值。' },
    },
  },
  experience: {
    badge: '工作经历',
    heading: '经历',
    groups: { professional: '专业经历', additional: '其他经历' },
    types: { 'Part-time': '兼职', 'Internship': '实习', 'Seasonal': '季节性', 'Contract': '合同制' },
    communityLabel: '社区服务',
    roles: {
      'Louis Li CPA PLLC': { role: '会计助理', bullets: ['收集、核验并整理客户财务文件，确保报税与审计复核所需数据的完整性与准确性。'] },
      'Astera Holdings': { role: '软件工程师实习生', bullets: ['通过简化条件渲染逻辑，诊断并解决生产环境的 UI 问题，提升了应用稳定性与用户体验。', '与产品相关方协作，实现并交付了稳定的全屏聊天界面，增强了端到端的系统可靠性。'] },
      'Accommodations Plus International': { role: '应收账款专员', bullets: ['使用 Excel 维护并核对结构化财务记录，支持收入跟踪与差异处理。'] },
      'New York Life Insurance Company': { role: '保险代理人', bullets: [] },
      'Morgen Evan': { role: '秋季分析师', bullets: ['使用 Excel 和 Salesforce 管理与清洗客户关系数据，支持 CRM 迁移并改善数据准确性与报告流程。', '分析并汇总全球经济与金融数据，为每周简报提供关于 IPO 与并购趋势的洞见。'] },
      'GIFP': { role: '暑期实习生', bullets: ['分析市场、竞争对手及人口统计数据，为一家评估进入美国教育市场的辅导中心的营销策略决策提供支持。', '对美国本土辅导机构进行对比分析，结合历史趋势与市场预测，为定位与市场进入策略提供依据。'] },
      'Third EYE Edge, Inc': { role: '市场营销实习生', bullets: ['分析 Twitter、Facebook 和 Instagram 上的社交媒体互动指标（点赞、分享、评论），为每周基于数据的营销策略讨论提供支持。', '利用平台分析与行业基准对独立艺人进行研究，根据艺人技能、受众行为与平台表现定制营销策略。'] },
      'Teachers Federal Credit Union': { role: '银行柜员', bullets: [] },
      "Lowe's Companies, Inc.": { role: '收银主管', bullets: [] },
    },
  },
  education: {
    badge: '时间线',
    heading: '求学历程',
    courseworkLabel: '课程：',
    schools: {
      'Georgetown University': { degree: '数据科学与分析理学硕士', highlights: ['GPA：3.933 | 回归学生奖学金获得者', '助教 — DSAN 暑期训练营与概率建模', '助教 - DSAN 5100 概率建模／统计计算', 'DSAN 研究生同伴导师'], coursework: '神经网络与深度学习、应用时间序列、大数据与云计算、数据可视化、统计计算' },
      'New York University': { degree: '数学理学学士', minor: '计算机科学辅修', highlights: [], coursework: '概率论、组合数学、离散数学、实分析、数据结构' },
      'The Stony Brook School': { degree: '高中文凭', highlights: ['GPA：3.85 / 4.0 — 荣誉与高级荣誉榜', 'NYSSMA 六级 — 全县合奏团', '全县 1600 米，田径 — Section XI'] },
    },
  },
  interests: {
    badge: '简历之外',
    heading: '因为人不只是他们的 GitHub 提交图。',
    items: [
      { title: '街头潮流设计', desc: '探索几何、算法与布料之间的交汇点。' },
      { title: '独立游戏', desc: '打造小而用心、手感出色的游戏体验。' },
      { title: '国际象棋', desc: '练习有算计的进攻与战术前瞻。' },
      { title: '健身房', desc: '以身体的自律平衡脑力的劳作。' },
      { title: '烹饪', desc: '寻找让风味恰到好处的精确比例。' },
      { title: '长篇阅读', desc: '不疾不徐的长文阅读——多为《纽约客》——关于文化、政治，以及新闻背后的人。' },
    ],
  },
  contact: {
    badge: '联系',
    heading1: '一起打造', heading2: '有意义的东西。',
    para: '无论是数据难题、软件产品，还是聊聊最新的街头潮流——我的收件箱随时敞开。',
    emailLabel: '邮箱', linkedinLabel: '领英', githubLabel: 'GitHub',
    resumeLabel: '简历', resumeValue: '下载 PDF',
    rights: '版权所有。', tagline: '用心设计。',
  },
};

// ----- Español -----
const es: Dict = {
  nav: { about: 'Perfil', skills: 'Aptitudes', projects: 'Proyectos', experience: 'Experiencia', education: 'Formación', interests: 'Intereses', contact: 'Contacto', resume: 'CV' },
  hero: { badge: 'Portafolio', title: 'Analista de Datos', quote: '"Matemático de base, científico de datos por formación, desarrollador de software por pasión."', scroll: 'Desplázate para explorar' },
  about: {
    badge: 'Sobre mí',
    heading: 'Constructor por reflejo, cuestionador por naturaleza.',
    p1: 'Ingeniero de Nueva York. Licenciado en Matemáticas por la NYU con especialización secundaria en Informática, y recién graduado con una Maestría en Ciencia de Datos y Analítica por la Universidad de Georgetown.',
    p2: 'Me fascina cómo la IA, la robótica y el espacio pueden hacer más prometedor el futuro de la humanidad. Abordo los problemas con el rigor de un matemático y el pragmatismo de un ingeniero.',
    p3: 'Fuera del trabajo, soy aspirante a diseñador de ropa urbana y desarrollador de videojuegos independientes. En mi tiempo libre me encontrarás en el gimnasio, en la cocina, ante un tablero de ajedrez o recorriendo la ciudad con amigos.',
    locationLabel: 'Ubicación', locationValue: 'Nueva York, NY',
    statusLabel: 'Estado', statusValue: 'Abierto a oportunidades',
  },
  skills: {
    badge: 'Capacidades',
    heading: 'Caja de Herramientas Técnica',
    categories: [
      { title: 'Lenguajes y Frameworks', skills: ['Python (Pandas, NumPy)', 'R (tidyverse, ggplot2)', 'SQL', 'JavaScript', 'React', 'Flask'] },
      { title: 'Aprendizaje Automático', skills: ['Scikit-learn', 'Clasificación (Naive Bayes, Random Forest)', 'Agrupamiento (K-Means, RFM)', 'Sistemas de Recomendación', 'Regresión', 'Modelado Predictivo'] },
      { title: 'Aprendizaje Profundo e IA', skills: ['TensorFlow / Keras', 'Aprendizaje por Refuerzo (DQN)', 'Pronóstico Probabilístico (DeepAR, GluonTS)', 'LLMs (LLaMA 3.1, Ollama)', 'Ingeniería de Prompts'] },
      { title: 'PLN y Estadística', skills: ['PLN', 'Análisis de Sentimiento y Sesgo', 'Series Temporales (Prophet)', 'Pruebas de Hipótesis', 'Inferencia Estadística', 'Análisis Geoespacial'] },
      { title: 'Datos e Infraestructura', skills: ['MySQL', 'MongoDB', 'AWS', 'APIs REST', 'Depuración de Datos', 'Validación de Datos'] },
      { title: 'Visualización y Flujo de Trabajo', skills: ['Plotly', 'Matplotlib / Seaborn', 'Streamlit', 'Quarto', 'Selenium', 'Git / GitHub'] },
      { title: 'Fundamentos e Idiomas', skills: ['Google Data Analytics (Certificado)', 'Mandarín (Fluido)', 'Español (Principiante)'] },
    ],
  },
  projects: {
    badge: 'Trabajo Seleccionado',
    heading: 'Proyectos Recientes',
    intro: 'Una selección de trabajos en modelado de riesgo, aprendizaje profundo, PLN, ingeniería analítica y sistemas de IA.',
    statuses: { Featured: 'Destacado', Live: 'En línea', Complete: 'Completado', Hackathon: 'Hackathon', 'Open Source': 'Código Abierto', Personal: 'Personal' },
    items: {
      1: { title: 'DeepVaR: Pronóstico de Riesgo de Cartera', description: 'Aplicación interactiva en Streamlit que estima el Valor en Riesgo (VaR) a 10 días de una cartera de acciones usando DeepAR, un pronosticador probabilístico de aprendizaje profundo (GluonTS). Descarga ~95 valores del NASDAQ-100, ejecuta escenarios de retorno con Monte Carlo e informa el VaR al 95 %/99 %, el PnL, la volatilidad móvil y las correlaciones entre activos, cada uno con explicaciones en lenguaje sencillo.' },
      2: { title: 'Fatal Compassion: Riesgo Global de Incidentes', description: 'Transformó 4.337 informes de incidentes humanitarios (1997–2025, más de 75 países) en un informe táctico de inteligencia sobre ataques a trabajadores humanitarios, revelando disparidades sistémicas de riesgo y patrones de amenaza conductuales, y culminando en un prototipo de aprendizaje automático para la puntuación de riesgo en tiempo real.' },
      3: { title: 'Retrasos de Vuelos: Rendimiento de Aerolíneas de EE. UU.', description: 'Un relato de datos en Quarto sobre la puntualidad de las aerolíneas estadounidenses, construido con registros del DOT de EE. UU. de abril de 2019. Consulté los datos en MySQL sobre AWS y los analicé en R (tidyverse / ggplot2) para exponer retrasos extremos, cuellos de botella en aeropuertos y cancelaciones por clima, incluido un retraso máximo de 43 horas y 14.488 vuelos cancelados.' },
      4: { title: 'Detección de Sesgo con PLN en Titulares', description: 'Estudió la cobertura del conflicto Israel–Palestina en The New York Times usando análisis de sentimiento, polaridad y detección automática de sesgo sobre titulares obtenidos de la API del NYT. Clasificadores de aprendizaje automático etiquetaron ~86 % de la cobertura como pro-israelí, y el agrupamiento K-means reveló los rasgos lingüísticos que impulsan cada etiqueta.' },
      5: { title: 'DataPulse: Plataforma de Analítica Minorista', description: 'Plataforma de analítica minorista creada en el hackathon CEWIT 2024 sobre el conjunto de datos Superstore (~10 mil pedidos). Desarrollé el frontend en React: un panel multipágina que renderiza la segmentación RFM, los pronósticos de ventas con Prophet y los grafos de recomendación de productos del backend de ML como gráficos interactivos de Plotly, además de un asistente de IA conversacional.' },
      6: { title: 'BetterYou: Planificador de Salud con IA', description: 'App de salud personalizada creada en VTHax 2024. Me encargué de dos sistemas del backend: una canalización de generación de planes con IA (LLaMA 3.1 vía Ollama) que convierte el perfil del usuario en un plan semanal estructurado de dieta y ejercicio bajo un contrato JSON estricto, y un motor de recompensas que puntúa comidas y entrenamientos según rangos clínicos de macronutrientes para gamificar los hábitos saludables.' },
      7: { title: 'Polymarket CLI', description: 'Una interfaz de terminal rápida y de solo lectura para los mercados de predicción de Polymarket: explora mercados, inspecciona eventos y ejecuta señales cuantitativas de trading (momento, SMA, reversión a la media y conjuntos entre mercados) sobre el historial de precios en vivo. Muestra tablas elegantes y cambia automáticamente a JSON al canalizar la salida.' },
      8: { title: 'Bot de Nintendo Switch para Target', description: 'Una automatización con Selenium que busca en Target.com un anuncio concreto de Nintendo Switch, lo añade al carrito y descarta el modal del plan de protección, usando un asistente de clic resistente a elementos obsoletos y una tienda offline incluida para una demostración completa de principio a fin. Un proyecto de aprendizaje de automatización de navegador; se detiene en el carrito.' },
      9: { title: 'Deep Q-Learning: Aterrizaje Lunar', description: 'Entrenó un agente de aprendizaje por refuerzo para aterrizar una nave usando una Red Q Profunda con repetición de experiencia y una red objetivo. Resolvió LunarLander-v2 de OpenAI Gym en 534 episodios (~13 minutos), alcanzando el umbral de recompensa media de 200+ que Gym define como «resuelto».' },
    },
  },
  experience: {
    badge: 'Trayectoria',
    heading: 'Experiencia',
    groups: { professional: 'Experiencia Profesional', additional: 'Experiencia Adicional' },
    types: { 'Part-time': 'Media jornada', 'Internship': 'Prácticas', 'Seasonal': 'Temporal', 'Contract': 'Por contrato' },
    communityLabel: 'Comunidad',
    roles: {
      'Louis Li CPA PLLC': { role: 'Asistente de Contabilidad', bullets: ['Recopilé, validé y organicé documentos financieros de clientes para garantizar la integridad y exactitud de los datos para la preparación de impuestos y la revisión de auditoría.'] },
      'Astera Holdings': { role: 'Ingeniero de Software (Prácticas)', bullets: ['Diagnostiqué y resolví problemas de interfaz en producción simplificando la lógica de renderizado condicional, mejorando la estabilidad de la aplicación y la experiencia del usuario.', 'Colaboré con las partes interesadas del producto para implementar y lanzar una interfaz de chat estable a pantalla completa, reforzando la fiabilidad del sistema de extremo a extremo.'] },
      'Accommodations Plus International': { role: 'Especialista en Cuentas por Cobrar', bullets: ['Mantuve y concilié registros financieros estructurados con Excel para apoyar el seguimiento de ingresos y la resolución de discrepancias.'] },
      'New York Life Insurance Company': { role: 'Agente de Seguros', bullets: [] },
      'Morgen Evan': { role: 'Analista de Otoño', bullets: ['Gestioné y depuré datos de relaciones con clientes usando Excel y Salesforce, apoyando la migración de CRM y mejorando la exactitud de los datos y los flujos de generación de informes.', 'Analicé y resumí datos económicos y financieros globales para elaborar información semanal de boletín sobre tendencias de OPI y fusiones y adquisiciones.'] },
      'GIFP': { role: 'Pasante de Verano', bullets: ['Analicé datos de mercado, competencia y demografía para apoyar las decisiones de estrategia de marketing de un centro de tutoría que evaluaba su expansión al mercado educativo de EE. UU.', 'Realicé un análisis comparativo de proveedores de tutoría en EE. UU., incorporando tendencias históricas y condiciones proyectadas del mercado para orientar el posicionamiento y la estrategia de entrada.'] },
      'Third EYE Edge, Inc': { role: 'Pasante de Marketing', bullets: ['Analicé métricas de interacción en redes sociales (me gusta, compartidos, comentarios) en Twitter, Facebook e Instagram para apoyar las discusiones semanales de estrategia de marketing basadas en datos.', 'Investigué a artistas independientes usando analíticas de plataforma y referencias del sector para personalizar estrategias de marketing según las aptitudes del artista, el comportamiento de la audiencia y el rendimiento de la plataforma.'] },
      'Teachers Federal Credit Union': { role: 'Cajero de Banco', bullets: [] },
      "Lowe's Companies, Inc.": { role: 'Cajero Principal', bullets: [] },
    },
  },
  education: {
    badge: 'Cronología',
    heading: 'Trayectoria Académica',
    courseworkLabel: 'Asignaturas:',
    schools: {
      'Georgetown University': { degree: 'Maestría en Ciencia de Datos y Analítica', highlights: ['GPA: 3,933 | Becario Returning Student', 'Asistente de Cátedra — DSAN Summer Bootcamp y Modelado Probabilístico', 'Asistente de Cátedra - DSAN 5100 Modelado Prob./Computación Estadística', 'Mentor de Posgrado DSAN'], coursework: 'Redes Neuronales y Aprendizaje Profundo, Series Temporales Aplicadas, Big Data y Computación en la Nube, Visualización de Datos, Computación Estadística' },
      'New York University': { degree: 'Licenciatura en Matemáticas', minor: 'Especialización secundaria en Informática', highlights: [], coursework: 'Probabilidad, Combinatoria, Matemática Discreta, Análisis Real, Estructuras de Datos' },
      'The Stony Brook School': { degree: 'Diploma de Bachillerato', highlights: ['GPA: 3,85 / 4,0 — Cuadro de Honor y Alto Honor', 'NYSSMA Nivel 6 — Conjunto del Condado', '1600 m del Condado, Atletismo — Section XI'] },
    },
  },
  interests: {
    badge: 'Más allá del CV',
    heading: 'Porque las personas son más que sus gráficos de GitHub.',
    items: [
      { title: 'Diseño de Ropa Urbana', desc: 'Explorar la intersección entre geometría, algoritmos y tela.' },
      { title: 'Juegos Independientes', desc: 'Crear experiencias pequeñas e intencionadas con mecánicas que se sienten bien.' },
      { title: 'Ajedrez', desc: 'Practicar la agresión calculada y la previsión táctica.' },
      { title: 'El Gimnasio', desc: 'Disciplina física como contrapeso al trabajo mental.' },
      { title: 'Cocina', desc: 'Encontrar las proporciones exactas que hacen que los sabores funcionen.' },
      { title: 'Lectura de Largo Formato', desc: 'Lecturas largas y sin prisa — sobre todo The New Yorker — sobre cultura, política y las personas detrás de las noticias.' },
    ],
  },
  contact: {
    badge: 'Conectar',
    heading1: 'Construyamos', heading2: 'algo.',
    para: 'Ya sea un reto de datos, un producto de software o hablar de lo último en ropa urbana: mi bandeja de entrada está abierta.',
    emailLabel: 'Correo', linkedinLabel: 'LinkedIn', githubLabel: 'GitHub',
    resumeLabel: 'CV', resumeValue: 'Descargar PDF',
    rights: 'Todos los derechos reservados.', tagline: 'Diseñado con intención.',
  },
};

// ----- Français -----
const fr: Dict = {
  nav: { about: 'À propos', skills: 'Compétences', projects: 'Projets', experience: 'Expérience', education: 'Formation', interests: 'Centres d\'intérêt', contact: 'Contact', resume: 'CV' },
  hero: { badge: 'Portfolio', title: 'Analyste de Données', quote: '« Mathématicien par fondation, data scientist par formation, développeur logiciel par passion. »', scroll: 'Faites défiler pour explorer' },
  about: {
    badge: 'À propos de moi',
    heading: 'Bâtisseur par réflexe, questionneur par nature.',
    p1: 'Ingénieur de New York. Licence en mathématiques de la NYU avec une mineure en informatique, et récemment un master en science des données et analytique de l\'Université de Georgetown.',
    p2: 'Curieux de voir comment l\'IA, la robotique et l\'espace peuvent rendre l\'avenir de l\'humanité plus prometteur. J\'aborde les problèmes avec la rigueur d\'un mathématicien et le pragmatisme d\'un ingénieur.',
    p3: 'En dehors du travail, je suis un designer de streetwear en herbe et un développeur de jeux indépendants. Pendant mon temps libre, vous me trouverez à la salle de sport, en cuisine, devant un échiquier ou à arpenter la ville avec des amis.',
    locationLabel: 'Localisation', locationValue: 'New York, NY',
    statusLabel: 'Statut', statusValue: 'Ouvert aux opportunités',
  },
  skills: {
    badge: 'Compétences',
    heading: 'Boîte à Outils Technique',
    categories: [
      { title: 'Langages et Frameworks', skills: ['Python (Pandas, NumPy)', 'R (tidyverse, ggplot2)', 'SQL', 'JavaScript', 'React', 'Flask'] },
      { title: 'Apprentissage Automatique', skills: ['Scikit-learn', 'Classification (Naive Bayes, Random Forest)', 'Partitionnement (K-Means, RFM)', 'Systèmes de Recommandation', 'Régression', 'Modélisation Prédictive'] },
      { title: 'Apprentissage Profond et IA', skills: ['TensorFlow / Keras', 'Apprentissage par Renforcement (DQN)', 'Prévision Probabiliste (DeepAR, GluonTS)', 'LLM (LLaMA 3.1, Ollama)', 'Ingénierie de Prompts'] },
      { title: 'TAL et Statistiques', skills: ['TAL', 'Analyse de Sentiment et de Biais', 'Séries Temporelles (Prophet)', 'Tests d\'Hypothèses', 'Inférence Statistique', 'Analyse Géospatiale'] },
      { title: 'Données et Infrastructure', skills: ['MySQL', 'MongoDB', 'AWS', 'API REST', 'Nettoyage de Données', 'Validation de Données'] },
      { title: 'Visualisation et Workflow', skills: ['Plotly', 'Matplotlib / Seaborn', 'Streamlit', 'Quarto', 'Selenium', 'Git / GitHub'] },
      { title: 'Fondamentaux et Langues', skills: ['Google Data Analytics (Certifié)', 'Mandarin (Courant)', 'Espagnol (Débutant)'] },
    ],
  },
  projects: {
    badge: 'Travaux Sélectionnés',
    heading: 'Projets Récents',
    intro: 'Une sélection de travaux en modélisation du risque, apprentissage profond, TAL, ingénierie analytique et systèmes d\'IA.',
    statuses: { Featured: 'En vedette', Live: 'En ligne', Complete: 'Terminé', Hackathon: 'Hackathon', 'Open Source': 'Open Source', Personal: 'Personnel' },
    items: {
      1: { title: 'DeepVaR : Prévision du Risque de Portefeuille', description: 'Application Streamlit interactive qui estime la Valeur à Risque (VaR) à 10 jours d\'un portefeuille d\'actions à l\'aide de DeepAR, un modèle de prévision probabiliste par apprentissage profond (GluonTS). Elle récupère environ 95 valeurs du NASDAQ-100, exécute des scénarios de rendement Monte-Carlo et rapporte la VaR à 95 %/99 %, le PnL, la volatilité glissante et les corrélations d\'actifs, chacun accompagné d\'explications en langage clair.' },
      2: { title: 'Fatal Compassion : Risque Mondial d\'Incidents', description: 'A transformé 4 337 rapports d\'incidents humanitaires (1997–2025, plus de 75 pays) en une note de renseignement tactique sur les attaques contre les travailleurs humanitaires, révélant des disparités systémiques de risque et des schémas de menace comportementaux, et aboutissant à un prototype d\'apprentissage automatique pour la notation du risque en temps réel.' },
      3: { title: 'Retards de Vols : Performance des Compagnies Américaines', description: 'Un récit de données en Quarto sur la ponctualité des compagnies aériennes américaines, construit à partir des données du DOT américain d\'avril 2019. J\'ai interrogé les données dans MySQL sur AWS et les ai analysées en R (tidyverse / ggplot2) pour révéler les retards extrêmes, les goulots d\'étranglement des aéroports et les annulations liées à la météo, dont un retard maximal de 43 heures et 14 488 vols annulés.' },
      4: { title: 'Détection de Biais par TAL dans les Titres', description: 'A étudié la couverture du conflit israélo-palestinien par le New York Times à l\'aide de l\'analyse de sentiment, de polarité et de la détection automatique de biais sur des titres extraits de l\'API du NYT. Des classificateurs d\'apprentissage automatique ont étiqueté environ 86 % de la couverture comme pro-israélienne, et le partitionnement K-means a mis au jour les traits linguistiques qui sous-tendent chaque étiquette.' },
      5: { title: 'DataPulse : Plateforme d\'Analytique de Détail', description: 'Plateforme d\'analytique de détail créée lors du hackathon CEWIT 2024 sur le jeu de données Superstore (~10 000 commandes). J\'ai développé le frontend en React : un tableau de bord multipage qui affiche la segmentation RFM, les prévisions de ventes Prophet et les graphes de recommandation de produits du backend ML sous forme de graphiques Plotly interactifs, ainsi qu\'un assistant IA conversationnel.' },
      6: { title: 'BetterYou : Planificateur Santé par IA', description: 'Application de santé personnalisée créée lors de VTHax 2024. J\'ai pris en charge deux systèmes du backend : un pipeline de génération de plans par IA (LLaMA 3.1 via Ollama) qui transforme le profil de l\'utilisateur en un plan hebdomadaire structuré de régime et d\'entraînement sous un contrat JSON strict, et un moteur de récompenses qui note les repas et les séances selon des plages cliniques de macronutriments pour gamifier les habitudes saines.' },
      7: { title: 'Polymarket CLI', description: 'Une interface en ligne de commande rapide et en lecture seule pour les marchés de prédiction Polymarket : parcourez les marchés, inspectez les événements et exécutez des signaux de trading quantitatifs (momentum, SMA, retour à la moyenne et ensembles inter-marchés) sur l\'historique des prix en direct. Elle affiche des tableaux soignés et bascule automatiquement en JSON lorsqu\'elle est redirigée.' },
      8: { title: 'Bot Nintendo Switch pour Target', description: 'Une automatisation Selenium qui recherche sur Target.com une annonce précise de Nintendo Switch, l\'ajoute au panier et ferme la fenêtre du plan de protection, à l\'aide d\'un assistant de clic résistant aux éléments périmés et d\'une boutique hors ligne intégrée pour une démonstration complète de bout en bout. Un projet d\'apprentissage de l\'automatisation de navigateur ; il s\'arrête au panier.' },
      9: { title: 'Deep Q-Learning : Alunissage', description: 'A entraîné un agent d\'apprentissage par renforcement à faire atterrir un vaisseau à l\'aide d\'un réseau Q profond avec rejeu d\'expérience et réseau cible. A résolu LunarLander-v2 d\'OpenAI Gym en 534 épisodes (~13 minutes), atteignant le seuil de récompense moyenne de 200+ que Gym définit comme « résolu ».' },
    },
  },
  experience: {
    badge: 'Parcours Professionnel',
    heading: 'Expérience',
    groups: { professional: 'Expérience Professionnelle', additional: 'Expérience Complémentaire' },
    types: { 'Part-time': 'Temps partiel', 'Internship': 'Stage', 'Seasonal': 'Saisonnier', 'Contract': 'Contractuel' },
    communityLabel: 'Engagement Associatif',
    roles: {
      'Louis Li CPA PLLC': { role: 'Assistant Comptable', bullets: ['Collecté, validé et organisé les documents financiers des clients afin d\'assurer l\'exhaustivité et l\'exactitude des données pour la préparation fiscale et la revue d\'audit.'] },
      'Astera Holdings': { role: 'Ingénieur Logiciel Stagiaire', bullets: ['Diagnostiqué et résolu des problèmes d\'interface en production en simplifiant la logique de rendu conditionnel, améliorant la stabilité de l\'application et l\'expérience utilisateur.', 'Collaboré avec les parties prenantes produit pour implémenter et livrer une interface de chat plein écran stable, renforçant la fiabilité du système de bout en bout.'] },
      'Accommodations Plus International': { role: 'Spécialiste des Comptes Clients', bullets: ['Tenu et rapproché des registres financiers structurés avec Excel pour appuyer le suivi des revenus et la résolution des écarts.'] },
      'New York Life Insurance Company': { role: 'Agent d\'Assurance', bullets: [] },
      'Morgen Evan': { role: 'Analyste d\'Automne', bullets: ['Géré et nettoyé les données de relation client avec Excel et Salesforce, appuyant la migration CRM et améliorant l\'exactitude des données et les flux de reporting.', 'Analysé et synthétisé des données économiques et financières mondiales pour élaborer des éclairages hebdomadaires de newsletter sur les tendances des IPO et des fusions-acquisitions.'] },
      'GIFP': { role: 'Stagiaire d\'Été', bullets: ['Analysé des données de marché, de concurrence et démographiques pour appuyer les décisions de stratégie marketing d\'un centre de soutien scolaire évaluant son expansion sur le marché éducatif américain.', 'Réalisé une analyse comparative de prestataires de soutien scolaire américains, intégrant les tendances historiques et les conditions de marché projetées pour orienter le positionnement et la stratégie de lancement.'] },
      'Third EYE Edge, Inc': { role: 'Stagiaire Marketing', bullets: ['Analysé les indicateurs d\'engagement sur les réseaux sociaux (mentions J\'aime, partages, commentaires) sur Twitter, Facebook et Instagram pour appuyer les discussions hebdomadaires de stratégie marketing fondées sur les données.', 'Mené des recherches sur des artistes indépendants à l\'aide d\'analyses de plateforme et de références sectorielles pour personnaliser les stratégies marketing selon les compétences de l\'artiste, le comportement de l\'audience et la performance de la plateforme.'] },
      'Teachers Federal Credit Union': { role: 'Guichetier de Banque', bullets: [] },
      "Lowe's Companies, Inc.": { role: 'Chef de Caisse', bullets: [] },
    },
  },
  education: {
    badge: 'Chronologie',
    heading: 'Parcours Académique',
    courseworkLabel: 'Cours :',
    schools: {
      'Georgetown University': { degree: 'Master en Science des Données et Analytique', highlights: ['GPA : 3,933 | Boursier Returning Student', 'Assistant d\'Enseignement — DSAN Summer Bootcamp et Modélisation Probabiliste', 'Assistant d\'Enseignement - DSAN 5100 Modélisation Prob./Calcul Statistique', 'Mentor Pair de Cycle Supérieur DSAN'], coursework: 'Réseaux de Neurones et Apprentissage Profond, Séries Temporelles Appliquées, Big Data et Cloud Computing, Visualisation de Données, Calcul Statistique' },
      'New York University': { degree: 'Licence en Mathématiques', minor: 'Mineure en Informatique', highlights: [], coursework: 'Probabilités, Combinatoire, Mathématiques Discrètes, Analyse Réelle, Structures de Données' },
      'The Stony Brook School': { degree: 'Diplôme de Fin d\'Études Secondaires', highlights: ['GPA : 3,85 / 4,0 — Tableau d\'Honneur et Grand Honneur', 'NYSSMA Niveau 6 — Ensemble du Comté', '1600 m du Comté, Athlétisme — Section XI'] },
    },
  },
  interests: {
    badge: 'Au-delà du CV',
    heading: 'Parce qu\'un être humain vaut plus que ses contributions GitHub.',
    items: [
      { title: 'Design Streetwear', desc: 'Explorer l\'intersection entre géométrie, algorithmes et tissu.' },
      { title: 'Jeux Indépendants', desc: 'Concevoir de petites expériences intentionnelles aux mécaniques agréables.' },
      { title: 'Échecs', desc: 'Pratiquer l\'agression calculée et l\'anticipation tactique.' },
      { title: 'La Salle de Sport', desc: 'La discipline physique comme contrepoids au travail intellectuel.' },
      { title: 'Cuisine', desc: 'Trouver les proportions exactes qui font fonctionner les saveurs.' },
      { title: 'Lecture de Fond', desc: 'Des lectures longues et posées — surtout The New Yorker — sur la culture, la politique et les gens derrière l\'actualité.' },
    ],
  },
  contact: {
    badge: 'Contact',
    heading1: 'Construisons', heading2: 'quelque chose.',
    para: 'Qu\'il s\'agisse d\'un défi de données, d\'un produit logiciel ou d\'une discussion sur les dernières tendances streetwear — ma boîte de réception est ouverte.',
    emailLabel: 'E-mail', linkedinLabel: 'LinkedIn', githubLabel: 'GitHub',
    resumeLabel: 'CV', resumeValue: 'Télécharger le PDF',
    rights: 'Tous droits réservés.', tagline: 'Conçu avec intention.',
  },
};

// ----- العربية (RTL) -----
const ar: Dict = {
  nav: { about: 'نبذة', skills: 'المهارات', projects: 'المشاريع', experience: 'الخبرة', education: 'التعليم', interests: 'الاهتمامات', contact: 'تواصل', resume: 'السيرة الذاتية' },
  hero: { badge: 'معرض الأعمال', title: 'محلّل بيانات', quote: '«رياضيّ في الأساس، وعالِم بيانات بالتدريب، ومطوّر برمجيات بالشغف.»', scroll: 'مرّر للأسفل للاستكشاف' },
  about: {
    badge: 'نبذة عني',
    heading: 'بانٍ بالفطرة، وسائلٌ بالطبيعة.',
    p1: 'مهندس من نيويورك. حاصل على بكالوريوس في الرياضيات من جامعة نيويورك مع تخصص فرعي في علوم الحاسوب، وحديثًا على ماجستير في علم البيانات والتحليلات من جامعة جورجتاون.',
    p2: 'شغوف بكيفية جعل الذكاء الاصطناعي والروبوتات والفضاء مستقبل البشرية أكثر إشراقًا. أتعامل مع المشكلات بدقة عالِم الرياضيات وواقعية المهندس.',
    p3: 'خارج العمل، أنا مصمّم أزياء شارع طموح ومطوّر ألعاب مستقلة. في أوقات فراغي ستجدني في النادي الرياضي، أو في المطبخ، أو أمام رقعة الشطرنج، أو أتجوّل في المدينة مع الأصدقاء.',
    locationLabel: 'الموقع', locationValue: 'نيويورك',
    statusLabel: 'الحالة', statusValue: 'متاح للفرص',
  },
  skills: {
    badge: 'القدرات',
    heading: 'مجموعة الأدوات التقنية',
    categories: [
      { title: 'اللغات وأطر العمل', skills: ['Python (Pandas, NumPy)', 'R (tidyverse, ggplot2)', 'SQL', 'JavaScript', 'React', 'Flask'] },
      { title: 'تعلُّم الآلة', skills: ['Scikit-learn', 'التصنيف (Naive Bayes، Random Forest)', 'التجميع (K-Means، RFM)', 'أنظمة التوصية', 'الانحدار', 'النمذجة التنبؤية'] },
      { title: 'التعلُّم العميق والذكاء الاصطناعي', skills: ['TensorFlow / Keras', 'التعلُّم المعزّز (DQN)', 'التنبؤ الاحتمالي (DeepAR، GluonTS)', 'النماذج اللغوية الكبيرة (LLaMA 3.1، Ollama)', 'هندسة الأوامر'] },
      { title: 'معالجة اللغة والإحصاء', skills: ['معالجة اللغة الطبيعية', 'تحليل المشاعر والتحيّز', 'السلاسل الزمنية (Prophet)', 'اختبار الفرضيات', 'الاستدلال الإحصائي', 'التحليل الجغرافي المكاني'] },
      { title: 'البيانات والبنية التحتية', skills: ['MySQL', 'MongoDB', 'AWS', 'واجهات REST', 'معالجة البيانات', 'التحقق من البيانات'] },
      { title: 'التصوير المرئي وسير العمل', skills: ['Plotly', 'Matplotlib / Seaborn', 'Streamlit', 'Quarto', 'Selenium', 'Git / GitHub'] },
      { title: 'الأساسيات واللغات', skills: ['Google Data Analytics (معتمد)', 'الماندرين (بطلاقة)', 'الإسبانية (مبتدئ)'] },
    ],
  },
  projects: {
    badge: 'أعمال مختارة',
    heading: 'أحدث المشاريع',
    intro: 'مجموعة مختارة من الأعمال في نمذجة المخاطر والتعلُّم العميق ومعالجة اللغة الطبيعية وهندسة التحليلات وأنظمة الذكاء الاصطناعي.',
    statuses: { Featured: 'مميّز', Live: 'مباشر', Complete: 'مكتمل', Hackathon: 'هاكاثون', 'Open Source': 'مفتوح المصدر', Personal: 'شخصي' },
    items: {
      1: { title: 'DeepVaR: التنبؤ بمخاطر المحفظة', description: 'تطبيق تفاعلي بـ Streamlit يقدّر القيمة المعرّضة للمخاطر (VaR) لمحفظة أسهم على مدى 10 أيام باستخدام DeepAR، وهو نموذج تنبؤ احتمالي بالتعلُّم العميق (GluonTS). يجلب نحو 95 سهمًا من مؤشر NASDAQ-100، ويشغّل سيناريوهات عوائد بطريقة مونت كارلو، ويعرض VaR بنسبة 95%/99% والأرباح والخسائر والتقلّب المتحرّك والارتباطات بين الأصول، مع شرح مبسّط لكل مقياس.' },
      2: { title: 'Fatal Compassion: مخاطر الحوادث العالمية', description: 'حوّل 4,337 تقرير حادثة إنسانية (1997–2025، أكثر من 75 دولة) إلى موجز استخباراتي تكتيكي حول الهجمات على عمّال الإغاثة، يكشف تفاوتات منهجية في المخاطر وأنماط تهديد سلوكية، ويتوّج بنموذج أولي للتعلُّم الآلي لتقييم المخاطر في الوقت الفعلي.' },
      3: { title: 'تأخيرات الرحلات: أداء شركات الطيران الأمريكية', description: 'قصة بيانات بـ Quarto حول انتظام مواعيد شركات الطيران الأمريكية، مبنية على سجلات وزارة النقل الأمريكية لشهر أبريل 2019. استعلمتُ عن البيانات في MySQL على AWS وحلّلتها بـ R (tidyverse / ggplot2) لكشف حالات التأخير القصوى واختناقات المطارات وحالات الإلغاء بسبب الطقس، بما في ذلك تأخير أقصى بلغ 43 ساعة و14,488 رحلة ملغاة.' },
      4: { title: 'كشف التحيّز في عناوين الأخبار بمعالجة اللغة', description: 'درس تغطية صحيفة نيويورك تايمز للصراع الإسرائيلي–الفلسطيني باستخدام تحليل المشاعر والقُطبية والكشف الآلي عن التحيّز على عناوين مستخرجة من واجهة NYT البرمجية. صنّفت نماذج التعلُّم الآلي نحو 86% من التغطية على أنها مؤيّدة لإسرائيل، وكشف تجميع K-means السمات اللغوية التي تقف وراء كل تصنيف.' },
      5: { title: 'DataPulse: منصّة تحليلات التجزئة', description: 'منصّة تحليلات تجزئة بُنيت في هاكاثون CEWIT 2024 على مجموعة بيانات Superstore (نحو 10 آلاف طلب). طوّرتُ واجهة React الأمامية — لوحة معلومات متعددة الصفحات تعرض تقسيم RFM وتوقعات مبيعات Prophet ورسوم شبكة توصية المنتجات من الواجهة الخلفية للتعلُّم الآلي على شكل مخططات Plotly تفاعلية، إضافة إلى مساعد ذكاء اصطناعي حواري.' },
      6: { title: 'BetterYou: مخطّط الصحة واللياقة بالذكاء الاصطناعي', description: 'تطبيق صحّي مخصّص بُني في VTHax 2024. تولّيتُ نظامين في الواجهة الخلفية: خط إنتاج لتوليد الخطط بالذكاء الاصطناعي (LLaMA 3.1 عبر Ollama) يحوّل ملف المستخدم إلى خطة أسبوعية منظّمة للحمية والتمارين وفق عقد JSON صارم، ومحرّك مكافآت يقيّم الوجبات والتمارين مقابل نطاقات المغذّيات الكبرى السريرية لإضفاء طابع لعبي على العادات الصحية.' },
      7: { title: 'Polymarket CLI', description: 'واجهة طرفية سريعة للقراءة فقط لأسواق التنبؤ في Polymarket — تصفّح الأسواق، وافحص الأحداث، وشغّل إشارات تداول كمّية (الزخم، والمتوسط المتحرك البسيط، والارتداد إلى المتوسط، وتجميعات عبر الأسواق) على سجل الأسعار المباشر. تعرض جداول أنيقة وتتحوّل تلقائيًا إلى JSON عند تمرير الخرج.' },
      8: { title: 'روبوت شراء Nintendo Switch من Target', description: 'أتمتة بـ Selenium تبحث في Target.com عن عرض محدّد لجهاز Nintendo Switch، وتضيفه إلى السلّة، وتغلق نافذة خطة الحماية — باستخدام أداة نقر آمنة تجاه العناصر المنتهية ومتجر غير متصل مدمج لعرض توضيحي كامل من البداية إلى النهاية. مشروع تعلُّم لأتمتة المتصفح؛ يتوقف عند السلّة.' },
      9: { title: 'التعلُّم العميق Q: مركبة الهبوط القمري', description: 'درّب وكيل تعلُّم معزّز على إنزال مركبة فضائية باستخدام شبكة Q عميقة مع إعادة تشغيل الخبرة وشبكة هدف. حلّ بيئة LunarLander-v2 من OpenAI Gym في 534 حلقة (نحو 13 دقيقة)، بالغًا عتبة متوسط المكافأة 200+ التي تعرّفها Gym على أنها «محلولة».' },
    },
  },
  experience: {
    badge: 'التاريخ المهني',
    heading: 'الخبرة',
    groups: { professional: 'الخبرة المهنية', additional: 'خبرات إضافية' },
    types: { 'Part-time': 'دوام جزئي', 'Internship': 'تدريب', 'Seasonal': 'موسمي', 'Contract': 'بعقد' },
    communityLabel: 'العمل المجتمعي',
    roles: {
      'Louis Li CPA PLLC': { role: 'مساعد محاسبة', bullets: ['جمعتُ وتحقّقتُ ونظّمتُ المستندات المالية للعملاء لضمان اكتمال ودقّة البيانات اللازمة لإعداد الضرائب ومراجعة التدقيق.'] },
      'Astera Holdings': { role: 'مهندس برمجيات متدرّب', bullets: ['شخّصتُ وحللتُ مشكلات واجهة المستخدم في بيئة الإنتاج عبر تبسيط منطق العرض الشرطي، ممّا حسّن استقرار التطبيق وتجربة المستخدم.', 'تعاونتُ مع أصحاب المصلحة في المنتج لتنفيذ وإطلاق واجهة محادثة مستقرة بملء الشاشة، معزّزًا موثوقية النظام من طرف إلى طرف.'] },
      'Accommodations Plus International': { role: 'أخصائي حسابات القبض', bullets: ['حافظتُ على السجلات المالية المنظّمة وطابقتُها باستخدام Excel لدعم تتبّع الإيرادات وحلّ الفروقات.'] },
      'New York Life Insurance Company': { role: 'وكيل تأمين', bullets: [] },
      'Morgen Evan': { role: 'محلّل خريفي', bullets: ['أدرتُ ونظّفتُ بيانات علاقات العملاء باستخدام Excel و Salesforce، داعمًا ترحيل نظام CRM ومحسّنًا دقّة البيانات وسير إعداد التقارير.', 'حلّلتُ ولخّصتُ بيانات اقتصادية ومالية عالمية لإعداد رؤى نشرة أسبوعية حول اتجاهات الاكتتابات العامة وعمليات الدمج والاستحواذ.'] },
      'GIFP': { role: 'متدرّب صيفي', bullets: ['حلّلتُ بيانات السوق والمنافسين والتركيبة السكانية لدعم قرارات استراتيجية التسويق لمركز تعليمي يدرس التوسّع في سوق التعليم الأمريكي.', 'أجريتُ تحليلًا مقارنًا لمزوّدي خدمات التعليم في الولايات المتحدة، مدمجًا الاتجاهات التاريخية وظروف السوق المتوقعة لتوجيه التموضع واستراتيجية الدخول إلى السوق.'] },
      'Third EYE Edge, Inc': { role: 'متدرّب تسويق', bullets: ['حلّلتُ مقاييس التفاعل على وسائل التواصل الاجتماعي (الإعجابات والمشاركات والتعليقات) عبر Twitter و Facebook و Instagram لدعم مناقشات استراتيجية التسويق الأسبوعية المبنية على البيانات.', 'أجريتُ بحثًا حول فنّانين مستقلّين باستخدام تحليلات المنصّات ومعايير القطاع لتخصيص استراتيجيات التسويق وفق مهارات الفنان وسلوك الجمهور وأداء المنصّة.'] },
      'Teachers Federal Credit Union': { role: 'صرّاف بنك', bullets: [] },
      "Lowe's Companies, Inc.": { role: 'رئيس صرّافين', bullets: [] },
    },
  },
  education: {
    badge: 'الخط الزمني',
    heading: 'المسيرة الأكاديمية',
    courseworkLabel: 'المقرّرات:',
    schools: {
      'Georgetown University': { degree: 'ماجستير في علم البيانات والتحليلات', highlights: ['المعدّل: 3.933 | حاصل على منحة الطالب العائد', 'مساعد تدريس — معسكر DSAN الصيفي والنمذجة الاحتمالية', 'مساعد تدريس - DSAN 5100 النمذجة الاحتمالية/الحوسبة الإحصائية', 'مرشد أقران لطلبة الدراسات العليا DSAN'], coursework: 'الشبكات العصبية والتعلُّم العميق، السلاسل الزمنية التطبيقية، البيانات الضخمة والحوسبة السحابية، تصوير البيانات، الحوسبة الإحصائية' },
      'New York University': { degree: 'بكالوريوس في الرياضيات', minor: 'تخصص فرعي في علوم الحاسوب', highlights: [], coursework: 'الاحتمالات، التوافقيات، الرياضيات المتقطّعة، التحليل الحقيقي، هياكل البيانات' },
      'The Stony Brook School': { degree: 'شهادة الثانوية العامة', highlights: ['المعدّل: 3.85 / 4.0 — لوحة الشرف والشرف الرفيع', 'NYSSMA المستوى 6 — فرقة المقاطعة', 'سباق 1600م على مستوى المقاطعة، ألعاب القوى — Section XI'] },
    },
  },
  interests: {
    badge: 'ما وراء السيرة الذاتية',
    heading: 'لأنّ البشر أكثر من مجرّد رسوم مساهماتهم على GitHub.',
    items: [
      { title: 'تصميم أزياء الشارع', desc: 'استكشاف التقاطع بين الهندسة والخوارزميات والأقمشة.' },
      { title: 'الألعاب المستقلة', desc: 'صناعة تجارب صغيرة مدروسة بآليات ممتعة الإحساس.' },
      { title: 'الشطرنج', desc: 'ممارسة الهجوم المحسوب والاستشراف التكتيكي.' },
      { title: 'النادي الرياضي', desc: 'الانضباط البدني كتوازن مقابل الجهد الذهني.' },
      { title: 'الطبخ', desc: 'إيجاد النِّسب الدقيقة التي تجعل النكهات متناغمة.' },
      { title: 'القراءة المطوّلة', desc: 'قراءات طويلة ومتأنّية — غالبًا مجلة The New Yorker — حول الثقافة والسياسة والأشخاص خلف العناوين.' },
    ],
  },
  contact: {
    badge: 'تواصل',
    heading1: 'لنبنِ', heading2: 'شيئًا معًا.',
    para: 'سواء كان تحدّي بيانات، أو منتجًا برمجيًا، أو حديثًا عن أحدث صيحات أزياء الشارع — صندوق بريدي مفتوح.',
    emailLabel: 'البريد الإلكتروني', linkedinLabel: 'لينكدإن', githubLabel: 'GitHub',
    resumeLabel: 'السيرة الذاتية', resumeValue: 'تنزيل PDF',
    rights: 'جميع الحقوق محفوظة.', tagline: 'صُمّم بعناية.',
  },
};

const DICTS: Record<Lang, Dict> = { en, zh, es, fr, ar };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: en });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem('lang') as Lang | null;
    return stored && DICTS[stored] ? stored : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
    const dir = LANGS.find((l) => l.code === lang)?.dir ?? 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang: setLangState, t: DICTS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
