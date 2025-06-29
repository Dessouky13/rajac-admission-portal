
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PayFees = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", {replace:true});
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-white font-cairo flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Final Step</h2>
      <div className="text-lg text-gray-800 mb-6">
        Please pay your admission fees at the school counter. Thank you!
      </div>
      <button
        className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-lg animate-scale-in mt-4"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PayFees;
