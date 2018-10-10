float noiseStep = 0.03;
float xstart;
float ynoise;
ArrayList<ArrayList<PVector>> pointsLocs = new ArrayList<ArrayList<PVector>>();
PointSystem pointSystem;

void setup() {
  size(600, 600, P3D);
  xstart = random(10);
  ynoise = random(10);
  ArrayList<PVector> startLocs = getLocsForOneNoiseLevel(0.01);
  ArrayList<PVector> endLocs4 = getLocsForOneNoiseLevel(0.03);
  ArrayList<PVector> endLocs2 = getLocsForOneNoiseLevel(0.05);
  ArrayList<PVector> endLocs1 = getLocsForOneNoiseLevel(0.07);
  ArrayList<PVector> endLocs3 = getLocsForOneNoiseLevel(0.1);
  for (PVector startPointLoc : startLocs) {
    ArrayList<PVector> pointLocs = new ArrayList<PVector>();
    pointLocs.add(startPointLoc);
    pointsLocs.add(pointLocs);
  }
  for (int i = 0; i < endLocs1.size(); i++) {
    ArrayList<PVector> pointLocs = pointsLocs.get(i);
    pointLocs.add(endLocs1.get(i));
  }
  for (int i = 0; i < endLocs2.size(); i++) {
    ArrayList<PVector> pointLocs = pointsLocs.get(i);
    pointLocs.add(endLocs2.get(i));
  }
  for (int i = 0; i < endLocs3.size(); i++) {
    ArrayList<PVector> pointLocs = pointsLocs.get(i);
    pointLocs.add(endLocs3.get(i));
  }
  for (int i = 0; i < endLocs4.size(); i++) {
    ArrayList<PVector> pointLocs = pointsLocs.get(i);
    pointLocs.add(endLocs4.get(i));
  }
    //println(pointsLocs);
  pointSystem = new PointSystem(pointsLocs);
}

ArrayList<PVector> getLocsForOneNoiseLevel(float noiseLevel) {
  ArrayList<PVector> locs = new ArrayList<PVector>();
  for (float y = -(height/8); y <= (height/8); y+=3) {
    ynoise += noiseLevel;
    float xnoise = xstart;
    for (float x = -(width/8); x <= (width/8); x+=3) {
      xnoise += noiseLevel;
      float noiseFactor = noise(xnoise, ynoise);
      locs.add(new PVector(x * noiseFactor * 4, y * noiseFactor * 4));
    }
  }
  return locs;
}

//void drawSheet() {
//  background(150);
//  stroke(0, 50);
//  fill(255, 200);
//  translate(width/2, height/2, 0);
//  for (float y = -(height/8); y <= (height/8); y+=3) {
//    ynoise += noiseStep;
//    float xnoise = xstart;
//    for (float x = -(width/8); x <= (width/8); x+=3) {
//      xnoise += noiseStep;
//      drawPoint(x, y, noise(xnoise, ynoise));
//    }
//  }
//}

void draw() {
  //noiseStep += 0.0001;
  //constrain(noiseStep, 0.01, 0.5);
  //drawSheet();
  background(150);
  translate(width/2, height/2, 0);
  pointSystem.update();
}

void drawPoint(float x, float y, float noiseFactor) {
  float edgeSize =  5;
  ellipse(x * noiseFactor * 4, y * noiseFactor * 4, edgeSize, edgeSize);
}
