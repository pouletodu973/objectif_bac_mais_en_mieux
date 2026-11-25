# Objectif Bac V5.0

Sous Windows, double-cliquer sur `Ouvrir-Objectif-Bac.cmd` pour lancer l’application avec son lecteur H5P. Garder la fenêtre de commande ouverte pendant la séance, puis sélectionner **Cours en ligne** dans le navigateur. Le lanceur utilise Python 3 et ouvre le site à l’adresse [127.0.0.1:8000](http://127.0.0.1:8000/). L’ouverture directe d’`index.html` donne accès aux exercices et aux fiches. Le lecteur H5P a besoin d’une adresse HTTP(S). Sur la Forge, ouvrir directement le site publié.

## Fonctionnalités héritées de la V4

- La recherche de cours reçoit le focus à l’ouverture du catalogue. La recherche ignore les accents. Chaque chapitre affiche deux choix, le cours H5P et la fiche.
- Les formules des fiches sont mises en page avec KaTeX. Les conditions d’application et les méthodes restent consultables sous les formules.
- Les drapeaux FR, ES, PT et EN sélectionnent la langue des indices et des explications dans les deux modules. Les exercices restent en français.
- Le modèle `questions[].feedback` associe à chaque question et langue les champs `hint` et `explanation`. Les 100 questions de compréhension des consignes disposent de traductions intégrées en espagnol, portugais et anglais. Sur Android, seuls ces contenus prétraduits sont proposés et les maths restent en français. Sur un navigateur de bureau compatible, les maths peuvent être traduites automatiquement sur l’appareil.

## Parcours élève

- **Recherche** filtre les chapitres et notions de maths en ignorant les accents. La flèche **↑** à gauche ramène au menu lorsqu’il sort de l’écran.
- **Question suivante** place le focus sur le nouvel énoncé, y compris quand une question est passée. **Retourner la carte** apparaît sur les cartes mémoire. La calculatrice affiche le pavé dans l’ordre 7–8–9, 4–5–6, 1–2–3, puis 0.
- Après une réponse, le résultat s’affiche immédiatement. **Voir la réponse** ouvre le corrigé. En cas d’erreur, **Voir un indice** donne une piste et **Réviser le cours** propose une fiche et une vidéo. Les consignes renvoient à la méthode et au thème scientifique de la question.
- La banque comporte 1 100 questions, dont 100 sur les consignes. Les 47 fiches regroupent synthèse, formulaire et glossaire. Les unités composées sont écrites avec des exposants négatifs, par exemple m·s⁻².
- **À propos** indique V5.0. La roue dentée donne accès à la gestion des pseudos.

## Séances et progression

- Les dix exercices au hasard sont tirés dans les 1 000 questions du parcours mathématique, parmi les questions disponibles pour le pseudo actif. Chaque tirage contient des identifiants distincts. Deux élèves peuvent recevoir certaines questions en commun.
- Une question affichée peut revenir au plus tôt le jour civil suivant en Guyane. Une question déclarée difficile revient au plus tôt le surlendemain. Une question déclarée très difficile est de nouveau disponible dès le lendemain. Une sélection épuisée peut proposer une séance plus courte.
- Le pourcentage de séance mesure les bonnes réponses parmi les réponses évaluées. Le nombre traité indique séparément combien de questions ont reçu une réponse. Une carte autorévaluée compte comme une réponse.
- Le site conserve le stockage V2 par pseudo dans le navigateur. Il retrouve les anciens résultats lorsqu’il est servi depuis la même origine.

## Cours interactifs

Les cours H5P ont été élaborés par **Philippe THIBAULT** lors d’une utilisation expérimentale de Nolèj dans le cadre des **TraAM 2024-2025**. Les droits des vidéos Stella Education ont été cédés par leur créateur. Ces mentions figurent aussi dans **À propos** et **Licence et crédits**.

Le menu **Cours en ligne** regroupe 20 cours Nolej, avec leurs paquets originaux et bibliothèques. Les ajouts couvrent les titrages, les satellites, les piles, l’électrolyse, la décroissance radioactive et un second parcours sur les méthodes physiques d’analyse. Le lecteur charge les cours sur HTTP(S) et utilise H5P Standalone depuis jsDelivr. Le paquet d’origine est téléchargeable depuis **Fichier pour Éléa**.

Pour réinstaller les paquets à partir des originaux, placer les fichiers H5P dans un même dossier et exécuter `python installer_h5p.py "C:\chemin\vers\les\H5P"` depuis V3.

Pour Éléa, importer chaque paquet dans la banque de contenus du parcours puis l’ajouter à une activité H5P. Renseigner dans `index.html`, dans les données `interactiveCourses`, le champ `eleaUrl` avec le lien de l’activité et vérifier son accès avec un compte élève. [Documentation Éléa](https://moodle-doc.forge.apps.education.fr/elea/docs/Tutoriels/Concevoir_un_parcours/Ajouter_des_activites/Activites_interactives_H5P/Banque_de_contenus_H5P/)

Chaque question porte un indice et des identifiants de fiches dans `resourceIds`. Chaque fiche contient une synthèse, un formulaire, un glossaire et un lien vidéo. `courseIds` relie les fiches aux paquets H5P. Les formats et les noms attendus sont déclarés dans `interactiveCourses`. La banque complète est exportable en JSON depuis **Options de séance et ressources → Sources et partage**.

Les fiches de physique-chimie s’appuient sur le [programme officiel de Terminale](https://www.education.gouv.fr/bo/19/Special8/MENE1921249A.htm) et les [annales de Labolycée](https://www.labolycee.org/cursus/tale-specialite-physique-chimie). Les fiches de maths reprennent les notions de la V2 et renvoient notamment vers les ressources de Maths et tiques.

## Publication sur la Forge

Le dépôt contient `index.html`, `.gitlab-ci.yml`, `cours-h5p.zip`, `LICENSE-KATEX.txt` et le PDF de consignes. GitLab Pages extrait les fichiers nécessaires à la lecture des cours. Les paquets d’origine restent accessibles dans l’archive via **Fichier pour Éléa**. Après le déploiement, ouvrir le site et vérifier un exercice de chaque mode, puis lancer un cours H5P dans **Cours en ligne**.

## Raccordement du suivi à Grist

Le navigateur envoie les événements au relais HTTPS `/suivi`. Le relais transmet
le JSON au webhook n8n en ajoutant l'en-tête `X-Objectif-Bac-Key`. Le secret se
configure dans le relais et dans l'identifiant **Header Auth** du webhook n8n.

Le relais `relais-suivi.mjs` fonctionne avec Node.js 24. Il nécessite
`OBJECTIF_BAC_WEBHOOK` (URL HTTPS du webhook de test ou de production) et
`OBJECTIF_BAC_RELAY_TOKEN` (secret commun). Il écoute par défaut sur
`127.0.0.1:8080`, derrière le proxy HTTPS de l'hébergeur. Les variables
`OBJECTIF_BAC_BIND` et `PORT` permettent d'adapter l'écoute. Démarrer avec
`node relais-suivi.mjs`. Le proxy frontal doit limiter les demandes par source
s'il présente une adresse réseau unique au relais. Le contrôle d'origine
concerne les navigateurs et ne constitue pas une authentification des visiteurs.

Importer `Objectif-Bac-n8n-suivi.json` et associer les identifiants Header Auth
et Grist. Les tables existantes doivent exposer les colonnes supplémentaires
suivantes à l'API avant le premier essai :

- `Utilisateurs` : `school_level` et `residence_territory`.
- `Resultats` : `domain`, `chapter_ids`, `notion_ids` et `language`.
- `Evenements` : `result_id` et `question_id`.

Ces nouvelles colonnes sont de type Texte. Les listes de chapitres et de
notions sont transmises sous forme de tableaux JSON. Les vues de synthèse
restent à configurer dans Grist.

Le chemin `/health` indique que le relais est joignable. Pour vérifier la chaîne,
envoyer un événement fictif avec le webhook n8n en écoute et contrôler les
écritures dans Grist. Après validation et publication du workflow, renseigner
uniquement l'URL HTTPS publique du relais, terminée par `/suivi`, dans
`suivi.js` avant de publier sur la Forge.

La voie retenue pour la mise en service est désormais **Forge → n8n → Grist**.
Le fichier `Objectif-Bac-n8n-suivi.json` contient la variante directe, à importer
en brouillon. Le webhook est prévu pour l’origine Forge, valide les événements
avant les écritures et renvoie une réponse sans données. Le contrôle d’origine
ne remplace pas la limitation des requêtes par l’instance n8n. La configuration
avec relais décrite ci-dessus reste une solution de repli et nécessiterait de
remettre le webhook en mode Header Auth. Le site conserve son adresse de collecte
vide pendant la préparation.

## V5.0 — Exercices par chapitre

Dans « Choisir la bonne méthode mathématique », le menu propose « 10 questions au hasard », « Questions par chapitre », « Questions par notions de maths » et « Exercices par chapitre ».

Les exercices guidés présentent un énoncé commun et une question à la fois. Chaque étape propose un indice et, lorsqu’ils sont disponibles, une fiche ou un cours H5P. La correction se déplie après une bonne réponse. Le compteur se met à jour à la fin de l’exercice et enregistre une seule réussite par exercice et par profil local. L’étoile ★ identifie les exercices issus d’une rubrique « Automatismes » dans les documents de Vincent Bernardin.

La banque initiale comprend cinq exercices guidés (diffraction, circuit RC, cinétique chimique et décroissance radioactive). Les autres chapitres affichent un message d’attente. Les sources de chaque adaptation figurent sous les questions. Les exercices guidés sont intégrés à `index.html`. Le bouton « S’entraîner » ouvre la liste des chapitres disponibles, puis chaque chapitre affiche ses exercices.

### Révision des questions

Maintenir l’étoile ★ affiche « Automatisme ». Le libellé disparaît lorsque le doigt ou la souris relâche l’étoile ou que le geste est annulé. Les 100 réponses attendues du module « Comprendre la consigne » ont été reformulées pour réduire l’écart de longueur avec les autres choix. Les 1 000 questions de maths ont fait l’objet de contrôles de structure. Les indices des familles relues et corrigées couvrent notamment le rendement, le seuil photoélectrique et l’énergie ou la puissance d’une installation.

### Recherche de résidence et révision scientifique

Le champ de recherche filtre la liste native des pays et territoires sans distinguer les accents. La résidence reste facultative. Un changement de filtre conserve la sélection existante jusqu’à ce que l’élève choisisse un autre territoire.

La révision a repris les indices des 230 questions des nouvelles annales et des 40 questions d’unités et de proportionnalité. Des découpages LaTeX qui transformaient du texte courant en formules ont été corrigés dans 23 questions. La vérification scientifique individuelle des autres séries de maths reste à terminer.

### Accès aux questions

Le sélecteur indique explicitement le chapitre ou la notion et le nombre de questions. Les exercices guidés proposent les chapitres qui disposent déjà de parcours. Si toutes les questions ont été vues, la prochaine disponibilité est indiquée et une reprise immédiate est proposée sur demande.

### Texte français et formules

Les énoncés, choix de réponse, corrections, rappels de méthode et démonstrations utilisent des segments distincts pour le texte et les formules. Les 47 fiches appliquent la même règle à leur formulaire. Les mots servant d’indices à une grandeur restent en romain à l’intérieur de la formule. Le contrôle a compilé avec KaTeX, en mode strict, toutes les expressions recensées dans les 1 000 questions de maths et leurs ressources.
