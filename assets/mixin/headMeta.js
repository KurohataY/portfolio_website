export default {
   head() {
    return {
      title: this.meta.title,
      meta: [{
          hid: 'description',
          name: 'description',
          content: this.meta.description
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.meta.type
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.meta.url
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.meta.image
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.meta.site_name
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: this.meta.titter_card
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: process.env.TWITTER_MY_USER_ID
        },
      ],
    }
  }
}
