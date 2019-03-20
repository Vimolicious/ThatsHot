class Button {
    constructor(x, y, width, height, label, size, c1, c2) {
        this.x = x - width/2;
        this.y = y - height/2;
        this.width = width;
        this.height = height;

        this.size = size;
        this.label = label;
        this.c1 = c1;
        this.c2 = c2;

        this.pushing = false;
    }

    update() {
        if (mouseIsPressed &&
            mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
            this.pushing = true;
        } else if (this.pushing &&
            mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
            this.actuated = true;
            this.pushing = false;
        } else {
            this.actuated = false;
        }
    }

    show() {
        if (this.pushing) {
            fill(this.c2);
        } else {
            fill(this.c1);
        }
        rect(this.x, this.y, this.width, this.height);

        fill(255);
        textSize(this.size);
        text(this.label, this.x + this.width/2, this.y + this.height/2);

    }
}