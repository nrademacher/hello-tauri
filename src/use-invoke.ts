import { invoke } from "@tauri-apps/api";
import useSWR from "swr";
import { useCallback } from "react";

const invokeFetcher = async <TArgs extends Record<string, any>, TResult>(
    command: string,
    id: number,
    args: TArgs
    ): Promise<TResult> => invoke<TResult>(command, { id, ...args })

export const useInvoke = <TArgs extends Record<string, any>, TResult>(
    id: number,
    getCommand: string,
    setCommand: string
) => {
    // run the invoke command
    const { data, error, mutate } = useSWR<TResult>(
        [getCommand, id, null],
        invokeFetcher
    )
    
    // create an update function
    const update = useCallback(
        async (newData: TResult) => {
            mutate(await invoke(setCommand, { id, ...newData }), false)
        },
        /* assumes that get command also returns updated data; if not use something like
        ```
        async (newData: TResult) => {
            await invoke(setCommand, { ...args })
            mutate()
        },
        ```
        */
        [mutate, id, setCommand]
    )

    return {
        data,
        fetching: !data,
        error,
        update
    }
}
