import { reactive } from 'vue'
import {
  FormItemRenderOptions,
  VxeColumnPropTypes,
  VxeFormItemProps,
  VxeGridPropTypes,
  VxeTableDefines
} from 'vxe-table'
import { eachTree } from 'xe-utils'
import { useI18n } from '@/hooks/web/useI18n'
import { FormSchema } from '@/components/Form'
import { VxeTableColumn } from '@/components/XTable'
import { DescItem } from '@/components/Description'

export type VxeCrudSchema = {
  primaryKey?: string // 主键ID
  primaryTitle?: string // 主键标题 默认为序号
  primaryType?: VxeColumnPropTypes.Type | 'id' // 还支持 "id" | "seq" | "radio" | "checkbox" | "expand" | "html" | null
  action?: boolean // 是否开启表格内右侧操作栏插槽
  actionTitle?: string // 操作栏标题 默认为操作
  actionWidth?: string // 操作栏插槽宽度,一般2个字带图标 text 类型按钮 50-70
  columns: VxeCrudColumns[]
  searchSpan?: number
}
type VxeCrudColumns = Omit<VxeTableColumn, 'children'> & {
  field: string // 字段名
  title?: string // 标题名
  formatter?: VxeColumnPropTypes.Formatter // vxe formatter格式化
  isSearch?: boolean // 是否在查询显示
  search?: CrudSearchParams // 查询的详细配置
  isTable?: boolean // 是否在列表显示
  table?: CrudTableParams // 列表的详细配置
  isForm?: boolean // 是否在表单显示
  form?: CrudFormParams // 表单的详细配置
  isDetail?: boolean // 是否在详情显示
  detail?: CrudDescriptionsParams // 详情的详细配置
  print?: CrudPrintParams // vxe 打印的字段
  children?: VxeCrudColumns[] // 子级
  dictType?: string // 字典类型
  dictClass?: 'string' | 'number' | 'boolean' // 字典数据类型 string | number | boolean
}

type CrudSearchParams = {
  // 是否显示在查询项
  show?: boolean
} & Omit<VxeFormItemProps, 'field'>

type CrudTableParams = {
  // 是否显示表头
  show?: boolean
} & Omit<VxeTableDefines.ColumnOptions, 'field'>

type CrudFormParams = {
  // 是否显示表单项
  show?: boolean
} & Omit<FormSchema, 'field'>

type CrudDescriptionsParams = {
  // 是否显示表单项
  show?: boolean
} & Omit<DescItem, 'field'>

type CrudPrintParams = {
  // 是否显示打印项
  show?: boolean
} & Omit<VxeTableDefines.ColumnInfo[], 'field'>

export type VxeCrudSchemas = {
  searchSchema: VxeFormItemProps[]
  tableSchema: VxeGridPropTypes.Columns
  formSchema: FormSchema[]
  detailSchema: DescItem[]
  printSchema: VxeTableDefines.ColumnInfo[]
}

// 过滤所有结构
export const useCrudSchemas = (
  crudSchema: VxeCrudSchema
): {
  allSchemas: VxeCrudSchemas
} => {
  // 所有结构数据
  const allSchemas = reactive<VxeCrudSchemas>({
    searchSchema: [],
    tableSchema: [],
    formSchema: [],
    detailSchema: [],
    printSchema: []
  })

  const searchSchema = filterSearchSchema(crudSchema)
  allSchemas.searchSchema = searchSchema || []

  const tableSchema = filterTableSchema(crudSchema)
  allSchemas.tableSchema = tableSchema || []

  const formSchema = filterFormSchema(crudSchema)
  allSchemas.formSchema = formSchema

  const detailSchema = filterDescItem(crudSchema)
  allSchemas.detailSchema = detailSchema

  const printSchema = filterPrintSchema(crudSchema)
  allSchemas.printSchema = printSchema

  return {
    allSchemas
  }
}

