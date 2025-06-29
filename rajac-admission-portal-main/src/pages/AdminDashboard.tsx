
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminApplicationCard from "@/components/AdminApplicationCard";

type AdmissionForm = {
  id: string;
  student_first_name: string;
  student_last_name: string;
  father_name: string;
  father_phone: string;
  grade: string;
  status: string;
  test_result: string;
  admin_notes: string;
  created_at: string;
  test_date: string;
  test_time: string;
};

const AdminDashboard: React.FC = () => {
  const { admin, loading: authLoading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<AdmissionForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState<AdmissionForm[]>([]);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate("/admin/login", { replace: true });
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin) {
      fetchApplications();
    }
  }, [admin]);

  useEffect(() => {
    // Filter applications by father name or student name
    if (searchQuery.trim() === "") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app => {
        const fatherName = app.father_name?.toLowerCase() || "";
        const studentFullName = `${app.student_first_name || ""} ${app.student_last_name || ""}`.toLowerCase();
        const query = searchQuery.toLowerCase();
        
        return fatherName.includes(query) || studentFullName.includes(query);
      });
      setFilteredApplications(filtered);
    }
  }, [searchQuery, applications]);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admission_forms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-cairo">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {admin.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleGoBack} variant="outline" size="sm">
                ← Previous Page
              </Button>
              <Button onClick={handleGoHome} variant="outline" size="sm">
                🏠 Home
              </Button>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Applications</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Search by Father's Name or Student Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
            <p className="text-2xl font-bold text-green-600">{applications.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Passed</h3>
            <p className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'Passed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Failed</h3>
            <p className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === 'Failed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status?.includes('Pending') || app.status?.includes('Awaiting')).length}
            </p>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading applications...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchQuery ? "No applications found matching your search." : "No applications found."}
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {filteredApplications.map((application) => (
                <AdminApplicationCard
                  key={application.id}
                  application={application}
                  onUpdate={fetchApplications}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
