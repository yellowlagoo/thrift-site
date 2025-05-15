import React from 'react';
import { useCart } from '../Cart/CartContext';
import { useWishlist } from '../Wishlist/WishlistContext';
import { tops, bottoms, getTopObj, getBottomObj, getStyleSuggestionsAI, clothingItems } from './model';
import { WardrobeView, WardrobeMenuBar, CartPanel, FavoritesPanel, ToolsDropdown } from './view';
import StyleSuggestionsWin2k from './old/StyleSuggestionsWin2k';
import ConfettiGlitter from './old/ConfettiGlitter';
import PopupWin2k from './old/PopupWin2k';
import { useWardrobeDropdowns } from './dropdowns';
import { useWardrobeEffects } from './effects';

export function WardrobeController() {
  // Clothing state
  const [topIdx, setTopIdx] = React.useState(0);
  const [bottomIdx, setBottomIdx] = React.useState(0);
  const { addToCart, removeFromCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [searchValue, setSearchValue] = React.useState('');

  // Dropdowns and effects
  const dropdowns = useWardrobeDropdowns();
  const effects = useWardrobeEffects();

  // Clothing logic
  const topObj = getTopObj(topIdx);
  const bottomObj = getBottomObj(bottomIdx);
  const topInCart = cart.some(item => item.id === topObj.id);
  const bottomInCart = cart.some(item => item.id === bottomObj.id);
  const topInWishlist = wishlist.some(item => item.id === topObj.id);
  const bottomInWishlist = wishlist.some(item => item.id === bottomObj.id);
  const nextTop = () => setTopIdx((topIdx + 1) % tops.length);
  const prevTop = () => setTopIdx((topIdx - 1 + tops.length) % tops.length);
  const nextBottom = () => setBottomIdx((bottomIdx + 1) % bottoms.length);
  const prevBottom = () => setBottomIdx((bottomIdx - 1 + bottoms.length) % bottoms.length);
  const handleAddTopToCart = () => {
    if (topObj && !topInCart) {
      addToCart(topObj);
      effects.showPopup('Top added to your cart!');
    } else if (topObj && topInCart) {
      removeFromCart(topObj.id);
      effects.showPopup('Top removed from your cart.');
    }
  };
  const handleAddBottomToCart = () => {
    if (bottomObj && !bottomInCart) {
      addToCart(bottomObj);
      effects.showPopup('Bottom added to your cart!');
    } else if (bottomObj && bottomInCart) {
      removeFromCart(bottomObj.id);
      effects.showPopup('Bottom removed from your cart.');
    }
  };
  const handleAddTopToWishlist = () => {
    if (!topInWishlist) {
      addToWishlist(topObj);
      effects.showPopup('Added to Favorites!');
    } else {
      removeFromWishlist(topObj.id);
      effects.showPopup('Removed from Favorites.');
    }
  };
  const handleAddBottomToWishlist = () => {
    if (!bottomInWishlist) {
      addToWishlist(bottomObj);
      effects.showPopup('Added to Favorites!');
    } else {
      removeFromWishlist(bottomObj.id);
      effects.showPopup('Removed from Favorites.');
    }
  };
  const handleSaveOutfit = () => {
    const top = getTopObj(topIdx);
    const bottom = getBottomObj(bottomIdx);
    if (top && bottom) {
      addToWishlist({
        id: `outfit-${top.id}-${bottom.id}`,
        type: 'outfit',
        top,
        bottom,
        name: `${top.name} + ${bottom.name} (Outfit)`,
        image: top.image
      });
      effects.showPopup('Outfit (top + bottom) added to your wishlist!');
    } else if (top || bottom) {
      addToWishlist(top || bottom);
      effects.showPopup('Item added to your wishlist!');
    } else {
      effects.showPopup('Please select at least one item to save to your wishlist.');
    }
  };
  const handleAddToCart = () => {
    const top = getTopObj(topIdx);
    const bottom = getBottomObj(bottomIdx);
    const items = [top, bottom].filter(Boolean);
    if (items.length === 0) {
      effects.showPopup('Please select at least one item to add to your cart.');
      return;
    }
    items.forEach(item => addToCart(item));
    effects.showPopup('Outfit items added to your cart!');
  };
  // Suggestions logic
  const aiSuggestions = getStyleSuggestionsAI(clothingItems);
  const handleSuggestionClick = (topIdx, bottomIdx) => {
    setTopIdx(topIdx);
    setBottomIdx(bottomIdx);
    dropdowns.setShowSuggestionsWin(false);
  };
  // Dropdowns
  const cartDropdown = dropdowns.showCartPanel && (
    <div ref={dropdowns.cartDropdownRef} style={{ position: 'fixed', top: dropdowns.cartDropdownPos.top, left: dropdowns.cartDropdownPos.left, zIndex: 300 }}>
      <CartPanel cart={cart} removeFromCart={removeFromCart} showPopup={effects.showPopup} setShowCartPanel={dropdowns.setShowCartPanel} setShowConfetti={effects.setShowConfetti} setConfettiOrigin={effects.setConfettiOrigin} navigate={window.location.assign} />
    </div>
  );
  const favoritesDropdown = dropdowns.showFavorites && (
    <div ref={dropdowns.favoritesDropdownRef} style={{ position: 'fixed', top: dropdowns.favoritesDropdownPos.top, left: dropdowns.favoritesDropdownPos.left, zIndex: 300 }}>
      <FavoritesPanel wishlist={wishlist} setShowFavorites={dropdowns.setShowFavorites} />
    </div>
  );
  const toolsDropdown = dropdowns.showTools && (
    <div ref={dropdowns.toolsDropdownRef} style={{ position: 'fixed', top: dropdowns.toolsDropdownPos.top, left: dropdowns.toolsDropdownPos.left, zIndex: 300 }}>
      <ToolsDropdown setShowTools={dropdowns.setShowTools} />
    </div>
  );
  const suggestionsDropdown = dropdowns.showSuggestionsWin && (
    <div ref={dropdowns.suggestionsDropdownRef} style={{ position: 'fixed', top: dropdowns.suggestionsDropdownPos.top, left: dropdowns.suggestionsDropdownPos.left, zIndex: 300 }}>
      <StyleSuggestionsWin2k
        suggestions={aiSuggestions}
        onSelect={handleSuggestionClick}
        onClose={() => dropdowns.setShowSuggestionsWin(false)}
        clothingItems={clothingItems}
        className="cartoon-suggestions-win2k"
      />
    </div>
  );
  const searchDropdown = dropdowns.showSearchDropdown && (
    <div ref={dropdowns.searchDropdownRef} style={{ position: 'fixed', top: dropdowns.searchDropdownPos.top, left: dropdowns.searchDropdownPos.left, zIndex: 300, background: '#fff', border: '2px solid #b4b4b4', borderRadius: 4, boxShadow: '2px 4px 0 0 #bbb', padding: '1rem', minWidth: 220 }}>
      <input
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Search..."
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: 2 }}
        autoFocus
      />
    </div>
  );
  // Menu bar
  const menuBar = (
    <WardrobeMenuBar
      menuBarRef={dropdowns.menuBarRef}
      cartMenuRef={dropdowns.cartMenuRef}
      favoritesMenuRef={dropdowns.favoritesMenuRef}
      toolsMenuRef={dropdowns.toolsMenuRef}
      suggestionsMenuRef={dropdowns.suggestionsMenuRef}
      searchMenuRef={dropdowns.searchMenuRef}
      onCartClick={dropdowns.handleDropdown(dropdowns.setShowCartPanel, dropdowns.setCartDropdownPos, dropdowns.cartMenuRef)}
      onFavoritesClick={dropdowns.handleDropdown(dropdowns.setShowFavorites, dropdowns.setFavoritesDropdownPos, dropdowns.favoritesMenuRef)}
      onToolsClick={dropdowns.handleDropdown(dropdowns.setShowTools, dropdowns.setToolsDropdownPos, dropdowns.toolsMenuRef)}
      onSuggestionsClick={dropdowns.handleDropdown(dropdowns.setShowSuggestionsWin, dropdowns.setSuggestionsDropdownPos, dropdowns.suggestionsMenuRef)}
      onSearchClick={dropdowns.handleDropdown(dropdowns.setShowSearchDropdown, dropdowns.setSearchDropdownPos, dropdowns.searchMenuRef)}
      cartDropdown={cartDropdown}
      favoritesDropdown={favoritesDropdown}
      toolsDropdown={toolsDropdown}
      suggestionsDropdown={suggestionsDropdown}
      searchDropdown={searchDropdown}
    />
  );
  // Effects
  return (
    <>
      {effects.showConfetti && <ConfettiGlitter onDone={() => effects.setShowConfetti(false)} origin={effects.confettiOrigin} />}
      <PopupWin2k
        visible={effects.popup.visible}
        message={effects.popup.message}
        onClose={() => effects.setPopup({ visible: false, message: '' })}
      />
      <WardrobeView
        topIdx={topIdx}
        bottomIdx={bottomIdx}
        tops={tops}
        bottoms={bottoms}
        topObj={topObj}
        bottomObj={bottomObj}
        topInCart={topInCart}
        bottomInCart={bottomInCart}
        topInWishlist={topInWishlist}
        bottomInWishlist={bottomInWishlist}
        onPrevTop={prevTop}
        onNextTop={nextTop}
        onPrevBottom={prevBottom}
        onNextBottom={nextBottom}
        onAddTopToCart={handleAddTopToCart}
        onAddBottomToCart={handleAddBottomToCart}
        onAddTopToWishlist={handleAddTopToWishlist}
        onAddBottomToWishlist={handleAddBottomToWishlist}
        onSaveOutfit={handleSaveOutfit}
        onAddToCart={handleAddToCart}
        menuBar={menuBar}
      />
    </>
  );
}
