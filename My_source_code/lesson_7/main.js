// const port = 3000,
  // http = require("http"),
  // httpStatus = require("http-status-codes"),
  // router = require("./router"),
  // contentTypes = require("./contentTypes"),
//   utils = require("./utils"); http = require("http"),
//     httpStatusCodes = require("http-status-codes"),
//     router = require("./router"),
//     fs = require("fs"),
//     plainTextContentType = {
//       "Content-Type": "text/plain"
//     },
//     htmlContentType = {
//       "Content-Type": "text/html"
//     },
//     customReadFile = (file, res) => {
//       fs.readFile(`./${file}`, (errors, data) => {
//         if (errors) {
//           console.log("Error reading the file...");
//         }
//         res.end(data);
//       });
//     };
// router.get("/", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, plainTextContentType);
//   res.end("INDEX");
// });
// router.get("/index.html", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, htmlContentType);
//   customReadFile("views/index.html", res);
// });
// router.post("/", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, plainTextContentType);
//   res.end("POSTED");
// });
// http.createServer(router.handle).listen(3000);
// console.log(`The server is listening on port number: ${port}`);


const fs = require("fs"),
  httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes");

module.exports = {
  getFile: (file, res) => {
    fs.readFile(`./${file}`, (error, data) => {
      if (error) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
          contentTypes.html);
        res.end("There was an error serving content!");
      }
      res.end(data);
    });
  }
};

const httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");
const routes = {
  "GET": {},
  "POST": {}
};
exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};
exports.get = (url, action) => {
  routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);