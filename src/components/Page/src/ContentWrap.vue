<template>
  <Card :class="[`${prefixCls}`, 'py-4']" :bordered="bordered" :title="title">
    <slot></slot>
  </Card>
</template>
<script setup lang="ts" name="ContentWrap" inheritAttrs="false">
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { Card } from 'ant-design-vue'

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
  bordered: propTypes.bool.def(false)
})

const prefixCls = useDesign('content-wrap')
</script>
