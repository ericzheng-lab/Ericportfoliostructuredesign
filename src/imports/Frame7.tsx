import img201711157161 from "figma:asset/26c71a71a09097e10d14099d232bcedc5558d408.png";
import img20171115700 from "figma:asset/2cf47f666abc79b92487a58181c98a86fc95a16a.png";
import img20171115760 from "figma:asset/d5bfd10ac9027cf62da5c3ff5f685d7e6b613cab.png";
import img20171115687 from "figma:asset/8c8819427e29c752ee851174b4cd7af769cbf9be.png";

function Group() {
  return (
    <div className="absolute contents left-[39px] top-[1571px]">
      <div className="absolute h-[725.632px] left-[39px] top-[1693px] w-[1533.985px]" data-name="2017-11-尚海湾_15700">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115700} />
      </div>
      <div className="absolute h-[727.556px] left-[1125px] top-[2006px] w-[1322.698px]" data-name="2017-11-尚海湾_15760">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115760} />
      </div>
      <div className="absolute h-[725.596px] left-[2217px] top-[1571px] w-[1411.525px]" data-name="2017-11-尚海湾_15687">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img20171115687} />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[1486px] left-[170px] top-0 w-[3086px]" data-name="2017-11-尚海湾_15716 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img201711157161} />
      </div>
      <Group />
    </div>
  );
}