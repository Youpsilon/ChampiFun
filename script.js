window.addEventListener('DOMContentLoaded', () => {
    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Prévenir le défilement lors du zoom
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
    });

    // Initialisation du moteur BabylonJS
    const engine = new BABYLON.Engine(canvas, true);

    // Fonction de création de la scène
    const createScene = () => {
        // Création d'une scène
        const scene = new BABYLON.Scene(engine);

        // Création d'une caméra ArcRotate (vue orbitale)
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,  // angle horizontal
            Math.PI / 2.5, // angle vertical
            5,             // distance du centre
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);

        // Limiter la distance de la caméra
        camera.lowerRadiusLimit = 3; // Distance minimale de zoom
        camera.upperRadiusLimit = 20; // Distance maximale de zoom

        // Limiter l'angle vertical (éviter de voir sous la scène)
        camera.lowerBetaLimit = Math.PI / 6; // Limite minimale de l'angle vertical
        camera.upperBetaLimit = Math.PI / 1.5; // Limite maximale de l'angle vertical

        // Ajout d'une lumière hémisphérique
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.8;

        // Import du modèle glTF depuis le dossier 'asset/model/foret/'
        BABYLON.SceneLoader.ImportMesh(
            "",                       // nom du mesh à charger ("" = tous)
            "asset/model/pine_forest/",     // chemin vers le dossier contenant votre modèle
            "scene.gltf",             // nom du fichier glTF
            scene,
            function (meshes) {
                console.log("Modèle chargé :", meshes);

                meshes.forEach((mesh) => {
                    // Exemple : si le modèle est trop grand, on peut le réduire
                    mesh.scaling = new BABYLON.Vector3(1, 1, 1);
                    mesh.position = BABYLON.Vector3.Zero();
                });
            },
            null, // fonction de progression du chargement (optionnelle)
            function (scene, message, exception) {
                console.error("Erreur lors du chargement du modèle :", message, exception);
            }
        );

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
