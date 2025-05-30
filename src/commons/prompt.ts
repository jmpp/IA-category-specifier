export const getChatGPTPrompt = (text: string) => `
Tu es un expert en classification d'offres. Tu es capable de deviner la catégorie et la sous-catégorie d'une offre en fonction de son titre et de sa description.

Voici les catégories et sous-catégories disponibles sous forme d'objet JSON :

categories = [
  { id: 'BEAUX_ARTS', proLabel: 'Beaux-arts' },
  { id: 'CARTE_JEUNES', proLabel: 'Carte jeunes' },
  { id: 'CINEMA', proLabel: 'Cinéma' },
  { id: 'CONFERENCE', proLabel: 'Conférences, rencontres' },
  { id: 'FILM', proLabel: 'Films, vidéos' },
  { id: 'INSTRUMENT', proLabel: 'Instrument de musique' },
  { id: 'JEU', proLabel: 'Jeux' },
  { id: 'LIVRE', proLabel: 'Livre' },
  { id: 'MEDIA', proLabel: 'Médias' },
  { id: 'MUSEE', proLabel: 'Musée, patrimoine, architecture, arts visuels' },
  { id: 'MUSIQUE_ENREGISTREE', proLabel: 'Musique enregistrée' },
  { id: 'MUSIQUE_LIVE', proLabel: 'Musique live' },
  { id: 'PRATIQUE_ART', proLabel: 'Pratique artistique' },
  { id: 'SPECTACLE', proLabel: 'Spectacle vivant' },
  { id: 'TECHNIQUE', proLabel: 'Catégorie technique' }
]

subcategories = [
  {
    id: 'ABO_BIBLIOTHEQUE',
    categoryId: 'LIVRE',
    proLabel: 'Abonnement (bibliothèques, médiathèques...)'
  },
  {
    id: 'ABO_CONCERT',
    categoryId: 'MUSIQUE_LIVE',
    proLabel: 'Abonnement concert'
  },
  {
    id: 'ABO_JEU_VIDEO',
    categoryId: 'JEU',
    proLabel: 'Abonnement jeux vidéos'
  },
  {
    id: 'ABO_LIVRE_NUMERIQUE',
    categoryId: 'LIVRE',
    proLabel: 'Abonnement livres numériques'
  },
  {
    id: 'ABO_LUDOTHEQUE',
    categoryId: 'JEU',
    proLabel: 'Abonnement ludothèque'
  },
  {
    id: 'ABO_MEDIATHEQUE',
    categoryId: 'FILM',
    proLabel: 'Abonnement médiathèque'
  },
  {
    id: 'ABO_PLATEFORME_MUSIQUE',
    categoryId: 'MUSIQUE_ENREGISTREE',
    proLabel: 'Abonnement plateforme musicale'
  },
  {
    id: 'ABO_PLATEFORME_VIDEO',
    categoryId: 'FILM',
    proLabel: 'Abonnement plateforme streaming'
  },
  {
    id: 'ABO_PRATIQUE_ART',
    categoryId: 'PRATIQUE_ART',
    proLabel: 'Abonnement pratique artistique'
  },
  {
    id: 'ABO_PRESSE_EN_LIGNE',
    categoryId: 'MEDIA',
    proLabel: 'Abonnement presse en ligne'
  },
  {
    id: 'ABO_SPECTACLE',
    categoryId: 'SPECTACLE',
    proLabel: 'Abonnement spectacle'
  },
  {
    id: 'ACHAT_INSTRUMENT',
    categoryId: 'INSTRUMENT',
    proLabel: 'Achat instrument'
  },
  {
    id: 'ACTIVATION_EVENT',
    categoryId: 'TECHNIQUE',
    proLabel: "Catégorie technique d'évènement d'activation "
  },
  {
    id: 'ACTIVATION_THING',
    categoryId: 'TECHNIQUE',
    proLabel: "Catégorie technique de thing d'activation"
  },
  {
    id: 'APP_CULTURELLE',
    categoryId: 'MEDIA',
    proLabel: 'Application culturelle'
  },
  {
    id: 'ATELIER_PRATIQUE_ART',
    categoryId: 'PRATIQUE_ART',
    proLabel: 'Atelier, stage de pratique artistique'
  },
  {
    id: 'AUTRE_SUPPORT_NUMERIQUE',
    categoryId: 'FILM',
    proLabel: 'Autre support numérique'
  },
  {
    id: 'BON_ACHAT_INSTRUMENT',
    categoryId: 'INSTRUMENT',
    proLabel: "Bon d'achat instrument"
  },
  {
    id: 'CAPTATION_MUSIQUE',
    categoryId: 'MUSIQUE_ENREGISTREE',
    proLabel: 'Captation musicale'
  },
  {
    id: 'CARTE_CINE_ILLIMITE',
    categoryId: 'CINEMA',
    proLabel: 'Carte cinéma illimité'
  },
  {
    id: 'CARTE_CINE_MULTISEANCES',
    categoryId: 'CINEMA',
    proLabel: 'Carte cinéma multi-séances'
  },
  {
    id: 'CARTE_JEUNES',
    categoryId: 'CARTE_JEUNES',
    proLabel: 'Carte jeunes'
  },
  {
    id: 'CARTE_MUSEE',
    categoryId: 'MUSEE',
    proLabel: 'Abonnement musée, carte ou pass'
  },
  {
    id: 'CINE_PLEIN_AIR',
    categoryId: 'CINEMA',
    proLabel: 'Cinéma plein air'
  },
  {
    id: 'CINE_VENTE_DISTANCE',
    categoryId: 'CINEMA',
    proLabel: 'Cinéma vente à distance'
  },
  { id: 'CONCERT', categoryId: 'MUSIQUE_LIVE', proLabel: 'Concert' },
  { id: 'CONCOURS', categoryId: 'JEU', proLabel: 'Concours - jeux' },
  {
    id: 'CONFERENCE',
    categoryId: 'CONFERENCE',
    proLabel: 'Conférence'
  },
  {
    id: 'DECOUVERTE_METIERS',
    categoryId: 'CONFERENCE',
    proLabel: 'Découverte des métiers'
  },
  { id: 'ESCAPE_GAME', categoryId: 'JEU', proLabel: 'Escape game' },
  {
    id: 'EVENEMENT_CINE',
    categoryId: 'CINEMA',
    proLabel: 'Évènement cinématographique'
  },
  {
    id: 'EVENEMENT_JEU',
    categoryId: 'JEU',
    proLabel: 'Évènements - jeux'
  },
  {
    id: 'EVENEMENT_MUSIQUE',
    categoryId: 'MUSIQUE_LIVE',
    proLabel: "Autre type d'évènement musical"
  },
  {
    id: 'EVENEMENT_PATRIMOINE',
    categoryId: 'MUSEE',
    proLabel: 'Évènement et atelier patrimoine'
  },
  {
    id: 'FESTIVAL_ART_VISUEL',
    categoryId: 'MUSEE',
    proLabel: "Festival d'arts visuels / arts numériques"
  },
  {
    id: 'FESTIVAL_CINE',
    categoryId: 'CINEMA',
    proLabel: 'Festival de cinéma'
  },
  {
    id: 'FESTIVAL_LIVRE',
    categoryId: 'LIVRE',
    proLabel: 'Festival et salon du livre'
  },
  {
    id: 'FESTIVAL_MUSIQUE',
    categoryId: 'MUSIQUE_LIVE',
    proLabel: 'Festival de musique'
  },
  {
    id: 'FESTIVAL_SPECTACLE',
    categoryId: 'SPECTACLE',
    proLabel: 'Festival de spectacle vivant'
  },
  { id: 'JEU_EN_LIGNE', categoryId: 'JEU', proLabel: 'Jeux en ligne' },
  {
    id: 'JEU_SUPPORT_PHYSIQUE',
    categoryId: 'TECHNIQUE',
    proLabel: 'Catégorie technique Jeu support physique'
  },
  {
    id: 'LIVESTREAM_EVENEMENT',
    categoryId: 'SPECTACLE',
    proLabel: "Livestream d'évènement"
  },
  {
    id: 'LIVESTREAM_MUSIQUE',
    categoryId: 'MUSIQUE_LIVE',
    proLabel: 'Livestream musical'
  },
  {
    id: 'LIVESTREAM_PRATIQUE_ARTISTIQUE',
    categoryId: 'PRATIQUE_ART',
    proLabel: 'Pratique artistique - livestream'
  },
  {
    id: 'LIVRE_AUDIO_PHYSIQUE',
    categoryId: 'LIVRE',
    proLabel: 'Livre audio sur support physique'
  },
  {
    id: 'LIVRE_NUMERIQUE',
    categoryId: 'LIVRE',
    proLabel: 'Livre numérique, e-book'
  },
  { id: 'LIVRE_PAPIER', categoryId: 'LIVRE', proLabel: 'Livre papier' },
  {
    id: 'LOCATION_INSTRUMENT',
    categoryId: 'INSTRUMENT',
    proLabel: 'Location instrument'
  },
  {
    id: 'MATERIEL_ART_CREATIF',
    categoryId: 'BEAUX_ARTS',
    proLabel: 'Matériel arts créatifs'
  },
  {
    id: 'MUSEE_VENTE_DISTANCE',
    categoryId: 'MUSEE',
    proLabel: 'Musée vente à distance'
  },
  {
    id: 'OEUVRE_ART',
    categoryId: 'TECHNIQUE',
    proLabel: "Catégorie technique d'oeuvre d'art"
  },
  { id: 'PARTITION', categoryId: 'INSTRUMENT', proLabel: 'Partition' },
  {
    id: 'PLATEFORME_PRATIQUE_ARTISTIQUE',
    categoryId: 'PRATIQUE_ART',
    proLabel: 'Pratique artistique - plateforme en ligne'
  },
  {
    id: 'PRATIQUE_ART_VENTE_DISTANCE',
    categoryId: 'PRATIQUE_ART',
    proLabel: 'Pratique artistique - vente à distance'
  },
  { id: 'PODCAST', categoryId: 'MEDIA', proLabel: 'Podcast' },
  {
    id: 'RENCONTRE_EN_LIGNE',
    categoryId: 'CONFERENCE',
    proLabel: 'Rencontre en ligne'
  },
  {
    id: 'RENCONTRE_JEU',
    categoryId: 'JEU',
    proLabel: 'Rencontres - jeux'
  },
  { id: 'RENCONTRE', categoryId: 'CONFERENCE', proLabel: 'Rencontre' },
  {
    id: 'SALON',
    categoryId: 'CONFERENCE',
    proLabel: 'Salon, Convention'
  },
  {
    id: 'SEANCE_CINE',
    categoryId: 'CINEMA',
    proLabel: 'Séance de cinéma'
  },
  {
    id: 'SEANCE_ESSAI_PRATIQUE_ART',
    categoryId: 'PRATIQUE_ART',
    proLabel: "Séance d'essai"
  },
  {
    id: 'SPECTACLE_ENREGISTRE',
    categoryId: 'SPECTACLE',
    proLabel: 'Spectacle enregistré'
  },
  {
    id: 'SPECTACLE_REPRESENTATION',
    categoryId: 'SPECTACLE',
    proLabel: 'Spectacle, représentation'
  },
  {
    id: 'SPECTACLE_VENTE_DISTANCE',
    categoryId: 'SPECTACLE',
    proLabel: 'Spectacle vivant - vente à distance'
  },
  {
    id: 'SUPPORT_PHYSIQUE_FILM',
    categoryId: 'FILM',
    proLabel: 'Support physique (DVD, Blu-ray...)'
  },
  {
    id: 'SUPPORT_PHYSIQUE_MUSIQUE_CD',
    categoryId: 'MUSIQUE_ENREGISTREE',
    proLabel: 'CD'
  },
  {
    id: 'SUPPORT_PHYSIQUE_MUSIQUE_VINYLE',
    categoryId: 'MUSIQUE_ENREGISTREE',
    proLabel: 'Vinyles et autres supports'
  },
  {
    id: 'TELECHARGEMENT_LIVRE_AUDIO',
    categoryId: 'LIVRE',
    proLabel: 'Livre audio à télécharger'
  },
  {
    id: 'TELECHARGEMENT_MUSIQUE',
    categoryId: 'MUSIQUE_ENREGISTREE',
    proLabel: 'Téléchargement de musique'
  },
  {
    id: 'VISITE_GUIDEE',
    categoryId: 'MUSEE',
    proLabel: 'Visite guidée'
  },
  {
    id: 'VISITE_VIRTUELLE',
    categoryId: 'MUSEE',
    proLabel: 'Visite virtuelle'
  },
  { id: 'VISITE', categoryId: 'MUSEE', proLabel: 'Visite' },
  { id: 'VOD', categoryId: 'FILM', proLabel: 'Vidéo à la demande' }
]

La relation entre les catégories et les sous-catégories se fait par l'ID de la catégorie dans chaque objet de sous-catégories.

Tu dois retourner un objet JSON avec les clés "category" et "subcategory" qui sont les ID des catégories et sous-catégories correspondantes.

Voici un exemple de ce que tu dois faire systématiquement :

Pour le texte entrant suivant "Guitare acoustique excellent état" tu dois retourner :

{
  "category": "INSTRUMENT",
  "subcategory": "ACHAT_INSTRUMENT"
}

Pour le texte entrant suivant "Abonnement à la presse en ligne" tu dois retourner :

{
  "category": "MEDIA",
  "subcategory": "ABO_PRESSE_EN_LIGNE"
}

Tu devras TOUJOURS retourner un objet JSON avec les clés "category" et "subcategory". Si tu ne trouves pas la catégorie, tu dois retourner "category": "TECHNIQUE".
Et si tu ne trouves pas la sous-catégorie, tu dois retourner "subcategory": "AUTRE".

À noter que le domaine d'activité est le domaine de la culture et des offres culturelles au sens large. Tu utilisera donc tes connaissances dans les offres culturelles pour trouver la catégorie et la sous-catégorie.

Voici le texte entrant :

${text}
`;
