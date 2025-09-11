// resources/js/app.js
import './bootstrap'
import '../css/app.css'
import { eventBus } from '@/eventBus'
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import { connectWallet, account, connected } from '@/contract'
import { getWithTTL } from './localstorage'
import waiting from './Components/waiting.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Monad Testnet'

let globalModalInstance = null

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    const vueApp = createApp({
      render: () => h(App, props),
      created() {
        if (getWithTTL('address')) {
          connected.value = true
          account.value = getWithTTL('address').account
          connectWallet(getWithTTL('address').platform)
        }
      },
    })

    vueApp.use(plugin).use(ZiggyVue)

    // ✅ Register modal globally
    vueApp.component('waitModal', waiting)

    // ✅ Mount Vue app
    const mountedApp = vueApp.mount(el)

    // store reference later when modal renders
    setTimeout(() => {
      globalModalInstance = mountedApp.$refs?.globalModal
    }, 0)
  },
  progress: {
    color: '#fffb00ff',
  },
})

// no need to grab $refs anymore
window.ActionModal = {
  open(title, message,type) {
    eventBus.emit('modal:open', { title, message,type })
  },
  close() {
    eventBus.emit('modal:close')
  }
}