import React from "react";
import "./NameList.css";

const NameList = ({ title, names, attributes }) => {
  return (
    <div className="NameList">
      <h3>{title}</h3>
      {names.length > 0 && (
        <>
          <p>总数：{names.length}</p>
          <table>
            <thead>
              <tr>
                {attributes.map((a, i) => (
                  <th key={i}>{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {names.map((name, id) => {
                return (
                  <tr key={id}>
                    {attributes.map((a, i) => (
                      <td key={i}>{name[a]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default NameList;
