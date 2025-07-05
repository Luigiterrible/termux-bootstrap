import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setUserRole, setClientType } from "../../utils/storage";

const UserClientSelector = () => {
  const [clientType, setClientTypeState] = useState("law-firm");
  const [userRole, setUserRoleState] = useState("super-admin");
  const navigate = useNavigate();

  const handleEnter = () => {
    setClientType(clientType);
    setUserRole(userRole);
    navigate("/super-admin");
  };

  return (
    <div className="h-screen bg-[#0b0f1a] text-white flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Large icon centered above login box with glow and rotation */}
      <motion.img
        src="/altair-icon.png"
        alt="Altair Logo Centered"
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ opacity: 1, scale: 2.2, rotate: 360 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-48 h-48 mx-auto mb-6 drop-shadow-glow"
        aria-hidden="true"
      />

      {/* Login card */}
      <div className="bg-white/10 p-8 rounded-2xl shadow-xl text-white space-y-6 backdrop-blur-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">
          Select Client Type & User Role
        </h2>

        <div>
          <label htmlFor="clientType" className="block mb-1 font-medium text-left">
            Client Type
          </label>
          <select
            id="clientType"
            value={clientType}
            onChange={(e) => setClientTypeState(e.target.value)}
            className="w-full p-2 bg-white/20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Select client type"
          >
            <option value="law-firm">Law Firm</option>
            <option value="intake-center">Intake Center</option>
            <option value="call-center">Call Center</option>
          </select>
        </div>

        <div>
          <label htmlFor="userRole" className="block mb-1 font-medium text-left">
            User Role
          </label>
          <select
            id="userRole"
            value={userRole}
            onChange={(e) => setUserRoleState(e.target.value)}
            className="w-full p-2 bg-white/20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Select user role"
          >
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="qa">QA</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <button
          onClick={handleEnter}
          className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-300"
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UserClientSelector;
