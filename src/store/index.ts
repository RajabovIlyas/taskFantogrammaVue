import Vue from "vue";
import * as Vuex from "vuex";
import axios from "axios";

import { createVuexStore } from "vuex-simple";

// import { MyStore } from "./store";

Vue.use(Vuex);

//const instance = new MyStore();

// create and export our store
//export default createVuexStore(instance);

interface ArrayTable {
  key: string;
  fruit: string;
}

const sortByKey = (arr: ArrayTable[]) => {
  arr.sort((a, b) =>
    Number(a.key.substr(3)) > Number(b.key.substr(3)) ? 1 : -1
  );
};
const sortByFruit = (arr: ArrayTable[]) => {
  arr.sort((a, b) => (a.fruit > b.fruit ? 1 : -1));
};

export default new Vuex.Store({
  state: {
    tableData: [],
    canvas: null,
    tableSort: {
      key: false,
      fruit: false
    }
  },
  mutations: {
    SET_TABLE_TO_STATE: (
      state,
      { tableData, tableSort = { key: false, fruit: false } }
    ) => {
      state.tableData = tableData;
      state.tableSort = tableSort;
    },
    SET_CANVAS_TO_STATE: (state, canvas) => {
      state.canvas = canvas;
    }
  },
  actions: {
    async GET_TABLE_FROM_API({ commit }) {
      return await axios
        .get("http://fantogramma.org/test.json")
        .then(table => {
          const arr: ArrayTable[] = [];
          Object.keys(table.data).forEach(key => {
            arr.push({ key, fruit: table.data[key].fruit });
          });
          sortByKey(arr);
          commit("SET_TABLE_TO_STATE", {
            tableData: arr,
            tableSort: { key: true, fruit: false }
          });
          return table;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    async GET_CANVAS_FROM_API({ commit }) {
      await axios
        .get("http://fantogramma.org/test.png", {
          responseType: "blob"
        })
        .then(canvas => {
          const reader = new FileReader();
          reader.readAsDataURL(canvas.data);
          reader.onload = () => {
            commit("SET_CANVAS_TO_STATE", reader.result);
          };
          return reader;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
      return this.state.canvas;
    },
    SORT_TABLE_ON_KEY({ commit }, { tableData, tableSort }) {
      if (tableSort.key) {
        tableData = tableData.reverse();
        tableSort.key = false;
      } else {
        sortByKey(tableData);
        tableSort.key = true;
      }
      tableSort.fruit = false;
      commit("SET_TABLE_TO_STATE", {
        tableData: tableData,
        tableSort: tableSort
      });
    },
    SORT_TABLE_ON_FRUIT({ commit }, { tableData, tableSort }) {
      if (tableSort.fruit) {
        tableData = tableData.reverse();
        tableSort.fruit = false;
      } else {
        sortByFruit(tableData);
        tableSort.fruit = true;
      }
      tableSort.key = false;
      commit("SET_TABLE_TO_STATE", {
        tableData: tableData,
        tableSort: tableSort
      });
    }
  },
  modules: {},
  getters: {
    TABLE(state) {
      return state.tableData;
    },
    TABLESORT(state) {
      return state.tableSort;
    },
    CANVAS(state) {
      return state.canvas;
    }
  }
});
