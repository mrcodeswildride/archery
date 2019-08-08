var playingArea = document.getElementById("playingArea");
var bow = document.getElementById("bow");
var target = document.getElementById("target");
var hitDisplay = document.getElementById("hitValue");
var shotDisplay = document.getElementById("shotValue");

var gravity = 0.3;
var arrowWidth = 50;
var arrowHeight = 11;
var targetsHit = 0;
var arrowsShot = 0;

document.addEventListener("mousemove", tilt);
document.addEventListener("click", launch);

function tilt(event) {
    var bowAngle = getBowAngle(event.offsetX, event.offsetY);
    bow.style.transform = "rotate(" + bowAngle + "rad)";
}

function launch(event) {
    var bowAngle = getBowAngle(event.offsetX, event.offsetY);
    bow.style.transform = "rotate(" + bowAngle + "rad)";

    var bowX = bow.offsetLeft + bow.width / 2;
    var bowY = bow.offsetTop + bow.height / 2;
    var hSpeed = Math.cos(bowAngle) * 20;
    var vSpeed = Math.sin(bowAngle) * 20;

    var arrow = document.createElement("img");
    arrow.classList.add("arrow");
    arrow.src = "arrow.png";
    arrow.style.left = (bowX - arrowWidth / 2) + "px";
    arrow.style.top = (bowY - arrowHeight / 2) + "px";
    arrow.style.transform = "rotate(" + bowAngle + "rad)";
    arrow.setAttribute("h-speed", hSpeed);
    arrow.setAttribute("v-speed", vSpeed);

    playingArea.appendChild(arrow);
    var intervalId = setInterval(move, 50, arrow);
    arrow.setAttribute("interval-id", intervalId);
}

function move(arrow) {
    var hSpeed = parseFloat(arrow.getAttribute("h-speed"));
    var vSpeed = parseFloat(arrow.getAttribute("v-speed"));
    var intervalId = parseInt(arrow.getAttribute("interval-id"), 10);

    vSpeed += gravity;
    arrow.setAttribute("v-speed", vSpeed);

    var angle = Math.atan2(vSpeed, hSpeed);

    arrow.style.left = (arrow.offsetLeft + hSpeed) + "px";
    arrow.style.top = (arrow.offsetTop + vSpeed) + "px";
    arrow.style.transform = "rotate(" + angle + "rad)";

    if (touching(arrow, target)) {
        clearInterval(intervalId);
        playingArea.removeChild(arrow);
        moveTarget();

        targetsHit++;
        hitDisplay.innerHTML = targetsHit;

        arrowsShot++;
        shotDisplay.innerHTML = arrowsShot;
    }
    else if (arrow.offsetLeft < -arrowWidth || arrow.offsetLeft > playingArea.offsetWidth || arrow.offsetTop > playingArea.offsetHeight) {
        clearInterval(intervalId);
        playingArea.removeChild(arrow);

        arrowsShot++;
        shotDisplay.innerHTML = arrowsShot;
    }
}

function moveTarget() {
    var randomX = Math.random() * 420 + 500;
    var randomY = Math.random() * 347;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

function getBowAngle(mouseX, mouseY) {
    var bowX = bow.offsetLeft + bow.width / 2;
    var bowY = bow.offsetTop + bow.height / 2;

    var x = mouseX - bowX;
    var y = mouseY - bowY;

    return Math.atan2(y, x);
}

function touching(object1, object2) {
    var object1LeftSide = object1.offsetLeft;
    var object1RightSide = object1.offsetLeft + object1.offsetWidth;
    var object1TopSide = object1.offsetTop;
    var object1BottomSide = object1.offsetTop + object1.offsetHeight;

    var object2LeftSide = object2.offsetLeft;
    var object2RightSide = object2.offsetLeft + object2.offsetWidth;
    var object2TopSide = object2.offsetTop;
    var object2BottomSide = object2.offsetTop + object2.offsetHeight;

    var objectsTouchingHorizontally = object1RightSide >= object2LeftSide && object1LeftSide <= object2RightSide;
    var objectsTouchingVertically = object1BottomSide >= object2TopSide && object1TopSide <= object2BottomSide;

    return objectsTouchingHorizontally && objectsTouchingVertically;
}
