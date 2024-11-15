import React from 'react'
import IdleGame from 'C/idleGame'
import { useSession } from 'next-auth/react'

const Home = () => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
      <div className="mb-10 text-center">
        {session ? (
          <>
          <h1 className="text-3xl font-bold mb-6">Bienvenue, {session.user.name} !</h1>
          <IdleGame />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Bienvenue sur FromSoftware Idle Game</h1>
            <img
              src="/path/to/your/hero-image.jpg"
              alt="Illustration de FromSoftware Idle Game"
              className="w-full max-w-md mb-6 rounded-lg shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-4">
              Collectez des âmes, améliorez vos armes, et devenez une légende !
            </h2>
            <p className="text-gray-700 mb-6">
              Un clicker game inspiré de l'univers fascinant de FromSoftware.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
