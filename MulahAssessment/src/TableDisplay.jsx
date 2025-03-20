import { useState, useEffect } from "react";
import "./TableDisplay.css"

function TableDisplay() {
  const [tableData, setTableData] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  useEffect(() => {
    fetch("/Table_Input.csv")
      .then((response) => response.text())
      .then((csvText) => {
        console.log(csvText);
        const rows = csvText.split("\n").slice(1);
        const data = rows
          .map((row) => {
            const [index, value] = row.split(",");
            return { index: index.trim(), value: parseFloat(value) };
          })
          .filter((row) => row.index);
        setTableData(data);

        // Compute Table 2 values
        const dataMap = Object.fromEntries(
          data.map((row) => [row.index, row.value])
        );
        const table2 = [
          {
            category: "Alpha",
            value: (dataMap["A5"] || 0) + (dataMap["A20"] || 0),
          },
          {
            category: "Beta",
            value: (dataMap["A15"] || 1) / (dataMap["A7"] || 1),
          },
          {
            category: "Charlie",
            value: (dataMap["A13"] || 0) * (dataMap["A12"] || 0),
          },
        ];
        setTable2Data(table2);
      });
  }, []);

  return (
    <div className = "container">
      <h2>Table 1</h2>
      <table className = "styled-table">
        <thead>
          <tr>
            <th>Index #</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.index}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Table 2</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {table2Data.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDisplay;
