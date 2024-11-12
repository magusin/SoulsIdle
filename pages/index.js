import React, { useState, useEffect } from 'react';

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-grow py-10 px-6">
        <div className="mb-10 text-center">
          <img
            src="/path/to/your/hero-image.jpg"
            alt="Illustration de FromSoftware Idle Game"
            className="w-full max-w-md mb-6 rounded-lg shadow-lg"
          />
          <h2 className="text-2xl font-semibold mb-4">Collectez des âmes, améliorez vos armes, et devenez une légende !</h2>
          <p className="text-gray-700 mb-6">Un clicker game inspiré de l'univers fascinant de FromSoftware. Cliquez, farmez, et améliorez votre personnage.</p>
        </div>
      </div>
      </>
  );
};

export default Home;
