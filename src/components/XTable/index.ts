import { withInstall } from '@/utils/index'
import xTable from './src/XTable.vue'
import xTableAction from './src/components/XTableAction.vue'

export const XTable = withInstall(xTable)

export const XTableAction = withInstall(xTableAction)

export { useXTable } from './src/hooks/useXTable'
export * from './src/type'
