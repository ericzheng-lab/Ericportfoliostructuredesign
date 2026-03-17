import imgImage1 from "figma:asset/50d712c92f1288aaa3b689fc83c5aa2169d6fa4b.png";
import imgImage3 from "figma:asset/e9c8844245a63f761e132c617fdc62659fbb9e40.png";
import imgImage4 from "figma:asset/138991ac508abb568c8f5dc756b2e84cb62b368e.png";
import imgImage5 from "figma:asset/e6199252181919d6132496a5eec9796ef729b23e.png";
import imgImage9 from "figma:asset/cc2b6f230da5491a8b7369c80075d508cd36fbd3.png";
import imgImage10 from "figma:asset/9efc2f3a2e05ab98b5943e853d64a53b638876c2.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[500px] left-0 top-[525px] w-[501px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[500px] left-[1246px] top-[525px] w-[627px]" data-name="image 3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[125.37%] left-0 max-w-none top-[-16.19%] w-full" src={imgImage3} />
        </div>
      </div>
      <div className="absolute h-[500px] left-[511px] top-[525px] w-[725px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <div className="absolute h-[500px] left-[898px] top-0 w-[463px]" data-name="image 5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[107.99%]" src={imgImage5} />
        </div>
      </div>
      <div className="absolute h-[500px] left-0 top-0 w-[887px]" data-name="image 9">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[118.28%] left-0 max-w-none top-[-0.04%] w-full" src={imgImage9} />
        </div>
      </div>
      <div className="absolute left-[1373px] size-[500px] top-0" data-name="image 10">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
      </div>
    </div>
  );
}