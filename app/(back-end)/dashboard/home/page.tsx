import { Card, CardBody } from "@nextui-org/card";

import { TeamsIcon } from "@/components/icons";

const DashboardHome: React.FC = () => {
  return (
    <section>
      <h2 className="Section-title leading-extra-loose">Durbar Rajshahi</h2>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardBody>
            <h2>Total Teams</h2>
            <TeamsIcon />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2>Our Sponsors</h2>
            <TeamsIcon />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2>Players</h2>
            <TeamsIcon />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2>Durbar News</h2>
            <TeamsIcon />
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default DashboardHome;
