import img20171115700 from "figma:asset/2cf47f666abc79b92487a58181c98a86fc95a16a.png";
import img20171115760 from "figma:asset/d5bfd10ac9027cf62da5c3ff5f685d7e6b613cab.png";
import img20171115687 from "figma:asset/8c8819427e29c752ee851174b4cd7af769cbf9be.png";
import imgImage6 from "figma:asset/717d0be213102be86e3ef83fb58596a988c4f6d8.png";
import imgInk12 from "figma:asset/a25c8b173db76dc5ab8199a56993af473267b6b1.png";

function Group2() {
  return (
    <div className="absolute contents left-[40px] top-[299px]">
      <div className="absolute h-[307.974px] left-[41px] top-[300px] w-[651.056px]" data-name="2017-11-尚海湾_15700">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115700} />
      </div>
      <div className="absolute h-[308.79px] left-[712px] top-[300.21px] w-[561.381px]" data-name="2017-11-尚海湾_15760">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115760} />
      </div>
      <div className="absolute h-[307.958px] left-[1289.92px] top-[300px] w-[599.081px]" data-name="2017-11-尚海湾_15687">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115687} />
      </div>
    </div>
  );
}

function Group1() {
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
      <Group1 />
      <Group />
    </div>
  );
}

export default function ShanghaiBayGallery() {
  return (
    <div className="bg-white border border-black border-solid relative shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] size-full" data-name="Shanghai Bay Gallery">
      <div className="absolute bg-white content-stretch flex font-['Splash:Regular',sans-serif] gap-[41px] h-[42px] items-center leading-[normal] left-[999px] not-italic px-[78px] text-[20px] text-black top-[57px] w-[857px] whitespace-nowrap">
        <p className="relative shrink-0">ABOUT</p>
        <p className="relative shrink-0">DESIGN</p>
        <p className="relative shrink-0">RESEARCH</p>
        <p className="relative shrink-0">PORTFOLIO</p>
        <p className="relative shrink-0">CONTACT</p>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[581px] text-[16px] text-black top-[614px] w-[110px]">{`Atrium Lounge `}</p>
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[1142px] text-[16px] text-black top-[614px] w-[131px]">West Living room</p>
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[1745px] text-[16px] text-black top-[614px] w-[143px]">West Dinging room</p>
      <p className="absolute font-['Splash:Regular',sans-serif] leading-[normal] left-[44px] not-italic text-[#a81e1e] text-[32px] top-[44px] w-[203px]">Shanghai Bay</p>
      <Group2 />
      <Group3 />
      <div className="absolute h-[245.054px] left-[1599px] top-[779px] w-[284.522px]">
        <div className="absolute inset-[0.21%_3.86%_0_0]">
          <div className="absolute aspect-[192/188] left-[12.26%] pointer-events-none right-0 top-[9.53px]" data-name="ink 1 2">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[121.86%] left-0 max-w-none top-[-0.02%] w-full" src={imgInk12} />
            </div>
            <div aria-hidden="true" className="absolute border border-[#fffdfd] border-solid inset-0 shadow-[0px_4px_4px_0px_rgba(251,250,250,0.25)]" />
          </div>
        </div>
      </div>
    </div>
  );
}