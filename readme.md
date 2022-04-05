## ☢️CodeAlpha☢️

## Présentation

CodeAlpha est une mission professionnel de BTS SIO faite sous forme d'une application web nodeJS. Ce projet comprend deux parties, la première partie 'Analyse' est à réaliser pour le 18 mars 2022 et la seconde partie 'Réalisation' est à réaliser pour début Avril 2022.

C’est un projet de deuxième année de BTS SIO SLAM donné par Monsieur Chamillard et Monsieur Capuozzo.

Ce projet consiste à gérer les interventions des intervenants dans une centrale nucléaire,  de générer et d'envoyer un QR Codes via une adresse mail sécurisé aux intervenants suite à leurs demandes. 

## *Groupe : Les brancodeurs*

- Alexandre Alleaume
- Lucas Pisano
- Yannick Midey
- Bryan Guillot

## 🔧*Outils* 

- Système d’exploitation: Windows 10
- Version NodeJS : v16.13.0
- Visual studio : v1.16.2
- MongoDB : v5.04

## Lien dépôts

Dépôts GitHub : https://github.com/VrNephy/codealphaBackUp

Présentation du projet : https://slam-vinci-melun.github.io/sio22/phase4/Mission3_CodeAlphaV2.pdf

## Récupération du projet

Cloner le projet dans un dossier en utilisant l'application git bash : 

`git clone https://github.com/VrNephy/CodeAlpha.git`

Allez dans le répertoire du projet :

`cd CodeAlpha`

Installer les dépendances du projet : 

`npm install`

Lancer votre base de données avec la commande  :

`mongod`

Puis utilisez le logiciel Robo3T (ou Compass, ou en mode console) pour créer la base CodeAlpha puis créer la collection Intervenants et la collection Interventions. 

Dans la collection Intervenants, insérer les lignes suivantes : publique nom, publique prenom, publique code, publique mail, publique poste.

Dans la collection Interventions, insérer les lignes suivantes : publique heureDebutReelle, publique heureFinReelle, publique heureDebutPrevue, publique heureFinPrevue public code, public salle.

Pour finir, lancer votre projet avec la commande : 

`nodemon`

## *Première partie : Analyse*

### *Diagramme des cas d'utilisation*

![](https://cdn.discordapp.com/attachments/953231692691308564/959463878457180220/unknown.png)

### *Evil-User Story*

|                           Attaques                           |                          Solutions                           | Gravité |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :-----: |
| En tant qu’opérateur malveillant, je souhaite générer des QRCodes qui ne fonctionne pas afin de faire rater des réunions importante. | En tant que développeur, je fais en sorte que l’application n’accepte uniquement des identifiants déjà présents dans la base de données. |   ***   |
| En tant qu'utilisateur malveillant, je vais récupérer le QRCodes d'un intervenant afin de participer à tes interventions dont je n'ai pas le doit d'accès | En tant que développeur, pour récupérer le QRCodes envoyé par mail, l'intervenant qui le reçoit doit d'abord renseigner son code d'intervenant puis s'il est correcte, il sera redirigé sur le QRCodes. |   **    |
| En tant qu'utilisateur malveillant,  je souhaite, à partir de l'API réalisé une attaque par déni de service afin que l'opérateur ne puisse générer des QR Codes | En tant que développeur, je réstreint l'accès du trafic sur l'API |   ***   |

> ** : élevée
>
> *** : très élevée

## *Diagramme UML des entités*

![](https://cdn.discordapp.com/attachments/391192279253254166/955827265726464050/DiagrammeUML.PNG)

## *URI Supportées*

| Verbe |          Adresse          |    Contrôleur/Méthode    |                           Utilité                            |
| :---: | :-----------------------: | :----------------------: | :----------------------------------------------------------: |
| POST  | localhost:3000/api/update | update(codeIntervention) | Reçoit l’heure d’entrée réel ainsi que l’heure de sortie réel. |

## *Modèle pour la collection intervenants*

![](https://cdn.discordapp.com/attachments/391192279253254166/955779710477041704/unknown.png)

## *Modèle pour la collection interventions*

![](https://cdn.discordapp.com/attachments/391192279253254166/955815314166284288/ModelsInterventions.PNG)
