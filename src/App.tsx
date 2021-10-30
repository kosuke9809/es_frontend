import React from "react";
import "./App.css";
import { Container, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SubmitButton = styled(Button)({
  width: "100%",
});

const App: React.VFC = () => {
  return (
    <Container fixed>
      <h1>AIでESを自動採点</h1>
      <div>
        <h3>アピールしたい長所を入力してください</h3>
        <TextField fullWidth placeholder='向上心' />
        <h3>あなたの長所は教えて下さい</h3>
        <TextField
          fullWidth
          multiline
          rows={10}
          placeholder='私の強みは常に高みを目指して努力する向上心があるところです。
        前職では営業をしておりましたが、入社して1年が経っても成績が上がることはありませんでした。
        何かやり方が間違っているのか、ほかに売り上げを上げる方法があるのではないかと試行錯誤した結果、自分の欠点が見えてきたのです。
        営業成績を上げるのは単なる数字を追うだけではなく、お客様の立場に立ってきちんと話を聞くことや、スピード感を持って対応することなど、営業の基本を学び直したことで、さまざまなことを得ることができました。
        それからは、営業成績も上がっていき、部署内で優秀賞をいただくことができました。
        今後も、現状に満足することなく高みを目指していきたいと考えています。
        '
        />
      </div>
      <br />
      <div className='submit_btn'>
        <SubmitButton variant='outlined'>採点</SubmitButton>
      </div>
    </Container>
  );
};

export default App;
