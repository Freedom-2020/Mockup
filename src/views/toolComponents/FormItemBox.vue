<template>
  <div class="tool_div">
    <draggable
      class="tool_container"
      :list="toolList"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :clone="cloneItem"
      draggable=".dragItem"
      :sort="false"
    >
      <div
        v-for="item in toolList"
        :key="item.fieldType"
        class="tool_box mb_10 t_center pointer dragItem"
      >
        {{ item.fieldType }}
      </div>
    </draggable>
  </div>
</template>
<script src="./FormItemBox.ts" lang="ts"></script>
<style lang="scss">
.tool_div{
  border: 1px solid #555;
  min-height: 400px;
  margin-top: 15px;
}
.tool_container {
  padding: 50px 10px;
}
.tool_box {
  border: 1px solid #555;
  width: 100px;
  color: rgb(223, 80, 223);
}
</style>



