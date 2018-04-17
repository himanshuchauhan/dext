import { combineReducers } from 'redux';
import copiedToClipboard from './copied-to-clipboard';
import detailsPane from './details-pane';
import detailsPaneExpanded from './details-pane-expanded';
import results from './results';
import selectedIndex from './selected-index';
import theme from './theme';

export default combineReducers({
  copiedToClipboard,
  detailsPane,
  detailsPaneExpanded,
  results,
  selectedIndex,
  theme,
});
