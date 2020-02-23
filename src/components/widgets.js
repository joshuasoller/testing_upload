import React from "react";

class Widgets extends React.Component {
    
  weather = (d, s, id) => {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = "https://weatherwidget.io/js/widget.min.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  };

  render() {
    return (
      <div className="container float-left" style={{ width: 120 }}>
        <div>
          <a
            className="weatherwidget-io"
            style={{ pointerEvents: "none" }}
            href="https://forecast7.com/en/14d09120d69/nasugbu/"
            data-label_1="NASUGBU"
            data-label_2="WEATHER"
            data-theme="original"
          >
            NASUGBU WEATHER
          </a>
          <script>
            {this.weather(document, "script", "weatherwidget-io-js")}
          </script>
        </div>
        <div className="container float-center">
          <a href="https://www.hitwebcounter.com" target="_blank">
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=7198363&style=0005&nbdigits=5&type=page&initCount=0"
              title="User Stats"
              Alt="webcounterwebsite"
              border="0"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Widgets;
