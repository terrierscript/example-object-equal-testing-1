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

class Dict {
  obj: {}
  constructor() {
    this.obj = {}
  }
  set(obj) {
    this.obj[JSON.stringify(obj)] = obj
  }
  get(obj) {
    if (!this.obj[JSON.stringify(obj)]) {
      throw new Error("")
    }
    return this.obj[JSON.stringify(obj)]
  }
}
const d = new Dict()
d.set({})
d.set({ a: 1 })
console.log(Object.is(d.get({}), d.get({})))
console.log(Object.is(d.get({ a: 1 }), d.get({ a: 1 })))

const SettingContext = createContext<Object>({})

// 更新引き起こし装置
const useIntervalCounter = () => {
  const [_, setCounter] = useState(0)
  useEffect(() => {
    setInterval(() => {
      // setCounterは関数更新であればdepsに入れなくてOK
      setCounter((cnt) => cnt + 1)
    }, 1000)
  }, [])
}

const VerySafeEffectDeps = ({ setting }) => {
  const serialize = JSON.stringify(setting)
  useEffect(() => {
    const deserialize = JSON.parse(serialize)
    console.log(deserialize)
  }, [serialize])
  return <div>foo</div>
}

const Children = () => {
  useIntervalCounter() // 😺こいつがいると更新される。
  // useIntervalCounter() // <- 🐶こうだとされない
  const setting = useContext(SettingContext)
  const ref = useRef(setting)
  // useEffect(() => {
  //   setInterval(() => {
  //     ref.current = Math.random()
  //     console.log("foo")
  //   }, 1000) // ここは毎秒動いてる
  // }, [])
  const target = ref.current //
  useEffect(() => {
    console.log("run", target)
  }, [target])
  return (
    <div>
      <VerySafeEffectDeps setting={{ foo: "a" }}></VerySafeEffectDeps>
      hello
    </div>
  )
}

const App = () => {
  const setting = {
    foo: "baz",
    bee: {}
  }
  return (
    <SettingContext.Provider value={setting}>
      <Children></Children>
    </SettingContext.Provider>
  )
}

render(<App />, document.querySelector("#root"))
