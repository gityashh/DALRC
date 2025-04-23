import { useContext } from "react"
import { FlashMessageContext } from "./FlashMessageContext"

export const useFlash = () => {
  return useContext(FlashMessageContext)
}
