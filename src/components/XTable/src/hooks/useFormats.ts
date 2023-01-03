import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
// 自定义全局的格式化处理函数
export const useFormats = () => {
  // 格式日期，默认 yyyy-MM-dd HH:mm:ss
  VXETable.formats.add('formatDate', ({ cellValue }, format) => {
    if (cellValue != null) {
      return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
    } else {
      return ''
    }
  })
  // 四舍五入金额，每隔3位逗号分隔，默认2位数
  VXETable.formats.add('formatAmount', ({ cellValue }, digits = 2) => {
    return XEUtils.commafy(Number(cellValue), { digits })
  })
  // 格式化银行卡，默认每4位空格隔开
  VXETable.formats.add('formatBankcard', ({ cellValue }) => {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' })
  })
  // 四舍五入,默认两位数
  VXETable.formats.add('formatFixedNumber', ({ cellValue }, digits = 2) => {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
  })
  // 向下舍入,默认两位数
  VXETable.formats.add('formatCutNumber', ({ cellValue }, digits = 2) => {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
  })
  // 格式化图片，将图片链接转换为html标签
  VXETable.formats.add('formatImg', ({ cellValue }) => {
    return '<img height="40" src="' + cellValue + '"> '
  })
  // 格式化文件大小
  VXETable.formats.add('formatSize', ({ cellValue }, digits = 0) => {
    const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const srcSize = parseFloat(cellValue)
    const index = Math.floor(Math.log(srcSize) / Math.log(1024))
    const size = srcSize / Math.pow(1024, index)
    return XEUtils.toFixed(XEUtils.floor(size, 2), 2) + ' ' + unitArr[digits]
  })
}
