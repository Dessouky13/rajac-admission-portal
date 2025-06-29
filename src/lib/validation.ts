import { z } from "zod";

// Common validation patterns
const phoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
const englishNameRegex = /^[a-zA-Z\s]+$/;

// Student information validation
export const studentSchema = z.object({
  studentFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(englishNameRegex, "First name must contain only English letters"),
  studentLastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(englishNameRegex, "Last name must contain only English letters"),
  studentNameAr: z
    .string()
    .min(2, "Arabic name must be at least 2 characters")
    .max(100, "Arabic name must be less than 100 characters")
    .regex(arabicNameRegex, "Arabic name must contain only Arabic letters"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 3 && age <= 18;
    }, "Student must be between 3 and 18 years old"),
  religion: z
    .string()
    .min(2, "Religion must be at least 2 characters")
    .max(50, "Religion must be less than 50 characters"),
  citizenship: z
    .string()
    .min(2, "Citizenship must be at least 2 characters")
    .max(50, "Citizenship must be less than 50 characters"),
  secondLang: z
    .string()
    .min(2, "Second language must be at least 2 characters")
    .max(50, "Second language must be less than 50 characters"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select Male or Female" }),
  }),
});

// Scholar information validation
export const scholarSchema = z.object({
  school: z
    .string()
    .min(2, "School name must be at least 2 characters")
    .max(100, "School name must be less than 100 characters"),
  grade: z
    .string()
    .min(2, "Grade must be at least 2 characters")
    .max(50, "Grade must be less than 50 characters"),
  prevSchool: z
    .string()
    .max(100, "Previous school must be less than 100 characters")
    .optional(),
  scholarNotes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

// Parent information validation
export const parentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 100;
    }, "Parent must be between 18 and 100 years old"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid Egyptian phone number"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .regex(emailRegex, "Please enter a valid email address"),
  degree: z
    .string()
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be less than 100 characters"),
  work: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(100, "Occupation must be less than 100 characters"),
  business: z
    .string()
    .min(5, "Business address must be at least 5 characters")
    .max(200, "Business address must be less than 200 characters"),
});

// Complete admission form validation
export const admissionFormSchema = z.object({
  // Student information
  ...studentSchema.shape,
  // Scholar information
  ...scholarSchema.shape,
  // Father information
  fatherName: parentSchema.shape.name,
  fatherDob: parentSchema.shape.dob,
  fatherPhone: parentSchema.shape.phone,
  fatherEmail: parentSchema.shape.email,
  fatherDegree: parentSchema.shape.degree,
  fatherWork: parentSchema.shape.work,
  fatherBusiness: parentSchema.shape.business,
  // Mother information
  motherName: parentSchema.shape.name,
  motherDob: parentSchema.shape.dob,
  motherPhone: parentSchema.shape.phone,
  motherEmail: parentSchema.shape.email,
  motherDegree: parentSchema.shape.degree,
  motherWork: parentSchema.shape.work,
  motherBusiness: parentSchema.shape.business,
});

// Type inference
export type AdmissionFormData = z.infer<typeof admissionFormSchema>;
export type StudentData = z.infer<typeof studentSchema>;
export type ScholarData = z.infer<typeof scholarSchema>;
export type ParentData = z.infer<typeof parentSchema>;

// Validation helper function
export const validateForm = (data: unknown): { success: true; data: AdmissionFormData } | { success: false; errors: string[] } => {
  try {
    const validatedData = admissionFormSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Unknown validation error'] };
  }
}; 