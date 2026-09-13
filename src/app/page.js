import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black mt-20">Landing page</h1>
      <div className="grid grid-cols-2 gap-10 mt-30">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold pb-1">Idea Owner pages</h2>
          <Link href="/dashboard/idea-owner">Owner dashboard</Link>
          <Link href="/dashboard/idea-owner/projects">Projects dashboard</Link>
          <Link href="/dashboard/idea-owner/create-project">
            Create Project
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold pb-1">Auth pages</h2>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/forgot-password">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
