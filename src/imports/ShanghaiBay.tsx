import imgIsaLogoOnecolor2 from "figma:asset/dcfe054c3b8381c7c398312c0704e809dcb1f0c6.png";
import imgInk12 from "figma:asset/a25c8b173db76dc5ab8199a56993af473267b6b1.png";
import img201711157161 from "figma:asset/26c71a71a09097e10d14099d232bcedc5558d408.png";
import imgImage5 from "figma:asset/01dfa5315dc618f86581540bad9b3325a09a8a61.png";
import imgImage7 from "figma:asset/97b95d0cf5c4e080494e366d8c84a73594fcfb63.png";
import imgImage6 from "figma:asset/717d0be213102be86e3ef83fb58596a988c4f6d8.png";

function Group1() {
  return (
    <div className="absolute contents left-[1064px] top-[376px]">
      <div className="absolute h-[190px] left-[1078px] top-[377px] w-[95px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
      <div className="absolute left-[1065px] size-[121px] top-[594px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[45px] top-[849px]">
      <div className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal h-[52px] leading-[normal] left-[99px] text-[24px] text-black top-[854px] w-[759px]">
        <p className="mb-0">Bronze A’ Design Award Winner</p>
        <p className="mb-0">in Interior Space and Exhibition Design Category, 2018 - 2019.</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute h-[70px] left-[45px] top-[849px] w-[43px]" data-name="image 6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[115.18%] left-[-61.87%] max-w-none top-[-8.09%] w-[223.74%]" src={imgImage6} />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents leading-[normal] left-[870px] text-black top-[861px]">
      <div className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal inset-[79.72%_32.6%_15.46%_56.98%] text-[16px]">
        <p className="mb-0">Location: Shanghai</p>
        <p>Area: 1200 sqm</p>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] font-bold h-[43px] left-[870px] text-[32px] top-[861px] w-[231px]">Shanghai Bay</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[44px] top-[848px]">
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[45px] text-[16px] text-black top-[938px] w-[1044px]">Residence and Private Club: This 1200 square meters apartment at the West Bund of Huangpu River in Shanghai was chosen by a film investor to reside, work, recreate and socialize. A bow shape site with the long side facing to the West Bund where is arranged with different space functions. Materials are kept as simple as they could be, while glass partitions are applied to allow the transparent vision and private feelings. The design pulled the focus away from thinking of the daily necessities and reexamined the definition of residence with a poetic perspective to create a natural gallery living style.</p>
      <Group2 />
      <Group />
    </div>
  );
}

export default function ShanghaiBay() {
  return (
    <div className="bg-white border border-black border-solid relative shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] size-full" data-name="Shanghai Bay">
      <div className="absolute h-[1420px] left-[869px] top-[-192px] w-[1217px]" data-name="isa-logo-onecolor 2">
        <div className="absolute inset-0 opacity-40 rounded-[608.5px]" data-name="isa-logo-onecolor 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[608.5px]">
            <img alt="" className="absolute h-[253.4%] left-[-19.71%] max-w-none top-[-75.54%] w-[295.66%]" src={imgIsaLogoOnecolor2} />
          </div>
        </div>
      </div>
      <div className="absolute h-[244.531px] left-[1599px] top-[779px] w-[273.531px]">
        <div className="absolute aspect-[192/188] left-[12.26%] pointer-events-none right-0 top-[9.53px]" data-name="ink 1 2">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[121.86%] left-0 max-w-none top-[-0.02%] w-full" src={imgInk12} />
          </div>
          <div aria-hidden="true" className="absolute border border-[#fffdfd] border-solid inset-0 shadow-[0px_4px_4px_0px_rgba(251,250,250,0.25)]" />
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex font-['Splash:Regular',sans-serif] gap-[41px] h-[42px] items-center leading-[normal] left-[999px] not-italic px-[78px] text-[20px] text-black top-[57px] w-[857px] whitespace-nowrap">
        <p className="relative shrink-0">ABOUT</p>
        <p className="relative shrink-0">DESIGN</p>
        <p className="relative shrink-0">RESEARCH</p>
        <p className="relative shrink-0">PORTFOLIO</p>
        <p className="relative shrink-0">CONTACT</p>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[938px] text-[16px] text-black top-[704px] w-[110px]">{`Atrium Lounge `}</p>
      <div className="absolute h-[505px] left-[-1px] top-[194px] w-[1049px]" data-name="2017-11-尚海湾_15716 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img201711157161} />
      </div>
      <p className="absolute font-['Splash:Regular',sans-serif] h-[49px] leading-[normal] left-[44px] not-italic text-[#a81e1e] text-[32px] top-[44px] w-[235px]">Shanghai Bay</p>
      <Group1 />
      <Group3 />
    </div>
  );
}