// 过滤 Search 结构
const filterSearchSchema = (crudSchema: VxeCrudSchema): VxeFormItemProps[] => {
  const { t } = useI18n()
  const span = crudSchema.searchSpan ? crudSchema.searchSpan : 6
  const spanLength = 24 / span
  const searchSchema: VxeFormItemProps[] = []
  eachTree(crudSchema.columns, (schemaItem: VxeCrudColumns) => {
    // 判断是否显示
    if (schemaItem?.isSearch || schemaItem.search?.show) {
      const itemRenderName = schemaItem?.search?.itemRender?.name || '$input'
      let itemRender: FormItemRenderOptions = {}

      if (schemaItem.search?.itemRender) {
        itemRender = schemaItem.search.itemRender
      } else {
        itemRender = {
          name: itemRenderName,
          props:
            itemRenderName == '$input'
              ? { placeholder: t('common.inputText') }
              : { placeholder: t('common.chooseText') }
        }
      }
      const searchSchemaItem = {
        // 默认为 input
        folding: searchSchema.length > spanLength - 1,
        itemRender: schemaItem.itemRender ? schemaItem.itemRender : itemRender,
        field: schemaItem.field,
        title: schemaItem.search?.title || schemaItem.title,
        slots: schemaItem.search?.slots,
        span: span
      }
      searchSchema.push(searchSchemaItem)
    }
  })
  if (searchSchema.length > 0) {
    // 添加搜索按钮
    const buttons: VxeFormItemProps = {
      span: 24,
      align: 'center',
      collapseNode: searchSchema.length > spanLength,
      itemRender: {
        name: '$buttons',
        children: [
          { props: { type: 'submit', content: t('common.queryText'), status: 'primary' } },
          { props: { type: 'reset', content: t('common.resetText') } }
        ]
      }
    }
    searchSchema.push(buttons)
  }
  return searchSchema
}

// 过滤 table 结构
const filterTableSchema = (crudSchema: VxeCrudSchema): VxeGridPropTypes.Columns => {
  const { t } = useI18n()
  const tableSchema: VxeGridPropTypes.Columns = []
  // 主键ID
  if (crudSchema.primaryKey && crudSchema.primaryType) {
    const primaryTitle = crudSchema.primaryTitle ? crudSchema.primaryTitle : t('common.index')
    const primaryWidth = primaryTitle.length * 30 + 'px'

    let tableSchemaItem: { [x: string]: any } = {
      title: primaryTitle,
      field: crudSchema.primaryKey,
      width: primaryWidth
    }
    if (crudSchema.primaryType != 'id') {
      tableSchemaItem = {
        ...tableSchemaItem,
        type: crudSchema.primaryType
      }
    }
    tableSchema.push(tableSchemaItem)
  }

  eachTree(crudSchema.columns, (schemaItem: VxeCrudColumns) => {
    // 判断是否显示
    if (schemaItem?.isTable !== false && schemaItem?.table?.show !== false) {
      const tableSchemaItem = {
        ...schemaItem.table,
        field: schemaItem.field,
        title: schemaItem.table?.title || schemaItem.title,
        minWidth: '80px'
      }
      tableSchemaItem.showOverflow = 'tooltip'

      tableSchema.push(tableSchemaItem)
    }
  })
  // 操作栏插槽
  if (crudSchema.action && crudSchema.action == true) {
    const tableSchemaItem = {
      title: crudSchema.actionTitle ? crudSchema.actionTitle : t('common.action'),
      field: 'actionbtns',
      fixed: 'right' as unknown as VxeColumnPropTypes.Fixed,
      width: crudSchema.actionWidth ? crudSchema.actionWidth : '200px',
      slots: {
        default: 'actionbtns_default'
      }
    }
    tableSchema.push(tableSchemaItem)
  }
  return tableSchema
}

// 过滤 form 结构
const filterFormSchema = (crudSchema: VxeCrudSchema): FormSchema[] => {
  const formSchema: FormSchema[] = []

  eachTree(crudSchema.columns, (schemaItem: VxeCrudColumns) => {
    // 判断是否显示
    if (schemaItem?.isForm !== false && schemaItem?.form?.show !== false) {
      // 默认为 input
      const formSchemaItem: FormSchema = {
        ...schemaItem.form,
        component: schemaItem?.form?.component ? schemaItem.form.component : 'Input',
        field: schemaItem.field,
        label: (schemaItem.form?.label || schemaItem.title) as string
      }

      formSchema.push(formSchemaItem)
    }
  })

  return formSchema
}

// 过滤 descriptions 结构
const filterDescItem = (crudSchema: VxeCrudSchema): DescItem[] => {
  const descItem: DescItem[] = []

  eachTree(crudSchema.columns, (schemaItem: VxeCrudColumns) => {
    // 判断是否显示
    if (schemaItem?.isDetail !== false && schemaItem.detail?.show !== false) {
      const descItemItem: DescItem = {
        ...schemaItem.detail,
        field: schemaItem.field,
        label: (schemaItem.detail?.label || schemaItem.title) as string
      }

      descItem.push(descItemItem)
    }
  })

  return descItem
}

// 过滤 打印 结构
const filterPrintSchema = (crudSchema: VxeCrudSchema): any[] => {
  const printSchema: any[] = []

  eachTree(crudSchema.columns, (schemaItem: VxeCrudColumns) => {
    // 判断是否显示
    if (schemaItem?.print?.show !== false) {
      const printSchemaItem = {
        field: schemaItem.field
      }

      printSchema.push(printSchemaItem)
    }
  })

  return printSchema
}
