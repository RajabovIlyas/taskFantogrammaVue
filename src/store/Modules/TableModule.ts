import { Mutation, State, Getter, Action } from "vuex-simple";
import axios from "axios";

interface ArrayTable {
  key: string;
  fruit: string;
}

interface DataSorted {
  key: boolean;
  fruit: boolean;
}

const sortByKey = (arr: ArrayTable[]) => {
  arr.sort((a, b) =>
    Number(a.key.substr(3)) > Number(b.key.substr(3)) ? 1 : -1
  );
};
const sortByFruit = (arr: ArrayTable[]) => {
  arr.sort((a, b) => (a.fruit > b.fruit ? 1 : -1));
};

export class TableModule {
  @State()
  public tableData: ArrayTable[] = [];

  @State()
  public tableSort!: {
    key: boolean;
    fruit: boolean;
  };

  constructor(
    tableSort = {
      key: false,
      fruit: false
    }
  ) {
    this.tableSort = tableSort;
  }

  @Mutation()
  public SET_TABLE_TO_STATE(
    tableData: ArrayTable[],
    tableSort = { key: false, fruit: false }
  ) {
    this.tableData = tableData;
    this.tableSort = tableSort;
  }

  @Action()
  public async GET_TABLE_FROM_API() {
    return axios("http://fantogramma.org/test.json", { method: "GET" })
      .then(table => {
        const arr: ArrayTable[] = [];
        Object.keys(table.data).forEach(key => {
          arr.push({ key, fruit: table.data[key].fruit });
        });
        sortByKey(arr);
        this.SET_TABLE_TO_STATE(arr, { key: true, fruit: false });
        return table;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  @Action()
  public async SORT_TABLE_ON_KEY(
    tableData: ArrayTable[],
    tableSort: DataSorted
  ) {
    if (tableSort.key) {
      tableData = tableData.reverse();
      tableSort.key = false;
    } else {
      sortByKey(tableData);
      tableSort.key = true;
    }
    tableSort.fruit = false;
    this.SET_TABLE_TO_STATE(tableData, tableSort);
  }

  @Action()
  public async SORT_TABLE_ON_FRUIT(
    tableData: ArrayTable[],
    tableSort: DataSorted
  ) {
    if (tableSort.fruit) {
      tableData = tableData.reverse();
      tableSort.fruit = false;
    } else {
      sortByFruit(tableData);
      tableSort.fruit = true;
    }
    tableSort.key = false;
    this.SET_TABLE_TO_STATE(tableData, tableSort);
  }

  @Getter()
  public get TABLE() {
    return this.tableData;
  }

  @Getter()
  public get TABLESORT() {
    return this.tableSort;
  }
}
