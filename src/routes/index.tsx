import loadable from '@/utils/loadable'

const ActiveUserView = loadable(() => import(/* webpackChunkName: 'situation' */ '@/views/ActiveUser'))
const AddedUserView = loadable(() => import(/* webpackChunkName: 'situation' */ '@/views/AddedUser'))

const RetentionView = loadable(() => import(/* webpackChunkName: 'situation' */ '@/views/Retention'))

const routes = [
    { path: '/situation/activeUser', exact: false, name: 'ActiveUser', component: ActiveUserView },
    { path: '/situation/addedUser', exact: false, name: 'AddedUser', component: AddedUserView },
    { path: '/analysis/retention', exact: false, name: 'Retention', component: RetentionView },
]

export default routes
