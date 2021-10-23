import { createContext, useContext } from "react";
import { SearchRootModel } from "./search-page/input.model";

export class RootModel {
  searchPage = new SearchRootModel();
}

export const MobxReactContext = createContext<RootModel | undefined>(undefined);

export function useStore() {
  return (
    useContext(MobxReactContext) ??
    (() => {
      try {
        (module as any)?.hot?.invalidate();
      } catch {}

      throw new Error("Missing root store provider.");
    })()
  );
}
