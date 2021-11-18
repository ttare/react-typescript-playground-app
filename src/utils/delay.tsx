const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(true), ms));

export default delay;
