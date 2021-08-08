<template lang="">
    <div class="entry-content cf" itemprop="mainEntityOfPage">
        <Navi />
        <div id="toc" class="toc tnt-number toc-center tnt-number border-element">
            <label class="toc-title" for="toc-checkbox-1">目次</label>
            <div class="toc-content">
                <ol class="toc-list open">
                    <li><a href="#toc1" tabindex="0">広告の配信について</a>
                    </li><li><a href="#toc2" tabindex="0">アクセス解析ツールについて</a></li>
                    <li><a href="#toc3" tabindex="0">当サイトへのコメントについて</a></li>
                    <li><a href="#toc4" tabindex="0">免責事項</a></li>
                </ol>
            </div>
        </div>
        <h2><span id="toc1">広告の配信について</span></h2>
        <p>当サイトは第三者配信の広告サービス「Google Adsense グーグルアドセンス」を利用しています。</p>
        <p>広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。</p>
        <p>Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「<a rel="noopener" href="https://www.google.co.jp/policies/technologies/ads/" target="_blank">広告 – ポリシーと規約 – Google</a>」をご覧ください。</p>
        <p>第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。</p>
        <h2><span id="toc2">アクセス解析ツールについて</span></h2
        ><p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
        <p>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは<a rel="noopener" href="https://www.google.com/analytics/terms/jp.html" target="_blank">ここをクリック</a>してください。</p>
        <h2><span id="toc3">当サイトへのコメントについて</span></h2>
        <p>当サイトでは、スパム・荒らしへの対応として、コメントの際に使用されたIPアドレスを記録しています。</p>
        <p>これはブログの標準機能としてサポートされている機能で、スパム・荒らしへの対応以外にこのIPアドレスを使用することはありません。また、メールアドレスとURLの入力に関しては、任意となっております。全てのコメントは管理人が事前にその内容を確認し、承認した上での掲載となりますことをあらかじめご了承下さい。加えて、次の各号に掲げる内容を含むコメントは管理人の裁量によって承認せず、削除する事があります。</p>
        <p>・特定の自然人または法人を誹謗し、中傷するもの。</p>
        <p>・極度にわいせつな内容を含むもの。</p>
        <p>・禁制品の取引に関するものや、他者を害する行為の依頼など、法律によって禁止されている物品、行為の依頼や斡旋などに関するもの。</p>
        <p>・その他、公序良俗に反し、または管理人によって承認すべきでないと認められるもの。</p>
        <h2><span id="toc4">免責事項</span></h2>
        <p>当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。</p>
        <p>当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
        <p>当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。</p>
        <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
    </div>
</template>
<script>
import Navi from '~/components/blog/ui/nav/navbar.vue'
export default {
    components: {
        Navi,
    },
    data: () => ({

    }),
};
</script>
<style lang="">
</style>