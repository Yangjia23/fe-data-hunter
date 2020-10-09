import React, {useState, CSSProperties} from 'react';
import classnames from 'classnames'
import {BarsOutlined} from '@ant-design/icons';
import { Transition } from 'react-transition-group';
import './index.less';
import logo from '@/assets/images/logo.png'

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

interface TransitionStyles {
  entering: CSSProperties;//进入时的样式
  entered: CSSProperties;//进入成功时的样式
  exiting: CSSProperties;//退出时的样式
  exited: CSSProperties;//退出成功时的样式
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },//不透明度为1
  entered: { opacity: 1 }, //不透明度为1
  exiting: { opacity: 0 }, //不透明度为0
  exited: { opacity: 0 },  //不透明度为0
}

interface Props {
  currentCategory: string;//当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any;// 改变仓库中的分类
}

function HomeHeader(props: Props){
  let [isMenuVisible, setIsMenuVisible] = useState(false)
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    const target: HTMLUListElement = event.target as HTMLUListElement; // as 类型断言
    let category = target.dataset.category || 'all';
    props.setCurrentCategory(category);
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-wrap">
        <img src={logo}/>
        <BarsOutlined onClick={() => {setIsMenuVisible(!isMenuVisible)}}/>
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
      {(state: keyof TransitionStyles) => (
        <ul className="category"
          onClick={setCurrentCategory}
          style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>All</li>
          <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue</li>
          <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React</li>
        </ul>
      )}
      </Transition>
    </header>
  )
}

export default HomeHeader