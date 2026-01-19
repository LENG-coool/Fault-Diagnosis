import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',

  locales: {
    root: { label: '封面', link: '/' }, 
    zh: { 
      label: '简体中文', 
      lang: 'zh-CN', 
      link: '/SHAP/', 
      themeConfig: {
        siteTitle: '燃烧室故障诊断系统'
      }
    },
    en: { 
      label: 'English', 
      lang: 'en-US', 
      link: '/SHAP/en/', 
      themeConfig: {
        siteTitle: 'Fault Diagnosis System'
      }
    },
    it: { 
      label: 'Italiano', 
      lang: 'it-IT', 
      link: '/SHAP/it-IT/', 
      themeConfig: {
        siteTitle: 'Sistema di Diagnosi' 
      }
    },
    ru: { 
      label: 'Русский', 
      lang: 'ru-RU', 
      link: '/SHAP/ru-RU/', 
      themeConfig: {
        siteTitle: 'Система диагностики' 
      }
    }
  },

  markdown: { config: (md) => { md.use(katex) } },
  
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css' }],
    ['style', {}, `
      /* --- 1. 基础样式 (不动) --- */
      .VPNavBarTitle .title, .VPNavBarTitle .title span { font-size: 14px !important; white-space: nowrap !important; }
      .VPNavBar .logo { display: none !important; }
      .VPNavBar .container .content { display: flex !important; justify-content: flex-end !important; align-items: center !important; }
      .VPNavBar .content-body { display: flex !important; justify-content: flex-end !important; align-items: center !important; flex-grow: 1 !important; }
      .VPNavBarMenu, .VPNavBarAppearance, .VPNavBarSocialLinks, .VPNavBarTranslations { display: flex !important; align-items: center !important; margin-left: 20px !important; }
      .VPNavBarExtra, .VPNavBarHamburger { display: none !important; }
      [class*="home"] .VPNavBarMenu { display: none !important; }
      [class*="home"] .VPNavBarTranslations { display: none !important; }
      .VPNavBarTitle { cursor: pointer !important; }
      .katex-display { background: #f8fafc !important; border-radius: 8px !important; padding: 15px !important; overflow-y: hidden !important; overflow-x: auto !important; }
      .vp-doc img { border-radius: 12px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; margin: 2.5rem auto !important; display: block; }
      .VPDoc .aside { display: none !important; }
      .VPContent.has-sidebar { margin-right: 0 !important; }

      /* --- 2. 只有这里是改动：简单粗暴地隐藏“封面” --- */
      
      /* 不管在哪个页面，只要菜单里有链接指向 "/Fault-Diagnosis/"，就把它隐藏 */
      .VPNavBarTranslations .items .VPMenuLink[href="/Fault-Diagnosis/"],
      .VPNavBarTranslations .items .VPMenuLink[href="/Fault-Diagnosis/index.html"] {
        display: none !important;
      }
      
      /* 顺便把包着它的框也隐藏，防止留白 */
      .VPNavBarTranslations .items .item:has(.VPMenuLink[href="/Fault-Diagnosis/"]) {
        display: none !important;
      }
      /* ------------------------------------------------ */
    `]
  ],

  themeConfig: {
    logoLink: '#',                  
    i18nRouting: false, 
    socialLinks: [{ icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }],
    nav: [{ text: '首页', link: '/' }],
    
    sidebar: {
      '/SHAP/': [{
        text: '文章大纲',
        items: [
          { text: '引言', link: '/SHAP/#引言' },
          { text: '边际贡献', link: '/SHAP/#边际贡献' },
          { text: 'SHAP 值', link: '/SHAP/#从边际贡献到-shap-值' },
          { text: 'Tree SHAP', link: '/SHAP/#Tree SHAP：让计算“快起来”' },
          { text: '可解释性分析', link: '/SHAP/#可解释性分析（以活塞环磨损 F4 故障为例）'},
        ]
      }],
      '/SHAP/en/': [{
        text: 'Outline',
        items: [
          { text: 'Introduction', link: '/SHAP/en/#introduction' },
          { text: 'Marginal Contribution', link: '/SHAP/en/#marginal-contribution' },
          { text: 'SHAP Values', link: '/SHAP/en/#from-marginal-contribution-to-shap-values' },
          { text: 'Tree SHAP', link: '/SHAP/en/#Tree SHAP: Accelerating the Calculation' },
          { text: 'Explainability Analysis', link: '/SHAP/en/#Explainability Analysis (Case Study: Piston Ring Wear - F4)' },
        ]
      }],
      '/SHAP/it-IT/': [{
        text: 'Sommario',
        items: [
          { text: 'Introduzione', link: '/SHAP/it-IT/#introduzione' },
          { text: 'Contributo Marginale', link: '/SHAP/it-IT/#contributo-marginale' },
          { text: 'Valori SHAP', link: '/SHAP/it-IT/#Dal Contributo Marginale al valore SHAP' },
          { text: 'Tree SHAP', link: '/SHAP/it-IT/#Tree SHAP: Accelerare i calcoli' },
          { text: 'Analisi di Interpretabilità', link: '/SHAP/it-IT/#Analisi dell\'interpretabilità (Esempio: Guasto F4 - Usura delle fasce elastiche)' },
        ]
      }],
      '/SHAP/ru-RU/': [{
        text: 'Содержание',
        items: [
          { text: 'Введение', link: '/SHAP/ru-RU/#введение' },
          { text: 'Маржинальный вклад', link: '/SHAP/ru-RU/#Маргинальный вклад' },
          { text: 'Значения SHAP', link: '/SHAP/ru-RU/#От маргинального вклада к значениям SHAP' },
          { text: 'Tree SHAP', link: '/SHAP/ru-RU/#Tree SHAP: ускорение вычислений' },
          { text: 'Анализ интерпретируемости', link: '/SHAP/ru-RU/#Анализ интерпретируемости (на примере износа поршневых колец — неисправность F4)' },
        ]
      }]
    }
  }
})