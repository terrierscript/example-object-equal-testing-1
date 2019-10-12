import { createContext, useContext } from "react"

const GlobalSetting = createContext({
  some: {
    nested: {
      setting: "foo"
    }
  }
})

const useFlattenGlobalSetting = () => {
  const setting = useContext(GlobalSetting)
  return {
    setting: setting.some.nested
  }
}
