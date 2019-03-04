const publicIp = require('public-ip');
const nodemailer = require('nodemailer');
require('dotenv').config()
let matchNote =true
const mailOptions = {
    from: process.env.EMAILADD,
    to: process.env.EMAILADD,
    subject: 'current IP',
    html: '<p>test</p>'
};
let IP = process.env.DEFAULTIP // this is the last known good IP address .env file
const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILADD, // this is the email address in the . env file 
        pass: process.env.EMAILPASS// this is the email password in the . env file 
    }
});
checkIT = () => {
    publicIp.v4()
        .then((value) => {
            sendThis(value)
        })
}
checkIT()
sendThis = (value) => {
    let tempIP = value
    if (IP !== tempIP) {
        console.log(process.env.EMAILADD)
        mailOptions.html = `<p>server current  🌎 IP address ${tempIP} `
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        IP = tempIP
        matchNote = true
    }
    else if(matchNote){
        matchNote = false
        console.log("IP matches", tempIP)
    }
    setTimeout(checkIT, 10000);
}



