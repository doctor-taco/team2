import DownIcon from "@/assets/icons/TriangleDown.icon.svg";
import CheckIcon from "@/assets/icons/Check.icon.svg";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Status from "@/components/common/Chip/Status.chip";

interface DropdownProgressProps {
  selectedTitle: string;
  options: string[];
  onChange: (newTitle: string) => void;
}

const DropdownProgress: React.FC<DropdownProgressProps> = ({
  selectedTitle,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => setIsOpen(false), 0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[180px]" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-full h-[48px] px-3 py-2 bg-white border border-gray-300 rounded-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Status value={selectedTitle} />
        <Image src={DownIcon} alt="" width={26} height={26} />
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full h-fit mt-[2px] bg-white border border-gray-300 rounded-md shadow-md top-full z-50">
          {options.map((title) => (
            <button
              key={title}
              className={
                "flex items-center px-[16px] py-[8px] w-full h-[48px] text-left hover:bg-gray-100"
              }
              onClick={() => {
                setIsOpen(false);
                onChange(title);
              }}
            >
              <div className="w-[30px]">
                {title === selectedTitle && <Image src={CheckIcon} alt="" />}
              </div>
              <Status value={title} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownProgress;
