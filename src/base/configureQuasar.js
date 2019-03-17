import Quasar from 'quasar-vue-plugin'

import { AppVisibility, CloseMenu, Dialog, Notify } from 'quasar'

export const config = {
  plugins: {
    Dialog,
    Notify,
    AppVisibility,
  },
  directives: {
    CloseMenu,
  },
}

export default (Vue) => {
  Vue.use(Quasar, config)
}
