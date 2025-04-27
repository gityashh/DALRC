import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { FlashMessageProvider } from "./context/FlashMessageContext"
import { CaseProvider } from "./context/CaseContext"
import { DocumentProvider } from "./context/DocumentContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlashMessageProvider>
      <AuthProvider>
        <CaseProvider>
          <DocumentProvider>
            <App />
          </DocumentProvider>
        </CaseProvider>
      </AuthProvider>
    </FlashMessageProvider>
  </React.StrictMode>,
)
