'use strict';
import http from 'http';
import url from 'url';
import fs from 'fs';

/**
 * @param {http.IncomingMessage} req 
 * @param {*} res 
 */
function serverLogic(req, res) {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
        
        // todo: perform logic based on apis
        
    });
}

http.createServer(serverLogic).listen(8080);
