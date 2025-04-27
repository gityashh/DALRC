"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import { documentsApi, pinataApi } from "../services/api"
import { useFlash } from "./useFlash"
import { useAuth } from "./useAuth"

export const DocumentContext = createContext()

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([])
  const [currentDocument, setCurrentDocument] = useState(null)
  const [documentLogs, setDocumentLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { showMessage } = useFlash()
  const { isAuthenticated } = useAuth()

  // Fetch documents for a case
  const fetchCaseDocuments = useCallback(
    async (caseId) => {
      if (!caseId || !isAuthenticated) return

      setLoading(true)
      setError(null)

      try {
        const response = await documentsApi.getCaseDocuments(caseId)
        setDocuments(response.data.documents || [])
        return response.data.documents
      } catch (err) {
        console.error("Failed to fetch documents:", err)
        const errorMsg = err.response?.data?.message || "Failed to load documents"
        setError(errorMsg)
        showMessage(errorMsg, "error")
        return []
      } finally {
        setLoading(false)
      }
    },
    [isAuthenticated, showMessage],
  )

  // Fetch a specific document
  const fetchDocument = useCallback(
    async (docId) => {
      if (!docId) return

      setLoading(true)
      setError(null)

      try {
        const response = await documentsApi.viewDocument(docId)
        setCurrentDocument(response.data.sanitizedDocument)
        return response.data.sanitizedDocument
      } catch (err) {
        console.error(`Failed to fetch document ${docId}:`, err)
        const errorMsg = err.response?.data?.message || "Failed to load document"
        setError(errorMsg)
        showMessage(errorMsg, "error")
        return null
      } finally {
        setLoading(false)
      }
    },
    [showMessage],
  )

  // Fetch document logs
  const fetchDocumentLogs = useCallback(
    async (docId) => {
      if (!docId) return

      setLoading(true)
      setError(null)

      try {
        const response = await documentsApi.getDocumentLogs(docId)
        setDocumentLogs(response.data.logs || [])
        return response.data.logs
      } catch (err) {
        console.error(`Failed to fetch document logs ${docId}:`, err)
        const errorMsg = err.response?.data?.message || "Failed to load document logs"
        setError(errorMsg)
        showMessage(errorMsg, "error")
        return []
      } finally {
        setLoading(false)
      }
    },
    [showMessage],
  )

  // Upload a document to IPFS and then to the backend
  const uploadDocument = async (file, caseId, title, accessControl = []) => {
    setLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Step 1: Upload to IPFS via Pinata
      setUploadProgress(10)
      const metadata = {
        name: title || file.name,
        caseId,
        timestamp: new Date().toISOString(),
      }

      const pinataResponse = await pinataApi.uploadFile(file, metadata)
      setUploadProgress(60)

      if (!pinataResponse.success) {
        throw new Error("Failed to upload to IPFS")
      }

      // Step 2: Save document metadata to backend
      const documentData = {
        caseId,
        title: title || file.name,
        fileType: file.type,
        fileSize: file.size,
        ipfsCid: pinataResponse.ipfsCid,
        encrypted: false, // Set to true if implementing encryption
        accessControl,
      }

      setUploadProgress(80)
      const response = await documentsApi.uploadDocument(documentData)
      setUploadProgress(100)

      showMessage("Document uploaded successfully", "success")
      return response.data
    } catch (err) {
      console.error("Failed to upload document:", err)
      const errorMsg = err.response?.data?.message || "Failed to upload document"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  // Delete a document
  const deleteDocument = async (docId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await documentsApi.deleteDocument(docId)

      // Remove from local state
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== docId))

      showMessage("Document deleted successfully", "success")
      return response.data
    } catch (err) {
      console.error("Failed to delete document:", err)
      const errorMsg = err.response?.data?.message || "Failed to delete document"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Grant access to a document
  const grantDocumentAccess = async (docId, targetWallet, permissions) => {
    setLoading(true)
    setError(null)

    try {
      const response = await documentsApi.grantDocumentAccess(docId, targetWallet, permissions)
      showMessage("Access granted successfully", "success")
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

  // Revoke access to a document
  const revokeDocumentAccess = async (docId, targetWallet, permissions) => {
    setLoading(true)
    setError(null)

    try {
      const response = await documentsApi.revokeDocumentAccess(docId, targetWallet, permissions)
      showMessage("Access revoked successfully", "success")
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

  // Download a document from IPFS
  const downloadDocument = async (ipfsCid, fileName) => {
    setLoading(true)
    setError(null)

    try {
      const url = pinataApi.getFile(ipfsCid)

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fileName || "document")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showMessage("Document download started", "success")
      return { success: true }
    } catch (err) {
      console.error("Failed to download document:", err)
      const errorMsg = "Failed to download document"
      setError(errorMsg)
      showMessage(errorMsg, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Clear document data on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setDocuments([])
      setCurrentDocument(null)
      setDocumentLogs([])
    }
  }, [isAuthenticated])

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        documentLogs,
        loading,
        error,
        uploadProgress,
        fetchCaseDocuments,
        fetchDocument,
        fetchDocumentLogs,
        uploadDocument,
        deleteDocument,
        grantDocumentAccess,
        revokeDocumentAccess,
        downloadDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}
