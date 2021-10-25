import { MobxReactContext, RootModel } from "./root.model";
import { SearchPage } from "./search-page/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Root = ({ store }: { store: RootModel }) => (
  <MobxReactContext.Provider value={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <SearchPage />
        </Route>
      </Switch>
    </Router>
  </MobxReactContext.Provider>
);
