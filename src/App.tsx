import React, { useState } from "react";
import Result from "./components/Result";
import { Link as Scroll } from "react-scroll";
import "./App.css";
import { styled } from "@mui/material/styles";
import { Container, TextField, Button, Paper, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./app/store";
import {
  fetchAsyncPostBert,
  selectBertScore,
  selectIsLoadingBert,
  fetchBertStart,
  fetchBertEnd,
} from "./features/bert/bertSlice";
import {
  fetchAsyncPostMecab,
  selectMecabResponse,
  // selectIsLoadingMecab,
  fetchMecabStart,
  fetchMecabEnd,
} from "./features/mecab/mecabSlice";
import WordCloud from "./components/WordCloud";
import { OptionsProp } from "react-wordcloud";

const CustomPaper = styled(Paper)({
  marginTop: 50,
  padding: 20,
  borderRadius: 15,
});

const SubmitButton = styled(Button)({
  width: "100%",
});

const App: React.VFC = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const IsLoadingBert = useSelector(selectIsLoadingBert);
  const bertScore = useSelector(selectBertScore);
  const mecabRes = useSelector(selectMecabResponse);
  console.log(bertScore);
  console.log(mecabRes);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(e.target.value.length);
    setText(e.target.value);
  };
  const handleSubmitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 180 words over
    if (text.length >= 180) {
      dispatch(fetchMecabStart());
      dispatch(fetchBertStart());
      const bertRes = await dispatch(fetchAsyncPostBert(text));
      const mecabRes = await dispatch(fetchAsyncPostMecab(text));
      // progress bar control
      if (
        fetchAsyncPostBert.fulfilled.match(bertRes) &&
        fetchAsyncPostMecab.fulfilled.match(mecabRes)
      ) {
        dispatch(fetchMecabEnd());
        dispatch(fetchBertEnd());

        document.getElementById("scroll")!.click();
      } else if (
        fetchAsyncPostBert.rejected.match(bertRes) ||
        fetchAsyncPostMecab.rejected.match(mecabRes)
      ) {
        alert("分析に失敗しました");
        dispatch(fetchBertEnd());
        dispatch(fetchMecabEnd());
      }
    } else {
      alert("文字数が足りません");
    }
  };

  const options: OptionsProp = {
    spiral: "archimedean",
    fontSizes: [30, 80],
    padding: 5,
    scale: "sqrt",
    fontWeight: "bold",
  };

  return (
    <>
      <div>{IsLoadingBert && <LinearProgress />}</div>
      <Scroll id='scroll' to='result' smooth={true} />
      <Container fixed>
        <h1>自己PRをAIが分析</h1>
        <div>
          <h3>アピールしたい単語を入力してください</h3>
          <TextField fullWidth placeholder='向上心' />
          <h3>あなたの長所は教えて下さい</h3>
          <TextField
            fullWidth
            multiline
            rows={10}
            onChange={onChangeHandler}
            placeholder='私の強みは常に高みを目指して努力する向上心があるところです。
            前職では営業をしておりましたが、入社して1年が経っても成績が上がることはありませんでした。
            何かやり方が間違っているのか、ほかに売り上げを上げる方法があるのではないかと試行錯誤した結果、自分の欠点が見えてきたのです。
            営業成績を上げるのは単なる数字を追うだけではなく、お客様の立場に立ってきちんと話を聞くことや、スピード感を持って対応することなど、営業の基本を学び直したことで、さまざまなことを得ることができました。
            それからは、営業成績も上がっていき、部署内で優秀賞をいただくことができました。
            今後も、現状に満足することなく高みを目指していきたいと考えています。
            '
          />
          <h4 className='es_count'>文字数: {counter}</h4>
        </div>
        <br />
        <div className='submit_btn'>
          <SubmitButton variant='contained' onClick={handleSubmitButton}>
            採点
          </SubmitButton>
        </div>
        {bertScore.label.length > 0 && (
          <CustomPaper variant='outlined'>
            <div id='result'>
              <Result score={bertScore.score} label={bertScore.label} />
            </div>

            <div className='wordcloud'>
              {mecabRes.length > 0 && <WordCloud options={options} words={mecabRes} />}
            </div>
          </CustomPaper>
        )}
      </Container>
    </>
  );
};

export default App;
