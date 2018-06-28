let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const gravity = 1;

const colors = [
    '84',
    '255',
    '0',
    '100',
];



let particles;
let obstacles;
function init() {
    particles = [];
    obstacles = [];

    obstacles.push(new Obstacle(100, 100, 20, 255, 255, 255));
    obstacles.push(new Obstacle(canvas.width / 2, canvas.height / 2, 20, 255, 255, 255));

}

let lastCalledTime;
let fps;

function animate() {
    clearScreen();
    requestAnimationFrame(animate);
    getFPS();

    particles.push(new Particle(Math.random() * canvas.width, 0, Math.random() * 5, colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)], colors[Math.floor(Math.random()*colors.length)], Math.floor(Math.random() * (10 - (-10) + 1) + (-10)), Math.floor(Math.random() * (10 - (-10) + 1) + (-10))));

    particles.forEach(particle => {

        particle.update();

        obstacles.forEach(obstacle => {
            particle.collide(obstacle.x +obstacle.radius, obstacle.y + obstacle.radius, obstacle.radius);
        });

        if(particle.life < 0) {
            particles.splice(particle.id, 1);
        }
	});

    obstacles.forEach(obstacle => {
        obstacle.draw();
    });

	document.getElementById('particleCount').innerHTML = 'Particles count: ' + particles.length;
    document.getElementById('fps').innerHTML = 'FPS: ' + Math.floor(fps);
}

function getFPS(){
    if(!lastCalledTime) {
        lastCalledTime = performance.now();
        fps = 0;
        return;
    }

    delta = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();
    fps = 1/delta;
}

function clearScreen(){
	context.clearRect(0, 0, innerWidth, innerHeight);

	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

init();
animate();

