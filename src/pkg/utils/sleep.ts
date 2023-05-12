const sleep = (t: number) =>
  new Promise((resolve: (v: unknown) => void) => {
    setTimeout(() => {
      resolve(true);
    }, t);
  });

export default sleep;
