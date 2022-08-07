<template>
  <div class="main_container">
    <draggable
      class="draggable_box_card"
      :list="formPage.cards"
      :group="{ name: 'cardDrag' }"
      draggable=".draggable_card"
    >
      <div
        v-for="(card, cardIdx) in formPage.cards"
        :key="card.cardId"
        class="draggable_card pointer mb_30 relative"
      >
        <div class="card_btn">
          <a-icon
            @click="() => toAddCard(cardIdx)"
            type="plus"
            class="mr_10 edit_color"
          />
          <a-icon
            @click="() => toDeleteCard(cardIdx)"
            type="delete"
            class="delete_color"
          />
        </div>
        <div class="title_card">
          <a-input v-model="card.cardTitle" class="title_input" />
        </div>
        <draggable
          class="draggable_box_row"
          :list="card.rows"
          :group="{ name: 'rowDrag' }"
          draggable=".draggable_row"
        >
          <div
            v-for="(row, rowIdx) in card.rows"
            :key="row.rowId"
            class="draggable_row mb_3 pointer"
          >
            <a-row :gutter="row.gutter">
              <div class="row_btn">
                <a-icon
                  @click="toAddRow(cardIdx, rowIdx)"
                  type="plus"
                  class="mr_10 edit_color"
                />
                <a-icon
                  @click="toDeleteRow(cardIdx, rowIdx)"
                  type="delete"
                  class="delete_color"
                />
              </div>
              <draggable
                class="draggable_box_field"
                :list="row.fields"
                :group="{ name: 'form' }"
                draggable=".dragItem"
                @add="add"
              >
                <a-col
                  v-for="(field, fieldIdx) in row.fields"
                  :key="field.uid"
                  class="dragItem fl relative field_box"
                  :style="{ width: field.width }"
                >
                  <label :class="getLabelClass(field)">{{
                    field.fieldName
                  }}</label>
                  <RenderField :field="field" />
                  <div class="field_btn">
                    <a-icon
                      @click="toAddField(cardIdx, rowIdx, fieldIdx)"
                      class="mr_10 edit_color"
                      type="plus"
                    />
                    <a-icon
                      @click="toEditFieldSetting(field)"
                      class="mr_10 edit_color"
                      type="edit"
                    />
                    <a-icon
                      type="close"
                      class="delete_field"
                      @click="toDeleteField(cardIdx, rowIdx, fieldIdx)"
                    />
                  </div>
                </a-col>
              </draggable>
            </a-row>
          </div>
        </draggable>
      </div>
    </draggable>
    <div>
      <label>Module Name</label>
      <a-input v-model="formPage.moduleName" />
      <label>File Path</label>
      <a-input v-model="formPage.filePath" />
    </div>
    <div>
      <a-button @click="toSave" type="primary">Save</a-button>
    </div>
    <EditSimpleFieldSetting
      v-if="showEditSimpleFieldSetting"
      :field="currentField"
      :variableNameTreeData="variableNameTreeData"
      :moduleName="formPage.moduleName"
      @toSave="updateFieldSetting"
      @toClose="closeEditSimpleFieldSetting"
    />
  </div>
</template>
<script src="./BuildForm.ts" lang="ts"></script>
<style lang="scss" scoped>
.draggable_card {
  border: 1px solid rgb(216, 213, 213);
  padding: 5px;
}
.card_btn {
  position: absolute;
  right: 1px;
  top: -20px;
}

.draggable_box_row {
  min-height: 80px;
}
.draggable_row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.row_btn {
  visibility: hidden;
  position: absolute;
  right: 10px;
  top: 0;
}
.draggable_row:hover .row_btn {
  visibility: visible;
}

.draggable_box_field {
  border: 1px solid rgb(216, 213, 213);
  padding: 10px;
  box-sizing: border-box;
  height: 80px;
}
.field_btn {
  visibility: hidden;
  position: absolute;
  right: 15px;
  top: 3px;
}
.delete_field {
  font-size: 16px;
  color: red !important;
}
.field_box:hover .field_btn {
  visibility: visible;
}
.requiredSign:before {
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: "*";
}
</style>



