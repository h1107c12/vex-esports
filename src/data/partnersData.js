import p1 from "../assets/logos/p1.png"
import p2 from "../assets/logos/p2.png"
import p3 from "../assets/logos/p3.png"
import p4 from "../assets/logos/p4.png"
import p5 from "../assets/logos/p5.png"
import p6 from "../assets/logos/p6.png"
import p7 from "../assets/logos/p7.png"
import p8 from "../assets/logos/p8.png"

import detail1 from "../assets/partners/detail1.png"
import detail2 from "../assets/partners/detail2.png"
import detail3 from "../assets/partners/detail3.png"
import detail4 from "../assets/partners/detail4.png"
import detail5 from "../assets/partners/detail5.png"
import detail6 from "../assets/partners/detail6.png"
import detail7 from "../assets/partners/detail7.png"
import detail8 from "../assets/partners/detail8.png"
import detail9 from "../assets/partners/detail9.png"

const partnersData = [
  {
    id: 1,
    logo: p1,
    name: "Partner 1",
    website:
      "https://dogshower.co.kr/category/%EC%95%84%EB%8B%B4-%EC%8A%A4%ED%82%A8%EC%BC%80%EC%96%B4/241/",
    logoWidth: 180,
    logoHeight: 152,
    details: [
      {
        image: detail1,
        text: `하루펫약선은 반려동물 자연주의 브랜드의 대표 브랜드로, 반려동물을 위한 체질 맞춤형 약선 식이개념을 현대적으로 구현한 프리미엄 펫 웰니스 브랜드입니다.
약선은 약을 의미하는 개념이 아니라, 식재료의 성질과 조합을 통해 신체의 균형과 기력을 보완하는 전통적인 식문화입니다. 하루펫약선은 이러한 철학을 반려동물 영양 설계에 적용하여, 단순한 사료가 아닌 '매일 먹는 보양식'이라는 새로운 기준을 제안합니다.`,
      },
    ],
  },
  {
    id: 2,
    logo: p2,
    name: "Partner 2",
    website:
      "https://pineinfo.co.kr/",
    logoWidth: 200,
    logoHeight: 156,
    details: [
      {
        image: detail2,
        text: `파인인포는 글로벌 메모리·스토리지 기업 ADATA의 국내 공식 유통사입니다. 프리미엄 게이밍 브랜드 XPG의 고성능 SSD와 RGB 메모리를 비롯해 DRAM, 외장 저장장치 등 ADATA의 핵심 라인업을 국내 시장에 선보이고 있습니다. 유통부터 철저한 사후 지원까지 책임지며, 게이머들이 믿고 선택할 수 있는 최상의 하드웨어 솔루션을 제공합니다.`,
      },
    ],
  },
  {
    id: 3,
    logo: p3,
    name: "ENP Games",
    website: "https://enpgames.co.kr",
    layout: "center",
    hideTopLogo: true,
    heroLink: true,
    centerImageWidth: 360,
    centerImageHeight: 200,
    details: [
      {
        image: detail3,
        text: `이엔피게임즈는 지친 일상을 잠시 잊고, 편하게 즐길 수 있는 다양한 게임을 개발, 서비스하고 있습니다.`,
      },
    ],
  },
  {
    id: 4,
    logo: p4,
    name: "Partner 4",
    website: "https://jchyun.com/",
    logoWidth: 270,
    logoHeight: 50,
    details: [
      {
        image: detail4,
        text: `올 해로 설립 42주년을 맞이한 제이씨현시스템은 GIGABYTE, AMD, PNY, BIOSTAR 등 글로벌 브랜드의 PC 제품을 공급하는 국내 최정상급 IT 유통 기업입니다. 자체 모니터 브랜드인 UDEA와 BattleG를 비롯해, 드론 및 VR 기기 등 하이엔드 하드웨어부터 미래형 스마트 솔루션까지 폭넓은 라인업을 보유하고 있습니다. 반 세기 가까이 쌓아 온 독보적인 유통 노하우를 바탕으로 급변하는 디지털 환경에 최적화된 고객 맞춤형 IT 경험을 제공합니다.`,
      },
      {
        image: detail9,
        text: `BattleG는 "배틀을 배틀답게" 즐기기 위해 설계된 e스포츠 게이밍 모니터 브랜드입니다. 초고주사율과 빠른 응답속도, 안정적인 화면 표현으로 VEX Esports 선수들이 순간의 판단과 반응에 집중할 수 있는 실전 중심의 플레이 환경을 제공합니다. BattleG는 승부의 순간을 놓치지 않기 위한 성능과 디테일에 집중하며, 프로게이머가 신뢰하는 게이밍 모니터 기준을 제시합니다.`,
      },
    ],
  },
  {
    id: 5,
    logo: p5,
    name: "Partner 5",
    website: "https://www.42dacom.co.kr/",
    logoWidth: 190,
    logoHeight: 154,
    details: [
      {
        image: detail5,
        text: `주)플레이몰은 약 10년차 IT업체로 게이밍에 최적화된 PC 시스템을 제공하는 전문 기업 브랜드입니다.

단순한 제품 판매를 넘어, 실제 게임 플레이 환경을 기반으로 한 구성 설계와 안정성을 최우선으로 하여 프로 게이머와 스트리머, 그리고 하드코어 게이머들이 신뢰할 수 있는 시스템을 제공합니다.

플레이몰은 e스포츠 팀 및 콘텐츠 크리에이터와의 협업을 통해 지속적인 기술 지원 및 피드백으로 최상의 플레이 경험을 완성하며 앞으로도 게임을 진심으로 즐기는 모든 유저를 위해 성능과 신뢰를 모두 만족시키는 게이밍 파트너로 함께하겠습니다.`,
      },
    ],
  },
  {
    id: 6,
    logo: p6,
    name: "Twire",
    website: "https://twire.gg",
    layout: "center",
    hideTopLogo: true,
    heroLink: true,
    centerImageWidth: 340,
    centerImageHeight: 210,
    details: [
      {
        image: detail6,
        text: `Twire.gg는 전 세계 PUBG 이스포츠 팀과 선수들의 경기 기록, 성과, 데이터를 한눈에 확인할 수 있는 
        글로벌 이스포츠 정보 플랫폼입니다.`,
      },
    ],
  },
  {
    id: 7,
    logo: p7,
    name: "Partner 7",
    website: "https://www.vaxee.co/kr/",
    layout: "visualOnly",
    hideTopLogo: true,
    heroLink: true,
    centerImageWidth: 420,
    centerImageHeight: 260,
    details: [
      {
        image: detail7,
        text: ``,
      },
    ],
  },
  {
    id: 8,
    logo: p8,
    name: "Partner 8",
    website: "https://www.ovenmaru.com/",
    logoWidth: 290,
    logoHeight: 120,
    details: [
      {
        image: detail8,
        text: `오븐마루치킨은 국내산 100% 신선육을 사용해 살아 있는 육즙은 그대로 살리고, 오븐에 굽는 방식으로 더 담백하고 편안한 치킨을 선보이는 브랜드입니다. 기름에 튀기지 않는 조리법으로 소비자는 보다 안심하고 즐 수 있고, 점주와 고객 모두에게 부담을 줄인 건강한 치킨 문화를 만들어가고 있습니다. 오븐마루치킨은 맛과 건강을 함께 고민하는 고객에게 행복한 선택이 되기를 지향합니다.

브랜드의 자부심
- 국내산 100% 신선육 사용, 현미베이크 공법으로 바삭함과 육즙을 동시에 구현
- 마늘, 불고기 등 한식의 풍미를 살린 다양한 메뉴 라인업
- 2010년 브랜드 연구개발 시작, 2025년 기준 150여 개 매장 운영 및 해외 진출
- 튀기지 않고 굽는 조리 방식으로 완성한 진정한 웰빙 치킨 브랜드

오븐마루치킨과 함께 더 맛있고, 더 건강한 치킨 문화를 경험해 보세요.
Enjoy the Ovenmaru.`,
      },
    ],
  },
]

export default partnersData