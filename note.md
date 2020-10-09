## redux
- `combineReducers` 合并多个不同 reducer 函数

- ReducersMapObject

- Reducer






## react-redux

- provider
将 state 传递到组件中

- connect
```
connect(stateToProps,dispatchToProps)(TodoList)
```
connect 将组件跟 state 进行连接

第一个参数传递影射关系从state里拿到的值影射成属性

第二个参数派发action行为影射成属性

## connected-react-router

实现了在 `redux` 中操作路由方法，并将路由变化的信息同步在 `redux` 的 `store` 中

- `actions` 封装 `push`、`replace`、`go`等主要方法
- `middleware` 拦截 `actions` 信息，触发封装好的 `action` 方法
- `reducer` 新增 `router` 的 `state` 信息
- `ConnectedRouter` 组件监听路由变化，更新路由信息到 `store`
