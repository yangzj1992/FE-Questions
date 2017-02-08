Q : ajax 状态值

A : 

0: (Uninitialized) the send( ) method has not yet been invoked.
1: (Loading) the send( ) method has been invoked, request in progress.
2: (Loaded) the send( ) method has completed, entire response received.
3: (Interactive) the response is being parsed.
4: (Completed) the response has been parsed, is ready for harvesting.

0 － （未初始化）还没有调用send()方法
1 － （载入）已调用send()方法，正在发送请求
2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
3 － （交互）正在解析响应内容 (已获取 HTTP 头部)
4 － （完成）响应内容解析完成，可以在客户端调用了

