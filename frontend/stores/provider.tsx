import {Provider} from "react-redux";
import {PropsWithChildren} from "react";
import {store} from "@/stores/index";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
