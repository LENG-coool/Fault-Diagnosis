import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP+热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',

  locales: {
    en: { 
      label: 'English', 
      lang: 'en-US', 
      link: '/SHAP/en/', 
      themeConfig: {
        siteTitle: 'Fault Diagnosis System'
      }
    },
    root: { 
      
      label: '简体中文', 
      lang: 'zh-CN', 
      link: '/SHAP/', 
      themeConfig: {
        siteTitle: '燃烧室故障诊断系统'
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
      /* 基础样式调整 */
      .VPNavBarTitle .title { font-size: 14px !important; white-space: nowrap !important; }
      .VPNavBar .logo { display: none !important; }
      .VPDoc .aside { display: none !important; }
      .VPContent.has-sidebar { margin-right: 0 !important; }
      
      /* -------------------------------------------------- */
      /* 核心修改：当处于封面页 (home) 时，隐藏侧边栏和语言切换器 */
      /* -------------------------------------------------- */
      [class*="home"] .VPNavBarTitle,      /* 隐藏左上角标题 */
      [class*="home"] .VPNavBarMenu,       /* 隐藏首页等文字导航 */
      [class*="home"] .VPNavBarTranslations, /* 隐藏语言切换按钮 */
      [class*="home"] .VPSidebar {         /* 隐藏侧边栏 */
        display: none !important; 
      }

      /* 确保 GitHub 图标在首页可见并调整间距 */
      [class*="home"] .VPNavBarSocialLinks { 
        display: flex !important; 
        margin-right: 20px !important;
      }

      /* 隐藏切换菜单中指向根路径的冗余项 */
      .VPNavBarTranslations .items .item:has(.VPMenuLink[href="/Fault-Diagnosis/"]) {
        display: none !important;
      }
    `]
  ],

  themeConfig: {
    logoLink: '#',                  
    i18nRouting: false, 
    socialLinks: [{ icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }],
    nav: [{ text: '首页', link: '/' }],
    
    sidebar: {
      // 对应 root (简体中文) 的路径
      '/SHAP/': [{
        text: '文章大纲',
        items: [
          { text: '引言', link: '/SHAP/#引言' },
          { text: '边际贡献', link: '/SHAP/#边际贡献' },
          { text: 'SHAP 值', link: '/SHAP/#从边际贡献到-shap-值' },
          { text: 'Tree SHAP', link: '/SHAP/#Tree-SHAP：让计算“快起来”' },
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