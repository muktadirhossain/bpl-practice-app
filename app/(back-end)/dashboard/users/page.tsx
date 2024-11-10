import { fetchUsers } from "@/lib/fetch-user";
import UsersTable from "./_components/UsersTable";

const page = async ({ searchParams }: any) => {
  const { data: users, totalPages } = await fetchUsers(searchParams);

  return (
    <div>
      <h2 className="section-title">Users</h2>
      <UsersTable data={JSON.stringify(users)} totalPages={totalPages} />
    </div>
  );
};

export default page;
