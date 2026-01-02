'use client';
import { useState } from "react";

const LoginModal = ({ showExistingCustomerModal, setShowExistingCustomerModal }) => {
  const [loading, setLoading] = useState(false);

  if (!showExistingCustomerModal) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with Blur Effect */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setShowExistingCustomerModal(false)}
      />

      {/* Modal box */}
      <div className="relative z-50 w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all">
        {/* Close Button */}
        <button 
          onClick={() => setShowExistingCustomerModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
          <p className="text-gray-500 text-sm">Please enter your details to login</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-[#ED1C24] text-white font-semibold hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          
          <button
            onClick={() => setShowExistingCustomerModal(false)}
            className="w-full px-4 py-2 rounded-lg text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;