let obstacleCount = 0;
function Obstacle(x, y, radius, r, g, b){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.id = obstacleCount++;
    this.life = 10;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba('+r+', '+g+', '+b+', '+this.life+')';
        context.fill();
        context.closePath();
    }
}