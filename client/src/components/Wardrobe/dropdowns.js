import { useState, useRef, useEffect } from 'react';

export function useWardrobeDropdowns() {
  // Dropdown/menu state
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showSuggestionsWin, setShowSuggestionsWin] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [cartDropdownPos, setCartDropdownPos] = useState({ left: 0, top: 0 });
  const [favoritesDropdownPos, setFavoritesDropdownPos] = useState({ left: 0, top: 0 });
  const [toolsDropdownPos, setToolsDropdownPos] = useState({ left: 0, top: 0 });
  const [suggestionsDropdownPos, setSuggestionsDropdownPos] = useState({ left: 0, top: 0 });
  const [searchDropdownPos, setSearchDropdownPos] = useState({ left: 0, top: 0 });
  // Refs
  const menuBarRef = useRef();
  const cartMenuRef = useRef();
  const favoritesMenuRef = useRef();
  const toolsMenuRef = useRef();
  const suggestionsMenuRef = useRef();
  const searchMenuRef = useRef();
  const cartDropdownRef = useRef();
  const favoritesDropdownRef = useRef();
  const toolsDropdownRef = useRef();
  const suggestionsDropdownRef = useRef();
  const searchDropdownRef = useRef();

  // Logic for closing dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target) && cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
        setShowCartPanel(false);
      }
      if (favoritesDropdownRef.current && !favoritesDropdownRef.current.contains(event.target) && favoritesMenuRef.current && !favoritesMenuRef.current.contains(event.target)) {
        setShowFavorites(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target) && toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setShowTools(false);
      }
      if (suggestionsDropdownRef.current && !suggestionsDropdownRef.current.contains(event.target) && suggestionsMenuRef.current && !suggestionsMenuRef.current.contains(event.target)) {
        setShowSuggestionsWin(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target) && searchMenuRef.current && !searchMenuRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    if (showCartPanel || showFavorites || showTools || showSuggestionsWin || showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCartPanel, showFavorites, showTools, showSuggestionsWin, showSearchDropdown]);

  // Dropdown open/close handlers
  const handleDropdown = (setter, setPos, menuRef) => e => {
    e.preventDefault();
    e.stopPropagation();
    const itemRect = menuRef.current.getBoundingClientRect();
    setPos({
      left: itemRect.left,
      top: itemRect.bottom
    });
    // Close other dropdowns first
    if (setter !== setShowCartPanel) setShowCartPanel(false);
    if (setter !== setShowFavorites) setShowFavorites(false);
    if (setter !== setShowTools) setShowTools(false);
    if (setter !== setShowSuggestionsWin) setShowSuggestionsWin(false);
    if (setter !== setShowSearchDropdown) setShowSearchDropdown(false);
    // Then toggle the current dropdown
    setter(v => !v);
  };

  return {
    // State
    showCartPanel, setShowCartPanel,
    showFavorites, setShowFavorites,
    showTools, setShowTools,
    showSuggestionsWin, setShowSuggestionsWin,
    showSearchDropdown, setShowSearchDropdown,
    cartDropdownPos, setCartDropdownPos,
    favoritesDropdownPos, setFavoritesDropdownPos,
    toolsDropdownPos, setToolsDropdownPos,
    suggestionsDropdownPos, setSuggestionsDropdownPos,
    searchDropdownPos, setSearchDropdownPos,
    // Refs
    menuBarRef, cartMenuRef, favoritesMenuRef, toolsMenuRef, suggestionsMenuRef, searchMenuRef,
    cartDropdownRef, favoritesDropdownRef, toolsDropdownRef, suggestionsDropdownRef, searchDropdownRef,
    // Handlers
    handleDropdown
  };
} 