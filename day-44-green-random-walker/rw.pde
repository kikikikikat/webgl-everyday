Walker w;

void setup() {
  frameRate(30);

  // Create a walker object
  w = new Walker();
  background(0);

}

void settings() {
  size(900,900);
}

void draw() {
  // Run the walker object
  w.step();
  w.render();
}
