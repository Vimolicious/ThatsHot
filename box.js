class Box {
    constructor(v1, v2, v3, v4) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;

        this.x = v1.x;
        this.width = v2.x - v1.x;
        this.height = v4.y - v1.y;
    }

    shove(xDif) {
        this.v1.x -= xDif;
        this.v2.x -= xDif;
        this.v3.x -= xDif;
        this.v4.x -= xDif;
    }

    get xMin() {
        return Math.min(this.v1.x, Math.min(this.v2.x, Math.min(this.v3.x, this.v4.x)));
    }

    get xMax() {
        return Math.max(this.v1.x, Math.max(this.v2.x, Math.max(this.v3.x, this.v4.x)));
    }

    get yMin() {
        return Math.min(this.v1.y, Math.min(this.v2.y, Math.min(this.v3.y, this.v4.y)));
    }

    get yMax() {
        return Math.max(this.v1.y, Math.max(this.v2.y, Math.max(this.v3.y, this.v4.y)));
    }

    show() {
        fill(255);
        beginShape();
        vertex(this.v1.x, this.v1.y);
        vertex(this.v2.x, this.v2.y);
        vertex(this.v3.x, this.v3.y);
        vertex(this.v4.x, this.v4.y);
        endShape(CLOSE);
    }
}