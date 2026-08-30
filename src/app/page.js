import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link href="dashboard/idea-owner">Owner dashboard</Link>
      <Link href="dashboard/idea-owner/projects">Projects dashboard</Link>
      <Link href="dashboard/idea-owner/create-project">Create Project</Link>
    </div>
  );
};

export default page;
