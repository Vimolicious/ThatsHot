class Bar {
    constructor() {
        let w = 100;
        let h = floor(random(HEIGHT*1/6, HEIGHT*5/8));
        let g = floor(random(300, 400));

        let offset = 30;

        this.speed = ceil(WIDTH / 150);
        this.boxes = [new Box(new Vertex(WIDTH + offset, -10), new Vertex(WIDTH + offset + w, -10), new Vertex(WIDTH + offset + w, h), new Vertex(WIDTH + offset, h)),
                      new Box(new Vertex(WIDTH + offset, h+g), new Vertex(WIDTH + offset + w, h+g), new Vertex(WIDTH + offset + w, HEIGHT), new Vertex(WIDTH + offset, HEIGHT))];
    }

    get rightX() {
        return this.boxes[0].v2.x;
    }

    get leftX() {
        return this.boxes[0].v1.x;
    }

    update(negate) {

        this.boxes[0].shove(this.speed * (negate ? -1 : 1));
        this.boxes[1].shove(this.speed * (negate ? -1 : 1));
    }

    show() {
        this.boxes[0].show();
        this.boxes[1].show();
    }
}