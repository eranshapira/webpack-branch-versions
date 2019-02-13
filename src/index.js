console.log(performance.now(), 'Loading App...');
const app = import('./app.js');
export default app;