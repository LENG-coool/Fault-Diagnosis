import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',

  locales: {
    // 这里建议统一指向目录。如果你的文章叫 index.md，点击按钮就能直接进去
    root: { label: '简体中文', lang: 'zh-CN', link: '/' ,title: 'SHAP + 热力学仿真辅助随机森林'},
    en: { label: 'English', lang: 'en-US', link: '/en/',title: 'SHAP + Thermodynamic Simulation' },
    ja: { label: '日本語', lang: 'ja-JP', link: '/ja/' }
    
  },

  markdown: {
    config: (md) => {
      md.use(katex)
    }
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css' }]
  ],

  themeConfig: {
    i18nRouting: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }
    ],
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'full', timeStyle: 'medium' }
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    outline: false,
    search: false,
    nav: [{ text: '首页', link: '/' }],

    sidebar: {
      // 1. 中文版：因为文件是 docs/index.md，所以路径直接写 /#锚点
      '/': [
        {
          text: '文章大纲',
          items: [
            { text: '引言', link: '/#引言' },
            { text: '边际贡献', link: '/#边际贡献' },
            { text: 'SHAP 值', link: '/#从边际贡献到-shap-值' },
            { text: 'Tree SHAP', link: '/#Tree SHAP：让计算“快起来”' },
            { text: '可解释性分析', link: '/#可解释性分析（以活塞环磨损 F4 故障为例）' },
            { text: '原始文献', link: '/#原始文献' },
          ]
        }
      ],

      // 2. 英文版：必须指向具体的文件名 shap-rf-fault-diagnosis
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
  }
],

      // 3. 日语版：同理，指向具体的文件名
      '/ja/': [
        {
          text: '目次',
          items: [
            { text: 'はじめに', link: '/ja/index#はじめに' }
          ]
        }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `
            :root { --vp-layout-max-width: 100% !important; }

            /* 隐藏右侧目录并拉伸正文 */
            .VPDoc .aside { display: none !important; width: 0 !important; }
            .VPDoc .container, .VPDoc .content, .VPDoc .content-container {
              max-width: none !important;
              width: 100% !important;
              margin: 0 !important;
            }
            .VPNavBarTitle .title {
              font-size: 14px !important; /* 稍微缩小一点英文标题字号 */
              white-space: normal !important;
              display: block !important;
              max-width: 200px !important; /* 限制宽度强制它换行 */
            }
            .VPSidebar { width: 260px !important; }
            .VPContent { margin-left: 260px !important; padding: 0 40px !important; }
            .VPNavBar .logo { display: none !important; }

            /* KaTeX 与图片优化 */
            .katex-display { padding: 10px 0; margin: 1em 0; overflow-x: auto; }
            .katex .base { position: relative; top: 2px; }
            .katex .vlist-t { vertical-align: middle !important; }

            .vp-doc img {
              display: block;
              margin: 1.5rem auto !important;
              max-width: 80% !important;
              height: auto;
              border-radius: 4px;
              cursor: zoom-in;
              transition: transform 0.3s ease;
            }
            .vp-doc img:hover {
              transform: scale(1.02);
              box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
          `
        }
      }
    }
  }
})