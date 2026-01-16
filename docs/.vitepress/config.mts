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
    // 引入 Katex 样式表
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min.css' }]
  ], // 注意这里的逗号，之前报错可能就是漏了它

  themeConfig: {
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
    sidebar: {
  '/zh-CN/': [
    {
      text: '故障诊断核心研究',
      collapsed: false, // 默认展开
      items: [
        { text: 'SHAP 可解释性分析', link: '/zh-CN/shap-rf-fault-diagnosis' },
        // 以后这里加了新文件，直接在这加一行就行
      ]
    }
  ]
},
    search: false,
    socialLinks: []
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

            /* 1. 修正 KaTeX 整体对齐 */
            .katex-display {
              padding: 10px 0;
              margin: 1em 0;
              overflow-x: auto;
              overflow-y: hidden;
            }

            /* 2. 针对下标和基线的精准对齐 */
            .katex .base {
              /* 强制让公式主体稍微下移，解决“太靠上”的感觉 */
              position: relative;
              top: 2px; 
            }

            /* 3. 特别优化下标 i 的位置 */
            .katex .vlist-t {
              /* 调整下标的垂直偏移 */
              vertical-align: middle !important;
            }

            /* 4. 让分式前后的符号居中对齐 */
            .katex .mord, .katex .mbin, .katex .mrel {
              vertical-align: middle;
            }
            /* 让所有图片自动居中，并限制最大宽度 */
            .vp-doc img {
              display: block;
              margin: 1.5rem auto !important; /* 上下留出间距，左右自动居中 */
              max-width: 80% !important;     /* 限制图片最大只占正文宽度的 80% */
              height: auto;                   /* 保持比例，不拉伸 */
              border-radius: 4px;             /* 可选：给图片加一点圆角，更好看 */
            }
            .vp-doc img {
              cursor: zoom-in; /* 鼠标变成放大镜图标 */
              transition: transform 0.3s ease; /* 增加平滑过渡 */
            }

            .vp-doc img:hover {
              transform: scale(1.02); /* 悬停时稍微放大 2% */
              box-shadow: 0 10px 20px rgba(0,0,0,0.1); /* 增加一点阴影，让图“浮出来” */
            }  
          `
        }
      }
    }
  }
})