class Mover {

  PVector position;
  PVector velocity;
  PVector acceleration;
  float mass;
  float size;
  boolean setVector = false;

  Mover(float m, float x , float y, float s) {
    mass = m;
    size = s;
    position = new PVector(x,y);
    velocity = new PVector(0,0);
    acceleration = new PVector(0,0);
    
  }
  
  void applyForce(PVector force) {
    PVector f = PVector.div(force,mass);
    acceleration.add(f);
  }
  
  void update() {
    //velocity.add(acceleration);
    if (!setVector && millis() > position.x * 6) {
      velocity = new PVector(0, 15);
      setVector = true;
    }
    position.add(velocity);
    //acceleration.mult(0);
  }

  void display() {
    noStroke();
    fill(#FA8525, 140);
    //ellipse(position.x,position.y,mass*16,mass*16);
    ellipse(position.x, position.y, size, size);
  }

  void checkEdges() {

    if (position.x > width + size / 2) {
      position.x = width + size / 2;
      velocity.x *= -1;
    } else if (position.x < 0 - size / 2) {
      velocity.x *= -1;
      position.x = 0 - size / 2;
    }

    if (position.y > height + size / 2) {
      velocity.y *= -1;
      position.y = height + size / 2;
    } else if (position.y < 0 - size / 2) {
      velocity.y *= -1;
      position.y = 0 - size / 2;
    }

  }

}
