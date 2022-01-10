import React from "react";
import FriendItem from "./FriendItems";

export default function FriendList({ data, onDelete, onFavorite }) {
  return (
    <ul className="list__wrapper">
      {data.map((item) => (
        <FriendItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onFavorite={onFavorite}
        />
      ))}
    </ul>
  );
}
