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

<img src="https://cdn.discordapp.com/attachments/391192279253254166/960532032415486102/unknown.png" style="zoom:150%;" />

## *URI Supportées*

| Verbe |          Adresse          |    Contrôleur/Méthode    |                           Utilité                            |
| :---: | :-----------------------: | :----------------------: | :----------------------------------------------------------: |
| POST  | localhost:3000/api/update | update(codeIntervention) | Reçoit l’heure d’entrée réel ainsi que l’heure de sortie réel. |

## *Modèle pour la collection intervenants*

![](https://cdn.discordapp.com/attachments/391192279253254166/960533575109861437/ModelsIntervenantsPNG.PNG)

## *Modèle pour la collection interventions*

![](https://cdn.discordapp.com/attachments/391192279253254166/960533600565071973/ModelsInterventions.PNG)



## *Seconde partie : Réalisation*

### Affichage du personelles

La fonction ci-dessous situé dans le fichier <code>intervenant.js</code> fait appel au models "Intervenant" afin de récupérer les données stocker dans la table Intervenant de notre base de données.

````js
var express = require('express');
var router = express.Router();
const Intervenants = require("../models/Intervenant");


// Page racine
router.get("/", async function(req, res, next) {
    Intervenants.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("Intervenants", {
                title: "Intervenants",
                Intervenants: result,
            });
            console.log(result);
        }
    });
});

module.exports = router;
````

On affiche ensuite dans le fichier <code>intervenant.ejs</code> les intervenants dans un tableau grâce à une boucle forEach qui parcours "Intervenants"

````ejs
<div class="container-fluid d-flex align-items-center flex-column">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Identité</th>
                    <th>Code</th>
                    <th>Poste</th>
                    <th>Mail</th>
                </tr>
            </thead>
            <tbody>
                <% Intervenants.forEach(function(entry) { %>
                    <tr>
                        <td>
                            <%= entry.identite %>
                        </td>
                        <td>
                            <%= entry.code %>
                        </td>
                        <td>
                            <%= entry.poste %>
                        </td>
                        <td>
                            <%= entry.mail %>
                        </td>
                    </tr>
                    <% }); %>
            </tbody>
        </table>
````

Ce qui donne le résultat suivant : 

![](https://cdn.discordapp.com/attachments/391192279253254166/960551436993839224/unknown.png)

### Création du QR Code

Pour mettre en place un système de création de QRCode pour l'opérateur nous allons tout d'abord créé notre interface <code>createqr.ejs</code>.

En fonction de la valeur de la variable <code>saisie</code>, il va être affiché, soit un formulaire permettant de données les informations permettant de générer un QRCode en envoyant ses données dans l'url <code>/createqr/scan</code> ou alors si la variable <code>saisie</code> est égal à false, il sera affiché sur la page le QrCode généré suite aux informations reçu grâce au formulaire.

```ejs
<% if (saisie) { %>
        <div class="container-fluid align-items-center">
            <div class="form-group">

                <form action="/createqr/scan" method="POST" class="form" style="margin-left:30%; margin-right:30%">

                    <div class="form-group">
                        <label for="identite">Identité</label>
                        <input type="text" class="form-control" name="identite" id="identite"
                            placeholder="Entrez votre prénom suivi de votre nom" required>
                    </div>

                    <div class="form-group">
                        <label for="code">Code de sécurité :</label>
                        <input type="password" class="form-control" name="code" id="code"
                            placeholder="Entrez votre code à l'abri des regards..." required>
                    </div>

                    <div class="form-group">
                        <label for="salle">Salle</label>
                        <input type="text" class="form-control" name="salle" id="salle"
                            placeholder="Entrez la salle d'intervention" required>
                    </div>
                    <div class="form-group">
                        <label for="horaireEntree">Horaire d'entrée</label>
                        <input type="datetime-local" class="form-control" name="horaireEntree" id="horaireEntree"
                            placeholder="Entrez l'heure de sortie" required>
                    </div>

                    <div class="form-group">
                        <br />
                        <button type="submit" class="btn btn-outline-primary">Générer le QRCode</button>
                    </div>
                </form>
            </div>
        </div>
<% } else { %>
       <h3>Voici le QR Code généré :</h3>
       <img src=<%=qr_code %> alt="QR Code">
<% } %>
```

Ce qui donne sur la page ce formulaire : 

![](https://cdn.discordapp.com/attachments/391192279253254166/960559139707301909/Formulaire.PNG)

### Affichage des interventions 

La fonction ci-dessous situé dans le fichier <code>intervenantion.js</code> fait appel au models "Intervention" afin de récupérer les données stocker dans la table Intervention de notre base de données.

````js
var express = require('express');
var router = express.Router();
const interventions = require("../models/intervention");

// Page racine
router.get("/", async function(req, res, next) {
    interventions.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("interventions", {
                title: "interventions",
                Interventions: result,
            });
            console.log(result);
        }
    });
});
````

