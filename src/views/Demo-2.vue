<template>
  <div class="demo-2">
    <div>Demo 2</div>
    <div>Data: {{ text }}</div>
    <hr />
    <button @click="getApi">get api</button>
    <hr />
    <div>
      <button v-for="i in emoji" :key="`${i.product_id}-${i.emoji_id}`">
        <img
          :src="i.base64_img"
          :data-stringify-emoji="`:${i.product_id}-${i.emoji_id}:`"
          @click="setEmoji(i)"
        />
      </button>
    </div>
    <hr />
    <div class="input-part">
      <div
        class="input-panel"
        ref="msgInputContainer"
        placeholder="輸入點什麼😆"
        contenteditable="true"
        spellcheck="false"
        v-html="renderHtml"
        @input="keydownD"
      />
      <div>{{ textLenth }}/100</div>
    </div>
    <hr />
    <button @click="postApi">送出</button>
    <hr />
    <div>render html: {{ renderHtml }}</div>
    <hr />
    <div>render code: {{ renderCode }}</div>
  </div>
</template>

<script>
import emoji from "@/assets/emoji.json";

export default {
  name: "Demo-2",
  data() {
    return {
      emoji: emoji,
      text: "",
      textLenth: 0,
      renderCode: "",
      renderHtml: "",
    };
  },
  methods: {
    getApi() {
      setTimeout(() => {
        this.text = "Test :moneymouthface: Test Test :moneywithwings: Test";
        this.renderHtml = this.replaceEmojiToHtml(this.text);
      }, 0.5);
    },
    getTextLength(str) {
      let text = "";
      text = str.replace(/:([a-zA-Z_]+):/gm, () => {
        return ``;
      });
      return text.length;
    },
    keydownD() {
      const html = this.$refs.msgInputContainer.getInnerHTML();
      this.getTextLength(html);
    },
    replaceEmojiToHtml(str) {
      return str.replace(/:([a-zA-Z0-9]+-[a-zA-Z0-9]+):/gm, ($1, $2) => {
        return `<img data-stringify-emoji="${$1}" src="${this.emojis[$2]}"/>`;
      });
    },
    replaceHtmlToEmjio(str) {
      return str.replace(/<img[^>]*>/gm, ($1) => {
        let arr = [];
        let t = "";
        arr = $1.match(/:([a-zA-Z0-9]+-[a-zA-Z0-9]+):/gm);
        t = arr[0];
        return t;
      });
    },
    setEmoji(i) {
      // 如果輸入框沒有焦點，那麼讓它獲取焦點
      if (this.$refs.msgInputContainer !== document.activeElement) {
        this.$refs.msgInputContainer.focus();
      }

      // 往焦點出插入內容
      let key = `${i.product_id}-${i.emoji_id}`;
      let img = `<img src="${i.base64_img}" data-stringify-emoji=":${key}:">`;
      document.execCommand("insertHtml", false, img);
    },
    postApi() {
      this.renderHtml = this.$refs.msgInputContainer.getInnerHTML();
      this.renderCode = this.replaceHtmlToEmjio(this.renderHtml);
      this.textLenth = this.getTextLength(this.renderCode);
    },
  },
};
</script>

<style>
.demo-2 {
  text-align: initial;
}

/* emoji */
img[data-stringify-emoji] {
  width: 22px;
  height: 22px;
}
/* End emoji */

/* input */
.input-part {
  padding: 10px;
}
.input-panel {
  font-size: 14px;
  line-height: 20px;
  background: #efefef;
  width: 380px;
  height: 100px;
  outline: none;
  border: #f4f5f6 2px solid;
  border-radius: 4px;
  padding: 5px;
}
.input-panel:focus {
  border: dodgerblue 2px solid;
}
.input-panel:empty:before {
  content: attr(placeholder);
  position: absolute;
  color: #4d4d4d;
  background-color: transparent;
}
/* End input */
</style>
