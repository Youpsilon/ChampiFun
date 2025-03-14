// script.js
window.addEventListener('DOMContentLoaded', () => {



    // Données pour chaque type de champignon
    // Données pour chaque type de champignon
    const mushroomData = {
        "Agaric impudique": {
            edible: false,
            photo: "asset/images/agaric.jpg", // Assurez-vous que le chemin et le nom du fichier sont corrects
            shortDescription: "Un champignon au chapeau grisâtre, parfois méconnu et non comestible.",
            longText: `
    <p>
      L’Agaric Impudique (Agaricus impudicus) est un champignon de la famille des Agaricacées. 
      Il se distingue par un chapeau de couleur grise ou brun clair, souvent légèrement fibrilleux 
      ou squamuleux en surface. Les lamelles, libres et de teinte rosée à l’état jeune, 
      deviennent rapidement brun chocolat en vieillissant. Son pied, blanc à grisâtre, 
      est relativement fin et peut présenter un anneau fragile.
    </p>
    <p>
      On le rencontre principalement dans les pelouses, prairies et clairières de forêts 
      mixtes, généralement de la fin du printemps jusqu’à l’automne. Bien qu’il soit parfois 
      confondu avec d’autres Agarics comestibles, il est <strong>fortement déconseillé 
      de le consommer</strong>, car il peut provoquer des troubles digestifs et n’est pas 
      reconnu comme un champignon de qualité culinaire.
    </p>
  `,
            characteristics: `
    <ul>
      <li><strong>Chapeau :</strong> Gris à brun clair, 5–10 cm, parfois fibrilleux.</li>
      <li><strong>Lamelles :</strong> Libres, passant du rose au brun chocolat.</li>
      <li><strong>Pied :</strong> Blanc à grisâtre, fin, avec un anneau fragile.</li>
      <li><strong>Spore Print :</strong> Brun foncé.</li>
      <li><strong>Habitat :</strong> Prairies, pelouses, clairières de forêts.</li>
      <li><strong>Saison :</strong> De la fin du printemps à l’automne.</li>
      <li><strong>État :</strong> Non comestible, voire toxique pour certains individus.</li>
    </ul>
  `,
            edibleIcon: "fa-solid fa-circle-xmark", // Icône Font Awesome pour 'non comestible'
            edibleTooltip: "Non comestible"
        }
        ,
        "Amadouvier": {
            edible: true,
            photo: "asset/images/amadouvier.jpg",
            shortDescription: "Champignon brun, souvent apprécié pour son goût délicat.",
            longText: `
          <p>
            L'amadouvier est un champignon comestible très apprécié dans certaines régions. 
            Il possède un chapeau brun, des lamelles légèrement décurrentes et un pied élancé. 
            On le trouve fréquemment dans les forêts de résineux, au printemps.
          </p>
          <p>
            Il est recommandé de bien le faire cuire afin de révéler toutes ses saveurs et 
            d'éliminer tout risque d'intoxication. Comme toujours, mieux vaut demander l'avis 
            d'un spécialiste si vous avez un doute.
          </p>
        `,
            characteristics: `
            <ul>
                <li><strong>Chapeau :</strong> Brun, convexe avec des lamelles légèrement décurrentes.</li>
                <li><strong>Pied :</strong> Long et fin.</li>
                <li><strong>Habitat :</strong> Forêt de résineux.</li>
                <li><strong>Saison :</strong> Printemps.</li>
                <li><strong>Edible :</strong> Comestible.</li>
            </ul>
        `,
            edibleIcon: "fa-solid fa-circle-check", // icône Font Awesome
            edibleTooltip: "Comestible"
        },

        "Amanite tue-mouche": {
            edible: false,
            photo: "asset/images/amanite.jpg", // Assurez-vous que ce chemin correspond à votre image
            shortDescription: "Le champignon rouge à pois blancs, emblématique mais toxique.",
            longText: `
    <p>
      L’Amanite tue-mouche (<em>Amanita muscaria</em>) est sans doute le champignon le plus 
      emblématique, souvent associé aux contes de fées en raison de son chapeau rouge vif 
      parsemé de flocons blancs. Malgré son apparence féerique, il s’agit d’un champignon 
      toxique qui peut provoquer des troubles neurologiques et digestifs. 
    </p>
    <p>
      Présente dans les forêts de conifères et de feuillus, l’Amanite tue-mouche pousse 
      généralement de la fin de l’été à l’automne. On la reconnaît facilement à son pied 
      blanc bulbeux muni d’un anneau, et à ses lamelles blanches serrées. 
      Il est impératif de ne pas la consommer, car elle renferme des substances 
      hallucinogènes et toxiques pouvant causer de graves intoxications.
    </p>
  `,
            characteristics: `
    <ul>
      <li><strong>Chapeau :</strong> Rouge vif, 8–20 cm de diamètre, recouvert de flocons blancs.</li>
      <li><strong>Lamelles :</strong> Blanches, libres, serrées.</li>
      <li><strong>Pied :</strong> Blanc, bulbeux, muni d’un anneau et d’une volve.</li>
      <li><strong>Spore Print :</strong> Blanc.</li>
      <li><strong>Habitat :</strong> Forêts de conifères et de feuillus.</li>
      <li><strong>Saison :</strong> Fin de l’été à l’automne.</li>
      <li><strong>État :</strong> Toxique, potentiellement hallucinogène.</li>
    </ul>
  `,
            edibleIcon: "fa-solid fa-circle-xmark", // Icône Font Awesome (croix dans un cercle)
            edibleTooltip: "Non comestible"
        },

        "Bolet bai": {
            edible: true,
            photo: "asset/images/bolet-bai.jpg", // Vérifiez le chemin et le nom du fichier image
            shortDescription: "Un bolet robuste au chapeau brun et aux pores dorés, apprécié pour sa saveur délicate.",
            longText: `
    <p>
      Le bolet bai est un champignon classique des forêts tempérées, reconnu pour son chapeau aux teintes brun à marron et ses pores d'un jaune doré.
      Sa texture ferme et sa saveur subtile en font un ingrédient recherché dans la cuisine, notamment lorsqu'il est sauté ou utilisé dans des sauces.
    </p>
    <p>
      On le trouve souvent dans des sols riches en humus, sous feuillus et conifères. Bien qu'il soit très apprécié, il est important de l'identifier correctement
      afin de ne pas confondre avec des espèces similaires non comestibles.
    </p>
  `,
            characteristics: `
    <ul>
      <li><strong>Chapeau :</strong> Brun à marron, 5-15 cm de diamètre, légèrement bosselé.</li>
      <li><strong>Pores :</strong> Jaunes à dorés, spongieux et s'assombrissant avec l'âge.</li>
      <li><strong>Pied :</strong> Épais, robuste, de teinte similaire au chapeau.</li>
      <li><strong>Spore Print :</strong> Brun clair à doré.</li>
      <li><strong>Habitat :</strong> Sols riches en humus, sous feuillus et conifères.</li>
      <li><strong>Saison :</strong> Été et automne.</li>
      <li><strong>Edible :</strong> Comestible.</li>
    </ul>
  `,
            edibleIcon: "fa-solid fa-circle-check",  // Icône Font Awesome pour "comestible"
            edibleTooltip: "Comestible"
        },
        "Bolet à chair jaune": {
            edible: false,
            photo: "asset/images/bolet-a-chair-jaune.jpg", // Vérifiez le chemin et le nom du fichier image
            shortDescription: "Un bolet à chair jaune vif, remarquable par sa couleur et sa texture unique.",
            longText: `
    <p>
      Le bolet à chair jaune se distingue par une coloration intense de son pied et de sa chair, lui conférant un aspect particulièrement attractif.
      Bien que sa teinte vive puisse séduire, il est classé comme non comestible en raison de substances qui lui donnent un goût désagréable.
    </p>
    <p>
      Ce champignon se rencontre dans des environnements forestiers spécifiques, souvent dans des sols bien drainés.
      Il témoigne de la grande diversité de l'écosystème, et il est préférable de l'admirer plutôt que de le consommer.
    </p>
  `,
            characteristics: `
    <ul>
      <li><strong>Chapeau :</strong> Couleur variable, généralement moins intense que la chair, 5-12 cm de diamètre.</li>
      <li><strong>Pores :</strong> Jaunes ou légèrement orangés, fins et réguliers.</li>
      <li><strong>Pied :</strong> Long et élancé, avec une chair d'un jaune vif caractéristique.</li>
      <li><strong>Spore Print :</strong> Jaune pâle.</li>
      <li><strong>Habitat :</strong> Forêts avec des sols bien drainés.</li>
      <li><strong>Saison :</strong> Fin d'été et automne.</li>
      <li><strong>Edible :</strong> Non comestible.</li>
    </ul>
  `,
            edibleIcon: "fa-solid fa-circle-xmark",  // Icône Font Awesome pour "non comestible"
            edibleTooltip: "Non comestible"
        },

        "Cèpe": {
            edible: true,
            photo: "asset/images/cepe.jpg", // Vérifiez que l'image existe à ce chemin
            shortDescription: "Le cépe, champignon raffiné aux saveurs intenses.",
            longText: `
      <p>
        Le cépe (Boletus edulis), également appelé cèpe de Bordeaux, est très apprécié en cuisine pour sa texture charnue et sa saveur riche.
        Son chapeau brun à doré, large et convexe, et son pied robuste en font un incontournable des plats gastronomiques.
      </p>
      <p>
        Il pousse principalement dans les forêts mixtes et les zones humides, de l'été à l'automne.
        Sa cueillette demande une identification soignée pour éviter toute confusion avec des espèces toxiques.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Brun à doré, large et convexe.</li>
        <li><strong>Pieds :</strong> Épais et robuste, souvent brun clair.</li>
        <li><strong>Spore Print :</strong> Brun.</li>
        <li><strong>Habitat :</strong> Forêts mixtes et zones humides.</li>
        <li><strong>Saison :</strong> Été à automne.</li>
        <li><strong>Edible :</strong> Comestible et très apprécié en cuisine.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check", // Icône Font Awesome pour comestible
            edibleTooltip: "Comestible"
        },
        "Amanite césar": {
            edible: true,
            photo: "asset/images/amanite-cesar.jpg", // Vérifiez que l'image est bien placée à ce chemin
            shortDescription: "L’Amanite César, un champignon royal et savoureux.",
            longText: `
      <p>
        L’Amanite César (Amanita caesarea) est un champignon culinaire de grande valeur, reconnu pour sa texture fondante et sa saveur délicate.
        Son chapeau orangé à rouge orangé, associé à un pied épais et harmonieux, lui confère une allure majestueuse qui a inspiré des légendes.
      </p>
      <p>
        Typiquement rencontré dans les forêts méditerranéennes et tempérées, il pousse en symbiose avec certains arbres feuillus.
        Sa cueillette requiert une identification précise, car il existe des espèces toxiques pouvant être confondues avec lui.
        Très prisé en gastronomie, il figure parmi les mets raffinés dans la cuisine italienne et méditerranéenne.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Orangé à rouge orangé, large et convexe.</li>
        <li><strong>Pieds :</strong> Épais, robuste et de couleur similaire au chapeau.</li>
        <li><strong>Spore Print :</strong> Blanc à crème.</li>
        <li><strong>Habitat :</strong> Forêts méditerranéennes et tempérées, souvent sous chênes et pins.</li>
        <li><strong>Saison :</strong> Printemps à début d'été.</li>
        <li><strong>Edible :</strong> Comestible, très apprécié en gastronomie.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check", // Icône pour comestible
            edibleTooltip: "Comestible"
        },


        "Champignon de Paris": {
            edible: true,
            photo: "asset/images/champignon-paris.jpg",
            shortDescription: "Le champignon de Paris, classique et délicat, cultivé en cave.",
            longText: `
      <p>
        Le champignon de Paris est l'un des champignons les plus connus et consommés. Sa texture fine, son goût subtil 
        et sa polyvalence en cuisine en font un ingrédient incontournable.
      </p>
      <p>
        Cultivé dans des environnements contrôlés, il est apprécié pour sa consistance et sa capacité à s'intégrer dans de nombreuses recettes.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Lisse, blanc à crème.</li>
        <li><strong>Pied :</strong> Fin, souvent blanchâtre.</li>
        <li><strong>Spore Print :</strong> Blanc.</li>
        <li><strong>Habitat :</strong> Cultivé, mais pousse également à l'état sauvage en milieux humides.</li>
        <li><strong>Saison :</strong> Toute l'année en culture, principalement en automne à l'état sauvage.</li>
        <li><strong>Edible :</strong> Très comestible.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check",
            edibleTooltip: "Comestible"
        },
        "Dédale du chêne": {
            edible: true,
            photo: "asset/images/dedale.png",
            shortDescription: "Un champignon de chêne au goût subtil et texture raffinée.",
            longText: `
      <p>
        Le dédale du chêne se caractérise par son chapeau irrégulier et sa texture ferme, qui lui confèrent une saveur délicate et raffinée.
        Poussé dans les forêts de chênes à l'automne, il est très apprécié par les amateurs de champignons fins.
      </p>
      <p>
        Sa cueillette demande une identification minutieuse afin d’éviter toute confusion avec d’autres espèces.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Brun, irrégulier et souvent bosselé.</li>
        <li><strong>Pied :</strong> Ferme et central.</li>
        <li><strong>Spore Print :</strong> Brun clair.</li>
        <li><strong>Habitat :</strong> Forêts de chênes.</li>
        <li><strong>Saison :</strong> Automne.</li>
        <li><strong>Edible :</strong> Comestible.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check",
            edibleTooltip: "Comestible"
        },
        "Lépiote déguenillée": {
            edible: false,
            photo: "asset/images/lapiote.jpg",
            shortDescription: "Un champignon rare au chapeau délicat et à la texture fine.",
            longText: `
      <p>
        La lépiote de deguenille est un petit champignon au chapeau pâle et fragile, reconnu pour sa finesse.
        Elle pousse dans des milieux humides et ombragés, et bien que son apparence soit raffinée, 
        elle n'est généralement pas consommée en raison de son goût neutre et de sa faible densité.
      </p>
      <p>
        Ce champignon est surtout apprécié pour son aspect ornemental et sa rareté dans certaines forêts.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Petit, pâle et délicat.</li>
        <li><strong>Pied :</strong> Fin et fragile.</li>
        <li><strong>Habitat :</strong> Milieux humides et ombragés.</li>
        <li><strong>Saison :</strong> Printemps.</li>
        <li><strong>Edible :</strong> Non comestible.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-xmark",
            edibleTooltip: "Non comestible"
        },
        "Panus en éventail": {
            edible: true,
            photo: "asset/images/panus.jpg",
            shortDescription: "Un champignon en éventail, délicat et savoureux.",
            longText: `
      <p>
        Le panus en éventail se distingue par son chapeau en forme d'éventail et sa texture tendre. 
        Poussant sur le bois en décomposition dans les forêts humides, il offre une saveur subtile 
        qui le rend intéressant pour la cuisine expérimentale. Sa cueillette doit être réalisée avec précaution.
      </p>
      <p>
        Bien que moins connu que d'autres champignons, il représente un exemple fascinant de la diversité fongique.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> En éventail, de teintes variables.</li>
        <li><strong>Pied :</strong> Court et discret.</li>
        <li><strong>Habitat :</strong> Sur bois en décomposition dans les forêts humides.</li>
        <li><strong>Saison :</strong> Automne.</li>
        <li><strong>Edible :</strong> Comestible, à consommer avec précaution.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check",
            edibleTooltip: "Comestible"
        },
        "Trompette de la mort": {
            edible: true,
            photo: "asset/images/trompette.jpg",
            shortDescription: "Un champignon sombre et mystérieux, très prisé en gastronomie.",
            longText: `
      <p>
        La trompette de la mort est un champignon allongé à la couleur sombre, presque noire,
        avec une texture charnue et une saveur intense. Il pousse dans les forêts humides, souvent en automne,
        et est considéré comme une véritable gourmandise malgré son nom inquiétant.
      </p>
      <p>
        Très apprécié des chefs, ce champignon offre une saveur unique qui rehausse les plats les plus raffinés.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Allongé, sombre, parfois noir.</li>
        <li><strong>Pied :</strong> Fin et discret.</li>
        <li><strong>Habitat :</strong> Forêts humides, automne.</li>
        <li><strong>Saison :</strong> Automne.</li>
        <li><strong>Edible :</strong> Comestible, et recherché en cuisine.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check",
            edibleTooltip: "Comestible"
        },
        "Portobello": {
            edible: true,
            photo: "asset/images/portobello.jpg",
            shortDescription: "Un grand champignon charnu, parfait pour la cuisine végétarienne.",
            longText: `
      <p>
        Le portobello est une version mature du champignon de Paris. Il se caractérise par son grand chapeau,
        sa texture ferme et sa saveur prononcée. Utilisé dans de nombreuses recettes, il est particulièrement apprécié
        pour sa capacité à remplacer la viande dans les plats végétariens.
      </p>
      <p>
        Cultivé en cave ou en plein air, il est disponible toute l'année, avec une récolte principale en automne.
      </p>
    `,
            characteristics: `
      <ul>
        <li><strong>Chapeau :</strong> Grand, lisse et brun.</li>
        <li><strong>Pied :</strong> Épais et robuste.</li>
        <li><strong>Habitat :</strong> Cultivé en cave et en plein air.</li>
        <li><strong>Saison :</strong> Automne.</li>
        <li><strong>Edible :</strong> Très comestible.</li>
      </ul>
    `,
            edibleIcon: "fa-solid fa-circle-check",
            edibleTooltip: "Comestible"
        }
    };





    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Empêcher le scroll sur le canvas (zoom BabylonJS uniquement)
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
    }, { passive: false });

    // Initialisation du moteur BabylonJS
    const engine = new BABYLON.Engine(canvas, true);
    let scene;
    let camera; // Déclarée en global

    const mushroomGroups = {}; // Objet pour stocker les positions par type de champignon

    // Fonction de création de la scène
    const createScene = () => {
        // Création d'une scène
        const scene = new BABYLON.Scene(engine);



        ////////////////////////////////////////////////////////////////////////////////////////////////////

//         const camera = new BABYLON.UniversalCamera(
//             "camera",
//             new BABYLON.Vector3(0, 1, -5), // Position de départ
//             scene
//         );
//         camera.attachControl(canvas, true);
//
// // Paramètres pour un mouvement plus fluide
//         camera.speed = 0.2; // Réduit la vitesse du déplacement
//         camera.angularSensibility = 5000; // Réduit la sensibilité de la souris
//
// // Active les touches pour se déplacer (ZQSD ou WASD)
//         camera.keysUp = [90]; // Z (AZERTY) ou W (QWERTY)
//         camera.keysDown = [83]; // S
//         camera.keysLeft = [81]; // Q (AZERTY) ou A (QWERTY)
//         camera.keysRight = [68]; // D
//
//         scene.onKeyboardObservable.add((kbInfo) => {
//             switch (kbInfo.type) {
//                 case BABYLON.KeyboardEventTypes.KEYDOWN:
//                     if (kbInfo.event.key === "e") {
//                         camera.position.y += 0.2; // Monter
//                     } else if (kbInfo.event.key === "a") {
//                         camera.position.y -= 0.2; // Descendre
//                     }
//                     break;
//             }
//         });
//
//         camera.minZ = 0.1
//
//         scene.onPointerUp = function(p,pick){
//             if(pick.hit){
//                 console.log(pick.pickedPoint.x+', '+pick.pickedPoint.y+', '+pick.pickedPoint.z)
//             }
//         }

        // Création de la caméra ArcRotate avec zoom de départ maximal (très proche du pivot)
        camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,          // Angle horizontal (alpha)
            Math.PI / 4,           // Angle vertical initial (beta) à 45°
            2.5,                   // Rayon initial (distance par rapport au pivot)
            BABYLON.Vector3.Zero(),// Pivot initial (sera mis à jour ensuite)
            scene
        );
        camera.attachControl(canvas, true);


// Autoriser un zoom encore plus rapproché en fixant une limite inférieure plus basse
        camera.lowerRadiusLimit = 2;  // L'utilisateur pourra zoomer jusqu'à une distance de 1
        camera.upperRadiusLimit = 5; // Distance maximale de zoom

// Pour éviter que la caméra ne descende sous le sol, on limite l'angle vertical (beta)
// Ici, beta représente l'angle entre la ligne reliant le pivot et la caméra et l'horizontale.
// On fixe une limite inférieure (par exemple 0.1 rad) pour éviter que la caméra ne passe sous le pivot.
        camera.lowerBetaLimit = 0.2;  // La caméra ne peut pas descendre en dessous d'environ 6° au-dessus de l'horizontale
// Optionnel : Limiter l'angle supérieur si nécessaire
        camera.upperBetaLimit = Math.PI / 2; // La caméra ne peut pas dépasser la vue de dessus

        // Réduire la sensibilité du zoom avec la molette
        camera.wheelPrecision = 200;



        /////////////////////////////////////////////////////////////////////////////////////////////

        // Lumière hémisphérique
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 2;

        // Création d'un HighlightLayer pour le survol
        const hl = new BABYLON.HighlightLayer("hl", scene);

        // Chargement de la forêt en arrière-plan
        BABYLON.SceneLoader.ImportMesh(
            "",
            "asset/model/pine_forest/",
            "scene.gltf",
            scene,
            function (forestMeshes) {
                console.log("Forêt chargée :", forestMeshes);
                forestMeshes.forEach(mesh => {
                    mesh.position = BABYLON.Vector3.Zero();
                });
            },
            null,
            function (scene, message, exception) {
                console.error("Erreur lors du chargement de la forêt :", message, exception);
            }
        );

        // Fonction pour afficher les infos du champignon
        function displayMushroomInfo(mushroomName) {
            console.log("Champignon cliqué :", mushroomName);

            const infoDiv = document.getElementById("mushroomInfo");
            // Rendre la div visible
            infoDiv.style.display = "block";

            // On utilise le nom en minuscule pour accéder aux données
            const data = mushroomData[mushroomName] || {};

            // Exemples de textes plus longs (vous pouvez ajuster chaque champignonData)
            const defaultLongText = `
      <p>
        Ce champignon est un spécimen intéressant pour les amateurs et les curieux. 
        Il possède des caractéristiques remarquables et un rôle important dans l'écosystème forestier.
        N'oubliez jamais de vérifier vos trouvailles auprès d'un expert avant toute consommation !
      </p>
    `;

            // Construction de la fenêtre d'information
            infoDiv.innerHTML = `
  <div class="mushroom-card">
    <div class="mushroom-header">
      <h2 class="mushroom-title">${mushroomName}</h2>
      <button class="mushroom-edible-btn">
        ${data.edible ? "Comestible" : "Non comestible"}
      </button>
    </div>

    <img class="main-photo" src="${data.photo || 'asset/images/default.jpg'}" alt="${mushroomName}">
    
    <h3 class="mushroom-subtitle">
      ${data.shortDescription || "Un champignon fascinant à découvrir !"}
    </h3>

    <div class="mushroom-details">
      ${data.characteristics || '<p>Pas de caractéristiques disponibles.</p>'}
    </div>

    <div class="mushroom-longtext">
      ${data.longText || "<p>Aucune description plus longue fournie.</p>"}
    </div>
  </div>
`;


            // Gestion du bouton de fermeture
            const closeBtn = document.getElementById("mushroomCloseBtn");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    infoDiv.style.display = "none";
                });
            }
        }





        // Fonction pour charger un champignon .glb
        function loadMushroom(
            fileName,
            {
                name = "Champignon",
                position = new BABYLON.Vector3(0, 0, 0),
                rotation = new BABYLON.Vector3(0, 0, 0),
                scaling = new BABYLON.Vector3(5, 5, 5)
            } = {}
        ) {
            BABYLON.SceneLoader.ImportMesh(
                "",                       // importer tous les meshes
                "asset/model/champignon/",// chemin vers le dossier contenant le .glb
                fileName,                 // nom du fichier .glb
                scene,
                function (meshes) {
                    console.log(`Champignon '${fileName}' chargé :`, meshes);

                    // Créer un parent (vide) pour regrouper tous les sous-meshes du champignon
                    const parent = new BABYLON.Mesh(name + "_parent", scene);
                    parent.position = position;
                    parent.rotation = rotation;
                    parent.scaling = scaling;

                    if (!mushroomGroups[name]) {
                        mushroomGroups[name] = [];
                    }
                    mushroomGroups[name].push(parent.position);


                    // Parcourir les sous-meshes importés
                    meshes.forEach(mesh => {
                        // Rendre chaque sous-mesh cliquable
                        mesh.isPickable = true;
                        mesh.parent = parent;

                        // Créer un ActionManager pour ce mesh
                        mesh.actionManager = new BABYLON.ActionManager(scene);

                        // Survol : highlight jaune
                        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPointerOverTrigger,
                            function () {
                                hl.addMesh(mesh, new BABYLON.Color3(1, 1, 0)); // jaune
                            }
                        ));

                        // Sortie du survol : retirer le highlight
                        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPointerOutTrigger,
                            function () {
                                hl.removeMesh(mesh);
                            }
                        ));

                        // Clic : afficher les infos du champignon
                        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPickTrigger,
                            function () {
                                displayMushroomInfo(name);
                            }
                        ));
                    });
                },
                null,
                function (scene, message, exception) {
                    console.error("Erreur lors du chargement du champignon :", fileName, message, exception);
                }
            );
        }

        // --- Exemple d'utilisation : charger tous les champignons avec rotation et scale personnalisés ---

        // Agaric Impudique --------------------------------------------------------------------------------------------
        loadMushroom("agaric-impudique.glb", {
            name: "Agaric impudique",
            position: new BABYLON.Vector3(-6.76503388470301, -0.03181814796002724, -5.5204146462859995),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("agaric-impudique.glb", {
            name: "Agaric impudique",
            position: new BABYLON.Vector3(-7.051234567114685, -0.0338995769463768, -5.421587022746104),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(2, 2, 2)
        });

        loadMushroom("agaric-impudique.glb", {
            name: "Agaric impudique",
            position: new BABYLON.Vector3(-6.949785217095906, -0.055987401357396105, -5.758248554745695),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });

        loadMushroom("agaric-impudique.glb", {
            name: "Agaric impudique",
            position: new BABYLON.Vector3(-6.417265204764464, -0.008823800898113632, -5.370064589963696),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.8, 0),
            scaling: new BABYLON.Vector3(2.5, 2.5, 2.5)
        });

        loadMushroom("agaric-impudique.glb", {
            name: "Agaric impudique",
            position: new BABYLON.Vector3(-6.695477464597615, -0.006969386132889166, -5.222752794324391),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, -3, 0),
            scaling: new BABYLON.Vector3(1.5, 1.5, 1.5)
        });

        // Amadouvier --------------------------------------------------------------------------------------------------

        loadMushroom("amadouvier.glb", {
            name: "Amadouvier",
            position: new BABYLON.Vector3(-0.2, 1.5, -6.4),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(4, 4, 4)
        });

        loadMushroom("amadouvier.glb", {
            name: "Amadouvier",
            position: new BABYLON.Vector3(-0.33, 1.4, -6.5),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, -1.25, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });

        // Amanite tue mouche ------------------------------------------------------------------------------------------

        loadMushroom("amanite.glb", {
            name: "Amanite tue-mouche",
            position: new BABYLON.Vector3(12.94810609869538, 0.025628115496387327, -1.359647027303297),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(10, 10, 10)
        });

        loadMushroom("amanite-cesar.glb", {
            name: "Amanite tue-mouche",
            position: new BABYLON.Vector3(13.101596096170235, 0.020387522964214866, -1.5262634510565438),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("amanite-cesar.glb", {
            name: "Amanite tue-mouche",
            position: new BABYLON.Vector3(12.09043639093444, 0.031120941008256242, -1.1850112513925106),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(7, 7, 7)
        });

        loadMushroom("amanite.glb", {
            name: "amanite",
            position: new BABYLON.Vector3(13.44128992095424, 0.03, -0.1872537941000556),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(8, 8, 8)
        });

        // Bolet bai ---------------------------------------------------------------------------------------------------

        loadMushroom("bolet-bai.glb", {
            name: "Bolet bai",
            position: new BABYLON.Vector3(-1.551549909037352, 0.04238580924278512, 11.355175790004449),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("bolet-bai.glb", {
            name: "Bolet bai",
            position: new BABYLON.Vector3(-1.4654619240621554, 0.031022335425398673, 11.261633098824028),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(2.2, 2.2, 2.2)
        });

        // Bolet à chair jaune -----------------------------------------------------------------------------------------

        loadMushroom("bolet-chair-jaune.glb", {
            name: "Bolet à chair jaune",
            position: new BABYLON.Vector3(-10.672238299292934, -0.013765268736194991, 1.911690461750604),
            rotation: new BABYLON.Vector3(3, 0, 0),
            scaling: new BABYLON.Vector3(-0.04, -0.04, -0.04)
        });

        loadMushroom("bolet-chair-jaune.glb", {
            name: "Bolet à chair jaune",
            position: new BABYLON.Vector3(-10.544265754736454, -0.018035189805486462, 1.935453206750285),
            rotation: new BABYLON.Vector3(3, 2.4, 0),
            scaling: new BABYLON.Vector3(-0.07, -0.07, -0.07)
        });

        loadMushroom("bolet-chair-jaune.glb", {
            name: "Bolet à chair jaune",
            position: new BABYLON.Vector3(-10.912292904179155, -0.016811047073771623, 2.043995693274974),
            rotation: new BABYLON.Vector3(3, 4, 0),
            scaling: new BABYLON.Vector3(-0.06, -0.06, -0.06)
        });

        // Cepe --------------------------------------------------------------------------------------------------------

        loadMushroom("cepe.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.414363200599726, -0.03423890018464565, -13.406582868030565),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("cepe.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.466844839244695, -0.03452947849809035, -13.150388038490224),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });

        loadMushroom("cepe.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.679023228996985, -0.036788280933511386, -12.874800157653588),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(4, 4, 4)
        });

        loadMushroom("cepe-2.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.756191470405233, -0.036131521769877994, -13.086012140826556),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("cepe-2.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.506291741635952, -0.03474788658639366, -12.898474856700274),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(1, 1, 1)
        });

        loadMushroom("cepe-2.glb", {
            name: "Cèpe",
            position: new BABYLON.Vector3(-7.5360239730218535, -0.03491250685881908, -13.32316927715757),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.5, 0),
            scaling: new BABYLON.Vector3(1.4, 1.4, 1.4)
        });

        // Amanite cesar -----------------------------------------------------------------------------------------------

        loadMushroom("champignon-a-lames.glb", {
            name: "Amanite césar",
            position: new BABYLON.Vector3(8.247186125231746, 0.8360491978928191, -15.700447425105232),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("champignon-a-lames.glb", {
            name: "Amanite césar",
            position: new BABYLON.Vector3(8.09724604717394, 0.8554435587453257, -15.635366542308034),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });

        // Champignon de Paris -----------------------------------------------------------------------------------------

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.60503123699659, 0.2848944565161553, 14.631761576706007),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.550431490860012, 0.14411540254965938, 15.362051974510662),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1, 0),
            scaling: new BABYLON.Vector3(2, 2, 2)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.765087549420674, 0.25204928183124675, 14.802145699988394),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(3.3, 3.3, 3.3)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.512409631464984, 0.20459844677252625, 15.048296588453969),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(4.6, 4.6, 4.6)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(7.040738341202793, 0.1975305098287834, 15.084961463922818),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1.5, 0),
            scaling: new BABYLON.Vector3(1.1, 1.1, 1.1)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.632148719402646, 0.08205816453571707, 15.683973480295505),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3.4, 0),
            scaling: new BABYLON.Vector3(2.7, 2.7, 2.7)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.845377843481574, 0.08606003073307378, 15.66321382624978),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.8, 0),
            scaling: new BABYLON.Vector3(4.1, 4.1, 4.1)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "Champignon de Paris",
            position: new BABYLON.Vector3(6.043816676525917, 0.12971340325737596, 15.436762249200013),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0.6, 0),
            scaling: new BABYLON.Vector3(1.7, 1.7, 1.7)
        });

        // Dédale du chêne ---------------------------------------------------------------------------------------------

        loadMushroom("dedale-du-chene.glb", {
            name: "Dédale du chêne",
            position: new BABYLON.Vector3(-8.33, 2, 7.74),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.5, 0),
            scaling: new BABYLON.Vector3(4, 4, 4)
        });

        loadMushroom("dedale-du-chene.glb", {
            name: "Dédale du chêne",
            position: new BABYLON.Vector3(-8.3, 1.97, 7.83),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.5, 0),
            scaling: new BABYLON.Vector3(1.5, 1.5, 1.5)
        });

        loadMushroom("dedale-du-chene.glb", {
            name: "Dédale du chêne",
            position: new BABYLON.Vector3(-8.4, 1.9, 7.75),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2.8, 0),
            scaling: new BABYLON.Vector3(2.8, 2.8, 2.8)
        });

        // Lapiote déguenillée -----------------------------------------------------------------------------------------

        loadMushroom("lapiote-deguenille.glb", {
            name: "Lépiote déguenillée",
            position: new BABYLON.Vector3(5.0640847861898814, 0.65, 6.697748037888171),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("lapiote-deguenille.glb", {
            name: "Lépiote déguenillée",
            position: new BABYLON.Vector3(5.229916417828624, 0.67, 6.740865478058817),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(4, 4, 4)
        });

        // Panus en éventail -------------------------------------------------------------------------------------------

        loadMushroom("panus-en-enventail.glb", {
            name: "Panus en éventail",
            position: new BABYLON.Vector3(-9.566017809810257, 0.7625013972023748, 12.80345388679644),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(7, 7, 7)
        });

        loadMushroom("panus-en-enventail.glb", {
            name: "Panus en éventail",
            position: new BABYLON.Vector3(-9.412521372142113, 0.7157384556682806, 12.667561093170018),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(3.6, 3.6, 3.6)
        });

        loadMushroom("panus-en-enventail.glb", {
            name: "Panus en éventail",
            position: new BABYLON.Vector3(-9.875279510086648, 0.7737717978112592, 12.44400082105795),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1.5, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        // Portobello --------------------------------------------------------------------------------------------------

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-15.986760465029535, 0.2742609309303466, -10.385754221647096),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-16.28764383128397, 0.2366187112413627, -10.375876948558517),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(1, 1, 1)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-15.977653646174424, 0.2089120916904869, -9.945140225094484),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1, 0),
            scaling: new BABYLON.Vector3(3.5, 3.5, 3.5)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-16.339030344236182, 0.29744955749900964, -10.820218752645008),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(4.6, 4.6, 4.6)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-16.184690224480892, 0.2145438914466944, -10.147454942899733),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1, 0),
            scaling: new BABYLON.Vector3(1.4, 1.4, 1.4)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-16.249485792659257, 0.27478891189137133, -10.598596269492212),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(1.8, 1.8, 1.8)
        });

        loadMushroom("portobello.glb", {
            name: "Portobello",
            position: new BABYLON.Vector3(-16.409257192738266, 0.26164813050190416, -10.6387604161355),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(1.2, 1.2, 1.2)
        });

        // Trompette de la mort ----------------------------------------------------------------------------------------

        loadMushroom("trompette-de-la-mort.glb", {
            name: "Trompette de la mort",
            position: new BABYLON.Vector3(-22.28326122891519, 0.27264381710039043, 11.310286394190268),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("trompette-de-la-mort.glb", {
            name: "Trompette de la mort",
            position: new BABYLON.Vector3(-22.611731120400105, 0.27258540757927674, 11.281675988920325),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 2, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });

        loadMushroom("trompette-de-la-mort.glb", {
            name: "Trompette de la mort",
            position: new BABYLON.Vector3(-22.425502618854654, 0.28098523715723256, 11.137069943139696),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 3, 0),
            scaling: new BABYLON.Vector3(4.6, 4.6, 4.6)
        });

        loadMushroom("trompette-de-la-mort.glb", {
            name: "Trompette de la mort",
            position: new BABYLON.Vector3(-22.55204099098037, 0.28479337076892186, 11.052414826066688),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 1, 0),
            scaling: new BABYLON.Vector3(2.4, 2.4, 2.4)
        });

        loadMushroom("trompette-de-la-mort.glb", {
            name: "Trompette de la mort",
            position: new BABYLON.Vector3(-22.354274306981672, 0.2873346974154396, 11.021466734002598),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 4, 0),
            scaling: new BABYLON.Vector3(3.7, 3.7, 3.7)
        });

        return scene;
    }

    // Création de la scène
    scene = createScene();


    scene.executeWhenReady(() => {
        // Masquer le loader lorsque la scène est prête
        const loader = document.getElementById("loaderOverlay");
        if (loader) {
            loader.style.display = "none";
        }

        // (Optionnel) Vous pouvez aussi centrer la caméra sur le groupe de champignons ici...
        const mushroomTypes = Object.keys(mushroomData);
        let currentIndex = 1; // Par exemple, index 1
        const currentMushroomTypeSpan = document.getElementById("currentMushroomType");
        if (mushroomTypes.length > 0) {
            const type = mushroomTypes[currentIndex];
            camera.target = getPivotForType(type);
            camera.beta = Math.PI / 3; // 45° de vertical
            if (currentMushroomTypeSpan) {
                currentMushroomTypeSpan.innerText = type;
            }
        }
    });





    function getPivotForType(type) {
        const positions = mushroomGroups[type];
        if (!positions || positions.length === 0) {
            return BABYLON.Vector3.Zero();
        }
        // Somme des positions
        let sum = positions.reduce((acc, pos) => acc.add(pos), BABYLON.Vector3.Zero());
        return sum.scale(1 / positions.length);
    }



    engine.runRenderLoop(() => {
        scene.render();
    });

    // Récupération des types depuis mushroomData
    const mushroomTypes = Object.keys(mushroomData);

// Variable pour suivre l'indice courant
    let currentIndex = 1;

// Mettre à jour l'affichage du nom du champignon courant (si vous utilisez la navigation unique)
    const currentMushroomTypeSpan = document.getElementById("currentMushroomType");

// Si au moins un type existe, centrer la caméra sur le groupe correspondant
    if (mushroomTypes.length > 0) {
        // Centrer la caméra sur le groupe du premier type
        camera.target = getPivotForType(mushroomTypes[currentIndex]);
        // Mettre à jour l'affichage du nom
        currentMushroomTypeSpan.innerText = mushroomTypes[currentIndex];
    }


    document.getElementById("prevBtn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + mushroomTypes.length) % mushroomTypes.length;
        const type = mushroomTypes[currentIndex];
        camera.target = getPivotForType(type);
        camera.beta = Math.PI / 3; // Réinitialiser l'angle vertical à 45°
        currentMushroomTypeSpan.innerText = type;
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mushroomTypes.length;
        const type = mushroomTypes[currentIndex];
        camera.target = getPivotForType(type);
        camera.beta = Math.PI / 3; // Réinitialiser l'angle vertical à 45°
        currentMushroomTypeSpan.innerText = type;
    });




    window.addEventListener("resize", () => {
        engine.resize();
    });
});