On affiche ensuite dans le fichier <code>intervention.ejs</code>les interventions dans un tableau grâce à une boucle forEach qui parcours "Interventions"

````ejs
<div class="container-fluid d-flex align-items-center flex-column">
        <table class="table table-striped" id="myTable">
            <thead>
                <tr class="header">
                    <th>Identité</th>
                    <th>Code</th>
                    <th>Salle</th>
                    <th>Date</th>
                    <th>Heure d'entrée prévue</th>
                    <th>Heure d'entrée Réelle</th>
                    <th>Heure de sortie Réelle</th>
                </tr>
            </thead>

            <tbody>
                <% Interventions.forEach(function(entry) { %>
                    <tr>
                        <td>
                            <p>
                                <%= entry.identite %>
                            </p>
                        </td>
                        <td>
                            <p>
                                <%= entry.code %>
                            </p>
                        </td>
                        <td>
                            <p>
                                <%= entry.salle %>
                            </p>
                        </td>
                        <td>
                            <p>
                                <%= new Date(entry.heureDebutPrevu).getDate()+'-'+(new Date(entry.heureDebutPrevu).getMonth()+1)+'-'+new Date(entry.heureDebutPrevu).getFullYear();%>
                            </p>
                        </td>
                        <td>
                            <p>
                                <%= new Date(entry.heureDebutPrevu).getHours()+' h '+new Date(entry.heureDebutPrevu).getMinutes();%>
                            </p>

                        </td>
                        <td>
                            <p>
                                <%= new Date(entry.heureEntreeReelle).getHours()+' h '+new Date(entry.heureEntreeReelle).getMinutes();%>
                            </p>
                        </td>
                        <td>
                            <p>
                                <%= new Date(entry.heureSortieReelle).getHours()+' h '+new Date(entry.heureSortieReelle).getMinutes();%>
                            </p>
                        </td>
                    </tr>
                    <% }); %>
            </tbody>
        </table>
````

Ce qui donne le résultat suivant : 

![](https://cdn.discordapp.com/attachments/391192279253254166/965644325608362004/TableauInterventions.PNG)

### Filtre de recherche

Pour une meilleur recherche des interventions en fonction des intervenants, nous avons mis-en place un formulaire de recherche dans <code>interventions.ejs</code> :

````js
 <div style="margin-left: 7px; margin-top: 7px;" class="inputcontrol">
        <label for="search">
            <img src="">
        </label>
        <input type="text" onkeyup="recherche()" id="myInput" placeholder="Rechercher une intervention">
    </div>

<script>
            function recherche() {
                // Declare variables
                console.log("on est dedans");
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                table = document.getElementById("myTable");
                tr = table.getElementsByTagName("tr");

                // Loop through all table rows, and hide those who don't match the search query
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
        </script>
````



Sans filtre, toutes les interventions de tout les intervenants sont affichés

![](https://cdn.discordapp.com/attachments/391192279253254166/965693364546727966/FormRechercheVide.PNG)

Avec le filtre "Yannick" seul les interventions des intervenants contenant "yannick" dans leur nom sont affichés.

![](https://cdn.discordapp.com/attachments/391192279253254166/965694323020664933/FormRecherche.PNG)
