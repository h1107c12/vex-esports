import yapzzu from "../assets/streamers/yapzzu.png"
import ttohanaPoster from "../assets/streamers/welcome-ttohana.png"
import ming from "../assets/streamers/ming.png"
import susu from "../assets/streamers/susu.png"
import ddun from "../assets/streamers/ddun.png"

const streamersData = [
  {
    id: "yapzzu",
    name: "얍쭈",
    image: yapzzu,
    postUrl: "",
    channels: [
      {
        label: "치지직",
        url: "https://chzzk.naver.com/07f30d3d52452f3da6ae22fc3bf2c544",
      },
      {
        label: "유튜브",
        url: "https://www.youtube.com/@yapzzu",
      },
    ],
  },
  {
    id: "susu",
    name: "수수깡",
    image: susu,
    postUrl: "https://www.instagram.com/p/DZClgqImbby/",
    channels: [
      {
        label: "SOOP 방송국",
        url: "https://www.sooplive.com/station/d5g6w48",
      },
    ],
  },
  {
    id: "ming",
    name: "밍진느",
    image: ming,
    postUrl: "https://www.instagram.com/p/DZb6ErtPzjs/",
    channels: [
      {
        label: "SOOP 방송국",
        url: "https://www.sooplive.com/station/battlebasa",
      },
    ],
  },
  {
    id: "ttohana",
    name: "또한아",
    image: ttohanaPoster,
    postUrl: "https://www.instagram.com/p/DcAWW96Su5P/",
    channels: [
      {
        label: "SOOP 방송국",
        url: "https://www.sooplive.com/station/mungchichi",
      },
    ],
  },
  {
    id: "ddun",
    name: "떤디",
    image: ddun,
    postUrl: "https://www.instagram.com/p/Db9kiONOnC_/",
    channels: [
      {
        label: "SOOP 방송국",
        url: "https://www.sooplive.com/station/sjsj372",
      },
    ],
  },
]

export function getPostUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null

  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null
  } catch {
    return null
  }
}

export default streamersData
