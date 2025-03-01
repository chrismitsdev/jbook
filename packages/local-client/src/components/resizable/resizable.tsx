import './resizable.css'
import * as React from 'react'
import {
  ResizableBox,
  type ResizableBoxProps,
  type ResizeCallbackData
} from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth)
  const [width, setWidth] = React.useState(window.innerWidth * 0.75)

  React.useEffect(
    function () {
      let timer: NodeJS.Timeout

      function listener() {
        if (timer) {
          clearTimeout(timer)
        }

        timer = setTimeout(function () {
          setInnerHeight(window.innerHeight)
          setInnerWidth(window.innerWidth)

          if (window.innerWidth * 0.75 < width) {
            setWidth(window.innerWidth * 0.75)
          }
        }, 100)
      }

      window.addEventListener('resize', listener)
      return function () {
        window.removeEventListener('resize', listener)
      }
    },
    [width]
  )

  let resizableProps: ResizableBoxProps

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_: React.SyntheticEvent, data: ResizeCallbackData) => {
        setWidth(data.size.width)
      }
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 48],
      maxConstraints: [Infinity, innerHeight * 0.9]
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

Resizable.displayName = 'Resizable'

export default Resizable
