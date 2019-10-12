// import Tuple from "sutor-tuple"
import { List } from "immutable"
import React, {
  useContext,
  useEffect,
  createContext,
  useState,
  useRef
} from "react"
import { render } from "react-dom"
import { createSelector } from "reselect"

class Dict {
  cache = {}
  fetch(obj) {
    const key = JSON.stringify(obj)
    if (!this.cache[key]) {
      this.cache[key] = JSON.parse(key)
    }
    return this.cache[key]
  }
}
const DictContext = createContext(new Dict())
const SettingContext = createContext({})
// const dict = {}

const useIntervalCounter = () => {
  const [_, setCounter] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setCounter((cnt) => cnt + 1)
      console.log("timer")
    }, 1000)
  }, [])
}

const dict = new Dict()

// あくまでもObjectの同一性なので↓だと内容が変わっていても変更されない（逆に、値が一緒なのに、別なオブジェクトが来れば別物扱い）
const useUnsafeObjectRef = () => {
  const setting = useContext(SettingContext)
  const ref = useRef({})
  ref.current = setting
  return ref.current
}

const useEqualObject = (obj) => {
  const selector = createSelector(
    (s) => s,
    obj
  )
  // const obj = useContext(ObjectContex) // If want use context
  const cache = useRef({})
  const key = JSON.stringify(obj)
  if (!cache.current[key]) {
    cache.current[key] = JSON.parse(key)
  }
  return cache.current[key]
}

const Children = ({ obj }) => {
  const safed = useEqualObject(obj)
  const unsafe = useUnsafeObjectRef(obj)
  useEffect(() => {
    console.log("safe", obj.v.x)
  }, [safed])
  useEffect(() => {
    console.log("unsafe", obj.v.x)
  }, [unsafe])
  return <div>hello</div>
}

const generateVal = () => {
  const rand = Math.ceil((Math.random() * 10) % 2)
  return {
    v: {
      x: rand
    }
  }
}
const App = () => {
  const [val, setVal] = useState(generateVal())
  useEffect(() => {
    setInterval(() => {
      const v = generateVal()
      setVal(v)
      console.log(v)
    }, 1000)
  }, [])

  return (
    <div>
      <Children obj={val}></Children>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
