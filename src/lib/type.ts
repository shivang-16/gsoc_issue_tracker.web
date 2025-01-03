type Project = {
    title: string;
    short_description: string;
    description: string;
    student_name: string;
    code_url: string | null;
    project_url: string;
    proposal_id?: string; // Optional, present in some cases
  };
  
  type GSoCYear = {
    projects_url: string;
    num_projects: number;
    projects: Project[];
  };
  
  type GSoCYears = {
    [year: string]: GSoCYear;
  };
  
  export type Organisation = {
    _id: string;
    organisation: string;
    github: string;
    gsoc_years: GSoCYears;
    blog_url: string;
    category: string;
    contact_email: string;
    description: string;
    image_background_color: string;
    image_url: string;
    irc_channel: string;
    mailing_list: string;
    technologies: string[];
    topics: string[];
    twitter_url: string;
    url: string;
  };
  