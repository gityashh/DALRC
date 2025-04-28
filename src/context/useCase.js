import { useContext } from "react"
import { CaseContext } from "./CaseContext"

export const useCase = () => {
  return useContext(CaseContext)
}
