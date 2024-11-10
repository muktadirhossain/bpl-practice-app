import React from "react";

import ScoreTable from "./ScoreTable";

const ScoreTableArea = () => {
  return (
    <section className="container mx-auto lg:px-16">
      <div>
        <h6 className="section-subtitle">Table</h6>
        <h2 className="section-title leading-extra-loose">Premier league</h2>
      </div>
      <ScoreTable />
    </section>
  );
};

export default ScoreTableArea;
