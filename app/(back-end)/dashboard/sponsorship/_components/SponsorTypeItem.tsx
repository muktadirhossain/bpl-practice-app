import SponsorTypeDeleteButton from "./SponsorTypeDeleteButton";

export default function SponsorTypeItem({ sponsorType }: any) {
  return (
    <li
      className="
        flex 
        text-durbarDeep 
        justify-between 
        items-center 
        px-2.5 
        py-1.5 
        rounded 
        bg-durbarLight/15 
        my-1"
    >
      <span>{sponsorType.sponsorship_type}</span>
      <SponsorTypeDeleteButton id={String(sponsorType?._id)} />
    </li>
  );
}
