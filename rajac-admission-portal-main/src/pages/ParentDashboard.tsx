
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import SharedNavigation from "@/components/SharedNavigation";

const ParentDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<any | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", {replace:true});
    }
    if (user) {
      supabase
        .from("admission_forms")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          setForm(data);
          setFetching(false);
        });
    }
  }, [user, loading, navigate]);

  if (loading || fetching) {
    return <div className="flex flex-col items-center justify-center h-screen">Loading...</div>;
  }

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="fixed top-4 right-4 z-10">
          <SharedNavigation />
        </div>
        <div className="text-xl font-bold text-green-800 mb-4">No Admission Form Found</div>
        <Button onClick={()=>navigate("/form")}>Fill Admission Form</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-cairo flex flex-col items-center justify-center text-center px-2">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-10">
        <SharedNavigation />
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-6">Parent Dashboard</h2>
      <div className="bg-[#f6fef9] border border-green-200 shadow-lg rounded-xl p-6 max-w-md w-full flex flex-col gap-4">
        <div className="text-left font-semibold text-green-700">Student Information</div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Student Name:</span>
          <span>{form.student_first_name} {form.student_last_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Grade Applied For:</span>
          <span>{form.grade || "Not specified"}</span>
        </div>
        
        <div className="text-left font-semibold text-green-700 mt-4">Test Information</div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Exam Date:</span>
          <span>{form.test_date ? format(new Date(form.test_date), "PPP") : "Not scheduled yet"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Exam Time:</span>
          <span>{form.test_time || "Not scheduled yet"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Test Result:</span>
          <span className={`font-semibold ${
            form.test_result === 'Pass' ? 'text-green-600' : 
            form.test_result === 'Fail' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {form.test_result || "Pending"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Application Status:</span>
          <span className={`font-semibold ${
            form.status === 'Passed' ? 'text-green-600' : 
            form.status === 'Failed' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {form.status || "Under Review"}
          </span>
        </div>
        
        {form.admin_notes && (
          <>
            <div className="text-left font-semibold text-green-700 mt-4">Admin Notes</div>
            <div className="text-left bg-gray-50 p-3 rounded border text-sm">
              {form.admin_notes}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 text-gray-700 text-base max-w-md">
        {form.status === 'Passed' ? (
          <div className="text-green-700 font-medium">
            Congratulations! Please bring original documents for verification at the school.
          </div>
        ) : form.status === 'Failed' ? (
          <div className="text-red-700 font-medium">
            We appreciate your interest. Please check admin notes for further information.
          </div>
        ) : (
          <div>
            Your application is being reviewed. Please check back for updates on your exam schedule and results.
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
