// Types
export const enum TaxonomyType {
  LOCATION = 1,
  ACCESS = 2,
  SUITABLE_FOR = 3,
  BUILDING = 4,
  INFRASTRUCTURE = 5,
  TECHNOLOGY = 6,
  FURNITURE = 7,
  SURROUNDINGS = 8,
  AWARD_CATEGORY = 9,
  SWISS_LOCATION_AWARD = 10,

  SERVICE = 21,
  PRICE = 22,
  STYLE = 23,
  OPERATION = 24,
  OFFER = 25,

  REGION_SWISS = 26,
  REGION_GERMAN = 27,
  REGION_AUSTRIAN = 28,
}

// Subtypes
export const enum TaxonomySubType {    
  PRIVATE = 1,
  BUSINESS = 2,
  PUBLIC = 3,
}