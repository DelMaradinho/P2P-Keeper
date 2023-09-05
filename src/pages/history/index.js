import MainMenu from "../../components/MainMenu/MainMenu";
import CustomTable from "../../components/CustomTable/CustomTable";
import "./history.scss";

function History() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu />
      </div>
      <div className="right">
        {" "}
        <h1>История сделок</h1>
        <CustomTable />
      </div>
    </div>
  );
}

export default History;
