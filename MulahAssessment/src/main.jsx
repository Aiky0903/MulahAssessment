import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TableDisplay from './TableDisplay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TableDisplay />
  </StrictMode>,
)
