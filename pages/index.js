import React from 'react'
import IdleGame from 'C/idleGame'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Home = () => {
  const { data: session } = useSession()

  return (
    <div className="relative flex flex-col items-center text-white min-h-screen">
      {/* Image de fond floutée */}
      <div className="absolute inset-0 -z-10 md:h-[500px] h-[700px] blur-sm">
        <Image
          src="/images/wall.webp" // Remplacez par votre image de fond
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      {session ? (
        <IdleGame />
      ) : (
        <>
          {/* Conteneur principal */}
          <div className="relative flex flex-col items-center justify-center ">
            {/* Image principale au centre */}
            <div className="relative w-40 h-40 rounded-lg ">
              <Image
                src="/images/souls.webp"
                alt="Ethereal Souls"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                priority
                quality={100}
              />
            </div>

            {/* Conteneur des losanges */}
            <div className="relative mt-12 mb-16 w-full flex flex-col justify-center gap-8 items-center md:flex-row items-center">
              {/* Losange gauche */}
              <div className="md:absolute w-40 h-40 bg-black bg-opacity-80 rotate-45 flex items-center justify-center transform md:-translate-x-[150px] shadow-lg shadow-slate-50">
              <div className="absolute -top-6 text-blue-400 text-3xl -translate-x-[55px] -rotate-45">
                <Image
                  src="/images/battle.webp"
                  alt="Battle"
                  width={100}
                  height={100}
                />
                </div>
                <div className="transform -rotate-45 text-center">
                  <h3 className="text-lg font-bold">Combattez des ennemis</h3>
                  <p className="text-sm">et récoltez leurs âmes</p>
                </div>
              </div>

              {/* Losange droite */}
              <div className="md:absolute m-16 w-40 h-40 bg-black bg-opacity-80 rotate-45 flex items-center justify-center transform md:translate-x-[150px] shadow-lg shadow-slate-50">
              <div className="absolute -top-6 text-blue-400 text-3xl -translate-x-[55px] -rotate-45">
                <Image
                  src="/images/malenia.webp"
                  alt="Battle"
                  width={100}
                  height={100}
                />
                </div>
                <div className="transform -rotate-45 text-center">
                  <h3 className="mt-4 text-lg font-bold">Embauchez des alliés</h3>
                  <p className="text-sm">pour maximiser vos ressources</p>
                </div>
              </div>

              {/* Losange en bas */}
              <div className="md:absolute w-40 h-40 bg-black bg-opacity-80 rotate-45 flex items-center justify-center transform md:translate-y-[150px] shadow-lg shadow-slate-50">
              <div className="absolute -top-6 text-blue-400 text-3xl -translate-x-[55px] -rotate-45">
                <Image
                  src="/images/rebirth.webp"
                  alt="rebirth"
                  width={100}
                  height={100}
                />
                </div>
                <div className="transform -rotate-45 text-center">
                  <h3 className="text-lg font-bold">Renaissez</h3>
                  <p className="text-sm">pour revenir plus puissant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-gray-900 via-transparent to-transparent -z-10">
        
          </div>
          <div className="absolute inset-x-0 bottom-8 flex items-center justify-center text-lg font-semibold text-gray-300">
            Jeux inspiré de l'univers Fromsoft
          </div>        
          </>
      )}
    </div>
  )
}

export default Home
