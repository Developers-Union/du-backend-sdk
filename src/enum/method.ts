enum Method {
  GET,
  HEAD, // 一般情况下不会用到
  POST,
  PUT,
  DELETE,
  CONNECT, // 一般情况下不会用到
  OPTIONS, // 请求一些设置（如跨域）时会用到？？
  TRACE, // 一般情况下不会用到
  PATCH// 一般情况下不会用到
}

export default Method;
