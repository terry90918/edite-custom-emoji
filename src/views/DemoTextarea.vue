<template>
  <div class="demo-textarea">
    <h1>This is an about page</h1>
    <div>Message <button @click="setMsg">setMsg</button></div>
    <h2>List</h2>
    <div v-for="item in list" :key="'list-' + item.uid">
      <div>
        <button
          v-for="(i, k) in emoji"
          :key="'emoji-' + k"
          @click="setIcon({ item, k })"
        >
          {{ i.img }}
        </button>
      </div>
      <div>icon: {{ item.icon }}</div>
      <textarea v-model="item.text" />
    </div>
    <h2>Rendered</h2>
    <div v-for="item in rendered" :key="'rendered-' + item.uuid">
      <div>rows: {{ item.rows }}</div>
      <div>text: {{ item.text }}</div>
      <div>text_render: {{ item.textRender }}</div>
      <hr />
    </div>
    <hr />
    <EditTextareaVue />
  </div>
</template>

<script>
import EditTextareaVue from "@/components/EditTextarea.vue";

export default {
  name: "DemoTextarea",
  components: {
    EditTextareaVue,
  },
  data() {
    return {
      emoji: [
        {
          img: "🐸",
          uid: "5ac1bfd5040ab15980c9b435-001",
        },
        {
          img: "🦐",
          uid: "5ac1bfd5040ab15980c9b435-002",
        },
        {
          img: "🦄",
          uid: "5ac1bfd5040ab15980c9b435-003",
        },
        {
          img: "🐶",
          uid: "5ac1bfd5040ab15980c9b435-004",
        },
        {
          img: "🐱",
          uid: "5ac1bfd5040ab15980c9b435-005",
        },
      ],
      list: [],
    };
  },
  computed: {
    rendered() {
      let temp = [];
      temp = this.list.map((i) => {
        const rows = this.setRows(i);
        const text = this.setText({ rows: rows, icon: i.icon });
        const textRender = this.setTextRender({ rows: rows, icon: i.icon });
        return {
          ...i,
          text: text,
          rows: rows,
          textRender: textRender,
        };
      });
      return temp;
    },
  },
  methods: {
    setIcon({ item, k }) {
      item.icon.push(this.emoji[k]);
      item.text = `${item.text}`;
    },
    setMsg() {
      const temp = {
        icon: [],
        text: "",
        uuid: this.uuid(),
      };
      this.list.push(temp);
    },
    setTextRender({ rows, icon }) {
      let text = "";
      rows.forEach((i, k) => {
        text = text + i;
        if (rows.length - 1 !== k) {
          text = text + icon[k]["img"];
        }
      });
      return text;
    },
    setText({ rows, icon }) {
      let text = "";
      rows.forEach((i, k) => {
        text = text + i;
        if (rows.length - 1 !== k) {
          text = text + ":" + icon[k]["uid"] + ":";
        }
      });
      return text;
    },
    setRows({ text }) {
      let rows = [];
      rows = text.split("");
      return rows;
    },
    uuid(a) {
      return a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    },
  },
  watch: {
    list: {
      deep: true,
      handler(val, oldVal) {
        console.log(val, oldVal);
      },
    },
  },
};
</script>
