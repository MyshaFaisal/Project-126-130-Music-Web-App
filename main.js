peter_pan_song="";
Harry_Potter_Theme_song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
score_Peter_pan = "";
scoreRightWrist = 0;
song_Harry_Potter_Theme = "";

function setup()
{
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function preload()
{
    peter_pan_song = loadSound("music.mp3");
    Harry_Potter_Theme_song = loadSound("music.mp3");

}
function draw()
{
    image(video, 0, 0, 600, 530);
    fill("#FF0000");
    stroke("#FF0000");

    song_Peter_pan = peter_pan_song.isPlaying();
    console.log("Peter Pan Song ="+song_Peter_pan);

    song_Harry_Potter_Theme = Harry_potter_theme_song.isPlaying();
    console.log("Harry Potter Theme Song ="+song_Harry_Potter_Theme);


    if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20)
    Harry_Potter_Theme_song.stop();
    if(song_Peter_pan == false){
        petter_pan_song.play();
    }
    else{
        document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
    }
    }


    if(scoreRighttWrist > 0.2) 
    {
    circle(righttWristX, rightWristY, 20)
    peter_pan_song.stop();
    if(song_Harry_Potter_Theme == false){
        Harry_Potter_Theme_song.play();
    }
    else{
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
    }
    }
}

function play()
{
    song.play();
    song.setVolume(1); 
    song.rate(1);
}

function modelLoaded()
{
    console.log('Posenet is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("LeftWrist_Score = " + scoreLeftWrist);

        scoreRighttWrist = results[0].pose.keypoints[9].score;
        console.log("RightWrist_Score = " + scoreRightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +" leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +" rightWristY =" + rightWristY);
    }
}