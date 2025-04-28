"use client"

import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { User, Shield, Plus, X, AlertTriangle } from "lucide-react"
import { useCase } from "../../context/useCase"
import LoadingSpinner from "../common/LoadingSpinner"
import ErrorMessage from "../common/ErrorMessage"

const CaseMembers = () => {
  const caseData = useOutletContext()
  const { grantAccess, revokeAccess, changeAdmin, loading, error } = useCase()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(null)

  const [newParticipant, setNewParticipant] = useState({
    wallet: "",
    role: "Civilian",
    permissions: {
      canView: true,
      canUpload: false,
    },
  })

  // Check if current user is admin
  const userWallet = localStorage.getItem("walletAddress")?.toLowerCase()
  const isAdmin = userWallet && caseData.admin?.toLowerCase() === userWallet

  // Group participants by role
  const groupedParticipants =
    caseData.participants?.reduce((acc, participant) => {
      const role = participant.role?.toLowerCase() || "other"
      if (!acc[role]) {
        acc[role] = []
      }
      acc[role].push(participant)
      return acc
    }, {}) || {}

  const handleAddParticipant = async () => {
    try {
      await grantAccess(caseData.caseId, newParticipant)
      setShowAddModal(false)
      // Reset form
      setNewParticipant({
        wallet: "",
        role: "Civilian",
        permissions: {
          canView: true,
          canUpload: false,
        },
      })
    } catch (err) {
      console.error("Failed to add participant:", err)
    }
  }

  const handleRemoveParticipant = async () => {
    if (!selectedParticipant) return

    try {
      await revokeAccess(caseData.caseId, selectedParticipant.wallet)
      setShowRemoveModal(false)
      setSelectedParticipant(null)
    } catch (err) {
      console.error("Failed to remove participant:", err)
    }
  }

  const handleTransferAdmin = async () => {
    if (!selectedParticipant) return

    try {
      await changeAdmin(caseData.caseId, selectedParticipant.wallet)
      setShowTransferModal(false)
      setSelectedParticipant(null)
    } catch (err) {
      console.error("Failed to transfer admin:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Case Participants</h2>
        {isAdmin && !caseData.isClosed && (
          <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="mr-1" />
            Add Participant
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Participants by Role */}
      <div className="space-y-6">
        {Object.entries(groupedParticipants).map(([role, participants]) => (
          <div key={role}>
            <h3 className="text-lg font-medium text-gray-700 mb-3 capitalize">{role}s</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((participant) => (
                <div key={participant.wallet} className="bg-white border rounded-lg p-4 shadow-sm relative">
                  {/* Admin badge */}
                  {participant.wallet.toLowerCase() === caseData.admin?.toLowerCase() && (
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Admin
                    </div>
                  )}

                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 truncate max-w-[180px]">
                        {participant.wallet.substring(0, 6)}...
                        {participant.wallet.substring(participant.wallet.length - 4)}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{participant.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Shield size={14} className="mr-2" />
                    <span>
                      Permissions: {participant.permissions?.canView ? "View" : ""}
                      {participant.permissions?.canView && participant.permissions?.canUpload ? ", " : ""}
                      {participant.permissions?.canUpload ? "Upload" : ""}
                    </span>
                  </div>

                  {/* Action buttons for admin */}
                  {isAdmin && !caseData.isClosed && participant.wallet.toLowerCase() !== userWallet && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => {
                          setSelectedParticipant(participant)
                          setShowRemoveModal(true)
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setSelectedParticipant(participant)
                          setShowTransferModal(true)
                        }}
                      >
                        Make Admin
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* If no participants */}
      {!Object.keys(groupedParticipants).length && !loading && (
        <div className="text-center py-8">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <p className="text-gray-500">No participants have been added to this case yet.</p>
          {isAdmin && !caseData.isClosed && (
            <button
              className="mt-4 flex items-center mx-auto text-blue-600 hover:text-blue-800"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} className="mr-1" />
              Add First Participant
            </button>
          )}
        </div>
      )}

      {/* Add Participant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Participant</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                <input
                  type="text"
                  value={newParticipant.wallet}
                  onChange={(e) => setNewParticipant({ ...newParticipant, wallet: e.target.value })}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newParticipant.role}
                  onChange={(e) => setNewParticipant({ ...newParticipant, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Civilian">Civilian</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Judge">Judge</option>
                  <option value="Police">Police</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="canView"
                      checked={newParticipant.permissions.canView}
                      onChange={(e) =>
                        setNewParticipant({
                          ...newParticipant,
                          permissions: {
                            ...newParticipant.permissions,
                            canView: e.target.checked,
                          },
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="canView" className="ml-2 text-sm text-gray-700">
                      Can View
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="canUpload"
                      checked={newParticipant.permissions.canUpload}
                      onChange={(e) =>
                        setNewParticipant({
                          ...newParticipant,
                          permissions: {
                            ...newParticipant.permissions,
                            canUpload: e.target.checked,
                          },
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="canUpload" className="ml-2 text-sm text-gray-700">
                      Can Upload
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddParticipant}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={loading || !newParticipant.wallet.startsWith("0x")}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Adding...
                  </>
                ) : (
                  "Add Participant"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Participant Modal */}
      {showRemoveModal && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Remove Participant</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to remove this participant from the case?</p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="font-medium">{selectedParticipant.wallet}</p>
              <p className="text-sm text-gray-500">Role: {selectedParticipant.role}</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRemoveModal(false)
                  setSelectedParticipant(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveParticipant}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Removing...
                  </>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Admin Modal */}
      {showTransferModal && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transfer Admin Rights</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to transfer admin rights to this participant? You will no longer be the admin of
              this case.
            </p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="font-medium">{selectedParticipant.wallet}</p>
              <p className="text-sm text-gray-500">Role: {selectedParticipant.role}</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowTransferModal(false)
                  setSelectedParticipant(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleTransferAdmin}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Transferring...
                  </>
                ) : (
                  "Transfer Admin"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseMembers
