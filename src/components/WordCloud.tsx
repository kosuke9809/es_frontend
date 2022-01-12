import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Props as WordcloudProps } from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const WordCloud: React.VFC<WordcloudProps> = (props) => {
  return (
    <>
      <ReactWordcloud options={props.options} size={props.size} words={props.words} />
    </>
  );
};

export default WordCloud;
