import imgPlan1 from "figma:asset/010389df7a73a5bc9eb5354ce8b12926344620ed.png";
import imgImg4844 from "figma:asset/01eef394ebb764813add0ba72644f35c9591b19c.png";
import imgImg48431 from "figma:asset/0b223153d4efa3ae1bb97c0576b063c9455a8b7e.png";
import imgImg4848 from "figma:asset/6d84c78208c64682283b5591ab52e25287e05ac0.png";
import imgImg2442 from "figma:asset/8fdf916062aff293f6d0ea509749fcbaa248f1be.png";
import imgKvHengBan2 from "figma:asset/8e5f34ff0a4388a4d26a66124d6d79068d2106ef.png";
import imgInk12 from "figma:asset/a25c8b173db76dc5ab8199a56993af473267b6b1.png";

function Group1() {
  return (
    <div className="absolute contents leading-[normal] left-[960px] text-black top-[715px]">
      <div className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal inset-[70.93%_9.06%_25.56%_83.28%] text-[16px] whitespace-pre-wrap">
        <p className="mb-0">{`Location: Shanghai `}</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute font-['Noto_Sans_JP:Bold',sans-serif] font-bold h-[16.905px] left-[960px] text-[32px] top-[715px] w-[823.271px]">
        <p className="mb-0">Playground @ Design Shanghai, 03-06 JUNE, 2021</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal left-[960px] text-[24px] top-[761px] w-[513px]">An Installation for Seesaw Roundtable’s Debut</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[960px] top-[715px]">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[959px] top-[714px]">
      <Group />
      <div className="absolute font-['Noto_Sans_JP:Regular',sans-serif] font-normal h-[152px] leading-[normal] left-[960px] text-[16px] text-black top-[818px] w-[655px] whitespace-pre-wrap">
        <p className="mb-0">At Design Shanghai, Asia’s leading international design event, Isabelle recreates the Seesaw Roundtable within a vast 9m by 9m space. This recreation is another form of expression: as users balance on the spherical seats, their bodies are immersed in a dazzling kaleidoscope. The reality of time and space is reconstructed, and individuals regain control over their own scale.</p>
        <p className="mb-0">Drawing inspiration from everyday life, the project deconstructs traditional functions and re-imagines the setting. Through spatial design, the designer redefines human scale and interaction within the environment.</p>
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[959px] top-[599px]">
      <div className="absolute h-[100.129px] left-[1060.4px] top-[600px] w-[99.603px]" data-name="IMG_2442">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[240.37%]" src={imgImg2442} />
        </div>
      </div>
      <div className="absolute h-[100.129px] left-[960px] top-[600px] w-[100.739px]" data-name="KV_Heng_Ban 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[126.22%] left-[-15.79%] max-w-none top-[-17.07%] w-[223.1%]" src={imgKvHengBan2} />
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundGallery() {
  return (
    <div className="bg-white border border-black border-solid relative shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] size-full" data-name="Playground Gallery">
      <div className="absolute h-[1080px] left-[-1px] opacity-10 top-[-1px] w-[1920px]" data-name="plan 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[226.66%] left-[-30.16%] max-w-none top-[-77.26%] w-[165.53%]" src={imgPlan1} />
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex font-['Splash:Regular',sans-serif] gap-[41px] h-[42px] items-center leading-[normal] left-[999px] not-italic px-[78px] text-[20px] text-black top-[57px] w-[857px] whitespace-nowrap">
        <p className="relative shrink-0">ABOUT</p>
        <p className="relative shrink-0">DESIGN</p>
        <p className="relative shrink-0">RESEARCH</p>
        <p className="relative shrink-0">PORTFOLIO</p>
        <p className="relative shrink-0">CONTACT</p>
      </div>
      <p className="absolute font-['Splash:Regular',sans-serif] leading-[normal] left-[44px] not-italic text-[#a81e1e] text-[32px] top-[44px] w-[163px]">Playground</p>
      <Group2 />
      <div className="absolute h-[321px] left-[910px] top-[202px] w-[481px]" data-name="IMG_4844">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg4844} />
      </div>
      <div className="absolute h-[597px] left-[-1px] top-[202px] w-[895px]" data-name="IMG_4843 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg48431} />
      </div>
      <div className="absolute h-[321px] left-[1407px] top-[202px] w-[482px]" data-name="IMG_4848">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg4848} />
      </div>
      <Group3 />
      <div className="absolute h-[244.531px] left-[1599px] top-[779px] w-[273.531px]">
        <div className="absolute aspect-[192/188] left-[12.26%] pointer-events-none right-0 top-[9.53px]" data-name="ink 1 2">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[121.86%] left-0 max-w-none top-[-0.02%] w-full" src={imgInk12} />
          </div>
          <div aria-hidden="true" className="absolute border border-[#fffdfd] border-solid inset-0 shadow-[0px_4px_4px_0px_rgba(251,250,250,0.25)]" />
        </div>
      </div>
    </div>
  );
}