import { apiRequest, API_ENDPOINTS } from "@/config/api";
import {
  EducationClass,
  EducationCategory,
  EducationEnrollment,
  PaginatedResponse,
} from "@/types";

// Get all education classes
export const getEducationClasses = async (
  page: number = 1,
  perPage: number = 12,
  category?: string,
  level?: string,
  search?: string,
): Promise<PaginatedResponse<EducationClass>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  if (category) {
    params.append("category", category);
  }

  if (level) {
    params.append("level", level);
  }

  if (search) {
    params.append("search", search);
  }

  return apiRequest<PaginatedResponse<EducationClass>>(
    `${API_ENDPOINTS.EDUCATION_CLASSES}?${params.toString()}`,
  );
};

// Get education class by ID
export const getEducationClassById = async (
  id: number,
): Promise<EducationClass> => {
  return apiRequest<EducationClass>(API_ENDPOINTS.EDUCATION_CLASSES_BY_ID(id));
};

// Get education categories
export const getEducationCategories = async (): Promise<
  EducationCategory[]
> => {
  return apiRequest<EducationCategory[]>(API_ENDPOINTS.EDUCATION_CATEGORIES);
};

// Enroll in a class
export const enrollClass = async (
  classId: number,
): Promise<EducationEnrollment> => {
  return apiRequest<EducationEnrollment>(API_ENDPOINTS.EDUCATION_ENROLL, {
    method: "POST",
    body: JSON.stringify({ classId }),
  });
};

// Get user's enrollments
export const getUserEnrollments = async (): Promise<EducationEnrollment[]> => {
  return apiRequest<EducationEnrollment[]>("/education/enrollments");
};

// Search education classes
export const searchEducationClasses = async (
  query: string,
  page: number = 1,
): Promise<PaginatedResponse<EducationClass>> => {
  return getEducationClasses(page, 12, undefined, undefined, query);
};
