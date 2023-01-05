<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script setup lang="ts" name="SettingButton">
import SettingDrawer from './SettingDrawer'
import { useDrawer } from '@/components/Drawer'

const [register, { openDrawer }] = useDrawer()
</script>
