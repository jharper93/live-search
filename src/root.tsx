import { MobxReactContext, RootModel } from "./root.model";
import { SearchPage } from "./search-page/searchPageRoot";

export const Root = ({ store }: { store: RootModel }) => (
  <MobxReactContext.Provider value={store}>
    <SearchPage />
  </MobxReactContext.Provider>
);
