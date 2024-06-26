//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const axios = require('axios');
const assert = require('assert');
const http = require('http');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
        .get('http://localhost:3000/get' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });

    it('should return days between dates if date1 and date2 are passed in the query string', () => {
        http
        .get('http://localhost:3000/DaysBetweenDates?date1=2022-01-01&date2=2022-01-02', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '1');
            });
        });
    });

    it('should validate a valid phone number', () => {
        http
        .get('http://localhost:3000/Validatephonenumber?phoneNumber=+34666777888', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
            });
        });
    });
  
    
    it('should validate an invalid phone number', () => {
        http
        .get('http://localhost:3000/Validatephonenumber?phoneNumber=+3466677788', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'invalid');
            });
        });
    });

    //add test to check get when key is equal to world

    //add test to check validatephoneNumber

    //write test to validate validateSpanishDNI
    it('should validate a valid spanish DNI', () => {
        http
        .get('http://localhost:3000/ValidateSpanishDNI?dni=12345678Z', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
            });
        });
    });
   

    //write test for returnColorCode red should return code #FF0000



});
