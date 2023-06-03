want = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 260);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,260);
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

    if (status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Deecting objects";
            fill ("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text (objects[i].label + "" + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF000");
            rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == want)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("detection").innerHTML = want + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(want + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("detection").innerHTML = want + "Not Found";
            }
        }
    }
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }

}