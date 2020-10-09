import React, { PropsWithChildren, useRef, useEffect } from "react";
import Slider from '@/typings/slider'
import { Carousel } from "antd";
import './index.less'

type Props = PropsWithChildren<{
  children?: any,
  sliders?: Slider[],
  getSliders?: any,
}>;


function HomeSlider(props: Props) {
  useEffect(() => {
    if (props.sliders && props.sliders.length === 0) {
      props.getSliders()
    }
  }, [])
  return (
    <Carousel autoplay effect="scrollx">
      {
        props.sliders && props.sliders.map((slider: Slider, index: number) => {
          return (
            <div key={index}>
              <img src={slider.url} />
            </div>
          )
        })
      }
    </Carousel>
  )
}

export default HomeSlider;