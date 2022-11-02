import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nameState } from "store/atom";

export default function useRandomName() {
  const [name, setName] = useRecoilState(nameState);

  const setRandomName = () => {
    const first = [
      "괜찮은",
      "평범한",
      "납작한",
      "멍청한",
      "똑똑한",
      "앙상한",
      "지적인",
      "관대한",
      "악독한",
      "방탕한",
      "민첩한",
      "기민한",
      "서투른",
      "곤란한",
      "풍부한",
      "용감한",
      "어설픈",
      "공손한",
      "정중한",
      "근면한",
      "성실한",
      "단호한",
      "느긋한",
      "관대한",
      "상냥한",
      "다정한",
      "공손한",
      "현명한",
      "눅눅한",
      "온화한",
      "훈훈한",
      "아늑한",
      "향긋한",
      "순수한",
      "유치한",
      "유익한",
      "능숙한",
      "익숙한",
      "가엾은",
      "고마운",
      "고달픈",
      "섣부른",
      "수줍은",
      "그리운",
      "네모난",
      "아쉬운",
      "어두운",
      "어려운",
      "언짢은",
      "엄청난",
      "외로운",
      "우스운",
      "뛰어난",
      "뜨거운",
      "차가운",
      "잘생긴",
      "짖궂은",
      "못생긴",
      "정직한",
      "고집센",
      "끈질긴",
      "친절한",
      "유능한",
      "멍청한",
      "거만한",
      "쾌활한",
      "꼼꼼한",
      "겸손한",
      "다정한",
      "엉뚱한",
      "이상한",
      "얼빠진",
      "지루한",
      "산만한",
      "용감한",
      "활기찬",
      "전통의",
      "경솔한",
      "열등한",
      "부유한",
      "독특한",
      "무성한",
      "풍성한",
      "튼튼한",
      "딴딴한",
      "뾰족한",
      "헐렁한",
      "부당한",
      "불쾌한",
      "유쾌한",
      "상쾌한",
      "멋없는",
      "꿈같은",
      "경쾌한",
      "황홀한",
      "소중한",
      "영원한",
      "눈부신",
      "설레는",
      "뜻밖의",
      "기적의"
    ];
    const last = [
      "치와와",
      "빈지노",
      "판다곰",
      "김우창",
      "강낭콩",
      "외국인",
      "도마뱀",
      "잠자리",
      "하운드",
      "순례자",
      "곰돌이",
      "까칠이",
      "길쭉이",
      "관광객",
      "길쭉이",
      "깍쟁이",
      "나그네",
      "노숙자",
      "냐옹이",
      "냥냥이",
      "누렁이",
      "날도둑",
      "낚시꾼",
      "다니엘",
      "다비드",
      "아이브",
      "데이빗",
      "등산객",
      "돌멩이",
      "달토끼",
      "달콤이",
      "땅거미",
      "똥쟁이",
      "뚱뚱이",
      "뚝딱이",
      "닭다리",
      "루돌프",
      "라이언",
      "라이츄",
      "피카츄",
      "루이스",
      "로버트",
      "제이스",
      "이블린",
      "말티즈",
      "미카엘",
      "모히또",
      "참이슬",
      "비둘기",
      "변호사",
      "복학생",
      "밤톨이",
      "방랑자",
      "사또밥",
      "스마일",
      "사장님",
      "승무원",
      "스파크",
      "삽살이",
      "송아리",
      "송송이",
      "샌드백",
      "여우비",
      "아구찜",
      "에이든",
      "음바페",
      "아리아",
      "유망주",
      "엘리스",
      "니달리",
      "아이들",
      "아이린",
      "알파고",
      "이브이",
      "오징어",
      "임금님",
      "저스틴",
      "줄리아",
      "조나단",
      "치토스",
      "투다리",
      "퉁퉁이",
      "티아라",
      "탈리아",
      "파일럿",
      "파피용",
      "피죤투",
      "해적왕",
      "헤이즈",
      "항아리",
      "알렉스",
      "홀란드",
      "호날두",
      "제레미",
      "김싸피",
      "이싸피",
      "김덕배",
      "매머드",
      "햄버거",
      "메뚜기"
    ];
    const nickname =
      first[Math.floor(Math.random() * first.length)] +
      " " +
      last[Math.floor(Math.random() * last.length)];

    setName(nickname);
    return true;
  };
  useEffect(() => {
    if (!name) {
      setRandomName();
    }
  }, []);
  return { name, setRandomName };
}
