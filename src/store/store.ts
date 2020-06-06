import { Module, State } from "vuex-simple";
import { TableModule } from "./Modules/TableModule";

export class MyStore {
  @Module()
  public tableMod = new TableModule();

  @State()
  public version = "2.2.0";
}
