import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto items-center justify-center pr-64"> {/* Added pr-8 for right padding */}
      {/* Vertical Text */}
      <div className="hidden md:flex items-center">
        <p className="rotate-[270deg] text-lg tracking-widest font-semibold whitespace-nowrap origin-center h-[500px] flex items-center">
          EXPLORE NEW AND POPULAR STYLES
        </p>
      </div>

      {/* Large Left Image */}
      <div className="w-full md:w-2/3 flex justify-center">
        <Image
          src="/Image (1).png"
          alt="Orange Chair"
          width={600}
          height={600}
          className="w-full max-w-[500px] h-[500px] object-cover shadow-lg hover:shadow-2xl transition"
        />
      </div>

      {/* Right Grid of Images */}
      <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <Image
            src="/white-chair.png"
            alt="Chair 1"
            width={300}
            height={300}
            className="w-full max-w-[240px] h-[240px] object-cover shadow-lg hover:shadow-2xl transition"
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/Image (3).png"
            alt="Chair 2"
            width={300}
            height={300}
            className="w-full max-w-[240px] h-[240px] object-cover shadow-lg hover:shadow-2xl transition"
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/brown-chair.png"
            alt="Chair 3"
            width={300}
            height={300}
            className="w-full max-w-[240px] h-[240px] object-cover shadow-lg hover:shadow-2xl transition"
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/Image (3).png"
            alt="Chair 4"
            width={300}
            height={300}
            className="w-full max-w-[240px] h-[240px] object-cover shadow-lg hover:shadow-2xl transition"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
