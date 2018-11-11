import _Vue from 'vue';

export function ConsolePlugin(Vue: typeof _Vue, options?: any): void {
  const styles = [
    'background: orange',
    'color: white',
    'display: block',
    'text-align: center',
  ].join(';');

  Vue.prototype.$_console = () => console.log('%c Soy un triste plugin ', styles);
}
