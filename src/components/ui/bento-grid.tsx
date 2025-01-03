import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  header,
  icon,
  url,
  technologies = [],
  twitter_url,
  github_url,
  blog_url,
  website_url,
  email,
}: {
  className?: string;
  id: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: string | React.ReactNode;
  url?: string;
  technologies?: string[];
  twitter_url?: string;
  github_url?: string;
  blog_url?: string;
  website_url?: string;
  email?: string;
}) => {
 
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento overflow-auto hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-transparent dark:border-white/[0.2] bg-white border border-transparent flex flex-col",
        className
      )}
      style={{ minHeight: "12rem" }} // Minimum card height
    >
      <Link href={`/org/${id}`} className="flex-1 flex flex-col justify-between">
        {header}
        <div className="flex items-center justify-between mb-2 mt-2">
          {/* Title */}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 line-clamp-1">
            {title}
          </div>

          {/* Social Links */}
          <div className="flex space-x-2 items-center">
            {twitter_url && (
              <a
                href={twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500"
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-300 hover:text-black"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {blog_url && (
              <a
                href={blog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-300 hover:text-green-500"
              >
                <i className="fas fa-blog"></i>
              </a>
            )}
            {website_url && (
              <a
                href={website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-300 hover:text-purple-500"
              >
              
                <i className="fas fa-globe"></i>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-neutral-600 dark:text-neutral-300 hover:text-red-500"
              >
                <i className="fas fa-envelope"></i>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-4 line-clamp-3">
          {description}
        </div>
     

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.slice(0, 8).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium border rounded-full dark:text-neutral-300 text-neutral-600 border-neutral-400 dark:border-neutral-600"
          >
            {tech}
          </span>
        ))}
      </div>
      </Link>
    </div>
  );
};
