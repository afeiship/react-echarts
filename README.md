# react-ant-input-clipboard
> Clipboard for react ant input

## properties:
```javascript

  static propTypes = {
    className: PropTypes.string,
    onCopy: PropTypes.func,
  };

  static defaultProps = {
    onCopy: noop
  };
  
```

## install && import:
```bash
npm install --save afeiship/react-ant-input-clipboard --registry=https://registry.npm.taobao.org
```

```js
import ReactAntInputClipboard from 'react-ant-input-clipboard';
```

```scss
// customize your styles:
$react-ant-input-clipboard-options:(
);

@import 'node_modules/react-ant-input-clipboard/dist/style.scss';
```


## usage:
```jsx

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
        <ReactAntInputClipboard onCopy={this._onCopy} ref='rc' />
      </div>
    );
  }
}

```
