import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import type { Category, Prediction, Subcategory } from "../commons/types";
import AIClassificationService from "../services/aiClassificationService";

export const useAIClassification = (
  categories: Category[],
  subcategories: Subcategory[]
) => {
  const [aiService] = useState(
    () => new AIClassificationService(categories, subcategories)
  );
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialiser le service au montage
  useEffect(() => {
    const init = async () => {
      await aiService.initialize();
      setIsInitialized(true);
    };
    init();
  }, [aiService]);

  // Fonction de prédiction avec debounce
  const debouncedPredict = useCallback(
    debounce(async (text: string) => {
      if (!text.trim() || text.length < 3) {
        setPrediction(null);
        setIsLoading(false);
        return;
      }

      try {
        const result = await aiService.predictCategory(text);
        setPrediction(result);
      } catch (error) {
        console.error("Erreur de prédiction:", error);
        setPrediction(null);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [aiService]
  );

  const predict = useCallback(
    (text: string) => {
      setIsLoading(true);
      debouncedPredict(text);
    },
    [debouncedPredict]
  );

  return {
    prediction,
    isLoading,
    isInitialized,
    predict,
  };
};
