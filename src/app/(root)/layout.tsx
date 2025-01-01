import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gsoc Issue Tracker",
  description:
    "Track your GSoC issues in one place and get notified when they are assigned to you.",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      
        <div className="dark">
          {children}
        </div>
      
    </>
  );
}