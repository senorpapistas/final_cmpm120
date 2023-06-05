# Core Gameplay Prototype

## Audio
 - A sound effect is played whenever the player jumps to the left or right; this sound effect was created in audacity
 - There is a continuously looping background track; Credit: creamy tomato, by human gazpacho, from Free Music Archive, CC BY-NC

## Visual
 - An image based sprite is used for both the player and the player's bullets; these were drawn in Photoshop
 - A shader was used to create a background that constantly shifts hue; the shader glsl file was taken from the Phaser examples github repository: https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/shaders/bundle4.glsl.js, the placeholder background image was also taken from the Phaser examples hithub repository: https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/skies/deep-space.jpg

## Motion
 - The main motion for the game is the jumping mechanic; tap or click on either side of the screen to have the ship jump in that direction; this movement uses the Arcade physics engine

## Progression
 - The game is going to be very linear; a certain number of enemies spawn and they will despawn if the player does not destroy them; after all the enemies spawn and despawn, the level ends; the goal for the player is to survive the level whilst gaining as many points as they can from eliminating enemies.

## Prefabs
 - 1 prefab is used to create a bullet; another prefab is used to create a group of bullets