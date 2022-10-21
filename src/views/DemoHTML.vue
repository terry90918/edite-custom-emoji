<template>
  <div class="demo-html">
    <div>demo html</div>
    <div>data: {{ text }}</div>
    <hr />
    <button @click="getApi">get api</button>
    <hr />
    <div>
      <button
        v-for="i in emoji"
        :key="`${i.product_id}-${i.emoji_id}`"
        @click="setEmoji(i)"
      >
        <img
          :src="i.base64_img"
          :data-stringify-emoji="`:${i.product_id}-${i.emoji_id}:`"
        />
      </button>
    </div>
    <hr />
    <div class="input-part">
      <div
        class="input-panel"
        ref="msgInputContainer"
        placeholder="靈魂登出"
        contenteditable="true"
        spellcheck="false"
        v-html="renderHtml"
        @input="keydown"
        @copy="copy"
        @cut="cut"
        @paste="paste"
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
  name: "DemoHTML",
  data() {
    return {
      emoji,
      renderCode: "",
      renderHtml: "",
      text: "",
      textLenth: 0,
    };
  },
  methods: {
    /**
     * 複製事件
     * @param {Object} e - ClipboardEvent 修改剪貼簿相關的事件
     */
    copy(e = {}) {
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;
      const text = window.getSelection().toString();
      if (text) {
        clipboardData.setData("text/plain", text);
      }
    },
    /**
     * 剪輯事件
     * @param {Object} e - ClipboardEvent 修改剪貼簿相關的事件
     */
    cut(e) {
      e.preventDefault();
      const selection = window.getSelection();
      const text = selection.toString();
      selection.deleteFromDocument();
      e.clipboardData.setData("text/plain", text);
    },
    /**
     * 呼叫 API
     */
    getApi() {
      setTimeout(() => {
        this.text =
          "Test :5ac1bfd5040ab15980c9b435-001: Test Test :5ac1bfd5040ab15980c9b435-002: Test";
        this.renderHtml = this.replaceEmojiToHtml(this.text);
        this.renderCode = this.replaceHtmlToEmjio(this.renderHtml);
        this.textLenth = this.getTextLength(this.renderCode);
      }, 100);
    },
    /**
     * 獲取游標位置
     */
    getCursorPosition() {},
    /**
     * 取得欄位字數
     */
    getTextLength(str = "") {
      let text = "";
      text = str.replace(/:([a-zA-Z0-9]+-[a-zA-Z0-9]+):/gm, () => {
        return ``;
      });
      return text.length;
    },
    keydown() {
      const html = this.$refs.msgInputContainer.getInnerHTML();
      this.renderCode = this.replaceHtmlToEmjio(html);
      this.textLenth = this.getTextLength(this.renderCode);
    },
    /**
     * 貼上事件
     * @param {Object} e - ClipboardEvent 修改剪貼簿相關的事件
     */
    paste(e) {
      e.preventDefault();
      let paste = (e.clipboardData || window.clipboardData).getData("text");
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    },
    postApi() {
      this.renderHtml = this.$refs.msgInputContainer.getInnerHTML();
      this.renderCode = this.replaceHtmlToEmjio(this.renderHtml);
      this.textLenth = this.getTextLength(this.renderCode);
    },
    replaceEmojiToHtml(str = "") {
      return str.replace(/:([a-zA-Z0-9]+-[a-zA-Z0-9]+):/gm, ($1, $2) => {
        return `<img data-stringify-emoji="${$1}" src="${
          this.emoji[`(${$2})`]["base64_img"]
        }"/>`;
      });
    },
    replaceHtmlToEmjio(str = "") {
      return str.replace(/<img[^>]*>/gm, ($1) => {
        let arr = [];
        let t = "";
        arr = $1.match(/:([a-zA-Z0-9]+-[a-zA-Z0-9]+):/gm);
        t = arr[0];
        return t;
      });
    },
    setEmoji(i = {}) {
      // 如果輸入框沒有焦點，那麼讓它獲取焦點
      if (this.$refs.msgInputContainer !== document.activeElement) {
        this.$refs.msgInputContainer.focus();
      }

      // 往焦點出插入內容
      const key = `${i.product_id}-${i.emoji_id}`;
      const src = i.base64_img;
      const emoji = `<img src="${src}" data-stringify-emoji=":${key}:">`;
      document.execCommand("insertHtml", false, emoji);
    },
  },
};
</script>

<style>
.demo-html {
  text-align: initial;
}

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

/* emoji */
img[data-stringify-emoji] {
  width: 22px;
  height: 22px;
}
/* End emoji */
</style>
