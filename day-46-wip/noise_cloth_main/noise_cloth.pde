class Point {
  PVector loc;
  PVector destination;
  PVector vel;
  float speed = 1;
  ArrayList<PVector> locs;
  
  Point(ArrayList<PVector> _locs) {
    locs = _locs;
    loc = locs.get(0);
    destination = locs.get(1);
    vel = getVel(loc, destination);
  
  }
  
  PVector getVel(PVector a, PVector b) {
    return PVector.sub(b, a).normalize().mult(speed);
  }
  
  void update() {
    loc.add(vel);
    // we are close...change destination and vel
    if (PVector.dist(loc, destination) <= 1) {
      if (locs.size() > 2) {
        locs.remove(0);
        loc = locs.get(0);
        destination = locs.get(1);
      }
      vel = getVel(loc, destination);
    }
  }
  
  void display() {
    stroke(0, 50);
    fill(255, 200);
    ellipse(loc.x,loc.y,5, 5);  
  }
}

class PointSystem {
  ArrayList<ArrayList<PVector>> pointsLocs;
  ArrayList<Point> points = new ArrayList<Point>();
  
  PointSystem(ArrayList<ArrayList<PVector>> _pointsLocs) {
    pointsLocs = _pointsLocs;
    for (ArrayList<PVector> locsForOnePoint : pointsLocs) {
      println(locsForOnePoint);
      points.add(new Point(locsForOnePoint));
    }
  }
  
  void update() {
    for (Point p : points) {
      p.update();
      p.display();
    }
  }
}
