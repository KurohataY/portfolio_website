export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/blog' || to.path === '/blog/' || to.path === '/blog/pages' || to.path === '/blog/pages/') {
        return navigateTo('/blog/pages/1')
    }
})