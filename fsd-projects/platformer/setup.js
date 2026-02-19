// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles
let shouldDrawGrid = false;
let gridMade = false;

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
  winConditionMet: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let fakePlatforms = [];
let badPlatforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 40;
const collectableHeight = 40;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "images/collectables/database.png" },
  diamond: { image: "data:image/jpeg;base64,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" },
  grace: { image: "images/collectables/grace-head.png" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "images/collectables/steve-head.png" },
};
