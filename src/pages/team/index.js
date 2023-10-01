import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import TeamTable from "../../components/TeamTable/TeamTable";
// import "./settings.scss";

const team = [
  {
    name: "Дэвид Ливси",
    role: "Доктор",
    email: "d.livesey@espanyola.com",
    key: 1,
  },
  {
    name: "Джим Хокинс",
    role: "Юнга",
    email: "j.hawkins@espanyola.com",
    key: 2,
  },
  {
    name: "Джон Трелони",
    role: "Сквайр",
    email: "j.treloni@espanyola.com",
    key: 3,
  },
];

function Team() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["5"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Команда</h1>
        <TeamTable tableData={team} />
      </div>
    </div>
  );
}

export default Team;
