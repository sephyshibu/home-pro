import React from 'react';


const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0A2342] text-white py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold">
            <img src="logo.png" className="h-6" />
            HomePro
          </div>
          <p className="text-sm">Your Home. Our Priority.</p>
          <div className="text-sm text-gray-300">
            <p>&copy; 2025 HomePro</p>
            <p>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    )
  };
  
  export default Footer;
  