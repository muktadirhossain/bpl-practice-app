import { notFound } from "next/navigation";

import UserProfileCard from "./_component/UserProfileCard";
import ChangePasswordArea from "./_component/ChangePasswordArea";
import UserDetails from "./_component/UserDetails";

import { getUserByEmail } from "@/lib/fetch-user";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  if (!session?.user) return notFound();
  const { email } = session.user || {};
  const user = await getUserByEmail(email as string);

  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
        <UserProfileCard user={user} />
        <ChangePasswordArea user={JSON.stringify(user)} />
      </div>
      <UserDetails user={JSON.stringify(user)} />
    </section>
  );
}
