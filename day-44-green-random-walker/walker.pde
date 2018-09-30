color[] colors = {
    #afede0, #afedc6, #66a8a3, #5fe2d8, #b0f4e0, #2fce9f, #a1bc5c, #44ddad,
    #14b784, #2de5ac, #9dc6b9, #00C2A0, #509b83, #2ccc99, #3fcccc, #549696,
    #a8ede2, #39d6bd, #18bfa4, #0cceaf, #300018, #82ccc0, #99e8db, #51c66e
  };

class Walker {
  int x,y;

  Walker() {
    x = width/2;
    y = height/2;
  }

  void render() {
    int colorIndex = int(random(0, 23));
    stroke(colors[colorIndex]);
    strokeWeight(40);
    point(x,y);
  }

  // Randomly move up, down, left, right, or stay in one place
  void step() {
    
    int stepx = int(random(3))-1;
    int stepy = int(random(3))-1;
    //[end]
    x += stepx * 15;
    y += stepy * 25;
    x = constrain(x,0,width-40);
    y = constrain(y,0,height-40);
  }
}
