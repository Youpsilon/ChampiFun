// script.js
window.addEventListener('DOMContentLoaded', () => {
    // Récupération du canvas
    const canvas = document.getElementById("renderCanvas");

    // Empêcher le scroll sur le canvas (pour le zoom BabylonJS uniquement)
    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
    }, { passive: false });

    // Initialisation du moteur BabylonJS
    const engine = new BABYLON.Engine(canvas, true);
    let scene;

    // Fonction de création de la scène
    function createScene() {
        scene = new BABYLON.Scene(engine);

        // Caméra ArcRotate (vue orbitale)
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,   // angle horizontal
            Math.PI / 2.5,  // angle vertical
            5,              // distance initiale
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 3;
        camera.upperRadiusLimit = 500; // on peut zoomer loin
        camera.lowerBetaLimit = Math.PI / 6;
        camera.upperBetaLimit = Math.PI / 1.5;

        // Lumière hémisphérique
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.8;

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

        // Charger le champignon "AgaricImpudique" avec survol + clic
        loadMushroom("portobello.glb", {
            name: "AgaricImpudique",
            position: new BABYLON.Vector3(0, 0, 0),
            rotation: new BABYLON.Vector3(-3 * Math.PI / 6, 0, 0),
            scaling: new BABYLON.Vector3(5, 5, 5)
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
