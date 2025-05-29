// aiClassificationService.ts
import {
  env,
  pipeline,
  ZeroShotClassificationPipeline,
} from "@xenova/transformers";
import type { Category, Prediction, Subcategory } from "../commons/types";

// Configuration pour utiliser les modèles localement
env.allowLocalModels = false;
env.allowRemoteModels = true;

const MINIMUM_CONFIDENCE = 0.1;

class AIClassificationService {
  protected classifier: ZeroShotClassificationPipeline | null = null;
  private categories: Category[];
  private subcategories: Subcategory[];
  private isInitialized = false;

  constructor(categories: Category[], subcategories: Subcategory[]) {
    this.categories = categories;
    this.subcategories = subcategories;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Utilise un modèle multilingue léger pour la classification
      this.classifier = await pipeline(
        "zero-shot-classification",
        "Xenova/mobilebert-uncased-mnli"
      );
      this.isInitialized = true;
    } catch (error) {
      console.error("Erreur lors de l'initialisation du modèle:", error);
    }
  }

  private isClassifierReady(): this is {
    classifier: ZeroShotClassificationPipeline;
  } {
    return this.classifier !== null;
  }

  async predictCategory(text: string): Promise<Prediction | null> {
    if (!this.isInitialized || !this.classifier) {
      await this.initialize();
    }
    if (!this.isClassifierReady()) {
      return null;
    }

    try {
      // Prépare les labels de catégories
      const categoryLabels = this.categories.map((cat) => cat.proLabel);

      // Classification des catégories
      const categoryResults = await this.classifier(text, categoryLabels);

      const categoryResult = Array.isArray(categoryResults)
        ? categoryResults[0]
        : categoryResults;

      const predictedCategory = categoryResult.labels[0];
      const categoryConfidence = categoryResult.scores[0];

      // Si la confiance est trop faible, on ne suggère rien
      if (categoryConfidence < MINIMUM_CONFIDENCE) return null;

      // Trouve la sous-catégorie
      const category = this.categories.find(
        (cat) => cat.proLabel === predictedCategory
      );
      if (!category) return null;

      const filteredSubcategories = this.subcategories.filter(
        (sub) => sub.categoryId === category?.id
      );

      const subcategoryLabels = filteredSubcategories.map(
        (sub) => sub.proLabel
      );
      const subcategoryResults = await this.classifier(text, subcategoryLabels);
      const subcategoryResult = Array.isArray(subcategoryResults)
        ? subcategoryResults[0]
        : subcategoryResults;
      const predictedSubcategory = subcategoryResult.labels[0];
      const subcategoryConfidence = subcategoryResult.scores[0];

      return {
        category: predictedCategory,
        subcategory: predictedSubcategory,
        confidence: Math.min(categoryConfidence, subcategoryConfidence),
      };
    } catch (error) {
      console.error("Erreur lors de la prédiction:", error);
      return null;
    }
  }
}

export default AIClassificationService;
