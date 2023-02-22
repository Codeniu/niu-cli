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
  }
}

export default config
