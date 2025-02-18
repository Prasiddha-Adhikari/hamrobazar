import React from 'react';
import banner from '../assets/banner.gif'

const Hero = () => {
  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-white text-center mt-5 bg-red-600">
           <img src={banner} alt="Signup Illustration" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
