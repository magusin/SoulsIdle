import React from 'react'
import IdleGame from 'C/idleGame'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

const Home = () => {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="mb-10 text-center">
        {session ? (
          <>
          <IdleGame />
          </>
        ) : (
          <>
          <div className="relative md:h-[300px] h-[200px] lg:h-[350px] xl:h-[380px] 2xl:h-[420px] w-full">
            <Image
              src="/images/ethereal-souls.webp"
              alt="Illustration de Ethereal Souls Idle Game"
              layout="fill"
          objectFit="cover"
          
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
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

