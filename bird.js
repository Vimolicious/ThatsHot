class Bird {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;

        this.img = img;

        this.width = width;
        this.height = height;

        this.vel = 0;
        this.acc = 1;

        this.box = new Boxt(new Vertex(this.x, this.y), new Vertex(this.x + width, this.y), 
                            new Vertex(this.x + width, this.y + height), new Vertex(this.x, this.y + height));
    }

    get leftX() {
        return this.box.v1.x;
    }

    get theta() {
        return this.box.theta;
    }

    flap() {
        this.vel = -15;
    }

    update() {
        this.box.theta = map(this.vel, 0, 39, 0, 90);

        this.vel += this.acc;
        this.y += this.vel;

        this.box.update(this.x, this.y);

        if (this.y < this.height / 2 || this.y > HEIGHT - this.height / 2) {
            this.vel = 0;
            this.y = this.y < this.height / 2 ? this.height / 2 : HEIGHT - this.height / 2;
            this.box.theta = 0;
        }
    }

    show() {
        translate(this.x, this.y);
        rotate(this.box.theta * PI / 180);
        translate(-this.x, -this.y);

        image(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);//birdImg.height * (this.width / birdImg.width));

        translate(this.x, this.y);
        rotate(-this.box.theta * PI / 180);
        translate(-this.x, -this.y);
    }
}