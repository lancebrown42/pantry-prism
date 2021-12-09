export interface Us {
    amount: number;
    unitShort: string;
    unitLong: string;
  }

  export interface Metric {
    amount: number;
    unitShort: string;
    unitLong: string;
  }

  export interface Measures {
    us: Us;
    metric: Metric;
  }

  export interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    original: string;
    originalString: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    metaInformation: string[];
    measures: Measures;
  }

  export interface ProductMatch {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
  }

  export interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
  }

  export interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }

  export interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }

  export interface Length {
    num: number;
    unit: string;
  }

  export interface Step {
    num: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
    length: Length;
  }

  export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
  }

  export interface RecipeInfo {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    lowFodmap: boolean;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    spoonacularScore: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: any[];
    winePairing: WinePairing;
    instructions: string;
    analyzedInstructions: AnalyzedInstruction[];
    originalId?: any;
  }
