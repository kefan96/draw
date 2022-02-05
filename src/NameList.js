import React from "react";

const NameList = ({ title, names }) => {
  return (
    <div>
      <h1>{title}</h1>
      {names.length > 0 && (
        <>
          <p>人数：{names.length}</p>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>类别</th>
                <th>姓名</th>
              </tr>
            </thead>
            {names.map((name, id) => {
              return (
                <tr key={id}>
                  <td>{name["序号"]}</td>
                  <td>{name["类别"]}</td>
                  <td>{name["姓名"]}</td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
};

export default NameList;
