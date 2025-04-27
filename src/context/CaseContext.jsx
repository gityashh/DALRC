import { createContext, useState, useEffect, useCallback } from "react"
import { casesApi } from "../services/api"
import { useFlash } from "./useFlash"
import { useAuth } from "./useAuth"

export const CaseContext = createContext()

export const CaseProvider = ({ children }) => {
  const [ownedCases, setOwnedCases] = useState([])
  const [participatingCases, setParticipatingCases] = useState([])
  const [currentCase, setCurrentCase] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { showMessage } = useFlash()
  const { isAuthenticated } = useAuth()

  // Fetch all cases
  const fetchCases = useCallback(async () => {
    if (!isAuthenticated) return

    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.getAllCases()
      setOwnedCases(response.data.ownedCases || [])
      setParticipatingCases(response.data.participatingCases || [])
    } catch (err) {
      console.error("Failed to fetch cases:", err)
      setError("Failed to load cases. Please try again.")
      showMessage("Failed to load cases", "error")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, showMessage])

  // Fetch a specific case
  const fetchCaseById = useCallback(
    async (caseId) => {
      if (!caseId) return

      setLoading(true)
      setError(null)

      try {
        const response = await casesApi.getCaseById(caseId)
        setCurrentCase(response.data.case)
        return response.data.case
      } catch (err) {
        console.error(`Failed to fetch case ${caseId}:`, err)
        const errorMsg = err.response?.data?.message || "Failed to load case details"
        setError(errorMsg)
        showMessage(errorMsg, "error")
        return null
      } finally {
        setLoading(false)
      }
    },
    [showMessage],
  )

  // Create a new case
  const createCase = async (caseData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.createCase(caseData)
      showMessage("Case created successfully", "success")
      await fetchCases() // Refresh the cases list
      return response.data
    } catch (err) {
      console.error("Failed to create case:", err)
      const errorMsg = err.response?.data?.message || "Failed to create case"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Grant access to a participant
  const grantAccess = async (caseId, participant) => {
    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.grantAccess(caseId, participant)
      showMessage("Access granted successfully", "success")

      // Update current case if it's the one being modified
      if (currentCase && currentCase.caseId === caseId) {
        await fetchCaseById(caseId)
      }

      return response.data
    } catch (err) {
      console.error("Failed to grant access:", err)
      const errorMsg = err.response?.data?.message || "Failed to grant access"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Revoke access from a participant
  const revokeAccess = async (caseId, wallet) => {
    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.revokeAccess(caseId, wallet)
      showMessage("Access revoked successfully", "success")

      // Update current case if it's the one being modified
      if (currentCase && currentCase.caseId === caseId) {
        await fetchCaseById(caseId)
      }

      return response.data
    } catch (err) {
      console.error("Failed to revoke access:", err)
      const errorMsg = err.response?.data?.message || "Failed to revoke access"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Change case admin
  const changeAdmin = async (caseId, newAdminWallet) => {
    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.changeAdmin(caseId, newAdminWallet)
      showMessage("Case admin changed successfully", "success")

      // Refresh cases since ownership changed
      await fetchCases()

      // Update current case if it's the one being modified
      if (currentCase && currentCase.caseId === caseId) {
        await fetchCaseById(caseId)
      }

      return response.data
    } catch (err) {
      console.error("Failed to change admin:", err)
      const errorMsg = err.response?.data?.message || "Failed to change case admin"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Close a case
  const closeCase = async (caseId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await casesApi.closeCase(caseId)
      showMessage("Case closed successfully", "success")

      // Refresh cases
      await fetchCases()

      // Update current case if it's the one being modified
      if (currentCase && currentCase.caseId === caseId) {
        await fetchCaseById(caseId)
      }

      return response.data
    } catch (err) {
      console.error("Failed to close case:", err)
      const errorMsg = err.response?.data?.message || "Failed to close case"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Load cases when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCases()
    }
  }, [isAuthenticated, fetchCases])

  // Clear case data on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setOwnedCases([])
      setParticipatingCases([])
      setCurrentCase(null)
    }
  }, [isAuthenticated])

  return (
    <CaseContext.Provider
      value={{
        ownedCases,
        participatingCases,
        currentCase,
        loading,
        error,
        fetchCases,
        fetchCaseById,
        createCase,
        grantAccess,
        revokeAccess,
        changeAdmin,
        closeCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  )
}
