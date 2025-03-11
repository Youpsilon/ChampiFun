// script.js
window.addEventListener('DOMContentLoaded', () => {
    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Initialisation du moteur BabylonJS
    const engine = new BABYLON.Engine(canvas, true);

    // Fonction de création de la scène
    const createScene = () => {
        // Création d'une scène
        const scene = new BABYLON.Scene(engine);

        // Création d'une caméra ArcRotate (vue orbitale)
        // Paramètres: (nom, alpha, beta, radius, target, scène)
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,  // angle horizontal
            Math.PI / 2.5, // angle vertical
            5,             // distance du centre
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);

        // Ajout d'une lumière hémisphérique
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.8;

        // Import du modèle glTF depuis le dossier 'asset/model/foret/'
        // 'scene.gltf' est le nom du fichier principal
        BABYLON.SceneLoader.ImportMesh(
            "",                       // nom du mesh à charger ("" = tous)
            "asset/model/foret/",     // chemin vers le dossier contenant votre modèle
            "scene.gltf",             // nom du fichier glTF
            scene,
            function (meshes) {
                console.log("Modèle chargé :", meshes);

                // Ajustements optionnels sur les maillages importés
                meshes.forEach((mesh) => {
                    // Exemple : si le modèle est trop grand, on peut le réduire
                    mesh.scaling = new BABYLON.Vector3(1,1,1);
                    // Position au centre de la scène
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
