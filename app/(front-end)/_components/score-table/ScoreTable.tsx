"use client";

import { Chip, cn, User } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
} from "@nextui-org/table";
import React from "react";

const teamsData = [
  {
    _id: "1",
    position: 1,
    team: {
      name: "Rangpur Riders",
      logo: "https://bplt20.com.bd/images/teams/1785260767812560.png",
      link: "https://bplt20.com.bd/team-fixture/3",
    },
    matches: 12,
    wins: 9,
    losses: 3,
    points: 18,
    nrr: 1.44,
  },
  {
    _id: "2",
    position: 2,
    team: {
      name: "Comilla Victorians",
      logo: "https://bplt20.com.bd/images/teams/1785260657832359.png",
      link: "https://bplt20.com.bd/team-fixture/1",
    },
    matches: 12,
    wins: 8,
    losses: 4,
    points: 16,
    nrr: 1.15,
  },
  {
    _id: "3",
    position: 3,
    team: {
      name: "Fortune Barishal",
      logo: "https://bplt20.com.bd/images/teams/1785260818424504.png",
      link: "https://bplt20.com.bd/team-fixture/5",
    },
    matches: 12,
    wins: 7,
    losses: 5,
    points: 14,
    nrr: 0.41,
  },
  {
    _id: "4",
    position: 4,
    team: {
      name: "Chattogram Challengers",
      logo: "https://bplt20.com.bd/images/teams/1785260882344379.png",
      link: "https://bplt20.com.bd/team-fixture/4",
    },
    matches: 12,
    wins: 7,
    losses: 5,
    points: 14,
    nrr: -0.41,
  },
  {
    _id: "5",
    position: 5,
    team: {
      name: "Khulna Tigers",
      logo: "https://bplt20.com.bd/images/teams/1785260947117700.png",
      link: "https://bplt20.com.bd/team-fixture/7",
    },
    matches: 12,
    wins: 5,
    losses: 7,
    points: 10,
    nrr: -0.45,
  },
  {
    _id: "6",
    position: 6,
    team: {
      name: "Sylhet Strikers",
      logo: "https://bplt20.com.bd/images/teams/1785260908793406.png",
      link: "https://bplt20.com.bd/team-fixture/2",
    },
    matches: 12,
    wins: 5,
    losses: 7,
    points: 10,
    nrr: -0.75,
  },
  {
    _id: "7",
    position: 7,
    team: {
      name: "Durdanto Dhaka",
      logo: "https://bplt20.com.bd/images/teams/1785260700500221.png",
      link: "https://bplt20.com.bd/team-fixture/6",
    },
    matches: 12,
    wins: 1,
    losses: 11,
    points: 2,
    nrr: -1.42,
  },
];

const columns = [
  {
    _id: "position",
    label: "POS",
  },
  {
    _id: "team",
    label: "TEAM",
  },
  {
    _id: "matches",
    label: "MATCHES",
  },
  {
    _id: "wins",
    label: "WINS",
  },
  {
    _id: "losses",
    label: "LOSSES",
  },
  {
    _id: "points",
    label: "PTS",
  },
  {
    _id: "nrr",
    label: "NRR",
  },
];

const ScoreTable: React.FC = () => {
  const renderCell = React.useCallback((team: any, columnKey: string) => {
    const cellValue = team[columnKey];

    switch (columnKey) {
      case "team":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: team?.team?.logo,
            }}
            name={team?.team?.name}
          />
        );
      case "position":
        return <span>{team.position}</span>;
      case "matches":
        return <span>{team.matches}</span>;
      case "wins":
        return (
          <Chip className="bg-emerald-500/20" color="success" variant="faded">
            {team.wins}
          </Chip>
        );
      case "losses":
        return (
          <Chip className="bg-rose-500/20" color="danger" variant="faded">
            {team.losses}
          </Chip>
        );
      case "points":
        return <span>{team.points}</span>;
      case "nrr":
        return (
          <span
            className={cn({
              "text-rose-500": team?.nrr?.toString().includes("-"), // If nrr contains "-", it applies the class
            })}
          >
            {team.nrr}
          </span>
        );
      default:
        return <span>{JSON.stringify(cellValue)}</span>;
    }
  }, []);

  return (
    <Table
      // isCompact={true}
      aria-label="Teams Point Table"
      className="my-5"
      isHeaderSticky={true}
      isStriped={true}
      // onRowAction={(key) => console.log(key)}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column._id}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No Teams found 😔"} items={teamsData}>
        {(item) => (
          <TableRow key={item._id} style={{ cursor: "pointer" }}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ScoreTable;
