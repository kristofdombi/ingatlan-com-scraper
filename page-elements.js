module.exports = {
  mainPage: {
    searchLocationInput: 'input#sf_query',
    autoSuggestLocationItem: '.ui-menu-item',
    priceRanges: '#filter_slidedown_price_type_sale_and_price_type_rent',
    priceRangeMin: '#sf_price_sale_min',
    priceRangeMax: '#sf_price_sale_max',
    squaremeterRanges: '#filter_slidedown_area_size',
    squaremeterRangeMin: '#sf_area_size_min',
    roomCounter: '#filter_slidedown_room_count',
    // 1 = 'mindegy', 2 = '1 szoba', 3 = '2 szoba' ...
    twoPlusRoomsOption: '#filter_slidedown_room_count .dropdown ul li:nth-child(3)',
    searchButton: '.search-button',
  },
  resultsPage: {
    listWrapper: '.listing__card',
    resultThumbnailAnchor: '.resultspage__listings .listing .listing__thumbnail',
  },
  propertyPage: {
    propertyPrice: 'span.parameter-value',
    revealPhoneNumberButton: '.show-number',
  }
}
