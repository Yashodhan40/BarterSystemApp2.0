import * as React from 'react';
import {View} from 'react-native';
import WelcomeScreen from './screens/SigningIn'
import {createSwitchNavigator,createAppContainer} from 'react-navigation';

export default class App extends React.Component {
  render(){
         return (
          <View>
              <AppContainer/>
          </View>
          );
  }
}

const switchNavigator=createSwitchNavigator({
  Welcome:{screen:WelcomeScreen}
})

const AppContainer = createAppContainer(switchNavigator);