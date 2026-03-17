import img201910Isa24003 from "figma:asset/4ea742809c04ddea5b28abccc1ea9ce88899ca6d.png";
import img201910Isa24012 from "figma:asset/203d3b1fec1286ced697017608ec068d85be03b6.png";
import imgImg9478 from "figma:asset/e5f1f8e59184d1aab9e7dd2d183ea132ea16e3e9.png";

function Group2() {
  return (
    <div className="absolute contents left-[393px] top-[333px]">
      <div className="absolute h-[1482.943px] left-[393px] top-[333px] w-[2862.08px]" data-name="201910-ISA家具+肖像-24003">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img201910Isa24003} />
      </div>
      <div className="absolute h-[1482.943px] left-[3369px] top-[333px] w-[1112.485px]" data-name="201910-ISA家具+肖像-24012">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img201910Isa24012} />
      </div>
      <div className="absolute h-[1482.943px] left-[4545px] top-[333px] w-[1112.527px]" data-name="IMG_9478">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg9478} />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents leading-[normal] left-[928px] text-black top-[2171px]">
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal h-[88px] left-[928px] text-[16px] top-[2231.04px] w-[855px]">{`REAL ESTATE: This mockup room was established for the FF&E design project of One Park, a 14,000-square-meter serviced apartment development in Phnom Penh, Cambodia. To guarantee the smooth execution of this international project, we conducted the design work at our Shanghai studio, managed production at manufacturing facilities, and constructed a full-scale 1:1 model room to test and validate all furnishing elements.`}</p>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] font-bold h-[37.441px] left-[928px] text-[32px] top-[2171px] w-[857px]">{`Mockup Room for PPOP Serviced Apartment, 2019 `}</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[928px] top-[2171px]">
      <Group1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal inset-[35.96%_68.93%_63.5%_29.71%] leading-[normal] text-[16px] text-black">
        <p className="mb-0">Location: Cambodia</p>
        <p>Area: 14,000 sqm</p>
      </div>
      <Group2 />
      <Group />
    </div>
  );
}