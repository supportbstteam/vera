import React from "react"

const Countries = () => {
  const countries = [
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Austria",
    "Switzerland",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Portugal",
    "Sweden",
    "Denmark",
    "Norway",
    "Finland"
  ]

  return (
    <section className="relative bg-gray py-8 md:py-16">
      {/* Background Map Image */}
      <div
        className="absolute inset-0  z-0 bg-center bg-cover bg-no-repeat"
        // replace with actual image
        style={{ backgroundImage: "url('/assets/map.png')" }}
      ></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Active in{" "}
          <span className="text-[#C61AFF]">16+ European Countries</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {countries.map((country, index) => (
            <span
              key={index}
              className="border border-gray-300 rounded-full px-2 md:px-4 py-1 text-sm hover:bg-primary/10 transition"
            >
              {country}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries
