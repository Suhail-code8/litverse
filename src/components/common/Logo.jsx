import React from 'react'

function Logo() {
  return (
    <div>
     <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="20" fill="#1e40af" opacity="0.1"/>
    <g transform="translate(15, 12)">
      <rect x="0" y="5" width="20" height="25" fill="#1e40af" rx="2"/>
      <rect x="2" y="3" width="16" height="25" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" rx="1"/>
      <rect x="16" y="0" width="3" height="15" fill="#dc2626"/>
      <path d="M 16 15 L 17.5 12 L 19 15 Z" fill="#dc2626"/>
      <line x1="5" y1="8" x2="15" y2="8" stroke="#9ca3af" strokeWidth="0.5"/>
      <line x1="5" y1="11" x2="13" y2="11" stroke="#9ca3af" strokeWidth="0.5"/>
      <line x1="5" y1="14" x2="16" y2="14" stroke="#9ca3af" strokeWidth="0.5"/>
      <line x1="5" y1="17" x2="14" y2="17" stroke="#9ca3af" strokeWidth="0.5"/>
      <line x1="5" y1="20" x2="12" y2="20" stroke="#9ca3af" strokeWidth="0.5"/>
    </g>
  </svg>
    </div>
  )
}

export default Logo