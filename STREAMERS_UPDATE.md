# 파트너 섹션 스트리머 추가

기존 스폰서 로고·상세 팝업 아래에 스트리머 4개 카드를 추가했습니다.
또한아 포스터는 첨부된 원본을 그대로 사용합니다. 이미지 전체를 표시하며 클릭하면 원본을 새 창으로 볼 수 있습니다.

## 현재 등록 상태
- 또한아: 이름 / 포스터 등록 완료. 게시물 URL 미제공.
- 나머지 3명: 이름 / 이미지 / 게시물 URL 미제공. 공개 예정으로 표시.
- 게시물 URL이 없는 카드는 '게시물 준비 중' 버튼을 비활성화합니다.

## 적용
아래 5개 파일을 기존 프로젝트의 같은 위치에 덮어쓰거나 추가하세요.
기존 .env, .git, node_modules는 그대로 유지하세요. 패키지 추가는 없습니다.

- src/assets/streamers/welcome-ttohana.png
- src/components/partners/Partners.jsx
- src/components/partners/Streamers.css
- src/components/partners/Streamers.jsx
- src/data/streamersData.js

```sh
npm run dev
npm run build
```

## 이름·이미지·게시물 링크 등록
src/data/streamersData.js에서 네 항목을 관리합니다.
이미지는 src/assets/streamers에 추가한 후 import하고 image 항목에 넣으세요.

```js
import secondPoster from "../assets/streamers/welcome-second.png"

// 기존 streamer-2 항목을 다음과 같이 수정합니다.
{
  id: "streamer-2",
  name: "스트리머 이름",
  image: secondPoster,
  postUrl: "실제 게시물의 전체 https:// 주소",
}
```

또한아 항목의 postUrl에도 실제 게시물 주소를 입력하세요. 방송 채널 주소가 아니라 요청하신 게시물 바로가기 주소를 넣으면 됩니다.
빈 값이나 잘못된 주소에는 이동 링크가 생기지 않습니다. 이미지 로드 오류 시 준비 중 화면으로 대체됩니다.

PC는 4열, 태블릿은 2열, 모바일은 포스터 가독성을 위한 1열입니다.

## 검증
- 변경 JS/JSX ESLint 통과
- Vite 프로덕션 빌드 통과
- React 정적 렌더 검사: 4개 카드, 또한아 이미지, URL 미등록 시 비활성화, URL 등록 시 외부 링크 표시 확인
- 잘못된 URL / 스크립트 URL 차단 확인
- 실제 브라우저 화면·클릭 검증은 수행하지 못했습니다.

최종 게시 전 나머지 세 명의 이름·이미지와 네 명의 게시물 URL을 등록해주세요.
