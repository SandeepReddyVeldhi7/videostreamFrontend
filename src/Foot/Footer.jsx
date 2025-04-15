import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Sindheep Reddy. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/SandeepReddyVeldhi7" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a>
          <a href="https://linkedin.com/in/sandeepreddyveldhi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
          <a href="/contact" className="hover:text-blue-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
