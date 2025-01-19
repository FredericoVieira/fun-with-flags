import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type ErrorProps = {
  text: string;
};

const Error = ({ text }: ErrorProps) => {
  return (
    <div className="flex flex-col m-auto items-center">
      <ExclamationCircleIcon className="size-6 mb-2" />
      <span className="text-sm mb-1">Ops, something went wrong!</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Error;
