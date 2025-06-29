
import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SharedNavigation from "@/components/SharedNavigation";

const LazyAdmissionForm = React.lazy(() => import("@/components/AdmissionForm"));

const FormPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [hasForm, setHasForm] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", {replace:true});
    }
    if (user) {
      // Check if form already exists
      supabase
        .from("admission_forms")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setHasForm(true);
            navigate("/dashboard", {replace:true});
          } else {
            setHasForm(false);
          }
        });
    }
  }, [user, loading, navigate]);

  if (loading || hasForm === null) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user || hasForm) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-10">
        <SharedNavigation />
      </div>
      
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading form...</div>}>
        <LazyAdmissionForm afterSubmitRedirect="/enter-outlook" />
      </Suspense>
    </div>
  );
};
export default FormPage;
