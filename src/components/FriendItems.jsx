import React from "react";

export default function FriendItem({ item, onFavorite, onDelete }) {
  return (
    <li key={item.id} className="list__item" data-testid={`person-${item.id}`}>
      <div className="person">
        <p className="item__name">{item.name}</p>
        <span className="item__subtext">is your friend</span>
      </div>
      <div className="item__action">
        <span
          className="icon"
          onClick={() => onFavorite(item.id)}
          data-testid="fav-icon"
        >
          <i className={`${item.isFav ? "fas" : "far"} fa-star`}></i>
        </span>
        <span
          className="icon"
          onClick={() => onDelete(item.id)}
          data-testid="delete-icon"
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </li>
  );
}
