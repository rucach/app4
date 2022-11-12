song1 = "";
score = 0;
status = " ";
status1 = " ";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0
leftWristY = 0;
song2 = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log(results);

        score = results[0].pose.keypoints[9].score;
    }else{
        console.error("error");
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    stroke("#FF0000");
    fill("#FF0000");

    if(song1.isPlaying()){
        status = true;
    }else{
        status = false;
    }
    if(song2.isPlaying()){
        status1 = true;
    }else{
        status1 = false;
    }

    if(score>0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(status == false){
            song1.play();
            document.getElementById("song").innerHTML = "don't know name --1";
        }
    }
}