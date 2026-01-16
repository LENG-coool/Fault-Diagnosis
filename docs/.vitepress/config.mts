import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',

  // 1. 多语言站点配置
  locales: {
    root: { label: '简体中文', lang: 'zh-CN', link: '/zh-CN/' },
    en: { label: 'English', lang: 'en-US', link: '/en/' },
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
    
    // 2. 社交链接与页脚
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

    // 3. 导航栏 (简化为全局统一，或根据需要移入 locales)
    nav: [
      { text: '首页', link: '/' }
    ],

    // 4. 多语言侧边栏
    sidebar: {
      '/zh-CN/': [
        {
          text: '文章大纲',
          items: [
            { text: '引言', link: '/zh-CN/shap-rf-fault-diagnosis#引言' },
            { text: '边际贡献', link: '/zh-CN/shap-rf-fault-diagnosis#边际贡献' },
            { text: 'SHAP 值', link: '/zh-CN/shap-rf-fault-diagnosis#从边际贡献到-shap-值' }
          ]
        }
      ],
      '/en/': [
        {
          text: 'Outline',
          items: [
            { text: 'Introduction', link: '/en/shap-rf-fault-diagnosis#introduction' },
            { text: 'Marginal Contribution', link: '/en/shap-rf-fault-diagnosis#marginal-contribution' }
          ]
        }
      ],
      '/ja/': [
        {
          text: '目次',
          items: [
            { text: 'はじめに', link: '/ja/shap-rf-fault-diagnosis#はじめに' }
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

            .VPSidebar { width: 260px !important; }
            .VPContent { margin-left: 260px !important; padding: 0 40px !important; }
            .VPNavBar .logo { display: none !important; }

            /* KaTeX 样式优化 */
            .katex-display { padding: 10px 0; margin: 1em 0; overflow-x: auto; }
            .katex .base { position: relative; top: 2px; }
            .katex .vlist-t { vertical-align: middle !important; }

            /* 图片交互 */
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