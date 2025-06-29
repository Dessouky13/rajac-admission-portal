import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AdmissionFormProps {
  afterSubmitRedirect?: string;
}
const AdmissionForm: React.FC<AdmissionFormProps> = ({ afterSubmitRedirect = "/enter-outlook" }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Minimal local state for demonstration—replace with useForm later if needed
  const [form, setForm] = React.useState({
    studentFirstName: "",
    studentLastName: "",
    studentNameAr: "",
    dob: "",
    religion: "",
    citizenship: "",
    secondLang: "",
    address: "",
    gender: "",
    school: "",
    grade: "",
    prevSchool: "",
    scholarNotes: "",
    fatherName: "",
    fatherDob: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherDegree: "",
    fatherWork: "",
    fatherBusiness: "",
    motherName: "",
    motherDob: "",
    motherPhone: "",
    motherEmail: "",
    motherDegree: "",
    motherWork: "",
    motherBusiness: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!user) {
      setError("User not found.");
      setSubmitting(false);
      return;
    }

    // Prevent double form submission
    const { data: existingForm } = await supabase
      .from("admission_forms")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingForm) {
      setError("You have already filled the admission form.");
      setSubmitting(false);
      return;
    }

    const insertRes = await supabase
      .from("admission_forms")
      .insert([
        {
          user_id: user.id,
          student_first_name: form.studentFirstName,
          student_last_name: form.studentLastName,
          student_name_ar: form.studentNameAr,
          dob: form.dob,
          religion: form.religion,
          citizenship: form.citizenship,
          second_lang: form.secondLang,
          address: form.address,
          gender: form.gender,
          school: form.school,
          grade: form.grade,
          prev_school: form.prevSchool,
          scholar_notes: form.scholarNotes,
          father_name: form.fatherName,
          father_dob: form.fatherDob,
          father_phone: form.fatherPhone,
          father_email: form.fatherEmail,
          father_degree: form.fatherDegree,
          father_work: form.fatherWork,
          father_business: form.fatherBusiness,
          mother_name: form.motherName,
          mother_dob: form.motherDob,
          mother_phone: form.motherPhone,
          mother_email: form.motherEmail,
          mother_degree: form.motherDegree,
          mother_work: form.motherWork,
          mother_business: form.motherBusiness,
        }
      ])
      .select();

    if (insertRes.error) {
      setError("Could not submit form. Please try again.");
      setSubmitting(false);
      return;
    }

    alert(t("form.thankYou"));
    setTimeout(() => navigate(afterSubmitRedirect, { replace:true }), 1000);
  };

  // Use reversed flex direction if Arabic for RTL!
  const rtl = i18n.language === "ar";
  const direction = rtl ? "rtl" : "ltr";
  const align = rtl ? "items-end" : "items-start";
  const labelAlign = rtl ? "text-right" : "text-left";

  return (
    <form
      dir={direction}
      onSubmit={handleSubmit}
      className={`bg-[#f6fef9] shadow-lg rounded-xl p-6 max-w-2xl mx-auto mt-6 w-full flex flex-col gap-6 border border-green-200`}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
        {t("form.title")}
      </h2>
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
      {/* 👦 Student Info */}
      <div>
        <h3 className="font-semibold text-green-700 mb-2">{t("form.student.section")}</h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${align}`}>
          <div>
            <label className={labelAlign}>{t("form.student.firstName")}</label>
            <Input name="studentFirstName" value={form.studentFirstName} onChange={handleChange} required placeholder={t("form.student.firstNamePh")} autoComplete="off" />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.lastName")}</label>
            <Input name="studentLastName" value={form.studentLastName} onChange={handleChange} required placeholder={t("form.student.lastNamePh")} autoComplete="off" />
          </div>
          <div className="md:col-span-2">
            <label className={labelAlign}>{t("form.student.nameAr")}</label>
            <Input name="studentNameAr" value={form.studentNameAr} onChange={handleChange} required placeholder={t("form.student.nameArPh")} autoComplete="off" />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.dob")}</label>
            <Input name="dob" type="date" value={form.dob} onChange={handleChange} required />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.religion")}</label>
            <Input name="religion" value={form.religion} onChange={handleChange} required placeholder={t("form.student.religionPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.citizenship")}</label>
            <Input name="citizenship" value={form.citizenship} onChange={handleChange} required placeholder={t("form.student.citizenshipPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.secondLang")}</label>
            <Input name="secondLang" value={form.secondLang} onChange={handleChange} required placeholder={t("form.student.secondLangPh")} />
          </div>
          <div className="md:col-span-2">
            <label className={labelAlign}>{t("form.student.address")}</label>
            <Input name="address" value={form.address} onChange={handleChange} required placeholder={t("form.student.addressPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.student.gender")}</label>
            <Input name="gender" value={form.gender} onChange={handleChange} required placeholder={t("form.student.genderPh")} />
          </div>
        </div>
      </div>

      {/* 📚 Scholar Info */}
      <div>
        <h3 className="font-semibold text-green-700 mb-2">{t("form.scholar.section")}</h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${align}`}>
          <div>
            <label className={labelAlign}>{t("form.scholar.school")}</label>
            <Input name="school" value={form.school} onChange={handleChange} required placeholder={t("form.scholar.schoolPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.scholar.grade")}</label>
            <Input name="grade" value={form.grade} onChange={handleChange} required placeholder={t("form.scholar.gradePh")} />
          </div>
          <div className="md:col-span-2">
            <label className={labelAlign}>{t("form.scholar.prevSchool")}</label>
            <Input name="prevSchool" value={form.prevSchool} onChange={handleChange} placeholder={t("form.scholar.prevSchoolPh")} />
          </div>
          <div className="md:col-span-2">
            <label className={labelAlign}>{t("form.scholar.notes")}</label>
            <Textarea name="scholarNotes" value={form.scholarNotes} onChange={handleChange} placeholder={t("form.scholar.notesPh")} rows={2} />
          </div>
        </div>
      </div>

      {/* 👨 Father Info */}
      <div>
        <h3 className="font-semibold text-green-700 mb-2">{t("form.father.section")}</h3>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${align}`}>
          <div>
            <label className={labelAlign}>{t("form.father.name")}</label>
            <Input name="fatherName" value={form.fatherName} onChange={handleChange} required placeholder={t("form.father.namePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.father.dob")}</label>
            <Input name="fatherDob" type="date" value={form.fatherDob} onChange={handleChange} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.father.phone")}</label>
            <Input name="fatherPhone" value={form.fatherPhone} onChange={handleChange} required placeholder={t("form.father.phonePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.father.email")}</label>
            <Input name="fatherEmail" value={form.fatherEmail} onChange={handleChange} placeholder={t("form.father.emailPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.father.degree")}</label>
            <Input name="fatherDegree" value={form.fatherDegree} onChange={handleChange} placeholder={t("form.father.degreePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.father.work")}</label>
            <Input name="fatherWork" value={form.fatherWork} onChange={handleChange} placeholder={t("form.father.workPh")} />
          </div>
          <div className="md:col-span-3">
            <label className={labelAlign}>{t("form.father.business")}</label>
            <Input name="fatherBusiness" value={form.fatherBusiness} onChange={handleChange} placeholder={t("form.father.businessPh")} />
          </div>
        </div>
      </div>

      {/* 👩 Mother Info */}
      <div>
        <h3 className="font-semibold text-green-700 mb-2">{t("form.mother.section")}</h3>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${align}`}>
          <div>
            <label className={labelAlign}>{t("form.mother.name")}</label>
            <Input name="motherName" value={form.motherName} onChange={handleChange} required placeholder={t("form.mother.namePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.mother.dob")}</label>
            <Input name="motherDob" type="date" value={form.motherDob} onChange={handleChange} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.mother.phone")}</label>
            <Input name="motherPhone" value={form.motherPhone} onChange={handleChange} required placeholder={t("form.mother.phonePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.mother.email")}</label>
            <Input name="motherEmail" value={form.motherEmail} onChange={handleChange} placeholder={t("form.mother.emailPh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.mother.degree")}</label>
            <Input name="motherDegree" value={form.motherDegree} onChange={handleChange} placeholder={t("form.mother.degreePh")} />
          </div>
          <div>
            <label className={labelAlign}>{t("form.mother.work")}</label>
            <Input name="motherWork" value={form.motherWork} onChange={handleChange} placeholder={t("form.mother.workPh")} />
          </div>
          <div className="md:col-span-3">
            <label className={labelAlign}>{t("form.mother.business")}</label>
            <Input name="motherBusiness" value={form.motherBusiness} onChange={handleChange} placeholder={t("form.mother.businessPh")} />
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button disabled={submitting} className="w-40 h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-bold text-lg">
          {submitting ? t("form.saving") || "Saving..." : t("form.submit")}
        </Button>
      </div>
    </form>
  );
};

export default AdmissionForm;
