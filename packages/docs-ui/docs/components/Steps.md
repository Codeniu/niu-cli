# Steps

## 步骤条组件

封装一个步骤条组件（vue3）

### Example

<Wrap>
  <NSteps />
</Wrap>

### Code

```vue
<n-step
  header-dot
  title="右边"
  description="默认content在右边"
></n-step>

<n-step
  contentPosition="left"
  title="左边"
  description="contentPosition=left  属性将内容展示在左边"
/></n-step>

<n-step>
  <template #title> 传递插槽 </template>
  <template #description>
    业务场景中有时需要对第三方组件进行二次封装, 比如弹窗,表格等组件,
    有时项目内会根据业务进行二次封装成业务组件,
    新的业务组件会需要把自己的slots透传给原本的组件, 也可以叫传递插槽
  </template>
</n-step>
```

## 传递插槽

业务场景中有时需要对第三方组件进行二次封装, 比如弹窗,表格等组件,有时项目内会根据业务进行二次封装成业务组件,
新的业务组件会需要把自己的slots透传给原本的组件, 也可以叫传递插槽

// NStep.vue 组件中

```vue
    <NStepLeft v-bind="$attrs">
      <!-- 将slot透传给NStepLeft -->
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        v-slot:[key]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </NStepLeft>
```

NStepLeft 是需要被二次封装的组件
