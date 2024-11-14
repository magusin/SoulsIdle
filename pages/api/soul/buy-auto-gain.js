// pages/api/buy-auto-gain.js
import Redis from 'ioredis'
import { Client } from 'pg'

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  password: process.env.UPSTASH_REDIS_PASSWORD,
  tls: {},
})

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
pgClient.connect()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId } = req.body // Utilisez l'ID utilisateur authentifié

  // Mettre à jour le gain continu de l'utilisateur dans PostgreSQL
  const gainContinu = 1 // Valeur initiale ou augmentée à chaque achat
  await pgClient.query('UPDATE users SET gain_continu = gain_continu + $1 WHERE id = $2', [gainContinu, userId])

  // Activer le gain continu en mémoire dans Redis
  await redis.set(`user:${userId}:autoGain`, true)

  res.status(200).json({ success: true, gainContinu })
}
