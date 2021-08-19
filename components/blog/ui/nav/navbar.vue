<template>
  <div>
    <nav :class="{ 'nav-z-index-change': !menuClick }">
      <ul>
        <li
          v-for="category in categories"
          :key="category.iconName"
          :class="{ animate: menuClick }"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <nuxt-link
                :to="category.link"
                @click.native="sentCategory(category.categoryQueryValue)"
              >
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="material-icons icon_style"
                >
                  {{ category.iconName }}
                </v-icon>
              </nuxt-link>
            </template>
            <span>{{ category.name }}</span>
          </v-tooltip>
        </li>
        <li :class="{ animate: menuClick }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                @click="toggleMenu"
                class="material-icons icon_style"
              >
                close
              </v-icon>
            </template>
            <span>メニューを閉じる</span>
          </v-tooltip>
        </li>
      </ul>
    </nav>
    <div class="nav-container" :class="{ 'nav-open': menuClick }">
      <div
        class="menu-icon"
        :class="{ open: menuClick }"
        v-on:click="toggleMenu"
      >
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuClick: false,
      categories: [
        {
          name: "トップページ",
          iconName: "home",
          link: "/",
          categoryQueryValue: undefined,
        },
        { name: "ブログトップ", iconName: "library_books", link: "/blog" },
        {
          name: "プログラミング",
          iconName: "code",
          link: "/blog?category=プログラミング",
          categoryQueryValue: "プログラミング",
        },
        {
          name: "IT",
          iconName: "computer",
          link: "/blog?category=IT",
          categoryQueryValue: "IT",
        },
        {
          name: "日記",
          iconName: "menu_book",
          link: "/blog?category=日記",
          categoryQueryValue: "日記",
        },
        {
          name: "プライバシーポリシー",
          iconName: "policy",
          link: "/blog/privacy-policy",
          categoryQueryValue: undefined,
        },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuClick = !this.menuClick;
    },
    sentCategory(categoryValue) {
      this.$emit("categoryValue", categoryValue);
    },
    // sentContents() {
    //   this.$emit("contents", this.newsSection.nav.now + 1);
    // },
  },
};
</script>
<style lang="scss" scoped>
// 参考：https://codepen.io/markmurray/pen/yyNZpz
@mixin longshadow($color) {
  text-shadow: makelongshadow($color);
}

@mixin transition($property: all, $delay: false) {
  -moz-transition: $property;
  -o-transition: $property;
  -webkit-transition: $property;
  -webkit-transition-delay: $delay;
  transition: $property;
}

@mixin box-sizing($sizing) {
  -moz-box-sizing: $sizing;
  -webkit-box-sizing: $sizing;
  box-sizing: $sizing;
}
*,
*::before,
*::after {
  @include box-sizing(border-box);
}

$shadowlength: 60;

@function makelongshadow($color) {
  $val: 0px 0px $color;
  @for $i from 1 through $shadowlength {
    $val: #{$val}, #{$i}px #{$i}px #{$color};
  }
  @return $val;
}

html,
body {
  background: #111;
  height: 100%;
}

.nav-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  @include transition(all 0.3s ease 0.6s);
  z-index: 10;
  padding: 1em;
  position: absolute;
}
.nav-z-index-change {
  z-index: 0;
}

.nav-container.nav-open {
  margin-top: 5em;
  opacity: 0;
  @include transition(all 0.3s ease);
}

@media screen and (max-width: 395px) {
  .nav-container.nav-open {
    margin-top: 24em;
  }
}

@media screen and (max-width: 520px) and (min-width: 396px) {
  .nav-container.nav-open {
    margin-top: 20em;
  }
}

@media screen and (max-width: 900px) and (min-width: 521px) {
  .nav-container.nav-open {
    margin-top: 11em;
  }
}

.menu-icon {
  position: relative;
  display: block;
  width: 2.5em;
  height: 2.5em;
  cursor: pointer;

  &:hover span {
    background: #222;

    &:before,
    &:after {
      background: #222;
    }
  }
}

.menu-icon > span {
  position: absolute;
  top: 50%;
  display: block;
  width: 100%;
  height: 0.25em;
  background-color: lighten(#222, 60%);
  border-radius: 3px;
  @include transition(transform 0.3s, 0.25s ease);
}

.menu-icon > span:before,
.menu-icon > span:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: lighten(#222, 60%);
  border-radius: 3px;
  @include transition(transform 0.3s, 0.25s ease);
}

.menu-icon > span:before {
  transform: translateY(-0.75em);
}

.menu-icon > span:after {
  transform: translateY(0.75em);
}

.menu-icon.open {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.menu-icon.open > span:before {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.menu-icon.open > span:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

nav {
  position: fixed;
  top: 0;
  color: black;
  z-index: 20;
  width: 100%;
  text-align: center;

  ul {
    li.animate {
      top: 0;
    }

    li {
      display: inline-block;
      text-align: center;
      margin: 1em 2em;
      cursor: pointer;
      position: relative;
      top: -24em;
      $speed: 0.3s;
      $icons: 3;

      a {
        display: block;
      }

      &:nth-child(1) {
        @include transition(top $speed ease 0.15s);
      }
      &:nth-child(2) {
        @include transition(top $speed ease 0.2s);
      }
      &:nth-child(3) {
        @include transition(top $speed ease 0.25s);
      }
      &:nth-child(4) {
        @include transition(top $speed ease 0.3s);
      }
      &:nth-child(5) {
        @include transition(top $speed ease 0.35s);
      }
      &:nth-child(6) {
        @include transition(top $speed ease 0.4s);
      }
      &:nth-child(7) {
        @include transition(top $speed ease 0.45s);
      }

      &:hover {
        opacity: 1;
      }

      .icon_style {
        font-size: 1.5em;
        background: #4fc3f7;
        padding: 0.75em;
        border-radius: 50%;
        color: black;
        display: inline-block;
        overflow: hidden;
        @include longshadow(rgba(41, 182, 246, 1));
      }

      h4 {
        line-height: 2.5;
      }
    }
  }
}
</style>