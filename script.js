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
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,   // angle horizontal
            Math.PI / 2.5,  // angle vertical
            5,              // distance du centre
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);

        // Limiter la distance de la caméra (zoom)
        camera.lowerRadiusLimit = 3;
        camera.upperRadiusLimit = 20;

        // Limiter l'angle vertical (éviter de passer sous la scène)
        camera.lowerBetaLimit = Math.PI / 6;
        camera.upperBetaLimit = Math.PI / 1.5;

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
            name: "AgaricImpudique",
            position: new BABYLON.Vector3(0, 0, 0),
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
