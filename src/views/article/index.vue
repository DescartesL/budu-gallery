<template>
  <div>
    <div ref="editor" style="height: 500px;"></div>
    <button @click="saveContent">保存内容</button>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

export default {
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      const editor = new EditorJS({
        holder: this.$refs.editor,
        tools: {
          header: Header,
          list: List
        },

      });
      this.editor = editor;
    },
    async saveContent() {
      const savedData = await this.editor.save();
      console.log(savedData);
    },
  },


};
</script>