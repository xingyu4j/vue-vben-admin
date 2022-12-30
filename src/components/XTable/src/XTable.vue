<template>
  <VxeGrid v-bind="getProps" ref="xGrid" :class="`${prefixCls}`">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup name="XTable">
import type { XTableProps } from './type'
import { computed, PropType, ref, unref, useAttrs, watch } from 'vue'
import { isBoolean, isFunction } from '@/utils/is'
import { SizeType, VxeGridInstance } from 'vxe-table'
import { ThemeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'
import { useFormats, useInterceptor } from './hooks'
import { useDesign } from '@/hooks/web/useDesign'

useInterceptor()
useFormats()

const appStore = useAppStore()
const { prefixCls } = useDesign('x-vxe-table')
watch(
  () => appStore.getDarkMode,
  () => {
    if (appStore.getDarkMode == ThemeEnum.DARK) {
      import('./theme/dark.less')
    }
    // //刷新页面重置SCSS
    if (appStore.getDarkMode === ThemeEnum.LIGHT) {
      import('./theme/light.less')
      // window.location.reload()
    }
  },
  { immediate: true }
)

const currentSize = computed(() => {
  let resSize: SizeType = 'small'
  const appsize = appStore.getComponentSize
  switch (appsize) {
    case 'middle':
      resSize = 'medium'
      break
    case 'small':
      resSize = 'small'
      break
    case 'small':
      resSize = 'mini'
      break
  }
  return resSize
})
const attrs = useAttrs()
const emit = defineEmits(['register'])
const props = defineProps({
  options: {
    type: Object as PropType<XTableProps>,
    default: () => {}
  }
})
const innerProps = ref<Partial<XTableProps>>()
const getProps = computed(() => {
  const options = innerProps.value || props.options
  options.size = currentSize as any
  getProxyConfig(options)
  getPageConfig(options)
  // console.log(options);
  return {
    ...options,
    ...attrs
  }
})
const xGrid = ref<VxeGridInstance>() // 列表 Grid Ref
const reload = () => {
  const g = unref(xGrid)
  if (!g) {
    return
  }
  g.commitProxy('query')
}

const getSearchData = () => {
  const g = unref(xGrid)
  if (!g) {
    return
  }
  const queryParams = Object.assign({}, JSON.parse(JSON.stringify(g.getProxyInfo()?.form)))
  return queryParams
}
const getProxyConfig = (options: XTableProps) => {
  const { getListApi, proxyConfig, data, afterFetch } = options
  if (proxyConfig || data) return
  if (getListApi && isFunction(getListApi)) {
    options.proxyConfig = {
      props: {
        result: 'list', // 配置响应结果列表字段
        total: 'total' // 配置响应结果总页数字段
      },
      ajax: {
        query: async ({ page, form }) => {
          let queryParams: any = Object.assign({}, JSON.parse(JSON.stringify(form)))
          if (options.params) {
            queryParams = Object.assign(queryParams, options.params)
          }
          const { currentPage, pageSize } = page
          queryParams.pageSize = currentPage
          queryParams.pageNo = pageSize

          let res = await getListApi({ queryParams })
          if (afterFetch && isFunction(afterFetch)) {
            res = afterFetch(res)
          }
          return res || []
        }
      }
    }
  }
}
const getPageConfig = (options: XTableProps) => {
  const { pagination, pagerConfig } = options
  if (pagerConfig) return
  if (pagination) {
    if (isBoolean(pagination)) {
      options.pagerConfig = {
        border: false, // 带边框
        background: true, // 带背景颜色
        perfect: false, // 配套的样式
        pageSize: 10, // 每页大小
        pagerCount: 7, // 显示页码按钮的数量
        autoHidden: false, // 当只有一页时自动隐藏
        pageSizes: [5, 10, 20, 30, 50, 100], // 每页大小选项列表
        layouts: [
          'PrevJump',
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total'
        ]
      }
      return
    }
    options.pagerConfig = pagination
  }
}
const setProps = (prop: Partial<XTableProps>) => {
  innerProps.value = { ...unref(innerProps), ...prop }
}
defineExpose({ reload, Ref: xGrid, getSearchData })
emit('register', { reload, getSearchData, setProps })
</script>
<style lang="less">
@import url('./theme/index.less');
</style>