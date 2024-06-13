import React, { useState, FC } from "react";

interface StarRatingProps {
  totalStars?: number;
  value: number;
  onChange: (value: number) => void;
}

const StarRating: FC<StarRatingProps> = ({
  totalStars = 5,
  value,
  onChange,
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (v, i) => (
        <Star
          key={i}
          filled={i < (hover || value)}
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(value)}
        />
      ))}
    </div>
  );
};

interface StarProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Star: FC<StarProps> = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <svg
    className={`w-8 h-8 cursor-pointer ${
      filled ? "text-yellow-500" : "text-gray-300"
    }`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927C9.326 2.06 10.673 2.06 10.951 2.927l1.086 3.32a1 1 0 00.95.69h3.462c.905 0 1.282 1.161.55 1.688l-2.8 2.03a1 1 0 00-.364 1.118l1.086 3.32c.278.867-.725 1.588-1.45 1.117l-2.8-2.03a1 1 0 00-1.175 0l-2.8 2.03c-.724.471-1.727-.25-1.45-1.117l1.086-3.32a1 1 0 00-.364-1.118l-2.8-2.03c-.732-.527-.355-1.688.55-1.688h3.462a1 1 0 00.95-.69l1.086-3.32z" />
  </svg>
);

export default StarRating;
