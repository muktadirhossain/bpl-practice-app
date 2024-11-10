import { Divider } from "@nextui-org/divider";

import PlayersTable from "./_components/PlayersTable";

import { getAllPlayers } from "@/lib/fetchPlayers";
import { dashboardHeading } from "@/components/primitives";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: any) => {
  const { data, totalPages } = await getAllPlayers(searchParams);

  return (
    <section>
      <h2 className={dashboardHeading()}>All Players :</h2>
      <Divider />

      <PlayersTable players={JSON.stringify(data)} totalPages={totalPages} />
    </section>
  );
};

export default Page;
