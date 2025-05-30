import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { getChatGPTPrompt } from "../commons/prompt";
import type { Subcategory } from "../commons/types";
import {
  categories,
  getCategoryById,
  getSubcategoryById,
  subcategories,
} from "../data/categories";
import { classifyWithGPT } from "../services/openAIGPTService";
import styles from "./OfferForm.module.scss";

// Types

type OfferFormData = {
  title: string;
  description: string;
  category: string;
  subcategory: string;
};

type GPTPrediction = {
  category: string;
  subcategory: string;
};

export const OfferFormGPT: React.FC = () => {
  const [formData, setFormData] = useState<OfferFormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const [prediction, setPrediction] = useState<GPTPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Subcategory[]
  >([]);

  // Surveille les changements de titre et description
  useEffect(() => {
    const debouncedFetch = debounce(async (textToAnalyze: string) => {
      if (!textToAnalyze) {
        setPrediction(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const prompt = getChatGPTPrompt(textToAnalyze);
        const res = await classifyWithGPT(prompt);
        const category = getCategoryById(res.category);
        const subcategory = getSubcategoryById(res.subcategory);
        setPrediction({
          category: category?.proLabel ?? "",
          subcategory: subcategory?.proLabel ?? "",
        });
      } catch {
        setPrediction(null);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    const textToAnalyze = `${formData.title} ${formData.description}`.trim();
    debouncedFetch(textToAnalyze);

    return () => {
      debouncedFetch.cancel(); // Annule l'exécution debounced si le composant se démonte ou si les dépendances changent
    };
  }, [formData.title, formData.description]);

  // Filtre les sous-catégories selon la catégorie sélectionnée
  useEffect(() => {
    if (formData.category) {
      const categoryId = categories.find(
        (cat) => cat.proLabel === formData.category
      )?.id;
      const filteredSubcategories = subcategories.filter(
        (sub) => sub.categoryId === categoryId
      );
      setFilteredSubcategories(filteredSubcategories);
    }
  }, [formData.category, setFormData]);

  // Fonction pour appliquer les suggestions IA
  const applySuggestion = () => {
    if (prediction) {
      setFormData((prev) => ({
        ...prev,
        category: prediction.category,
        subcategory: prediction.subcategory,
      }));
    }
  };

  return (
    <>
      <h1 className={styles.title}>Création d'offre POC IA (GPT)</h1>
      <form className={styles.offerForm}>
        <div className={styles.formField}>
          <label>Titre de l'offre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="ex: Guitare acoustique excellent état"
            className={styles.input}
          />
        </div>

        <div className={styles.formField}>
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Décrivez votre offre..."
            className={styles.textarea}
          />
        </div>

        {/* Suggestions IA */}
        {prediction && (
          <div className={styles.aiSuggestion}>
            <div className={styles.suggestionHeader}>🤖 Suggestion GPT</div>
            <div className={styles.suggestionContent}>
              <strong>Catégorie:</strong> {prediction.category}
              <br />
              <strong>Sous-catégorie:</strong> {prediction.subcategory}
            </div>
            <button
              type="button"
              className={styles.suggestionButton}
              onClick={applySuggestion}
            >
              Appliquer la suggestion
            </button>
          </div>
        )}

        <div className={styles.formField}>
          <label>Catégorie</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={styles.select}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.proLabel}>
                {cat.proLabel}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formField}>
          <label>Sous-catégorie</label>
          <select
            value={formData.subcategory}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subcategory: e.target.value }))
            }
            className={styles.select}
          >
            <option value="">Sélectionner une sous-catégorie</option>
            {filteredSubcategories.map((sub) => (
              <option key={sub.id} value={sub.proLabel}>
                {sub.proLabel}
              </option>
            ))}
          </select>
        </div>

        {isLoading && (
          <div className={styles.loading}>🔍 Analyse GPT en cours...</div>
        )}
      </form>
    </>
  );
};
