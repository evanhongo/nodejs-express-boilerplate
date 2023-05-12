import rTracer from "cls-rtracer";

export default rTracer.expressMiddleware({
  useHeader: true,
  headerName: "X-Request-Header"
});
