var data = window.location.hash.substr(1).split("|");
var goal = null;

$(document).ready(function () {
    document.getElementById("goalTitle").innerHTML = "Congratulations, you've completed <strong>" + decodeURIComponent(data[1]) + "<\strong>! 🔥";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var ref = firebase.database().ref('users/' + user.uid + '/goals/' + data[0]);

            ref.once('value', function (data) {
                goal = data.val();
                var chart = createTimeGoalChart(goal);
                document.getElementById("goalProgress").appendChild(chart);
            });
        }
    });
});

function shareTwitter() {
    location.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent("I just completed my " + goal.title + "!");
}