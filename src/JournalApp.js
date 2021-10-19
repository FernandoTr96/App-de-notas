import { AppRouter } from "./Routers/AppRouter";
//implementar nuestra store/redux en toda la app
//mediante react-redux
import {Provider} from 'react-redux';
import { store } from "./store/store";

//la store se manda como prop en el provider
function JournalApp() {

  return (
    <Provider store={store} >
      <AppRouter/>
    </Provider>
  );
}

export default JournalApp;
