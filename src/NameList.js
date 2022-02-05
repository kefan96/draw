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
                <th>单位</th>
                <th>序号</th>
                <th>类别</th>
                <th>姓名</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, id) => {
                return (
                  <tr key={id}>
                    <td>{name["单位"]}</td>
                    <td>{name["序号"]}</td>
                    <td>{name["类别"]}</td>
                    <td>{name["姓名"]}</td>
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
