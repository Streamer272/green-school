<template>
  <div class="w-[60%]">
    <Editor
      api-key="626epbwbtpdyf6joughdugz92oc71xnxqvieo8oa64flcnxh"
      :init="{
        toolbar_mode: 'sliding',
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }"
      v-model="text"
    />
  </div>
</template>

<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue";

const text = useTextEditor();
</script>
