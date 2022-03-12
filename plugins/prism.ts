import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import 'prismjs/components/prism-javascript' // <= 追記
import 'prismjs/components/prism-json' // <= 追記
import 'prismjs/components/prism-markup' // <= 追記
import 'prismjs/components/prism-css' // <= 追記
import 'prismjs/components/prism-scss' // <= 追記
import 'prismjs/components/prism-python' // 
import 'prismjs/components/prism-nginx' 
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-properties'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-ruby'

export default defineNuxtPlugin((app) => {
    app.vueApp.use(Prism);
});