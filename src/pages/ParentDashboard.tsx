
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import SharedNavigation from "@/components/SharedNavigation";
import { useTranslation } from "react-i18next";

const ParentDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<any | null>(null);
  const [fetching, setFetching] = useState(true);
  const { t } = useTranslation();

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
        <div className="text-xl font-bold text-green-800 mb-4">{t("dashboard.noForm")}</div>
        <Button onClick={()=>navigate("/form")}>{t("dashboard.fillForm")}</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-cairo flex flex-col items-center justify-center text-center px-2">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-10">
        <SharedNavigation />
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-6">{t("dashboard.title")}</h2>
      <div className="bg-[#f6fef9] border border-green-200 shadow-lg rounded-xl p-6 max-w-md w-full flex flex-col gap-4">
        <div className="text-left font-semibold text-green-700">{t("dashboard.studentInfo")}</div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.studentName")}:</span>
          <span>{form.student_first_name} {form.student_last_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.gradeApplied")}:</span>
          <span>{form.grade || t("dashboard.notSpecified")}</span>
        </div>
        
        <div className="text-left font-semibold text-green-700 mt-4">{t("dashboard.testInfo")}</div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.examDate")}:</span>
          <span>{form.test_date ? format(new Date(form.test_date), "PPP") : t("dashboard.notScheduled")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.examTime")}:</span>
          <span>{form.test_time || t("dashboard.notScheduled")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.testResult")}:</span>
          <span className={`font-semibold ${
            form.test_result === 'Pass' ? 'text-green-600' : 
            form.test_result === 'Fail' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {form.test_result || t("dashboard.pending")}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("dashboard.status")}:</span>
          <span className={`font-semibold ${
            form.status === 'Passed' ? 'text-green-600' : 
            form.status === 'Failed' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {form.status || t("dashboard.underReview")}
          </span>
        </div>
        
        {form.admin_notes && (
          <>
            <div className="text-left font-semibold text-green-700 mt-4">{t("dashboard.adminNotes")}</div>
            <div className="text-left bg-gray-50 p-3 rounded border text-sm">
              {form.admin_notes}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 text-gray-700 text-base max-w-md">
        {form.status === 'Passed' ? (
          <div className="text-green-700 font-medium">
            {t("dashboard.passedMessage")}
          </div>
        ) : form.status === 'Failed' ? (
          <div className="text-red-700 font-medium">
            {t("dashboard.failedMessage")}
          </div>
        ) : (
          <div>
            {t("dashboard.reviewMessage")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
