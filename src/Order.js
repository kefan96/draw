import React, { useState } from "react";
import "./Order.css";
import * as XLSX from "xlsx";
import NameList from "./NameList";

const Order = () => {
  const [dadui, setDadui] = useState([]);
  const [zhan, setZhan] = useState([]);

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
          }
        }
        order(workbook, data);

        file.target.value = "";

        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log("文件导入不正确");
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  };

  function order(wb, arr) {
    const dd = shuffleSwap(arr.filter((e) => e["类别"] === "大队"));
    const xfz = shuffleSwap(arr.filter((e) => e["类别"] === "消防站"));
    for (let i = 0; i < dd.length; i++) {
      dd[i]["序号"] = i + 1;
    }
    for (let i = 0; i < xfz.length; i++) {
      xfz[i]["序号"] = i + 1;
    }
    setDadui(dd);
    setZhan(xfz);
    writeToExcel(wb, dd.concat(xfz));
  }

  function writeToExcel(wb, arr) {
    const ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, "出场次序");
    XLSX.writeFile(wb, "出场次序单.xlsx");
  }

  function shuffleSwap(arr) {
    if (arr.length === 1) return arr;
    let i = arr.length;
    if (arr.length === 2) return Math.random() > 0.5 ? arr : [arr[1], arr[0]];
    while (--i > 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return (
    <div className="Order">
      <div className="form-control">
        <label htmlFor="excel" className="btn">
          <input
            id="excel"
            type="file"
            accept=".xlsx, .xls"
            onChange={onImportExcel}
          />
          导入列表
        </label>
      </div>
      <h2>出场顺序</h2>
      {dadui.length > 0 && (
        <NameList title="大队" names={dadui} attributes={["序号", "名称"]} />
      )}
      {zhan.length > 0 && (
        <NameList title="消防站" names={zhan} attributes={["序号", "名称"]} />
      )}
    </div>
  );
};

export default Order;
