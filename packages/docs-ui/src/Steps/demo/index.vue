<template>
  <div class="milestone clearfix">
    <div class="milestone-top">
      <p title="我的历程碑"></p>
    </div>
    <div class="milestone-content">
      <template v-for="(item, index) in stones" :key="item.id">
        <Stone
          :header-dot="index === 0"
          :content-position="index % 2 === 1 ? 'left' : 'right'"
          :info="item"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Stone from './components/Stone.vue'

const ICON_MAP: { [type: string]: any } = {
  idea: '💡',
  class: '📕',
  knowledge: '📺',
  tracking: '🥪'
}

const TYPE_COLOR: { [type: string]: any } = {
  idea: 'rgba(255,177,52)',
  class: 'rgba(250,88,63)',
  knowledge: 'rgba(38,210,95)',
  tracking: 'rgba(20,183,245)'
}

const stones = [
  {
    id: 1,
    time: '2023-09-10',
    type: 'idea',
    typeName: '阅读',
    content: `O’Reilly Media 通过图书、杂志、在线服务、调查研究和会议等方式传播创新知识。
自 1978 年开始，O’Reilly 一直都是前沿发展的见证者和推动者。超级极客们正在开创
着未来，而我们关注真正重要的技术趋势——通过放大那些“细微的信号”来刺激社
会对新科技的应用。作为技术社区中活跃的参与者，O’Reilly 的发展充满了对创新的
倡导、创造和发扬光大`
  },
  {
    id: 2,
    time: '2023-09-10',
    type: 'class',
    typeName: '电影',
    content: `O’Reilly 为软件开发人员带来革命性的“动物书”；创建第一个商业网站（GNN）；组
织了影响深远的开放源代码峰会，以至于开源软件运动以此命名；创立了 Make 杂志，
从而成为 DIY 革命的主要先锋；公司一如既往地通过多种形式缔结信息与人的纽带。
O’Reilly 的会议和峰会集聚了众多超级极客和高瞻远瞩的商业领袖，`
  },
  {
    id: 3,
    time: '2023-09-10',
    type: 'knowledge',
    typeName: '音乐',
    content: `共同描绘出开创
新产业的革命性思想。作为技术人士获取信息的选择，O’Reilly 现在还将先锋专家的
知识传递给普通的计算机用户。无论是通过书籍出版，在线服务或者面授课程，每一
项 O’Reilly 的产品都反映了公司不可动摇的理念——信息是激发创新的力量。`
  },
  {
    id: 4,
    time: '2023-09-10',
    type: 'tracking',
    typeName: '开发',
    content: `Tim 是位特立独行的商人，他不光放眼于最长远、最广阔的视野并且切实地按照
Yogi Berra 的建议去做了：‘如果你在路上遇到岔路口，走小路（岔路）。’回顾过去
Tim 似乎每一次都选择了小路，而且有几次都是一闪即逝的机会，尽管大路也不错。”
——Linux Journal`
  }
].map((item: any) => {
  return {
    ...item,
    color: TYPE_COLOR[item.type],
    icon: ICON_MAP[item.type]
  }
})
</script>

<style lang="less" scoped>
.milestone {
  &-top {
    padding: 0 4px;
    background-color: #fff;
  }

  &-content {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
