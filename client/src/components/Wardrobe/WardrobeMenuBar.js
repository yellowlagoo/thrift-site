import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function WardrobeMenuBar({
  menuBarRef,
  cartMenuRef,
  favoritesMenuRef,
  toolsMenuRef,
  searchMenuRef,
  onCartClick,
  onFavoritesClick,
  onToolsClick,
  onSearchClick,
  cartDropdown,
  favoritesDropdown,
  toolsDropdown,
  searchDropdown
}) {
  return (
    <div className="wardrobe-menu">
      <div className="menu-bar" ref={menuBarRef}>
        <span className="menu-item" onClick={() => window.location = '/'}>Home</span>
        <span className="menu-item" ref={cartMenuRef} onClick={onCartClick}>Cart</span>
        <span className="menu-item" ref={favoritesMenuRef} onClick={onFavoritesClick}>Favorites</span>
        <span className="menu-item" ref={toolsMenuRef} onClick={onToolsClick}>Tools</span>
        <span className="menu-item" ref={searchMenuRef} onClick={onSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      {cartDropdown}
      {favoritesDropdown}
      {toolsDropdown}
      {searchDropdown}
    </div>
  );
} 