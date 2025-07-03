// src/pages/super-admin/UserClientSelector.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-6 w-96">
        <h1 className="text-2xl font-semibold">Select Client Type and User Role</h1>

        <div>
          <label htmlFor="clientType" className="block mb-1 font-medium text-left">
            Client Type
          </label>
          <select
            id="clientType"
            value={clientType}
            onChange={(e) => setClientTypeState(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
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
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="qa">QA</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <button
          onClick={handleEnter}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Enter CRM
        </button>
      </div>
    </div>
  );
};

export default UserClientSelector;
