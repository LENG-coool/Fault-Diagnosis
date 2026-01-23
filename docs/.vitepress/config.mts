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
      link: '/en/', 
      themeConfig: {
        siteTitle: 'Explainable fault diagnosis'
      }
    },
    root: { 
      
      label: '简体中文', 
      lang: 'zh-CN', 
      link: '/', 
      themeConfig: {
        siteTitle: '可解释性故障诊断'
      }
    }, 
    
    it: { 
      label: 'Italiano', 
      lang: 'it-IT', 
      link: '/it/', 
      themeConfig: {
        siteTitle: 'Diagnosi dei guasti spiegabile‌' 
      }
    },
    ru: { 
      label: 'Русский', 
      lang: 'ru-RU', 
      link: '/ru/', 
      themeConfig: {
        siteTitle: 'Объяснимая диагностика неисправностей' 
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }],
    nav: [{ text: '首页', link: '/' }],
    
    sidebar: {
        '/SHAP/': [{
          text: '文章大纲',
          items: [
            { text: '引言', link: '/SHAP/shap#引言' },
            { text: '边际贡献', link: '/SHAP/shap#边际贡献' },
            { text: 'SHAP 值', link: '/SHAP/shap#SHAP值' },
            { text: 'Tree SHAP', link: '/SHAP/shap#Tree' },
            { text: '可解释性分析', link: '/SHAP/shap#可解释性分析' },
            { text: '原始文献', link: '/SHAP/shap#原始文献' }
          ]
        }],
        '/en/SHAP/': [{
          text: 'Outline',
          items: [
            { text: 'Introduction', link: '/en/SHAP/shap#Introduction'},
            { text: 'Marginal Contribution', link: '/en/SHAP/shap#contribution'},
            { text: 'SHAP Values', link: '/en/SHAP/shap#SHAP' },
            { text: 'Tree SHAP', link: '/en/SHAP/shap#Tree' },
            { text: 'Explainability Analysis', link: '/en/SHAP/shap#Analysis' },
            { text: 'Original Reference', link: '/en/SHAP/shap#Reference' }
          ]
        }],
        '/it/SHAP/': [{
          text: 'Sommario',
          items: [
            { text: 'Introduzione', link: '/it/SHAP/shap#introduzione' },
            { text: 'Contributo Marginale', link: '/it/SHAP/shap#contributo-marginale' },
            { text: 'Valori SHAP', link: '/it/SHAP/shap#SHAP' },
            { text: 'Tree SHAP', link: '/it/SHAP/shap#Tree' },
            { text: 'Analisi di Spiegabilità', link: '/it/SHAP/shap#analisi' },
            { text: 'Letteratura Originale', link: '/it/SHAP/shap#letteratura' }
          ]
        }],
        '/ru/SHAP/': [{
          text: 'Содержание',
          items: [
            { text: 'Введение', link: '/ru/SHAP/shap#введение' },
            { text: 'Маржинальный вклад', link: '/ru/SHAP/shap#вклад' },
            { text: 'Значения SHAP', link: '/ru/SHAP/shap#shap' },
            { text: 'Tree SHAP', link: '/ru/SHAP/shap#tree' },
            { text: 'Анализ объяснимости', link: '/ru/SHAP/shap#анализ' },
            { text: 'Оригинальная Литература', link: '/ru/SHAP/shap#литература'}
          ]
        }],
        '/overall/': [{
          text: '文章大纲',
          items: [
            { text: '引言', link: '/overall/all#引言' },
            { text: '整体框架', link: '/overall/all#框架' },
            { text: '热力学模型构建与校准', link: '/overall/all#模型' },
            { text: '物理建模与仿真', link: '/overall/all#故障建模' },
            { text: '基于RF与SHAP的特征筛选', link: '/overall/all#特征筛选' },
            { text: '实验结果与性能评估', link: '/overall/all#实验结果' }],
        }],
        '/en/overall/': [{
          text: '文章大纲',
          items: [
            { text: '引言', link: '/overall/all#引言' },
            { text: '整体框架', link: '/overall/all#框架' },
            { text: '热力学模型构建与校准', link: '/overall/all#模型' },
            { text: '物理建模与仿真', link: '/overall/all#故障建模' },
            { text: '基于RF与SHAP的特征筛选', link: '/overall/all#特征筛选' },
            { text: '实验结果与性能评估', link: '/overall/all#实验结果' }],
        }],
        '/it/overall/': [{
          text: '文章大纲',
          items: [
            { text: '引言', link: '/overall/all#引言' },
            { text: '整体框架', link: '/overall/all#框架' },
            { text: '热力学模型构建与校准', link: '/overall/all#模型' },
            { text: '物理建模与仿真', link: '/overall/all#故障建模' },
            { text: '基于RF与SHAP的特征筛选', link: '/overall/all#特征筛选' },
            { text: '实验结果与性能评估', link: '/overall/all#实验结果' }],
        }],
        '/ru/overall/': [{
          text: '文章大纲',
          items: [
            { text: '引言', link: '/overall/all#引言' },
            { text: '整体框架', link: '/overall/all#框架' },
            { text: '热力学模型构建与校准', link: '/overall/all#模型' },
            { text: '物理建模与仿真', link: '/overall/all#故障建模' },
            { text: '基于RF与SHAP的特征筛选', link: '/overall/all#特征筛选' },
            { text: '实验结果与性能评估', link: '/overall/all#实验结果' }],
        }],
      }
  }
})