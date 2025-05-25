import { Provider } from "react-redux";
import store from "./store";
import RootPage from "./pages/RootPage";

function App() {
  return (
    <Provider store={store}>
      <RootPage />
    </Provider>
  );
}

export default App;
