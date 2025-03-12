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

        /////////////////////////////////////////////////////////////////////////////////////////////

        // Lumière hémisphérique
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.8;

        // --- Chargement de la forêt en arrière-plan (facultatif) ---
        BABYLON.SceneLoader.ImportMesh(
            "",                          // importer tous les meshes
            "asset/model/pine_forest/",  // dossier de la forêt
            "scene.gltf",                // fichier glTF de la forêt
            scene,
            function (forestMeshes) {
                console.log("Forêt chargée :", forestMeshes);
                // Exemple : centrer la forêt
                forestMeshes.forEach(mesh => {
                    mesh.position = BABYLON.Vector3.Zero();
                });
            },
            null,
            function (scene, message, exception) {
                console.error("Erreur lors du chargement de la forêt :", message, exception);
            }
        );

        // --- Fonction pour charger un seul champignon .glb ---
        function loadMushroom(
            fileName,
            {
                name = "Champignon",
                // Par défaut, on place chaque champignon à (0,0,0)
                position = new BABYLON.Vector3(0, 0, 0),
                // Par défaut, aucune rotation (en radians)
                rotation = new BABYLON.Vector3(0, 0, 0),
                // Agrandir par défaut la taille (ici 5 fois)
                scaling = new BABYLON.Vector3(5, 5, 5),
                showBoundingBox = true
            } = {}
        ) {
            BABYLON.SceneLoader.ImportMesh(
                "",                          // importer tous les meshes
                "asset/model/champignon/",   // chemin vers le dossier contenant les .glb
                fileName,                    // nom du fichier .glb (ex: "agaric-impudique.glb")
                scene,
                function (meshes) {
                    console.log(`Champignon '${fileName}' chargé :`, meshes);

                    // Créer un parent pour regrouper tous les meshes du champignon
                    const parent = new BABYLON.Mesh(name + "_parent", scene);

                    // Appliquer position, rotation et scaling sur le parent
                    parent.position = position;
                    parent.rotation = rotation;
                    parent.scaling = scaling;

                    // Attacher chaque mesh importé au parent
                    meshes.forEach(mesh => {
                        mesh.parent = parent;
                    });

                    // Afficher la bounding box (optionnel) pour vérification
                    parent.showBoundingBox = showBoundingBox;
                },
                null,
                function (scene, message, exception) {
                    console.error("Erreur lors du chargement du champignon :", fileName, message, exception);
                }
            );
        }

        // --- Exemple d'utilisation : charger tous les champignons avec rotation et scale personnalisés ---

        // Exemple 1 : Agaric Impudique
        loadMushroom("agaric-impudique.glb", {
            name: "agaricimpudique",
            position: new BABYLON.Vector3(0, -0.35, 0),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("amadouvier.glb", {
            name: "amadouvier",
            position: new BABYLON.Vector3(-0.2, 1.5, -6.4),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(4, 4, 4)
        });

        loadMushroom("amadouvier.glb", {
            name: "amadouvier2",
            position: new BABYLON.Vector3(-0.33, 1.4, -6.5),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, -1.25, 0),
            scaling: new BABYLON.Vector3(3, 3, 3)
        });


        loadMushroom("amanite.glb", {
            name: "amanite",
            position: new BABYLON.Vector3(1, 0, 1),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("amanite-cesar.glb", {
            name: "amanitecesar",
            position: new BABYLON.Vector3(2, 0, 1),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("bolet-bai.glb", {
            name: "boletbai",
            position: new BABYLON.Vector3(2, 0, 2),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("bolet-chair-jaune.glb", {
            name: "boletchairjaune",
            position: new BABYLON.Vector3(-1, 0, 0),
            rotation: new BABYLON.Vector3(3, 0, 0),
            scaling: new BABYLON.Vector3(-0.1, -0.1, -0.1)
        });

        loadMushroom("cepe.glb", {
            name: "cepe",
            position: new BABYLON.Vector3(-1, 0, -1),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("cepe-2.glb", {
            name: "cepe2",
            position: new BABYLON.Vector3(0, 0, -1),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("champignon-a-lames.glb", {
            name: "champignonalames",
            position: new BABYLON.Vector3(-2, 0, -1),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("champignon-de-parie.glb", {
            name: "champignondeparie",
            position: new BABYLON.Vector3(-2, 0, -2),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("dedale-du-chene.glb", {
            name: "dedaleduchene",
            position: new BABYLON.Vector3(-2, 0, 0),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("lapiote-deguenille.glb", {
            name: "lapiotedeguenille",
            position: new BABYLON.Vector3(0, 0, -2),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("panus-en-enventail.glb", {
            name: "panusenenventail",
            position: new BABYLON.Vector3(1, 0, 2),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("portobello.glb", {
            name: "portobello",
            position: new BABYLON.Vector3(0, 0, 2),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });

        loadMushroom("trompette-de-la-mort.glb", {
            name: "trompettedelamort",
            position: new BABYLON.Vector3(2, 0, 0),
            rotation: new BABYLON.Vector3(-3* Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
        });





        // Ajoutez ici d'autres appels loadMushroom pour chacun de vos fichiers.

        return scene;
    };

    // Création de la scène
    const scene = createScene();

    // Boucle de rendu
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Ajustement du moteur lors du redimensionnement de la fenêtre
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
