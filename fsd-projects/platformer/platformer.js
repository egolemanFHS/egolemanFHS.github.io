$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
     toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(20, 675, 275, 20, "orange");
    createPlatform(350, 600, 100, 20, "orange");
    createPlatform(590, 200, 100, 600, "orange");
    createPlatform(500, 500, 90, 20, "orange");
    createPlatform(350, 375, 100, 20, "orange");
    createPlatform(500, 270, 100, 20, "orange");
    createPlatform(675, 500, 175, 20, "orange");
    createPlatform(1050, 625, 500, 175, "orange");

    // TODO 3 - Create Collectables
    createCollectable("diamond", 520, 460);
    createCollectable("diamond", 625, 150);
    createCollectable("diamond", 1200, 575);

    
    // TODO 4 - Create Cannons


    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
