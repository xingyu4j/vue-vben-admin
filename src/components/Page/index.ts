import { withInstall } from '@/utils'

import contentWrap from './src/ContentWrap.vue'
import pageFooter from './src/PageFooter.vue'
import pageWrapper from './src/PageWrapper.vue'

export const ContentWrap = withInstall(contentWrap)
export const PageFooter = withInstall(pageFooter)
export const PageWrapper = withInstall(pageWrapper)

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight'
