# Améliorations ergonomiques de la liste de courses

## Périmètre validé

- Classer les produits par ordre alphabétique français dans chaque rayon, dans la liste de courses, le catalogue et le texte partagé.
- Ajouter « Retirer les produits achetés », qui enlève de la liste uniquement les articles cochés comme achetés.
- Renommer la remise à zéro complète « Tout réinitialiser ».
- Remplacer les confirmations natives par une fenêtre intégrée, lisible en modes clair et sombre.
- Renforcer le contraste des messages temporaires.
- Supprimer la ligne « À la maison et en magasin ».

## Comportement

« Retirer les produits achetés » conserve dans la liste tous les produits non cochés. « Tout réinitialiser » retire tous les produits de la liste mais ne supprime rien du catalogue global. Les deux opérations demandent confirmation et décrivent explicitement leur conséquence.

## Vérifications

- Tri avec accents et majuscules.
- Conservation des produits manquants après retrait des achats.
- Vidage total sans suppression du catalogue.
- Confirmations de réinitialisation, suppression de produit et restauration de sauvegarde.
- Lisibilité des fenêtres et messages en modes clair et sombre.
- Mise à jour du cache hors connexion.
