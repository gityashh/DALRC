import { useContext } from "react"
import { DocumentContext } from "./DocumentContext"

export const useDocument = () => {
  return useContext(DocumentContext)
}
