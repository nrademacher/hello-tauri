import { invoke } from '@tauri-apps/api/tauri'
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'

const App = () => {
    const [counter, setCounter] = useState<number>(-1)

    useEffect(() => {
        invoke('increment_counter', { delta: 0 }).then((result) => setCounter(result as number)).catch(console.error)
    }, [setCounter])

    const increment = useCallback(async () => {
        const result = await invoke('increment_counter', { delta: 1 }) as number
        setCounter(result)
    }, [setCounter])

  return (
    <div>
      <button onClick={increment}>Increment</button> {counter}
    </div>
  )
}

export default App
