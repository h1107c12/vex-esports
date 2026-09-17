import ttohanaPoster from "../assets/streamers/welcome-ttohana.png"
import ming from "../assets/streamers/ming.png"
import susu from "../assets/streamers/susu.png"
import ddun from "../assets/streamers/ddun.png"

// name: 표시 이름 / image: 포스터 import 또는 이미지 URL
// postUrl: 게시물의 전체 https:// 주소. 빈 값이면 이동 버튼을 비활성화합니다.
// 나머지 세 명의 자료를 받으면 해당 항목만 수정하세요.
const streamersData = [
  { id: "ttohana", name: "또한아", image: ttohanaPoster, postUrl: "https://www.instagram.com/p/DcAWW96Su5P/" },
  { id: "ming", name: "밍진느", image: ming, postUrl: "https://www.instagram.com/p/DZb6ErtPzjs/" },
  { id: "susu", name: "수수깡", image: susu, postUrl: "https://www.instagram.com/p/DZClgqImbby/" },
  { id: "ddun", name: "떤디", image: ddun, postUrl: "https://www.instagram.com/p/Db9kiONOnC_/" },
]

export function getPostUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null
  } catch {
    return null
  }
}

export default streamersData
