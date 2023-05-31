want = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,300);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    want = document.getElementById("object").value;
}

function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 380, 300);
}