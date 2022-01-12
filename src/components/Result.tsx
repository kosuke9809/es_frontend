import React from "react";
import { Doughnut } from "react-chartjs-2";

type PROPS_RESULT = {
  score: number[];
  label: number[];
};

const Result: React.VFC<PROPS_RESULT> = (props) => {
  const data = {
    labels: ["合格", "不合格"],

    datasets: [
      {
        label: " 自己PR分析結果 ",
        data: props.score,
        // primary main #1976d21 grey 500 9e9e9e
        backgroundColor: ["rgb(25, 118, 210)", "rgb(158, 158, 158)"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: true,
    responsive: true,
  };
  return (
    <div className='paper_box'>
      <h1>分析結果</h1>
      {/* <h3>{props.label[1]}</h3>
        <h3>{props.score[1]}%</h3> */}
      <div className='persentage_box'>
        <div className='doughnut_chart'>
          <Doughnut data={data} options={options} />
        </div>
        <div className='persentage_text'>
          <h2>あなたの自己PRの選考通過率</h2>
          <span className='score_text'>{props.score[0]}</span>
          <span style={{ fontSize: "3rem", fontWeight: 500 }}>%</span>
        </div>
      </div>
    </div>
  );
};

export default Result;
