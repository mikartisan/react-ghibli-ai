import React, { useState, useRef } from 'react';

const Generate = () => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    const file = fileInputRef.current?.files?.[0];
    
    if (!file) {
      setError("Please upload an image file!");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      setResult("Uploading image and generating Ghibli magic... 🪄");

      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);

      // Adjust your API endpoint as needed
      const response = await fetch('http://localhost:3000/generate', { 
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result) {
        setResult(
          <div className="mt-4">
            <img 
              src={data.result} 
              alt="Ghibli Style Result" 
              className="max-w-full rounded-lg shadow-md border border-gray-200"
            />
            {data.author && (
              <p className="mt-3 text-gray-600 italic">Art by: {data.author}</p>
            )}
          </div>
        );
      } else {
        throw new Error(data.error || "Failed to generate image");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <section className="bg-[url('/images/background-twos.svg')] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Ghibli Style Generator</h1>
          
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload your image</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
              />
            </div>

            {/* Preview Image */}
            {previewSrc && (
              <div className="mt-2 overflow-hidden rounded-lg">
                <img 
                  src={previewSrc} 
                  alt="Preview" 
                  className="max-w-full max-h-72 object-contain mx-auto shadow-sm border border-gray-200 rounded-lg"
                />
              </div>
            )}

            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Optional prompt</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Ghibli-style forest with sunset"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !fileInputRef.current?.files?.[0]}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all ${(isGenerating || !fileInputRef.current?.files?.[0]) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? 'Generating...' : 'Create Ghibli Magic'}
            </button>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Result Display */}
            <div className="min-h-24">
              {result && (
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                  {result}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f5f5fe] py-6 px-4">
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

export default Generate;
