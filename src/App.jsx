import { useEffect, useState } from "react"
import Home from "./pages/Home"
import StorePage from "./pages/StorePage"

function App() {
  const [isStore, setIsStore] = useState(
    window.location.hash === "#/store"
  )

  useEffect(() => {
    const syncRoute = () => {
      setIsStore(window.location.hash === "#/store")
    }

    window.addEventListener("hashchange", syncRoute)

    return () => {
      window.removeEventListener("hashchange", syncRoute)
    }
  }, [])

  useEffect(() => {
    if (isStore) {
      window.scrollTo(0, 0)
    }
  }, [isStore])

  return isStore ? <StorePage /> : <Home />
}

export default App
