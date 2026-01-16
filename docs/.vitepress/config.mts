import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',
  locales: {
    root: { label: '简体中文', lang: 'zh-CN', link: '/zh-CN/' },
    en: { label: 'English', lang: 'en-US', link: '/en/' },
    ja: { label: '日本語', lang: 'ja-JP', link: '/ja/' }
  },
  // 公式渲染配置
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
    nav: [
      { text: '首页', link: '/zh-CN/' },
      { text: '文章', link: '/zh-CN/shap-rf-fault-diagnosis' }
    ],
    // 社交链接：显示在右上角
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LENG-coool/Fault-Diagnosis' }
    ],
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: false, 
    nav: [{ text: '首页', link: '/' }],
    sidebar: {
    // 抽屉 1：中文环境显示的菜单
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

    // 抽屉 2：英文环境显示的菜单
    '/en/': [
      {
        text: 'Outline',
        items: [
          { text: 'Introduction', link: '/en/shap-rf-fault-diagnosis#introduction' },
          { text: 'Marginal Contribution', link: '/en/shap-rf-fault-diagnosis#marginal-contribution' }
        ]
      }
    ],

    // 抽屉 3：日语环境显示的菜单
    '/ja/': [
      {
        text: '目次',
        items: [
          { text: 'はじめに', link: '/ja/shap-rf-fault-diagnosis#はじめに' }
        ]
      }
    ]
  },
    search: false // 如果需要搜索，可以改为 { provider: 'local' }
  },

  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `
            :root {
              --vp-layout-max-width: 100% !important;
            }
            .VPDoc .aside {
              display: none !important;
            }

            /* 确保正文内容区域能够利用右侧空出来的空间 */
            .VPDoc .content-container {
              max-width: 100% !important;
            }
            .VPDoc .container, 
            .VPDoc .content, 
            .VPDoc .content-container {
              max-width: none !important;
              width: 100% !important;
              margin: 0 !important;
            }

            .VPDoc .aside {
              display: none !important;
              width: 0 !important;
            }

            .VPSidebar { width: 260px !important; }
            .VPContent {
              margin-left: 260px !important;
              padding: 0 40px !important; 
            }

            .VPNavBar .logo { display: none !important; }

            /* 1. KaTeX 整体对齐 */
            .katex-display {
              padding: 10px 0;
              margin: 1em 0;
              overflow-x: auto;
            }

            /* 2. 公式基线精准对齐 */
            .katex .base {
              position: relative;
              top: 2px; 
            }

            /* 3. 特别优化下标 i 的位置 */
            .katex .vlist-t {
              vertical-align: middle !important;
            }

            /* 4. 图片居中、限宽、悬停放大效果 */
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