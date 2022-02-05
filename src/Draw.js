import React, { useState } from "react";
import * as XLSX from "xlsx";
import NameList from "./NameList";
import "./Draw.css";

const Draw = () => {
  const [ddzgRate, setDdzgRate] = useState(0);
  const [ddfzgRate, setDdfzgRate] = useState(0);
  const [zhyRate, setZhyRate] = useState(0);
  const [xfyRate, setXfyRate] = useState(0);
  const [zfzzRate, setZfzzRate] = useState(0);
  const [names, setNames] = useState([]);

  const onImportExcel = (file) => {
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: "binary" });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        setNames(data);
        draw(workbook, data);

        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log("文件类型不正确");
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  };

  function shuffleSwap(arr) {
    if (arr.length === 1) return arr;
    let i = arr.length;
    while (--i > 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function select(arr, rate) {
    return shuffleSwap([...arr])
      .slice(0, Math.floor(arr.length * rate))
      .sort((a, b) => a["序号"] - b["序号"]);
  }

  function writeToExcel(wb, arr) {
    const ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, "比武名单");
    XLSX.writeFile(wb, "参赛人员名单（抽签后）.xlsx");
  }

  const draw = (wb, arr) => {
    arr = arr.filter((entry) => !entry["备注"]);
    const ddzg = arr.filter((entry) => entry["类别"] === "大队主官");
    const ddfzg = arr.filter((entry) => entry["类别"] === "大队非主官");
    const zhy = arr.filter((entry) => entry["类别"] === "消防救援站指挥员");
    const xfy = arr.filter((entry) => entry["类别"] === "消防员");
    const zfzz = arr.filter((entry) => entry["类别"] === "政府专职消防队员");
    const selected = [
      ...select(ddzg, ddzgRate),
      ...select(ddfzg, ddfzgRate),
      ...select(zhy, zhyRate),
      ...select(xfy, xfyRate),
      ...select(zfzz, zfzzRate),
    ];
    setNames(selected);
    writeToExcel(wb, selected);
  };

  return (
    <div className="Draw">
      <div className="form">
        <div className="rates">
          <h3>抽签概率设置</h3>
          <div className="form-control">
            <label>大队主官</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={ddzgRate}
              onChange={(e) => setDdzgRate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>大队非主官</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={ddfzgRate}
              onChange={(e) => setDdfzgRate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>消防救援站指挥员</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={zhyRate}
              onChange={(e) => setZhyRate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>消防员</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={xfyRate}
              onChange={(e) => setXfyRate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>政府专职消防队员</label>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={zfzzRate}
              onChange={(e) => setZfzzRate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="excel" className="btn">
              <input
                id="excel"
                type="file"
                accept=".xlsx, .xls"
                onChange={onImportExcel}
              />
              导入名单
            </label>
          </div>
        </div>
      </div>
      <div className="result">
        <NameList title="比武名单" names={names} />
      </div>
    </div>
  );
};

export default Draw;
