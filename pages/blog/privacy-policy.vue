
<template>
  <div>
    <PCNavi
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
      :categories="categories"
    />
    <SPNavi v-else :categories="categories" :darkButtonShow="true" />
    <v-container style="margin-top: 50px">
      <v-row justify="center" no-gutters>
        <v-col cols="10" sm="10" md="8" lg="8">
          <h2><span id="toc1">広告の配信について</span></h2>
          <p>
            当サイトは第三者配信の広告サービス「Google Adsense
            グーグルアドセンス」を利用しています。
          </p>
          <p>
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
          </p>
          <p>
            Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「<a
              rel="noopener"
              href="https://www.google.co.jp/policies/technologies/ads/"
              target="_blank"
              >広告 – ポリシーと規約 – Google</a
            >」をご覧ください。
          </p>
          <p>
            第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
          </p>
          <h2><span id="toc2">アクセス解析ツールについて</span></h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          </p>
          <p>
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは<a
              rel="noopener"
              href="https://www.google.com/analytics/terms/jp.html"
              target="_blank"
              >ここをクリック</a
            >してください。
          </p>
          <h2><span id="toc3">当サイトへのコメントについて</span></h2>
          <p>
            当サイトでは、スパム・荒らしへの対応として、コメントの際に使用されたIPアドレスを記録しています。
          </p>
          <p>
            これはブログの標準機能としてサポートされている機能で、スパム・荒らしへの対応以外にこのIPアドレスを使用することはありません。また、メールアドレスとURLの入力に関しては、任意となっております。全てのコメントは管理人が事前にその内容を確認し、承認した上での掲載となりますことをあらかじめご了承下さい。加えて、次の各号に掲げる内容を含むコメントは管理人の裁量によって承認せず、削除する事があります。
          </p>
          <p>・特定の自然人または法人を誹謗し、中傷するもの。</p>
          <p>・極度にわいせつな内容を含むもの。</p>
          <p>
            ・禁制品の取引に関するものや、他者を害する行為の依頼など、法律によって禁止されている物品、行為の依頼や斡旋などに関するもの。
          </p>
          <p>
            ・その他、公序良俗に反し、または管理人によって承認すべきでないと認められるもの。
          </p>
          <h2><span id="toc4">免責事項</span></h2>
          <p>
            当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
          </p>
          <p>
            当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
          </p>
          <p>
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </v-col>
        <v-col cols="0" sm="0" md="2" lg="2">
          <v-switch
            v-model="theme"
            :prepend-icon="themeIcon"
            class="d-flex justify-end mt-3 mb-5"
            v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
          ></v-switch>
        </v-col>
      </v-row>
      <v-btn text :ripple="false" class="back-wrapper" @click.native="backTo">
        <i class="material-icons">arrow_back</i>
      </v-btn>
    </v-container>
  </div>
</template>
<script>
import SPNavi from "~/components/nav/navbar.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import gMenuList from "~/assets/menu/g-menu.json";
import cheerio from "cheerio";

export default {
  components: {
    SPNavi,
    PCNavi,
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "プライバーポリシーのページです",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "プライバシーポリシー",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.HOMEPAGE_ROOT_URL + "/blog/privacy-policy",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "プライバーポリシーのページです",
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "Izanagi's Develop Blog",
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:site",
          property: "twitter:site",
          content: this.$config.TWITTER_MY_USER_ID,
        },
      ],
    };
  },
  data() {
    return {
      theme: this.$store.state.theme,
      tocCount: 0,
      tocList: [],
      categories: gMenuList,
    };
  },
  methods: {
    backTo() {
      this.$router.go(-1);
    },
    createElementFromHTML(html) {
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      return tempEl;
    },
    searchHeadingTags(contentList, contentListCount) {
      var body = "";
      for (let i = 0; i < contentListCount; i++) {
        body = body + contentList[i].content;
      }
      const $ = cheerio.load(body);
      return $("h2, h3, h4").toArray();
    },
  },
  computed: {
    themeIcon() {
      return this.$store.state.theme
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
  watch: {
    theme() {
      this.$store.dispatch("theme", this.theme);
      this.$vuetify.theme.dark = this.theme;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-application a {
  display: contents;
  text-decoration: none;
  color: #4fc3f7;
}
.container {
  max-width: 90%;
}
</style>