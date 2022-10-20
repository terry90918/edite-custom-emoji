<template>
  <div>
    <h2>EditTextarea</h2>
    <div>
      <button
        v-for="icon in emoji"
        :key="`:${icon.product_id}-${icon.emoji_id}:`"
        :data-stringify-emoji="`:${icon.product_id}-${icon.emoji_id}:`"
        @click="setIcon(icon)"
      >
        <img class="icon" :src="icon.base64_img" />
      </button>
    </div>
    <hr />
    <textarea class="textarea" ref="input" v-model="text" />
    <hr />
    <button @click="getCursorPosition">getCursorPosition</button>
    <hr />
    <div>
      <div>icons: {{ icons }}</div>
      <div>rows: {{ rows }}</div>
      <div>textRender: {{ textRender }}</div>
      <div>
        <div>render:</div>
        <div class="render" v-html="render" />
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import emoji from "@/assets/emoji.json";

export default {
  name: "EditTextarea",
  data() {
    return {
      cursorPosition: null,
      emoji: emoji,
      icons: [],
      text: "",
      textRender: "",
    };
  },
  computed: {
    render() {
      let text = "";
      this.rows.forEach((i, k) => {
        text = text + i;
        if (this.rows.length - 1 !== k) {
          text = `${text}<img class="icon" src="${this.icons[k]["base64_img"]}" />`;
        }
      });
      return text;
    },
    rows() {
      let rows = [];
      rows = this.text.split("");
      return rows;
    },
  },
  methods: {
    /**
     * 獲取光標位置方法
     */
    getCursorPosition() {
      const el = this.$refs.input;
      let pos = 0;
      if ("selectionStart" in el) {
        pos = el.selectionStart;
      } else if ("selection" in document) {
        el.focus();
        const sel = document.selection.createRange();
        const selLength = document.selection.createRange().text.length;
        sel.moveStart("character", -el.value.length);
        pos = sel.text.length - selLength;
      }
      console.log(pos);
      return pos;
    },
    setIcon(icon) {
      this.cursorPosition = this.getCursorPosition();
      this.icons.push({
        ...icon,
        indexOf: this.cursorPosition,
      });

      this.text = `${this.text}`;
    },
    uuid(a) {
      return a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    },
  },
};
</script>

<style>
.render {
  display: flex;
  align-items: center;
}
.icon {
  width: 30px;
}
</style>
