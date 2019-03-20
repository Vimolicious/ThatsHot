class Boxt extends Box {
    constructor(v1, v2, v3, v4) {
        super(v1, v2, v3, v4);
        this.theta = 0;
    }

    update(x, y) {
        this.theta = this.theta * PI / 180;

        this.v1.x = Math.floor((x - Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.cos(Math.atan((this.height / 2.0) / (this.width / 2.0)) + this.theta)));
        this.v2.x = Math.floor((x + Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.cos(Math.atan((this.height / 2.0) / (this.width / 2.0)) - this.theta)));
        this.v3.x = Math.floor((x + Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.cos(Math.atan((this.height / 2.0) / (this.width / 2.0)) + this.theta)));
        this.v4.x = Math.floor((x - Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.cos(Math.atan((this.height / 2.0) / (this.width / 2.0)) - this.theta)));

        this.v1.y = Math.floor((y - Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.sin(Math.atan((this.height / 2.0) / (this.width / 2.0)) + this.theta)));
        this.v2.y = Math.floor((y - Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.sin(Math.atan((this.height / 2.0) / (this.width / 2.0)) - this.theta)));
        this.v3.y = Math.floor((y + Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.sin(Math.atan((this.height / 2.0) / (this.width / 2.0)) + this.theta)));
        this.v4.y = Math.floor((y + Math.sqrt(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2) * Math.sin(Math.atan((this.height / 2.0) / (this.width / 2.0)) - this.theta)));



        this.theta = this.theta * 180 / PI;
    }

    intersects(b) {
        let m1 = (this.v2.y - this.v1.y) / (this.v2.x - this.v1.x);
        let m2 = (this.v3.y - this.v2.y) / (this.v3.x - this.v2.x);
        let m3 = (this.v4.y - this.v3.y) / (this.v4.x - this.v3.x);
        let m4 = (this.v1.y - this.v4.y) / (this.v1.x - this.v4.x);

        if (this.v2.x === this.v3.x) {
            if ((b.v2.x >= this.v1.x) && (b.v4.y >= this.v1.y) && (this.v2.x >= b.v1.x) && (this.v4.y >= b.v1.y)) {
                return true;
            }
        }
        else {

            // Vertical checks
            let knownX = [b.v1.x, b.v2.x];

            for (let x of knownX) {
                let solvedY = {
                    s1: solveY(m1, this.v1.y - m1 * this.v1.x, x),
                    s2: solveY(m2, this.v2.y - m2 * this.v2.x, x),
                    s3: solveY(m3, this.v3.y - m3 * this.v3.x, x),
                    s4: solveY(m4, this.v4.y - m4 * this.v4.x, x)
                };

                if (isBetween(x, this.xMin, this.xMax) &&
                    isBetween(solvedY.s1, this.yMin, this.yMax) &&
                    isBetween(solvedY.s1, b.yMin, b.yMax)) {
                    return true;
                }

                if (isBetween(x, this.xMin, this.xMax) &&
                    isBetween(solvedY.s2, this.yMin, this.yMax) &&
                    isBetween(solvedY.s2, b.yMin, b.yMax)) {
                    return true;
                }

                if (isBetween(x, this.xMin, this.xMax) &&
                    isBetween(solvedY.s3, this.yMin, this.yMax) &&
                    isBetween(solvedY.s3, b.yMin, b.yMax)) {
                    return true;
                }

                if (isBetween(x, this.xMin, this.xMax) &&
                    isBetween(solvedY.s4, this.yMin, this.yMax) &&
                    isBetween(solvedY.s4, b.yMin, b.yMax)) {
                    return true;
                }
            }

            // Horizontal checks
            let knownY = [b.v1.y, b.v4.y];

            for (let y of knownY) {
                let solvedX = {
                    s1: solveX(m1, this.v1.y - m1 * this.v1.x, y),
                    s2: solveX(m2, this.v2.y - m2 * this.v2.x, y),
                    s3: solveX(m3, this.v3.y - m3 * this.v3.x, y),
                    s4: solveX(m4, this.v4.y - m4 * this.v4.x, y)
                };

                if (isBetween(y, this.yMin, this.yMax) &&
                    isBetween(solvedX.s1, this.xMin, this.xMax) &&
                    isBetween(solvedX.s1, b.xMin, b.xMax)) {
                    return true;
                }

                if (isBetween(y, this.yMin, this.yMax) &&
                    isBetween(solvedX.s2, this.xMin, this.xMax) &&
                    isBetween(solvedX.s2, b.xMin, b.xMax)) {
                    return true;
                }

                if (isBetween(y, this.yMin, this.yMax) &&
                    isBetween(solvedX.s3, this.xMin, this.xMax) &&
                    isBetween(solvedX.s3, b.xMin, b.xMax)) {
                    return true;
                }

                if (isBetween(y, this.yMin, this.yMax) &&
                    isBetween(solvedX.s4, this.xMin, this.xMax) &&
                    isBetween(solvedX.s4, b.xMin, b.xMax)) {
                    return true;
                }
            }
        }

        return false;
    }
}

function solveY(m, b, x) {
    return Math.floor(m * x + b);
}

function solveX(m, b, y) {
    return Math.floor((y - b) / m);
}

function isBetween(x, a, b) {
    if (a > b)
        return a >= x && x >= b;

    return a <= x && x <= b;
}