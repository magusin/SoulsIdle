// pages/api/gain-soul.js
import Redis from 'ioredis'

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  password: process.env.UPSTASH_REDIS_PASSWORD,
  tls: {},
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId } = req.body // Utilisez l'ID utilisateur réel dans un contexte d'utilisateur authentifié

  // Récupérer le gain par clic depuis la base de données ou une variable en mémoire
  const gainParClic = 1 // Vous pouvez ajuster ou récupérer cette valeur depuis PostgreSQL
  
  // Ajouter le gain par clic à l'âme du joueur
  const currentSouls = parseInt(await redis.get(`user:${userId}:souls`)) || 0
  const newSouls = currentSouls + gainParClic
  await redis.set(`user:${userId}:souls`, newSouls)

  res.status(200).json({ souls: newSouls })
}
