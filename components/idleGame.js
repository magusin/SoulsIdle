// components/IdleGame.js
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001') // Remplacez par l'URL de votre serveur WebSocket en production

export default function IdleGame() {
  const [souls, setSouls] = useState(0)
  const [autoGainActive, setAutoGainActive] = useState(false)

  useEffect(() => {
    // Écouter les mises à jour de l'âme depuis le serveur WebSocket
    socket.on('soul-update', (data) => {
      setSouls(data.souls)
    })

    return () => socket.off('soul-update')
  }, [])

  // Fonction pour gagner des âmes par clic
  const handleGainSoul = async () => {
    const response = await fetch('/api/gain-soul', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user-id' }), // Remplacez par l'ID utilisateur réel
    })
    const data = await response.json()
    setSouls(data.souls)
  }

  // Fonction pour acheter le gain continu
  const handleBuyAutoGain = async () => {
    const response = await fetch('/api/buy-auto-gain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user-id' }), // Remplacez par l'ID utilisateur réel
    })
    const data = await response.json()
    if (data.success) {
      setAutoGainActive(true)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Total Souls: {souls}</h2>
      <button
        onClick={handleGainSoul}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Gain 1 Soul
      </button>
      <button
        onClick={handleBuyAutoGain}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={autoGainActive}
      >
        {autoGainActive ? 'Auto Gain Activated' : 'Buy Auto Gain (1 Soul/sec)'}
      </button>
    </div>
  )
}
