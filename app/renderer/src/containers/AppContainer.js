import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import * as actionCreators from '../actions/creators';
import { ThemeSchema } from '../schema';
import {
  IPC_WINDOW_RESIZE,
  IPC_LOAD_THEME,
  IPC_QUERY_COMMAND,
} from '../../../ipc';

const AppContainer = class extends Component {
  static displayName = 'AppContainer';

  state = {
    // the current query value
    q: '',
    // the current theme
    theme: '',
  };

  componentDidMount() {
    ipcRenderer.on(IPC_LOAD_THEME, (evt, theme) => {
      this.setTheme(theme);
    });
  }

  componentDidUpdate() {
    const { theme } = this.props;
    if (theme && theme.window && theme.window.width) {
      let width = theme.window.width;
      if (theme.window.width > 650) {
        width = 650;
      }
      ipcRenderer.send(IPC_WINDOW_RESIZE, { width });
    }
  }

  setTheme = theme => {
    this.setState({ theme });
  };

  updateQuery = q => {
    this.setState({ q });
    ipcRenderer.send(IPC_QUERY_COMMAND, { q });
  };

  resetQuery = () => {
    // @todo - just clearn the results once results actions/reducers are removed
    this.props.resetResults && this.props.resetResults();
  };

  render() {
    return (
      <App
        q={this.state.q}
        theme={this.state.theme}
        onQueryChange={this.updateQuery}
        onQueryReset={this.resetQuery}
      />
    );
  }
};

AppContainer.defaultProps = {
  // redux-actions
  resetResults: () => {},
};

AppContainer.propTypes = {
  // redux-actions
  resetResults: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapDispatchToProps)(AppContainer);
