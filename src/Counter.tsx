import { useInvoke } from "./use-invoke";

const defaultArgs = { delta: 1 }

export const Counter = ({ counterId }: { counterId: number }) => {
  const { data: counter, update } = useInvoke(
    counterId,
    'get_counter',
    'increment_counter'
  )

  return (
    <div>
      <button onClick={() => update(defaultArgs)}>increment</button>
      Counter {counterId}: {counter}
    </div>
  )
}

