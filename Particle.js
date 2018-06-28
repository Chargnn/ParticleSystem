let particleCount = 0;
function Particle(x, y, radius, r, g, b, vx, vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.id = particleCount++;
    this.life = 10;

    this.update = () => {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.05;

        this.draw();
    }

    this.collide = (xx, yy, radius) => {
        let xDistance = xx - this.x;
        let yDistance = yy - this.y;
        let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

        if(distance < this.radius + radius) {
            this.vy *= -gravity / 2;
            this.vx *= -gravity / 1.5;
            this.y -= radius + this.radius;
            this.x -= radius + this.radius;
        }

        if(this.y > canvas.height - 5) { //BOTTOM
            this.vy *= -gravity / 2;
            this.vx *= gravity / 1.5;
            this.y = canvas.height - 5;
        }

        if(this.x > canvas.width - 3){ //RIGHT
            this.vy *= gravity / 2;
            this.vx *= -gravity / 1.5;
            this.x = canvas.width - 3;
        }

        if(this.x < 0){                  // LEFT
            this.vy *= -gravity / 2;
            this.vx *= -gravity / 1.5;
            this.x = 0;
        }

        this.vy += gravity;
    };

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba('+r+', '+g+', '+b+', '+this.life+')';
        context.fill();
        context.closePath();
    }
}