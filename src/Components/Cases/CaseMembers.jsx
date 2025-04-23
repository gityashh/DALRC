import { useOutletContext } from "react-router-dom"
import { User, Mail, Phone, Plus } from "lucide-react"

const CaseMembers = () => {
  const caseData = useOutletContext()

  // Group participants by role
  const groupedParticipants = caseData.participants.reduce((acc, participant) => {
    const role = participant.role.toLowerCase()
    if (!acc[role]) {
      acc[role] = []
    }
    acc[role].push(participant)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Case Participants</h2>
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          <Plus size={16} className="mr-1" />
          Add Participant
        </button>
      </div>

      {/* Participants by Role */}
      <div className="space-y-6">
        {Object.entries(groupedParticipants).map(([role, participants]) => (
          <div key={role}>
            <h3 className="text-lg font-medium text-gray-700 mb-3 capitalize">{role}s</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((participant) => (
                <div key={participant.id} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{participant.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{participant.role}</p>
                    </div>
                  </div>

                  {participant.contact && (
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <Mail size={14} className="mr-2" />
                      <span>{participant.contact}</span>
                    </div>
                  )}

                  {participant.phone && (
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Phone size={14} className="mr-2" />
                      <span>{participant.phone}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* If no participants */}
      {caseData.participants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No participants have been added to this case yet.</p>
          <button className="mt-4 flex items-center mx-auto text-blue-600 hover:text-blue-800">
            <Plus size={16} className="mr-1" />
            Add First Participant
          </button>
        </div>
      )}
    </div>
  )
}

export default CaseMembers
