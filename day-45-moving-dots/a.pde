Mover[] movers;
float squareSize = 30;
int n;

void setup() {
  background(#2B2E63);
  int widthN = int(width / squareSize);
  int heightN = int(height / squareSize);
  n = widthN * heightN;
  movers = new Mover[n];
  println('n', n);
  for (int i = 0; i < sqrt(n); i++) {
    for (int j = 0; j < sqrt(n); j++) {
      int index = int(i * sqrt(n) + j);
      movers[index] = new Mover(sqrt(j), j * squareSize + squareSize / 2, i * squareSize + squareSize / 2, squareSize);
    }
  }
}

void settings() {
  size(640, 640);
}


void draw() {
  background(#2B2E63);

  for (int i = 0; i < n; i++) {

    PVector wind = new PVector(random(-0.01, 0.01), random(-0.01, 0.01));
    PVector gravity = new PVector(0, 0.1);

    //movers[i].applyForce(wind);
    
    
    
    
    //movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}
