import { Provider } from "react-redux";

import { Header } from "./components/Header";
import { Root } from "./Root";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Root />
    </Provider>
  );
};

export default App;
