import React, { memo } from "react";

const Card = memo(({ index, card, onChange }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter Topic"
        onChange={(e) => onChange(index, "topic", e.target.value)}
        className=" block w-full  p-2 text-lg border border-gray-400 rounded-xl"
      />

      <textarea
        name="content"
        value={card.content}
        placeholder="Enter Content"
        onChange={(e) => onChange(index, "content", e.target.value)}
        className="min-h-[50vh] w-full block p-2 border border-gray-400 rounded-xl "
      ></textarea>
    </>
  );
});

export default Card;
