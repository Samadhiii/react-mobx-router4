import TodoStore from './todoTest';
import LoginStore from './login';

const AppStore = {
  todo: new TodoStore(),
  login: new LoginStore(),
};
export default AppStore;
