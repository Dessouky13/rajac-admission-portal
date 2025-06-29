
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SharedNavigation from "@/components/SharedNavigation";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-cairo flex flex-col items-center justify-center text-center px-4">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-10">
        <SharedNavigation showBackButton={false} showHomeButton={false} />
      </div>

      <h1 className="text-4xl font-bold text-green-800 mb-6">
        School Admission Portal
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Welcome to our admission portal. Please choose your access level below.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={() => navigate("/auth")}
          className="bg-green-700 hover:bg-green-800 px-8 py-3 text-lg"
        >
          Parent Portal
        </Button>
        
        <Button 
          onClick={() => navigate("/admin/login")}
          variant="outline"
          className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 text-lg"
        >
          Admin Panel
        </Button>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>For parents: Sign up or login to submit admission applications</p>
        <p>For staff: Access the admin panel to manage applications</p>
      </div>
    </div>
  );
};

export default Index;
