import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event.emit(`${name}:${command}`, ...args);

  // the command repository:
  // todo: 这里有待优化，emit 并不支持异步
  const loadEcharts = () => execute('loadEcharts');

  return {
    loadEcharts,
  };
};

export default useCommand;
