<template>
  <PageWrapper title="带参数标签页" content="支持带参数多tab缓存">
    Current Param : {{ params }}
    <br />
    Keep Alive
    <Input />
  </PageWrapper>
</template>
<script setup lang="ts" name="TestTab">
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { PageWrapper } from '@/components/Page'
import { Input } from 'ant-design-vue'

const { currentRoute } = useRouter()

const params = computed(() => {
  return unref(currentRoute).params
})
</script>
