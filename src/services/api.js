import axios from "axios"

const API_URL = "http://localhost:3000/api/v1"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Cases API
export const casesApi = {
  // Get all cases (owned and participating)
  getAllCases: () => api.get("/case"),

  // Get a specific case by ID
  getCaseById: (caseId) => api.get(`/case/${caseId}`),

  // Create a new case
  createCase: (caseData) => api.post("/case/create", caseData),

  // Grant access to a participant
  grantAccess: (caseId, participant) =>
    api.patch("/case/grant-access", {
      caseId,
      participant,
    }),

  // Revoke access from a participant
  revokeAccess: (caseId, wallet) =>
    api.patch("/case/revoke-access", {
      caseId,
      wallet,
    }),

  // Change case admin
  changeAdmin: (caseId, newAdminWallet) =>
    api.patch("/case/change-admin", {
      caseId,
      newAdminWallet,
    }),

  // Close a case
  closeCase: (caseId) => api.patch(`/case/${caseId}/close`),
}

// Case Documents API
export const documentsApi = {
  // Get all documents for a case
  getCaseDocuments: (caseId) => api.get(`/case-doc/${caseId}`),

  // Upload a document
  uploadDocument: (documentData) => api.post("/case-doc/upload", documentData),

  // View a document
  viewDocument: (docId) => api.get(`/case-doc/${docId}/view`),

  // Delete a document
  deleteDocument: (docId) => api.delete(`/case-doc/${docId}`),

  // Get document logs
  getDocumentLogs: (docId) => api.get(`/case-doc/${docId}/logs`),

  // Grant access to a document
  grantDocumentAccess: (docId, targetWallet, permissions) =>
    api.patch(`/case-doc/${docId}/grant-access`, {
      targetWallet,
      permissions,
    }),

  // Revoke access to a document
  revokeDocumentAccess: (docId, targetWallet, permissions) =>
    api.patch(`/case-doc/${docId}/revoke-access`, {
      targetWallet,
      permissions,
    }),
}


// Pinata IPFS API
export const pinataApi = {
  // API key and secret would typically be stored in environment variables
  apiKey: import.meta.env.VITE_PINATA_API_KEY || "your-pinata-api-key",
  apiSecret: import.meta.env.VITE_PINATA_API_SECRET || "your-pinata-api-secret",
  jwt: import.meta.env.VITE_PINATA_JWT || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTQxZGMxMS1mY2ZlLTQyNGMtYjVjNS1jMjZiNDRmYTE5ZmYiLCJlbWFpbCI6InNpZGRoYW50c2FodTIxMTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjAwOWRiZDdmMWFlNjdiMDlmYmFhIiwic2NvcGVkS2V5U2VjcmV0IjoiNjc4NjFiOWQwY2ZhYzMwNDZiNTVhNjg2ZmI1MzYwMGRlNzA0NjA3Y2Y2MDUzZjcwMTM2YTUyZGQ0ZWE5YWJiOSIsImV4cCI6MTc3NzMyNzAyMn0.PSbB-yKm3OXQV6_sirVsCGBQOe3mDrJqAzhT_-yjVpo",

  // Upload file to IPFS
  uploadFile: async (file, metadata = {}) => {
    const formData = new FormData()
    formData.append("file", file)

    // Add metadata
    const pinataMetadata = JSON.stringify({
      name: metadata.name || file.name,
      keyvalues: {
        ...metadata,
      },
    })
    formData.append("pinataMetadata", pinataMetadata)

    // Add options (if needed)
    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    })
    formData.append("pinataOptions", pinataOptions)

    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
          Authorization: `Bearer ${pinataApi.jwt}`,
        },
      })

      return {
        success: true,
        ipfsCid: response.data.IpfsHash,
        pinSize: response.data.PinSize,
        timestamp: response.data.Timestamp,
      }
    } catch (error) {
      console.error("Pinata upload error:", error)
      throw error
    }
  },

  // Get file from IPFS
  getFile: (ipfsCid) => {
    return `https://gateway.pinata.cloud/ipfs/${ipfsCid}`
  },

  // Unpin file from IPFS
  unpinFile: async (ipfsCid) => {
    try {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsCid}`, {
        headers: {
          Authorization: `Bearer ${pinataApi.jwt}`,
        },
      })
      return { success: true }
    } catch (error) {
      console.error("Pinata unpin error:", error)
      throw error
    }
  },
}

export default api
