// script.js
window.addEventListener('DOMContentLoaded', () => {
    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Désactiver le scroll sur le canvas
    canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });

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

        // // Import du modèle glTF depuis le dossier 'asset/model/foret/'
        // // 'scene.gltf' est le nom du fichier glTF
        // BABYLON.SceneLoader.ImportMesh(
        //     "",                       // nom du mesh à charger ("" = tous)
        //     "asset/model/foret/",     // chemin vers le dossier contenant votre modèle
        //     "scene.gltf",             // nom du fichier glTF
        //     scene,
        //     function (meshes) {
        //         console.log("Modèle chargé :", meshes);
        //
        //         // Ajustements optionnels sur les maillages importés
        //         meshes.forEach((mesh) => {
        //             // Exemple : si le modèle est trop grand, on peut le réduire
        //             mesh.scaling = new BABYLON.Vector3(1,1,1);
        //             // Position au centre de la scène
        //             mesh.position = BABYLON.Vector3.Zero();
        //         });
        //     },
        //     null, // fonction de progression du chargement (optionnelle)
        //     function (scene, message, exception) {
        //         console.error("Erreur lors du chargement du modèle :", message, exception);
        //     }
        // );

        // Fonction utilitaire pour dupliquer un champignon avec des propriétés personnalisées
        function duplicateMushroom(sourceMesh, { name, position, rotation, scaling } = {}) {
            // Cloner le mesh source
            const clone = sourceMesh.clone(name, null);
            // Appliquer la position si définie
            if (position) clone.position = position;
            // Appliquer la rotation si définie (en radians)
            if (rotation) clone.rotation = rotation;
            // Appliquer le scaling si défini
            if (scaling) clone.scaling = scaling;
            return clone;
        }

        // Variable pour stocker les templates des champignons (initialement cachés)
        let mushroomTemplates = [];

        // Chargement du modèle glTF
        BABYLON.SceneLoader.ImportMesh(
            "", // Charger tous les meshes
            "asset/model/champi/",     // chemin vers le dossier contenant votre modèle
            "scene.gltf",      // Nom de votre fichier glTF
            scene,
            function (meshes) {
                // Filtrer pour exclure le mesh racine nommé "__root__"
                mushroomTemplates = meshes.filter(mesh => mesh.name !== "__root__");

                // Renommer chaque champignon pour une identification claire et les masquer
                mushroomTemplates.forEach((mesh, index) => {
                    mesh.name = "ChampignonTemplate_" + (index + 1);
                    // Masquer le template pour qu'il ne soit pas affiché initialement
                    mesh.isVisible = false;
                });

                console.log("Champignons templates chargés :", mushroomTemplates.map(m => m.name));

                // Stocker les templates dans la scène pour un accès global éventuel
                scene.mushroomTemplates = mushroomTemplates;

                // Appeler ici les placements pour être sûr que les templates sont chargés

                // Fonction utilitaire pour placer (dupliquer) un champignon à partir d'un template
                function placeMushroom(templateIndex, { name, position, rotation, scaling } = {}) {
                    if (!mushroomTemplates || !mushroomTemplates[templateIndex]) {
                        console.error("Template non trouvé pour l'index :", templateIndex);
                        return;
                    }
                    // Cloner le template sélectionné
                    const mushroomClone = duplicateMushroom(mushroomTemplates[templateIndex], { name, position, rotation, scaling });
                    // Rendre le clone visible
                    mushroomClone.isVisible = true;
                    return mushroomClone;
                }

                // Exemple d'utilisation : placer des champignons après le chargement complet des templates
                // Placer le premier champignon du template (index 0)
                placeMushroom(0, {
                    name: "Champignon_1",
                    position: new BABYLON.Vector3(2, 0, 0),
                    rotation: new BABYLON.Vector3(0, Math.PI / 4, 0),
                    scaling: new BABYLON.Vector3(1, 1, 1)
                });

                // Placer un autre champignon du template (index 1)
                placeMushroom(1, {
                    name: "Champignon_2",
                    position: new BABYLON.Vector3(-2, 0, 0),
                    rotation: new BABYLON.Vector3(0, -Math.PI / 4, 0),
                    scaling: new BABYLON.Vector3(0.8, 0.8, 0.8)
                });
            },
            null,
            function (scene, message, exception) {
                console.error("Erreur lors du chargement :", message, exception);
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
