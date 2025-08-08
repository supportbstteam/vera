import Image from "next/image"
import React from "react"

const Card = ({ item }) => {
  const trendImage = {
    up: "/icons/up.png",
    down: "/icons/down.png"
  }
  return (
    <div className=" p-6 rounded-lg  grid grid-cols-[6fr_1fr] gap-2 border border-stock">
      <div className="flex flex-col gap-0">
        <h4>{item.title}</h4>
        <p className="text-3xl font-semibold my-4">{item.value}</p>
        <div className="flex items-center gap-2">
          <Image
            src={trendImage[item.trend]}
            alt="Card Image"
            width={25}
            height={25}
          />
          <p
            className={`${
              item.trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.percent} %
          </p>
          <p className="text-gray-500 text-sm">
            {item.trend} from {item.time}
          </p>
        </div>
      </div>
      <Image src={item.image} alt="Card Image" width={90} height={90} />
    </div>
  )
}

export default Card
