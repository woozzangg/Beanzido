import { useEffect, useRef, useState, memo, Component, useCallback  } from "react";
import "./ChatItem.scss";
import useTime from "components/hooks/useTime";
import ExpandImg from "components/ExpandImg/ExpandImg";
import Lottie from "lottie-react";
import locationAni from "assets/img/location.json";
import locationImg from "assets/img/location.svg";
import filtered from "assets/img/filtered.png";
import { ColoredBean } from "store/types";
import useTargetLocation from "components/hooks/useTargetLocation"
type ChatProps = {
  Chatinfo: ColoredBean;
};

function ChatItem({ Chatinfo }: ChatProps) {
  const [initialPosition, SetinitialPosition] = useState({
    lat: Chatinfo.latitude,
    lng: Chatinfo.longitude,
    loaded: true,
    isPanto: true,
  });
  const colorRef = useRef<HTMLDivElement>(null);
  const [elapsedText] = useTime(Chatinfo.createdAt);
  const [expandImg, setExpandImg] = useState(false);

  useEffect(() => {
    const { current } = colorRef;
    if (current !== null) {
      current.style.color = Chatinfo.color.color;
      current.style.backgroundColor = Chatinfo.color.backgroundColor;
    }
  });

  return (
    <div className="chat-item" onClick={() => {
      console.log('위치로 이동')
      SetinitialPosition({
        lat: Chatinfo.latitude,
        lng: Chatinfo.longitude,
        loaded: true,
        isPanto: true,
      });
      console.log(initialPosition)
    }}>
      <div className="nickname-container" ref={colorRef}>
        {Chatinfo.nickname[0]}
      </div>
      <div className="contents-container">
        <div className="up">
          <div>{Chatinfo.nickname}</div>
          <div className="time">{elapsedText}</div>
        </div>
        <div className="location">
          {/* <Lottie animationData={locationAni} className="location-img" /> */}
          <img src={locationImg} className="location-img" alt="" />
          {Chatinfo.location}
        </div>
        {Chatinfo.content === "" ? (
          <div></div>
        ) : (
          <div className="down">
            <div style={{ whiteSpace: "pre-line" }}>
              {Chatinfo.contentFilter
                ? "부적절한 단어가 포함되어 있습니다."
                : Chatinfo.content.replaceAll("<br/>", "\r\n")}
            </div>
          </div>
        )}
        <div className="chat-item-img">
          <img
            src={Chatinfo.imgFilter ? filtered : Chatinfo.img}
            className="chat-item-img-off"
            onClick={() => setExpandImg(!expandImg)}
            alt=""
          />
          {expandImg && (
            <ExpandImg photo={Chatinfo.img} setExpandImg={setExpandImg} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ChatItem);
