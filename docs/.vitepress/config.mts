import { defineConfig } from 'vitepress'
import katex from 'markdown-it-katex'

export default defineConfig({
  base: '/Fault-Diagnosis/',
  title: 'SHAP＋热力学仿真辅助随机森林',
  description: '柴油机燃烧室故障可解释性分析',
  lang: 'zh-CN',
  
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
    outline: {
      level: [2, 3],
      label: '本页目录'
    }, 
    nav: [{ text: '首页', link: '/' }],
    sidebar: [
      {
        text: '文章大纲',
        items: [
          { text: '引言', link: '#引言' },
          { text: '边际贡献', link: '#边际贡献' },
          { text: '从边际贡献到 SHAP 值', link: '#从边际贡献到-shap-值' },
          { text: 'Tree SHAP：让计算“快起来”', link: '#tree-shap-让计算-快起来' },
          { text: '可解释性分析', link: '#可解释性分析' },
          { text: '原始文献', link: '#原始文献' }
        ]
      }
    ],
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