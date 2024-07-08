import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear the error message when the user starts typing
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await axios.post<{ email: string }>('https://telegram-job-backend.onrender.com/subscribe', { email });
      alert('Please verify your email by clicking on the link sent to your email address.');
      setEmail('');
    } catch (error) {
      setError('Subscription failed. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">Telegram Job Digest</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input
              type="email"
              className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-4 rounded"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-gray-400 text-sm mt-2">
            By subscribing, you agree to receive daily emails from us containing job listings from ReactAdda channel. You can unsubscribe at any time.
          </p>
        </form>
        <div className="max-w-md mx-auto mb-12">
          <h2 className="text-xl font-bold mb-4">Why Subscribe to Telegram Job Digest?</h2>
          <ul className="list-disc list-inside text-gray-400">
            <li className="mb-2">Stay updated: Get the latest job postings delivered to your inbox daily.</li>
            <li className="mb-2">Exclusive access: Receive job opportunities from our ReactAdda channel.</li>
            <li className="mb-2">Save time: Let us do the searching for you and streamline your job hunt process.</li>
          </ul>
        </div>
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-400 text-sm mb-4">
            Jobs sourced from <a href="https://web.telegram.org/k/#@reactjsadda" target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">React Adda channel</a>.
          </p>
          <p className="text-gray-400 text-sm">
            Check out my <a href="https://github.com/strawHat121" target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">GitHub portfolio</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
