import { withInstall } from '@/utils/index'
import xTable from './src/XTable.vue'

export const XTable = withInstall(xTable)

export { useXTable } from './src/hooks/useXTable'
export * from './src/type'
