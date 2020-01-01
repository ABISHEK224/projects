//if we are playing 
var playing = false;
var time;
var score;
var correctanswer;
document.getElementById("startreset").onclick = function() {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;

        show("timebox");
        hide("correct");
        hide("wrong");
        document.getElementById("startreset").innerHTML = "Reset game";
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        time = 60;
        startCountdown();
        generate();

    }
}
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
        if (playing == true) {
            if (this.innerHTML == correctanswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000)
                generate();


            } else {

                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);

            }
        }
    }
}

function show(Id) {
    //alert();
    document.getElementById(Id).style.display = "block";
}

function hide(Id) {
    //alert();
    document.getElementById(Id).style.display = "none";
}

function startCountdown() {
    action = setInterval(function() {
        time -= 1;
        document.getElementById("time").innerHTML = time;
        if (time == 0) { // game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 500);

}


function generate() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctanswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;
    var correctpos = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctpos).innerHTML = correctanswer;
    var answers = [correctanswer];
    for (i = 1; i < 5; i++) {
        if (i != correctpos) {
            var wrongans;


            do {
                var wrongans = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random());

            } while (answers.indexOf(wrongans) > -1);
            document.getElementById("box" + i).innerHTML = wrongans;
            answers.push(wrongans);
        }
    }
}

function stopCountdown() {
    clearInterval(action);
}