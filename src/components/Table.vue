<template>
  <div id="home">
    <router-link :to="{ name: 'home' }">
      <el-button type="primary" v-bind:style="{ margin: '0 20px' }">{{
        $t("buttonBack")
      }}</el-button>
    </router-link>
    <el-button
      type="primary"
      v-bind:style="{ margin: '0 20px' }"
      v-on:click="selectButtonLocale()"
      >{{ $t("buttonTr") }}</el-button
    >
    <el-table
      :data="TABLE"
      style="width: 361px"
      :header-cell-class-name="tableRowClassName"
      border
      @header-click="sortKey"
    >
      <el-table-column
        prop="key"
        :label="$t('tableKeys')"
        width="180"
      ></el-table-column>
      <el-table-column prop="fruit" :label="$t('tableFruits')" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Table",
  data: () => ({
    selectLocBut: "en",
    selectKey: true,
    selectFruit: false
  }),
  props: {},
  computed: mapGetters(["TABLE", "TABLESORT"]),
  methods: {
    ...mapActions([
      "GET_TABLE_FROM_API",
      "SORT_TABLE_ON_KEY",
      "SORT_TABLE_ON_FRUIT"
    ]),
    sortKey(column) {
      if (column.label === this.$t("tableFruits")) {
        this.SORT_TABLE_ON_FRUIT({
          tableSort: this.TABLESORT,
          tableData: this.TABLE
        });
        this.selectKey = false;
        this.selectFruit = true;
      } else {
        this.SORT_TABLE_ON_KEY({
          tableSort: this.TABLESORT,
          tableData: this.TABLE
        });
        this.selectKey = true;
        this.selectFruit = false;
      }
    },
    selectButtonLocale() {
      this.selectLocBut =
        this.selectLocBut === "ru"
          ? (this.$i18n.locale = "en")
          : (this.$i18n.locale = "ru");
    },
    tableRowClassName(row) {
      if (this.selectKey === true && row.columnIndex === 0) {
        return this.TABLESORT.key === true ? "warning-row" : "other-row";
      } else if (this.selectFruit === true && row.columnIndex === 1) {
        return this.TABLESORT.fruit === true ? "warning-row" : "other-row";
      }
      return "success-row";
    }
  },
  mounted() {
    this.GET_TABLE_FROM_API();
  }
};
</script>

<style lang="scss">
.el-table .warning-row {
  background-color: #1caa14;
}

.el-table .success-row {
  background-color: white;
}

.el-table .other-row {
  background-color: #0e0e83;
}
</style>
