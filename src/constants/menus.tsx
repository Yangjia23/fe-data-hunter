import { ReactComponent as SituationIcon } from '@/assets/images/menu_situation_icon.svg'
import { ReactComponent as AnalysisIcon } from '@/assets/images/menu_analysis_icon.svg'

const menus = [
  {
    title: '整体状况',
    path: '/situation',
    icon: SituationIcon,
    auth: [],
    children: [
      {
        title: '活跃用户',
        path: '/situation/activeUser',
        icon: '',
        auth: [],
        children: []
      },
      {
        title: '新增用户',
        path: '/situation/addedUser',
        icon: '',
        auth: [],
        children: []
      },
    ]
  },
  {
    title: '用户分析',
    path: '/analysis',
    icon: AnalysisIcon,
    auth: [],
    children: [
      {
        title: '留存分析',
        path: '/analysis/retention',
        icon: '',
        auth: [],
        children: []
      }
    ]
  },
]

export default menus