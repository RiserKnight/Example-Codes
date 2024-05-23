const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
var hackerEarth=require('hackerearth-node');
app.use(bodyP.json())

CODE_EVALUATION_URL = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/'
CLIENT_SECRET = '3b0fa948954f81215ad2ade2bfe6a4521cf2947b'



var data={
    "lang": "PYTHON",
    "source": "print 'Hello World'",
    "input": "",
    "memory_limit": 243232,
    "time_limit": 5,
    "id":"989ecebc059a3e8dbf9abb434e7f8228b1d89239f2c8.api.hackerearth.com",
    "callback": "https://client.com/callback/"
  };

app.use(cors());
app.use(express.json());
 
//app.post("/compile", async(req, res) => {
    // const response = await axios.post(CODE_EVALUATION_URL, data, {
    //     headers: {
    //         'client-secret': CLIENT_SECRET,
    //         'Content-Type': 'application/json',
    //     },
    // });
    // const response = await fetch(CODE_EVALUATION_URL, { 
    //     method: 'POST', 
    //     body: JSON.stringify(data),
    //     headers: {
    //         'client-secret': CLIENT_SECRET,
    //         'Content-Type': 'application/json',
    //     }
    //   });
    //console.log(response);
    // const dataC = await response.json();
    // console.log(dataC.text);
    // console.log(dataC.data);

// let HE_OUTPUT_URL=""
// const HE = new HackerEarth({'clientSecret':CLIENT_SECRET});
// const source="console.log('Hello HackerEarth')";

// HE.execute({
//         source:source,
//         lang:'JAVASCRIPT_NODE',
//         input:'',
//         memory_limit:10000,
//         time_limit:2,
//     })
//     .then((response)=>{
//         console.log(response.data);
//         HE_OUTPUT_URL=response.data.status_update_url;
//         console.log(HE_OUTPUT_URL);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     console.log(HE_OUTPUT_URL);

    // HE.get_output({
    //     url:HE_OUTPUT_URL
    // },(err,response)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(response.data)
    //     }
    // })
 //})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})