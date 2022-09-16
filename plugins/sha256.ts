export default defineNuxtPlugin(() => {
    return {
        provide: {
            sha256: async (textList: Array<string>) => {
                const text: string =  textList.join()

                const uint8 = new TextEncoder().encode(text)
                const digest = await crypto.subtle.digest('SHA-256', uint8)
                return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
            }
        }
    }
})