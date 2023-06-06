import {useMutation} from "@tanstack/react-query"

export const useMutationHooks = (fnCall) => {
    const mutation = useMutation({
        mutationFn: fnCall
      })
      return mutation
}
