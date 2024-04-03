const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer((request, response) => {
        console.log("Received an incoming request!");
        response.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        let responseMessage = "<h1>Hello, World!</h1>";
        response.write(responseMessage);
        response.end();
        console.log(`Sent a response : ${responseMessage}`);
    });
app.listen(port);
console.log(`The server has started and is listening on port number:
${port}`);


app.on("request", (req, res) => {
    var body = [];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });
    let responseMessage = "<h1>This will show on the screen.</h1> ";
    res.end(responseMessage);
});
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);
