module.exports = {
  mainPage: {
    filterOptions: '#results-filter-open',
    moreDetailedSearch: '.search-simple-detailed-search',
  },
  detailedSearchPage: {
    wrapper: '.detailed-search',
    priceMinInput: '#s_price_min_sale',
    priceMaxInput: '#s_price_max_sale',
    squaremeterMinInput: '#s_area_size_min',
    capitalCityLabel: 'label[for="s_capital_city"]',
    XIIIDistrictLabel: 'label[for="s_region_bp_xiii"]',
    streetInput: '#s_street',
    autoSuggestStreetItem: '.ui-menu-item',
    floorRangeMin: '.detailed-search__fieldset:nth-child(8) .dropdown',
    firstFloor: 'div[data-value="1"]',
    elevator: '.detailed-search__fieldset:nth-child(9) .dropdown',
    elevatorOption: 'div[data-value="van-lift"]',
    roomCounter: '#s_room_count_min',
    balconyLabel: 'label[for="s_balcony_size_1-m2erkely-felett"]',
    innerHeight: 'label[for="s_inner_height_max-3m-belmagassagu"]',
    toiletLabel: 'label[for="s_bathroom_without_toilet_wc-kulon"]',
    rooftop: 'label[for="s_attic_type_nem-tetoteri"]',
    heatingGas: 'label[for="s_heating_type_gaz-cirko"]',
    districtHeating: 'label[for="s_heating_type_tavfutes"]',
    districtHeatingMeasured: 'label[for="s_heating_type_tavfutes-egyedi-meressel"]',
    searchButton: '#search_button',
  },
  resultsPage: {
    listWrapper: '.listing__card',
    resultNumber: '.results__number__count',
    resultThumbnailAnchor: '.resultspage__listings .listing .listing__thumbnail',
  },
  propertyPage: {
    propertyPrice: 'span.parameter-value',
    revealPhoneNumberButton: '.show-number',
  }
}
