const sonar = require( 'sonarqube-build-breaker' );

let token = process.env.SONAR_TOKEN;
let server = process.env.SONAR_SERVER;
let file = './.scannerwork/report-task.txt';

sonar.checkQuality( server, file, token );