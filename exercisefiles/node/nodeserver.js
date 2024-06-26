// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');
const colors = require('./colors.json');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    if (req.method !== 'GET') {
        res.end('method not supported');
    } else {
        const path = parsedUrl.pathname;
        // TODO: log the path in a way that is visibile when runing mocha tests
        console.log("path: " + path);
        switch (path) {
            case '/get':
                if (!query.key) {
                    res.end('key not passed');
                } else {
                    res.end('hello ' + query.key);
                }
                break;
            case '/DaysBetweenDates':
                date1 = new Date(query.date1);
                date2 = new Date(query.date2);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                res.end(diffDays.toString());
                break;
            case '/Validatephonenumber':
                if (!query.phoneNumber) {
                    res.end('no phoneNumber passed');
                    break;
                } else {
                    query.phoneNumber.length == 12 ? res.end('valid') : res.end('invalid');
                }
                break;
            case '/ValidateSpanishDNI':
                if (!query.dni) {
                    res.end('no dni passed');
                    break;
                } else {
                    const dni = query.dni;
                    const dniNumber = dni.slice(0, -1);
                    const dniLetter = dni.slice(-1).toUpperCase();
                    const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
                    const calculatedLetter = validLetters.charAt(dniNumber % 23);
                    if (dniLetter === calculatedLetter) {
                        res.end('valid');
                    } else {
                        res.end('invalid');
                    }
                }
                break;
            case '/ReturnColorCode':
                if (!query.color) {
                    res.end('no color passed');
                } else {
                    fs.readFile(path.join(__dirname, 'colors.json'), 'utf8', (err, data) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Server error');
                            return;
                        }
                        const colors = JSON.parse(data);
                        const colorEntry = colors.find(c => c.color.toLowerCase() === query.color.toLowerCase());
                        if (colorEntry) {
                            res.end(JSON.stringify(colorEntry.code.rgba));
                        } else {
                            res.end('color not supported');
                        }
                    });
                }
                break;
            default:
                res.end('path not supported');
                break;
        }
    }
});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});
