import { useRouter } from "next/router";
import BackSvg from "~/public/icons/left-arrow.svg";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm hover:bg-[#94a3b8] hover:bg-opacity-25 rounded-lg py-2 px-3"
    >
      <span className="icon-12">
        <BackSvg />
      </span>
      Back
    </button>
  );
};

export default BackButton;
