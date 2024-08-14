const figlet = require('figlet');
figlet.text(
    "Carlos!",
    {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 100,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );