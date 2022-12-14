import React from "react";
import { useLocation } from "react-router-dom";
import "./KeywordModal.scss";
import locationImg from "assets/img/location.svg";
import _ from "lodash";

type KeywordModalProps = {
  name: string;
  keywords: { [keyword: string]: number };
  moveTo: () => void;
};

function KeywordModal({ name, keywords, moveTo }: KeywordModalProps) {
  const location = useLocation();
  return (
    <>
      <div className="keyword-modal" onClick={moveTo}>
        <div className="keyword-header">
          <img src={locationImg} className="location-img" alt="" />
          <div className="keyword-location">{name}</div>
          <div style={{ fontSize: "14px" }}>의 실시간 키워드입니다.</div>
        </div>
        {_.isEmpty(keywords) ? (
          <div className="keyword">이 지역은 콩이 하나도 없습니다.ㅠ^ㅠ</div>
        ) : (
          <div className="keyword">{Object.keys(keywords)[0]}</div>
        )}
        {location.pathname.split("/").length > 2 && location.pathname.split("/")[2] === 'dong' ? 
          <div></div> :
          <div className="click-text">
            눌러서 이동하기
          </div>
        }
      </div>
    </>
  );
}

export default KeywordModal;
