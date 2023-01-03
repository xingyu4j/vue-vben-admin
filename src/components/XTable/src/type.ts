import { VxeCrudSchemas } from '@/hooks/web/useCrudSchemas'
import type { VxeGridProps, VxeGridPropTypes, VxeTablePropTypes } from 'vxe-table'

export type XTableProps<D = any> = VxeGridProps<D> & {
  allSchemas?: VxeCrudSchemas
  treeConfig?: VxeTablePropTypes.TreeConfig // 树形表单配置
  getListApi?: Function
  deleteApi?: Function
  exportListApi?: Function
  params?: Object
  pagination?: boolean | VxeGridPropTypes.PagerConfig
  toolBar?: boolean | VxeGridPropTypes.ToolbarConfig
  afterFetch?: Function
}
export type XColumns = VxeGridPropTypes.Columns

export type VxeTableColumn = {
  field: string
  title?: string
  children?: VxeTableColumn[]
} & Recordable
