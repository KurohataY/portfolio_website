import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-scss.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-nginx.js'
import 'prismjs/components/prism-yaml.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-properties.js'
import 'prismjs/components/prism-swift.js'
import 'prismjs/components/prism-ruby.js'

import 'clipboard'
import 'prismjs/plugins/toolbar/prism-toolbar.js'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js'

import 'prismjs/plugins/show-language/prism-show-language.js'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Prism)
})