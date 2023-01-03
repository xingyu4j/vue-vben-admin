import { ref, unref } from 'vue'
import { XTableProps } from '../type'
import { error } from '@/utils/log'

export interface tableMethod {
  reload: () => void
  setProps: (props: XTableProps) => void
}

export const useXTable = (props: XTableProps): [Function, tableMethod] => {
  const tableRef = ref<Nullable<tableMethod>>(null)

  const register = (instance) => {
    tableRef.value = instance
    props && instance.setProps(props)
  }
  const getInstance = (): tableMethod => {
    const table = unref(tableRef)
    if (!table) {
      error('表格实例不存在')
    }
    return table as tableMethod
  }
  const methods: tableMethod = {
    reload: () => getInstance().reload(),
    setProps: (props) => getInstance().setProps(props)
  }
  return [register, methods]
}
