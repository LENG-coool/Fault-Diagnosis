import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',

  locales: {
    root: { label: '简体中文', lang: 'zh-CN', link: '/', title: 'SHAP + 热力学仿真辅助随机森林' },
    en: { label: 'English', lang: 'en-US', link: '/en/', title: 'SHAP + Thermodynamic Simulation' },
    ja: { label: '日本語', lang: 'ja-JP', link: '/ja/', title: 'SHAP + 熱力学シミュレーション' }
  },

  markdown: {
    config: (md) => {
      md.use(katex)
    }
  },
  
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css' }],
    ['style', {}, `
      /* 1. 标题缩小且禁止换行 */
      .VPNavBarTitle .title, .VPNavBarTitle .title span {
        font-size: 14px !important;
        font-weight: 600 !important;
        white-space: nowrap !important;
      }
      .VPNavBar .logo { display: none !important; }

      /* 2. 核心：强制平铺、对齐并靠右 */
      .VPNavBar .container .content {
        display: flex !important;
        align-items: center !important; /* 强制所有图标在一条水平线上 */
        justify-content: flex-end !important; /* 强制所有内容靠右 */
      }
      
      .VPNavBar .content-body {
        display: flex !important;
        align-items: center !important;
        flex-grow: 1 !important;
        justify-content: flex-end !important;
      }

      /* 强制显示被缩起的组件并对齐 */
      .VPNavBarMenu { display: flex !important; align-items: center !important; }
      .VPNavBarAppearance { display: flex !important; align-items: center !important; margin-left: 20px !important; }
      .VPNavBarSocialLinks { display: flex !important; align-items: center !important; margin-left: 20px !important; }
      .VPNavBarTranslations { display: flex !important; align-items: center !important; margin-left: 20px !important; }
      
      /* 隐藏多余的 "..." 按钮 */
      .VPNavBarExtra { display: none !important; }
      .VPNavBarHamburger { display: none !important; }

      /* 3. 公式美化：去掉垂直滑动条 */
      .katex-display { 
        background: #f8fafc !important; 
        border-radius: 8px !important; 
        padding: 15px !important; 
        overflow-y: hidden !important; 
        overflow-x: auto !important; 
      }

      /* 4. 移除右侧 Aside 占位 */
      .VPDoc .aside { display: none !important; }
      .VPContent.has-sidebar { margin-right: 0 !important; }
    `]
  ],

  themeConfig: {
    i18nRouting: true,
    socialLinks: [{ icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }],
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'full', timeStyle: 'medium' } },
    docFooter: { prev: '上一篇', next: '下一篇' },
    outline: false,
    search: false,
    nav: [{ text: '首页', link: '/' }],
    sidebar: {
      '/': [{
        text: '文章大纲',
        items: [
          { text: '引言', link: '/#引言' },
          { text: '边际贡献', link: '/#边际贡献' },
          { text: 'SHAP 值', link: '/#从边际贡献到-shap-值' },
          { text: 'Tree SHAP', link: '/#Tree SHAP：让计算“快起来”' },
          { text: '可解释性分析', link: '/#可解释性分析（以活塞环磨损 F4 故障为例）' },
          { text: '原始文献', link: '/#原始文献' },
        ]
      }],
      '/en/': [{
        text: 'Outline',
        items: [
          { text: 'Introduction', link: '/en/#introduction' },
          { text: 'Marginal Contribution', link: '/en/#marginal-contribution' },
          { text: 'SHAP Values', link: '/en/#from-marginal-contribution-to-shap-values' },
          { text: 'Tree SHAP', link: '/en/#tree-shap-accelerating-the-calculation' },
          { text: 'Explainability Analysis', link: '/en/#explainability-analysis-case-study-piston-ring-wear-f4' },
          { text: 'Original Reference', link: '/en/#original-reference' },
        ]
      }],
      '/ja/': [{ text: '目次', items: [{ text: 'はじめに', link: '/ja/#はじめに' }] }]
    }
  }
})