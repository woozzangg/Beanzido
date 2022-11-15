import { useState, useEffect, lazy, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarState } from "store/atom";
import { beanListSelector, focusedListSelector } from "store/selector";
import { useSwipeable } from "react-swipeable";
import "./Sidebar.scss";
import closeIcon from "assets/img/Expand_left_light.svg";
import x from "assets/img/x.svg";
import { useNavigate } from "react-router-dom";
import sadBean from "assets/img/bean-sad.svg";
import Lottie from "lottie-react";
import locationAni from "assets/img/location.json";
import _ from "lodash";
import useBeanAPI from "components/hooks/useBeanAPI";
import ChatList from "components/ChatList/ChatList";

export default function Sidebar() {
  const [isFull, setIsFull] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const coloredBeanList = useRecoilValue(beanListSelector);
  const coloredFocusedList = useRecoilValue(focusedListSelector);
  const navigate = useNavigate();
  const { isBeanLoad } = useBeanAPI();

  useEffect(() => {
    document.documentElement.style.setProperty("--inner-height", "300px");

    setIsFull(false);
    console.log(sidebar);
    return () => {
      document.documentElement.style.setProperty("--mobile-border", "15px");
      document.documentElement.style.setProperty("--inner-height", "300px");
      setIsFull(false);
    };
  }, []);

  useEffect(() => {
    if (sidebar === 1) {
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "0px"
      );
    } else {
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "100%"
      );
    }
  }, [sidebar]);
  const upHandlers = useSwipeable({
    onSwiping: (eventData) => {
      document.documentElement.style.setProperty("--inner-transition", "");
      if (isFull) {
        if (
          eventData.deltaY > -50 &&
          eventData.deltaY < -50 + window.innerHeight
        ) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `calc(var(--vh, 1vh) * 100 - ${eventData.deltaY + 50}px)`
          );
        }
      } else {
        if (
          eventData.deltaY < 270 &&
          eventData.deltaY > 300 - window.innerHeight
        ) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `${300 - eventData.deltaY}px`
          );
        }
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty(
        "--inner-transition",
        "all ease 300ms"
      );
      if (isFull) {
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100 - 50px)"
        );
      } else {
        document.documentElement.style.setProperty("--inner-height", "300px");
      }
      if (
        eventData.dir === "Up" &&
        eventData.deltaY < (-1 / 8) * window.innerHeight
      ) {
        setIsFull(true);
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100 - 50px)"
        );
      } else if (
        eventData.dir === "Down" &&
        eventData.deltaY > (1 / 8) * window.innerHeight
      ) {
        if (isFull) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `calc(var(--vh, 1vh) * 100 - ${eventData.deltaY + 50}px)`
          );
        } else {
          document.documentElement.style.setProperty(
            "--inner-height",
            `${300 - eventData.deltaY}px`
          );
        }
        navigate("/");
      }
    },
  });

  const sideHandlers = useSwipeable({
    onSwipeStart: (eventData) => {
      if (eventData.dir === "Down" || eventData.dir === "Up") {
        setIsScroll(true);
      }
    },
    onSwiping: (eventData) => {
      if (!isScroll) {
        document.documentElement.style.setProperty("--scroll-transition", "");
        if (
          sidebar === 1 &&
          eventData.deltaX > -1 * window.innerWidth &&
          eventData.deltaX <= 30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        } else if (
          sidebar === 2 &&
          eventData.deltaX < window.innerWidth &&
          eventData.deltaX >= -30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        }
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty("--scroll-width", "0px");
      document.documentElement.style.setProperty(
        "--scroll-transition",
        "all ease 300ms"
      );
      setIsScroll(false);
      if (
        eventData.dir === "Left" &&
        eventData.deltaX < (-1 / 4) * window.innerWidth
      ) {
        setSidebar(2);
      } else if (
        eventData.dir === "Right" &&
        eventData.deltaX > (1 / 4) * window.innerWidth
      ) {
        setSidebar(1);
      }
    },
  });
  return (
    <div className="sidebar">
      <div className="slide-handle" onClick={() => navigate("/")}>
        <img src={closeIcon} alt="open" />
      </div>
      <div className="inner">
        <div className="header">
          <div className="swipe-handle" {...upHandlers} />
          <img
            className="close"
            src={x}
            onClick={() => navigate("/")}
            alt="close"
          />
        </div>
        <div className="scroll-container" {...sideHandlers}>
          <div className="scroll first">
            <div className="scroll-description">
              <div className="description-header">
                <div style={{ marginRight: "5px" }}>전국</div>
                모든 콩들의 대화 내용입니다.
              </div>
            </div>
            {isBeanLoad && _.isEmpty(coloredBeanList) ? (
              <div className="empty-list">
                <img src={sadBean} alt="" />
                "Beanzido에 콩이 하나도 없어요..."
              </div>
            ) : (
              <ChatList chatList={coloredBeanList} />
            )}
          </div>
          <div className="scroll second">
            <div className="scroll-description">
              {coloredFocusedList.length > 0 && (
                <div>
                  <div className="description-header">
                    <Lottie
                      animationData={locationAni}
                      className="location-img"
                    />
                    <div>
                      {
                        coloredFocusedList[coloredFocusedList.length - 1]
                          .location
                      }
                    </div>
                    에 있는
                  </div>
                  콩들의 대화 내용입니다.
                </div>
              )}
            </div>
            {isBeanLoad && _.isEmpty(coloredBeanList) ? (
              <div className="empty-list">
                <img src={sadBean} alt="" />
                "Beanzido에 심어진 콩을 클릭해봐"
              </div>
            ) : (
              <ChatList chatList={coloredFocusedList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
