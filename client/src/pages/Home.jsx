import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/generate');
    };

    return (
        <>
            <section className="bg-[url('/images/background.svg')] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 text-center md:text-left py-12">
                    <div className="w-full md:w-1/2 px-4 sm:px-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                        Ghibli-style AI
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-700 max-w-lg mx-auto md:mx-0">
                        A simple AI tool that use FREE API Endpoints to transform your images into beautiful Ghibli-style artwork in just a few clicks.
                    </p>
                    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 text-lg">
                        Get Started
                    </button>
                    </div>
                    <div className="w-full md:w-1/2 px-4 sm:px-0 flex justify-center">
                    <img 
                        src="/images/totoro.svg" 
                        alt="Ghibli-style AI Illustration" 
                        className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain transition duration-500 hover:scale-105" 
                    />
                    </div>
                </div>
            </section>
            <section>
                <div className="flex flex-wrap justify-center items-center p-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 justify-center items-center">
                        Transform Images in 3 Easy Steps
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8 p-6">
                    {/* Card 1 */}
                    <div className="relative flex flex-col md:flex-row items-start text-gray-700 bg-[#f5f5fe] shadow-md bg-clip-border rounded-xl w-full md:w-[30rem]">
                        <div className="p-7 flex items-center justify-center md:justify-start">
                            <img 
                                src="/images/icon-one.svg" 
                                alt="Icon One" 
                                className="w-18 h-18  mr-4"
                            />
                            <div>
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Step 1
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    Open Ghibli-style Image Generator <a href="#" className='text-blue-600'>[Get Started]</a> <br/> <span className='font-semibold'>(Optional: Enter a prompt to guide the AI style.)</span> 
                                </p>    
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative flex flex-col md:flex-row items-start text-gray-700 bg-[#f5f5fe] shadow-md bg-clip-border rounded-xl w-full md:w-[30rem]">
                        <div className="p-7 flex items-center justify-center md:justify-start">
                            <img 
                                src="/images/icon-two.svg" 
                                alt="Icon One" 
                                className="w-18 h-18  mr-4"
                            />
                            <div>
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Step 2
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                Drag & drop any photo or select from your device to transform into a Ghibli-style artwork.
                                </p>    
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative flex flex-col md:flex-row items-start text-gray-700 bg-[#f5f5fe] shadow-md bg-clip-border rounded-xl w-full md:w-[30rem]">
                        <div className="p-7 flex items-center justify-center md:justify-start">
                            <img 
                                src="/images/icon-three.svg" 
                                alt="Icon One" 
                                className="w-18 h-18  mr-4"
                            />
                            <div>
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Step 3
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    Hit "Generate" and download your Studio Ghibli-inspired artwork!
                                </p>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[url('/images/background-twos.svg')] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                        Generated Examples
                    </h2>

                    <div className="bg-[#f5f5fe] flex flex-col sm:flex-row p-6 gap-2 rounded-lg w-full shadow-xl items-center">
                        <div className="flex-1">
                            <h5 className="mb-2 ml-3 text-xl font-semibold text-blue-gray-900 text-center">Original</h5>
                            <img
                            src="/images/original-chae.jpg"
                            alt="Original image"
                            className="object-contain w-full max-h-[300px] rounded-lg"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x500?text=Original+Image";
                                e.target.className = "object-contain w-full h-full bg-gray-200 p-4 rounded-lg";
                            }}
                            />
                        </div>

                        <div className="flex-1">
                            <h5 className="mb-2 text-xl font-semibold text-blue-gray-900 text-center">Ghibli AI</h5>
                            <img
                            src="/images/ghibli-chae.png"
                            alt="Ghibli-style image"
                            className="object-contain w-full max-h-[300px] rounded-lg"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x500?text=Ghibli+Image";
                                e.target.className = "object-contain w-full h-full bg-gray-200 p-4 rounded-lg";
                            }}
                            />
                        </div>
                    </div>

                    <div className="bg-[#f5f5fe] flex flex-col sm:flex-row p-6 gap-2 rounded-lg w-full shadow-xl">
                        <div className="flex-1">
                            <h5 className="mb-2 ml-3 text-xl font-semibold text-blue-gray-900 text-center">Original</h5>
                            <img
                            src="/images/original-rei.jpg"
                            alt="Original image"
                            className="object-contain w-full max-h-[300px] rounded-lg"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x500?text=Original+Image";
                                e.target.className = "object-contain w-full h-full bg-gray-200 p-4 rounded-lg";
                            }}
                            />
                        </div>

                        <div className="flex-1">
                            <h5 className="mb-2 text-xl font-semibold text-blue-gray-900 text-center">Ghibli AI</h5>
                            <img
                            src="/images/ghibli-rei.png"
                            alt="Ghibli-style image"
                            className="object-contain w-full max-h-[300px] rounded-lg"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/800x500?text=Ghibli+Image";
                                e.target.className = "object-contain w-full h-full bg-gray-200 p-4 rounded-lg";
                            }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[#f5f5fe] py-6 px-4 mt-12">
                <div className="max-w-4xl mx-auto text-center text-gray-600">
                    <p className="text-sm">
                    Created with ❤️ by <span className="font-medium text-gray-800">Michael</span>
                    </p>
                    <p className="text-xs mt-1">
                    © {new Date().getFullYear()} All rights reserved
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Home;