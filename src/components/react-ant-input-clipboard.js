import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { Input } from 'antd';
import ClipboardJS from 'clipboard';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    onCopy: PropTypes.func,
  };

  static defaultProps = {
    onCopy: noop
  };
  /*===properties end===*/

  get addonAfter() {
    return (
      <button ref={(btn) => { this.btn = btn }} className="react-ant-input-clipboard-clip-btn">
        <img width="12" src={require('assets/clippy.svg')} />
      </button>
    )
  }

  componentDidMount() {
    this.createInstance();
  }

  componentWillUnmount() {
    this._clip.destroy();
    this._clip = null;
  }

  createInstance() {
    const { onCopy } = this.props;
    this._clip = new ClipboardJS(this.btn, {
      text: () => {
        return this.root.input.value;
      }
    });
    this._clip.on('success', (inEvent) => {
      onCopy(inEvent, this._clip);
    });
  }

  render() {
    const { className, onCopy, ...props } = this.props;
    return (
      <Input
        ref={(root) => this.root = root}
        addonAfter={this.addonAfter}
        className={classNames('react-ant-input-clipboard', className)}
        {...props}
      />
    );
  }
}
