import rTracer from "cls-rtracer";

export default rTracer.expressMiddleware({
  useHeader: true,
  headerName: "X-Trace-Header",
  echoHeader: true
});
