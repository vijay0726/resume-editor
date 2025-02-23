export interface ResumeState {
  id: string;
  currentTemplate: string;
  data: {
    basics: {
      name: string;
      title: string;
      contact: {
        email: string;
        phone: string;
        location: string;
      };
      summary: string;
    };
    education: Array<{
      school: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      description?: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      domain?: string;
      startDate: string;
      endDate: string;
      description?: string;
      highlights: string[];
      projects: Array<{
        name: string;
        role?: string;
        description: string;
        highlights: string[];
        technologies?: string[];
      }>;
    }>;
    skills: Array<{
      name: string;
      level: number;
      keywords: string[];
    }>;
  };
} 