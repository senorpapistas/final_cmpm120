# Prototype Requirements

### **Non-interactive cinematic**
Intro cutscene of spaceship being revealed in space (beginning), going upwards (middle), leaving the screen (end), then transitioning into the main menu

### **Interactive cinematic**
Main menu screen features "breathing" play button that enlargens on hover. Title drops down. Post game screens feature scores that feature score counters that count up. 

### **Choreography in code**
Event callbacks are used. In the intro scene, a parallax event is used, then calls the tween, then uses a delayed call to cut to the next scene. The play button also features
callbacks that play and pause the tween when the button is being used. 