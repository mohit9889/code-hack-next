import Link from 'next/link';
import AddSvg from '~/public/icons/add.svg';

const AddTrickButton = () => (
  <Link
    href="/new"
    className="add-trick flex items-center rounded-lg bg-orange p-3 text-base font-medium text-white shadow-lg hover:bg-[#c2410c]"
  >
    <span className="icon icon-white mr-2">
      <AddSvg />
    </span>
    <span className="flex flex-col text-sm">
      <span>Got a trick? Share it now!</span>
      <span>No sign-up, just show-up and enjoy!</span>
    </span>
  </Link>
);

export default AddTrickButton;
