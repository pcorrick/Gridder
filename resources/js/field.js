import PanelItem from './components/PanelItem.vue'
import Panel from './fields/Detail/Panel.vue'

Nova.booting((app, store) => {
  app.component('PanelItem', PanelItem)
  app.component('DetailPanel', Panel)
  // app.component('preview-gridder', PreviewField)
})
