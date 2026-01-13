import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RevampApp from './RevampApp.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RevampApp />
    </StrictMode>,
)
