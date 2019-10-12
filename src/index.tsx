// import Tuple from "sutor-tuple"
import { List } from "immutable"
import React, {
  useContext,
  useEffect,
  createContext,
  useState,
  useRef,
  useMemo,
  useReducer
} from "react"
import { render } from "react-dom"

const SettingContext = createContext({
  foo: {
    baz: {
      bar: "boo",
      bee: "boo"
    }
  },
  zoo: "dee"
})

const useFlattenSetting = () => {
  const setting = useContext(SettingContext)
  return {
    bar: setting.foo.baz.bar,
    zoo: setting.zoo
  }
}

const cacheReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        bar: action.value.foo.baz.bar,
        zoo: action.value.zoo
      }
  }
  return state
}
const useFlattenSettingWithReducer = () => {
  const setting = useContext(SettingContext)
  const [reducer, dispatch] = useReducer(cacheReducer, {})
  useEffect(() => {
    dispatch({
      type: "UPDATE",
      value: setting
    })
  }, [setting])
  return reducer
}

const Children = () => {
  const setting = useFlattenSettingWithReducer()
  useEffect(() => {
    console.log(setting)
  }, [setting])
  return (
    <div>
      <div>{JSON.stringify(setting)}</div>
    </div>
  )
}

const generateVal = {
  foo: "zoo"
}
const App = () => {
  const [val, setCounter] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setCounter((c) => c + 1)
      // console.log(v)
    }, 1000)
  }, [])

  return (
    <div>
      <Children></Children>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
