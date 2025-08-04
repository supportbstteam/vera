import Image from "next/image"

const categories = [
  {
    title: "Mobile & Tablets",
    subtitle: "Stay Connected in Style",
    image: "/assets/phone.png",
    bg: "bg-[#eef1f4]",
    span:
      "col-start-1 col-end-12 row-start-1 row-end-3 md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-5"
  },
  {
    title: "Laptops & Computers",
    subtitle: "Power Up Your Productivity",
    image: "/assets/laptop.png",
    bg: "bg-[#eef1f4]",
    span:
      "col-start-1 col-end-12 row-start-3 row-end-5 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-3"
  },
  {
    title: "TV, Video & Audio",
    subtitle: "",
    image: "/assets/tv.png",
    bg: "bg-[#eef1f4]",
    span:
      "col-start-1 col-end-12 row-start-5 row-end-7 md:col-start-5 md:col-end-7 md:row-start-3 md:row-end-5"
  },
  {
    title: "Other Accessories",
    subtitle: "",
    image: "/assets/headphone.png",
    bg: "bg-[#eef1f4]",
    span:
      "col-start-1 col-end-12 row-start-7 row-end-9 md:col-start-7 md:col-end-9 md:row-start-3 md:row-end-5"
  },
  {
    title: "Home Decor",
    subtitle: "Style Your Space Effortlessly",
    image: "/assets/chair.jpg",
    bg: "bg-[#84A8A9]",
    text: "text-white",
    span:
      "col-start-1 col-end-12 row-start-9 row-end-12 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-5"
  }
]

export default function CategoryGrid() {
  return (
    // <section className="max-w-7xl m-auto grid gap-4 p-4 py-8 h-fit md:h-[700px] md:py-16">
    //     {categories.map((cat, i) => (
    //         <div
    //             key={i}
    //             className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  ${cat.bg} ${cat.span || ""}`}
    //         >
    //             <div className={`mb-4 ${cat.text || "text-black"}`}>
    //                 <h3 className="text-2xl font-semibold">{cat.title}</h3>
    //                 {cat.subtitle && <p className="text-lg">{cat.subtitle}</p>}
    //             </div>
    //             <div className="grid place-items-end h-full">

    //                 <Image
    //                     src={cat.image}
    //                     alt={cat.title}
    //                     width={300}
    //                     height={200}
    //                     className="object-contain "
    //                 />
    //             </div>
    //         </div>
    //     ))}
    // </section>
    <section className="max-w-7xl m-auto grid gap-4 p-4 py-8 h-fit md:h-[700px] md:py-16">
      <div
        className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  bg-[#eef1f4] col-start-1 col-end-12 row-start-1 row-end-3 md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-5`}
      >
        <div className="mb-4 text-black">
          <h3 className="text-2xl font-semibold">Mobile & Tablets</h3>

          <p className="text-lg">Stay Connected in Style</p>
        </div>
        <div className="grid place-items-end h-full">
          <Image
            src="/assets/phone.png"
            alt="Mobile & Tablets"
            width={300}
            height={200}
            className="object-contain "
          />
        </div>
      </div>

      <div
        className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  bg-[#eef1f4] col-start-1 col-end-12 row-start-3 row-end-5 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-3`}
      >
        <div className="mb-4 text-black">
          <h3 className="text-2xl font-semibold">Laptops & Computers</h3>

          <p className="text-lg">Power Up Your Productivity</p>
        </div>
        <div className="grid place-items-end h-full">
          <Image
            src="/assets/laptop.png"
            alt="Mobile & Tablets"
            width={300}
            height={200}
            className="object-contain "
          />
        </div>
      </div>

      <div
        className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  bg-[#eef1f4] col-start-1 col-end-12 row-start-5 row-end-7 md:col-start-5 md:col-end-7 md:row-start-3 md:row-end-5`}
      >
        <div className="mb-4 text-black">
          <h3 className="text-2xl font-semibold">TV, Video & Audio</h3>

          <p className="text-lg"></p>
        </div>
        <div className="grid place-items-end h-full">
          <Image
            src="/assets/tv.png"
            alt="Mobile & Tablets"
            width={300}
            height={200}
            className="object-contain "
          />
        </div>
      </div>

      <div
        className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  bg-[#eef1f4] col-start-1 col-end-12 row-start-7 row-end-9 md:col-start-7 md:col-end-9 md:row-start-3 md:row-end-5`}
      >
        <div className="mb-4 text-black">
          <h3 className="text-2xl font-semibold">Other Accessories</h3>

          <p className="text-lg"></p>
        </div>
        <div className="grid place-items-end h-full">
          <Image
            src="/assets/headphone.png"
            alt="Mobile & Tablets"
            width={300}
            height={200}
            className="object-contain "
          />
        </div>
      </div>

      <div
        className={`p-4 rounded-lg flex flex-col justify-between overflow-hidden  bg-[#84A8A9] col-start-1 col-end-12 row-start-9 row-end-12 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-5`}
      >
        <div className="mb-4 text-white">
          <h3 className="text-2xl font-semibold">Home Decor</h3>

          <p className="text-lg">Style Your Space Effortlessly</p>
        </div>
        <div className="grid place-items-end h-full">
          <Image
            src="/assets/chair.jpg"
            alt="Mobile & Tablets"
            width={300}
            height={200}
            className="object-contain "
          />
        </div>
      </div>
    </section>
  )
}
