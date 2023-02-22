# 单选框

## Example

<Wrap>
  <NRadioButton />
</Wrap>

<details>
  <summary>使用方法</summary>

  ```vue
  <template>
  <div class="wrap">
    <RadioButtonGroup
      v-model="formState.major"
      :options="[
        {
          label: '上海',
          value: 'zs'
        },
        {
          label: '北京',
          value: 'bj'
        },
        {
          label: '深圳',
          value: 'dl'
        }
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formState = reactive({
  major: 'zs'
})
</script>

<style lang="less" scoped></style>

  ```

</details>

## API

| 名称    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| v-model | 绑定值                                                       |
| options | 选项，数组类型，`{label: string，value: any}`                |
| @change | 当绑定值发生变化时触发，参数（{item={label: string，value: any},val:string}） |

## 源码

`index.vue`
<details>
  <summary>查看代码</summary>

  ```vue
  <template>
  <div>
    <ButtonItem
      v-for="(item, index) in options"
      :key="item.value + index"
      v-bind="$attrs"
      :info="item"
      @change="onChange"
      :actived="selectedValue === item.value"
      class="mx-4px"
    >
      {{ item.label }}
    </ButtonItem>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ButtonItem from './ButtonItem.vue'

type optionsType = {
  label: string
  value: any
}

interface Props {
  options: optionsType[]
  modelValue: any
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: ''
})

const emits = defineEmits(['update:modelValue', 'change'])

const selected = ref<optionsType>({
  label: '',
  value: ''
})
const selectedValue = ref(props.modelValue)

function onChange(val: optionsType) {
  selected.value = val
  selectedValue.value = val.value
  emits('update:modelValue', val.value)
  emits('change', val, val.value)
}
</script>

<style lang="less" scoped>
.mx-4px {
  margin: 0 4px;
}
</style>

  ```

</details>

`ButtonItem.vue`
<details>
  <summary>查看代码</summary>

  ```vue
  <template>
  <div
    class="niu-button"
    :class="{ 'niu-button__actived': actived, shake: actived }"
    @click="handleSelect"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    actived: {
      type: Boolean,
      default: false,
    },

    info: {
      type: Object,
      default: () => {},
    },
  })

  const emits = defineEmits(['change'])

  function handleSelect() {
    emits('change', props.info)
  }
</script>

<style lang="less" scoped>
  .niu-button {
    display: inline-block;
    padding: 4px 10px;
    color: #666;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    cursor: pointer;

    &__actived {
      background-color: #10a0e9;
      color: #fff;
      border: none;
    }
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>

  ```

</details>
