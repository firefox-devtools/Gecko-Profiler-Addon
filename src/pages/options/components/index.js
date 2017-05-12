import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Options extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmitHandled = this.onSubmitHandled.bind(this);
    this.state = {
      reportUrl: props.settings.reportUrl,
    };
  }

  onInputChanged(e) {
    e.preventDefault();
    this.setState({ reportUrl: e.target.value });
  }

  onSubmitHandled(e) {
    e.preventDefault();
    const { update } = this.props;
    update({ reportUrl: e.target.value });
    return false;
  }

  render() {
    const { reportUrl } = this.state;
    return (
      <form style={{ padding: '6px' }} onSubmit={this.onSubmitHandled}>
        <label>
          Profile viewer URL:
          <input type="text" value={reportUrl} onChange={this.onInputChanged} />
        </label>
        <button type="submit">Save</button>
        <div id="errors"> </div>
      </form>
    );
  }
}

Options.propTypes = {
  settings: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(state => state, actions)(Options);
