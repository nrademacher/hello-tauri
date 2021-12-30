import React from 'react'
import { Counter } from './Counter'

const App = () => {
  return (
    <div>
        <Counter counterId={1} />
        <Counter counterId={2} />
        <Counter counterId={3} />
    </div>
  )
}

export default App
