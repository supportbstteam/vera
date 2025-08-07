import { ArrowRight } from "lucide-react"
import Button from "./ui/button"

const GrowthSection = () => {
  return (
    <section className=" bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 grid items-stretch md:grid-cols-[4fr_3fr_3fr] gap-8 ">
        {/* Left Text */}
        <div className="flex justify-center items-center pr-40">
          <div >
            <h2 className="h2 text-white">
              WE HELP GROW <br />{" "}
              <span className="text-primary">BRANDS & VENDORS</span>
            </h2>
            <p className="text-gray-100">
              VERA helps you connect with serious buyers, increase visibility, and win more business.
            </p>
          </div>
        </div>
        {/* Card 1 */}
        <div className="border border-gray-500 rounded-md p-6">
          <h3 className="h3 text-white">Trusted by Leading Brands</h3>
          <p className="text-base text-gray-100 mb-4">
            VERA partners with <strong className="font-bold">trusted brands</strong> across Europe to
            ensure their products reach high-intent buyers — with transparency,
            speed, and guaranteed value.
          </p>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            href="/join"
           
          >
            Partner with Us
          </Button>
        </div>

        {/* Card 2 */}
        <div className="border  border-gray-500 rounded-md p-6">
          <h3 className="h3 text-white">More Buyers. More Orders.</h3>
          <p className="text-base text-gray-100 mb-4">
            Join thousands of verified vendors who receive daily quote requests
            from ready-to-buy customers — all across Europe.
          </p>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            href="/join"
            
          >
            Join as a Seller
          </Button>
        </div>
      </div>
    </section>
  )
}

export default GrowthSection