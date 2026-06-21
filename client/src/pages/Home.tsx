import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F0A] flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-[#4ADE80] mb-4">
        FarmLens AI
      </h1>
      <p className="text-xl text-[#F0FDF4] mb-12">
        Crop disease detection powered by AI
      </p>
      
      {/* Placeholder for UploadCard component */}
      <div className="w-full max-w-2xl mb-8">
        {/* UploadCard will go here */}
      </div>
      
      {/* Placeholder for ResultCard component */}
      <div className="w-full max-w-2xl">
        {/* ResultCard will go here */}
      </div>
    </div>
  );
}

export default Home;
