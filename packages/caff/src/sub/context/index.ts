import { AsyncLocalStorage } from "async_hooks";

export const context = new AsyncLocalStorage<any>()

export const reqContext = async () => {
    return context.getStore()?.get("req")
}