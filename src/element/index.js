import { Button, Form, FormItem, Input, Container, Aside, Main, Header } from 'element-ui'

export default {
  install (Vue) {
    Vue.use(Button),
      Vue.use(Form),
      Vue.use(FormItem),
      Vue.use(Input),
      Vue.use(Container),
      Vue.use(Aside),
      Vue.use(Main),
      Vue.use(Header)
  }
}