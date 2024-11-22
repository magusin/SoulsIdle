import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

let socket // Déclaration en dehors du composant pour éviter une réinitialisation

export default function IdleGame() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState(null)
  const [monster, setMonster] = useState(null)
  const [damageDisplay, setDamageDisplay] = useState(null) // Affichage des dégâts
  const [monsterHit, setMonsterHit] = useState(false) // État pour l'animation d'impulsion

  useEffect(() => {
    if (!socket) {
      // socket = io('http://localhost:3001')
      // socket = io ('https://soulsidle-websocket.onrender.com/')
      socket = io("https://souls-idle-websocket-i72ve53id-my-team-f29c9693.vercel.app", {
  transports: ["websocket", "polling"], // Use appropriate transport methods
});
      if (session && session.user) {
        socket.emit('join', { sessionId: session.user.sessionId })

        socket.on('stats-update', (data) => {
          setStats(data)
        })

        socket.on('monster-update', (data) => {
          setMonster(data)
        })
      }
    }
  }, [session])

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('Utilisateur déconnecté, fermeture du socket');
      socket.disconnect();
    }
  }, [status]);

  const handleAttack = () => {
    if (!stats) return

    socket.emit('attack-monster')

    // Simuler les dégâts infligés
    const damage = stats.dmgPerClick

    // Afficher les dégâts visuellement au-dessus du monstre
    setDamageDisplay({
      damage,
      id: Date.now(), // Identifiant unique pour les animations
    })

    // Activer l'animation de l'image du monstre
    setMonsterHit(true)
    setTimeout(() => setMonsterHit(false), 100)

    // Réinitialiser l'affichage des dégâts après 1 seconde
    setTimeout(() => setDamageDisplay(null), 1000)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ressources */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Ressources</h2>
            {stats && (
              <ul className="text-lg space-y-2">
                <li>
                  <Image src="/images/ame.webp" alt="Épées" width={24} height={24} />
                   {stats.souls || 0}
                </li>
                <li>Runes : {stats.runes || 0}</li>
              </ul>
            )}
          </div>

          {/* Zone du Monstre */}
          <div className="col-span-1 flex flex-col items-center">
            {monster && (
              <>
                <h1 className="text-2xl font-bold mb-4">{monster.name}</h1>
                <div className="relative w-64 h-64">
                  {/* Effet de dommages */}
                  {damageDisplay && (
                    <div
                      className="absolute text-yellow-400 text-2xl font-bold animate-damage"
                      style={{
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      }}
                    >
                      -{damageDisplay.damage}
                    </div>
                  )}

                  {/* Image du Monstre avec Animation */}
                  <img
                    src={monster.imageUrl}
                    alt={monster.name}
                    className={`w-full h-full object-contain rounded-lg shadow-md cursor-pointer ${
                      monsterHit ? 'animate-hit' : ''
                    }`}
                    onClick={handleAttack}
                  />
                </div>

                {/* Barre de PV */}
                <div className="w-full bg-gray-700 h-4 rounded-full mt-4">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${(monster.currentHp / monster.maxHp) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-2">
                  PV : {monster.currentHp}/{monster.maxHp}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            {stats && (
              <ul className="text-lg space-y-2">
                <li>Dégâts par clic : {stats.dmgPerClick}</li>
                <li>Âmes par 10 secondes : {stats.soulsPer10Second}</li>
                <li>Niveau actuel : {stats.currentMonsterLevel}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
