import imgImage1 from "figma:asset/50d712c92f1288aaa3b689fc83c5aa2169d6fa4b.png";
import imgImage2 from "figma:asset/6c727c697a5ac635081cbdd5cdbd31829d0690e8.png";
import imgImage3 from "figma:asset/e9c8844245a63f761e132c617fdc62659fbb9e40.png";
import imgImage4 from "figma:asset/138991ac508abb568c8f5dc756b2e84cb62b368e.png";
import imgImage5 from "figma:asset/e6199252181919d6132496a5eec9796ef729b23e.png";
import imgImage6 from "figma:asset/c37417d15deb5cd02af25c65e29c1136aabee380.png";
import imgImage7 from "figma:asset/b4c655e3150109e603b03cb044f73ad648f8dc95.png";
import imgImage8 from "figma:asset/313840b22a7367292e0d30f1ed5270feea69bfa8.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[936px] left-[221px] top-[218px] w-[937px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[913px] left-[1253px] top-[218px] w-[930px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute left-[2516px] size-[929px] top-[287px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <div className="absolute h-[645px] left-[165px] top-[1338px] w-[935px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <div className="absolute left-[1318px] size-[929px] top-[1216px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
      <div className="absolute h-[910px] left-[2533px] top-[1235px] w-[912px]" data-name="image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
      </div>
      <div className="absolute h-[914px] left-[221px] top-[2145px] w-[920px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <div className="absolute h-[661px] left-[1617px] top-[2271px] w-[916px]" data-name="image 8">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
      </div>
    </div>
  );
}