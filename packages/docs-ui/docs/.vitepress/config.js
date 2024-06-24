import { getComponetnsItem } from './componentsItem'

const componentItmes = getComponetnsItem()

const config = {
  title: 'niu-ui',

  base: '/niu-cli/',

  description: 'Just playing around.',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'NiuUI',
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Components', link: componentItmes[0].link }
    ],
    sidebar: [
      {
        text: '快速开始',
        items: [{ text: 'Introduces', link: '/getting-started' }]
      },
      {
        text: '组件',
        // items: [{ text: 'BasicTitle', link: '/components/BasicTitle/index' }]
        items: componentItmes
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/codeniu/niu-cli' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Codeniu'
    }
    // docFooter: {
    //   prev: '上篇',
    //   next: '下篇'
    // }
  },

  // clarity 网站分析
  head: [
    [
      'script',
      { id: 'clarity-analysis' },
      `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "m9rrsg0p2k");
      `
    ]
  ]
}

export default config
