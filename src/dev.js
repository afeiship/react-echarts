import './dev.scss';
import ReactAntInputClipboard from './main';
import { message } from 'antd';
/*===example start===*/

// install: npm install afeiship/react-ant-input-clipboard --save
// import : import ReactAntInputClipboard from 'react-ant-input-clipboard'

class App extends React.Component{
  state = {

  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  _onCopy = e =>{
    console.log('copyed!', e);
    message.success('copyed');
  };

  render(){
    return (
      <div className="hello-react-ant-input-clipboard">
        <ReactAntInputClipboard onCopy={this._onCopy} ref='rc1' />
        <ReactAntInputClipboard onCopy={this._onCopy} ref='rc2' />
      </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
