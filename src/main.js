import App from './App.svelte';

const app = new App({
	// target: document.body
  target: document.getElementById('app'),
  props: {
    appName: 'svelte http example'
  }
});

export default app;