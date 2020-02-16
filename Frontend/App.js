/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/Login';
import EnterCharacteristics from './src/EnterCharacteristics';

//const App: () => React$Node = () => {
type Props = {
  changePageHandler: string => any,
};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login',
    };
  }

  changePage = page => {
    this.setState(page);
  };

  renderPage = () => {
    switch (this.state.currentPage) {
      case 'login':
        return <Login changePageHandler={this.changePage} />;
      case 'characteristics':
        return <EnterCharacteristics changePageHandler={this.changePage} />;
    }
  };
  render() {
    return <View>{this.renderPage}</View>;
  }
}

/*const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});*/
