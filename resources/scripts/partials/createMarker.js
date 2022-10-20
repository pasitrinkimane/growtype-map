/**
 *
 * @param width
 * @param height
 * @param radius
 * @returns {string}
 */
function createMarker(width, height, radius, text) {

    var canvas, context;

    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    context.fillStyle = "#23A073";

    context.strokeStyle = "white";

    context.beginPath();
    context.moveTo(radius, 0);
    context.lineTo(width - radius, 0);
    context.quadraticCurveTo(width, 0, width, radius);
    context.lineTo(width, height - radius);
    context.quadraticCurveTo(width, height, width - radius, height);
    context.lineTo(radius, height);
    context.quadraticCurveTo(0, height, 0, height - radius);
    context.lineTo(0, radius);
    context.quadraticCurveTo(0, 0, radius, 0);

    context.lineWidth = 5;

    context.closePath();

    context.fill();
    context.stroke();

    context.font = "16px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 6);

    return canvas.toDataURL();
}

export {createMarker};
