import { createAppContainer, createStackNavigator } from 'react-navigation';
import HabitsPage from './src/pages/HabitsPage';
import LoginPage from './src/pages/LoginPage';

const AppNavigator = createStackNavigator(
  {
    'Login': {
      screen: LoginPage,
      navigationOptions: {
        header: null,
      }
    },
    'Habits': {
      screen: HabitsPage,
      navigationOptions: {
        title: 'Habits',
        headerTitleStyle: {
          textAlign: 'left',
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      title: 'NoC Generator',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4286f4',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;