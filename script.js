// script.js
window.addEventListener('DOMContentLoaded', () => {
    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Empêcher le scroll sur le canvas (zoom BabylonJS uniquement)
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
    }, { passive: false });

    // Initialisation du moteur BabylonJS
    const engine = new BABYLON.Engine(canvas, true);
    let scene;

    // Fonction de création de la scène
    const createScene = () => {
        // Création d'une scène
        const scene = new BABYLON.Scene(engine);

        // Création d'une caméra ArcRotate (vue orbitale)
        // const camera = new BABYLON.ArcRotateCamera(
        //     "camera",
        //     -Math.PI / 2,   // angle horizontal
        //     Math.PI / 2.5,  // angle vertical
        //     5,              // distance du centre
        //     BABYLON.Vector3.Zero(),
        //     scene
        // );
        // camera.attachControl(canvas, true);
        //
        // // Limiter la distance de la caméra (zoom)
        // camera.lowerRadiusLimit = 3;
        // camera.upperRadiusLimit = 20;
        //
        // // Limiter l'angle vertical (éviter de passer sous la scène)
        // camera.lowerBetaLimit = Math.PI / 6 - 0.3;
        // camera.upperBetaLimit = Math.PI / 1.5 - 0.7;
        //
        // camera.wheelPrecision = 50;


        ////////////////////////////////////////////////////////////////////////////////////////////////////

        const camera = new BABYLON.UniversalCamera(
            "camera",
            new BABYLON.Vector3(0, 1, -5), // Position de départ
            scene
        );
        camera.attachControl(canvas, true);

// Paramètres pour un mouvement plus fluide
        camera.speed = 0.2; // Réduit la vitesse du déplacement
        camera.angularSensibility = 5000; // Réduit la sensibilité de la souris

// Active les touches pour se déplacer (ZQSD ou WASD)
        camera.keysUp = [90]; // Z (AZERTY) ou W (QWERTY)
        camera.keysDown = [83]; // S
        camera.keysLeft = [81]; // Q (AZERTY) ou A (QWERTY)
        camera.keysRight = [68]; // D

        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYDOWN:
                    if (kbInfo.event.key === "e") {
                        camera.position.y += 0.2; // Monter
                    } else if (kbInfo.event.key === "a") {
                        camera.position.y -= 0.2; // Descendre
                    }
                    break;
            }
        });

        camera.minZ = 0.1

        scene.onPointerUp = function(p,pick){
            if(pick.hit){
                console.log(pick.pickedPoint.x+', '+pick.pickedPoint.y+', '+pick.pickedPoint.z)
            }
        }

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
            if (infoDiv) {
                infoDiv.innerHTML = `
                    <h2>${mushroomName}</h2>
                    <p>Informations sur ${mushroomName}...</p>
                    <img src="asset/images/${mushroomName}.jpg" alt="${mushroomName}" style="max-width:100%;">
                `;
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
            name: "Amanite tue-mouche",
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

        // Lépiote déguenillée -----------------------------------------------------------------------------------------

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
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
