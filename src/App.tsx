import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { ModalProvider } from "./components/Modals/ModalProvider";
import { Root } from "./Root";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Root />
        <ToastContainer />
      </ModalProvider>
    </Provider>
  );
};

export default App;
