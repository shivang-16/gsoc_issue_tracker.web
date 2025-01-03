"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconDashboard,
  IconUserBolt,
  IconInfoSquare,
  IconHourglass,
  IconGitBranch,
  IconGitFork,
  IconBrandGithub
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Dashboard } from "./Dashboard";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Organizations",
      href: "/gsoc-orgs",
      icon: (
        <IconGitFork className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Issues",
      href: "/gsoc-issues",
      icon: (
        <IconGitBranch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "h-[100vh] fixed md:static z-50" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Shivang",
                href: "https://github.com/shivang-16",
                icon: (
                  <Image
                    src="https://github.com/shivang-16.png"
                    alt="Shivang"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="https://github.com/shivang-16/Gsoc_issue_tracker.web"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBrandGithub className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Gsoc Issue Tracker
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="https://github.com/shivang-16/Gsoc_issue_tracker.web"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBrandGithub className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
    </Link>
  );
};
