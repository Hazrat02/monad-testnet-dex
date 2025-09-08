// resources/js/app.js
import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import { connectWallet,account, connected} from '@/contract'
import { getWithTTL } from './localstorage'
const appName = import.meta.env.VITE_APP_NAME || 'Monad Testnet'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({
            render: () => h(App, props),
            created() {
                if (getWithTTL('address')) {

                    connected.value = true;
                    account.value = getWithTTL('address').account
                    connectWallet(getWithTTL('address').platform)


                }
            },
        })

        app.use(plugin).use(ZiggyVue).mount(el)
    },
    progress: {
        color: '#fffb00ff',
    },
})
