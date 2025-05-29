import React, { useEffect, useState } from "react";
import type { Subcategory } from "../commons/types";
import { categories, subcategories } from "../data/categories";
import { useAIClassification } from "../hooks/useAIClassification";
import styles from "./OfferForm.module.scss";

type OfferFormData = {
  title: string;
  description: string;
  category: string;
  subcategory: string;
};

export const OfferForm: React.FC = () => {
  const [formData, setFormData] = useState<OfferFormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const { prediction, isLoading, isInitialized, predict } = useAIClassification(
    categories,
    subcategories
  );

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Subcategory[]
  >([]);

  // Surveille les changements de titre et description
  useEffect(() => {
    const textToAnalyze = `${formData.title} ${formData.description}`.trim();
    if (textToAnalyze && isInitialized) {
      predict(textToAnalyze);
    }
  }, [formData.title, formData.description, predict, isInitialized]);

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
      <h1 className={styles.title}>Création d'offre POC IA</h1>
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
            <div className={styles.suggestionHeader}>
              🤖 Suggestion IA (confiance:{" "}
              {(prediction.confidence * 100).toFixed(0)}%)
            </div>
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
          <div className={styles.loading}>🔍 Analyse en cours...</div>
        )}
      </form>
    </>
  );
};
