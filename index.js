require("dotenv").config()
var cloudinary = require('cloudinary').v2;
const { Leap } = require("@leap-ai/workflows");
const fs = require('fs');
const path = require('path');
const util = require('util');

cloudinary.config({
    cloud_name: "dmtldq5iy",
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });


  async function uploadImage(file, directoryPath) {
    let options = {};
    if (path.extname(file) === '.heic') {
        options = { format: 'jpg', quality: '10' };
    }

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path.join(directoryPath, file), options, (error, result) => {
            if (error || !result || !result.secure_url) {
                console.error("Error uploading image:", error);
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
}

async function executeLeapWorkflow(urls) {
    const leap = new Leap({
        apiKey: process.env.LEAP_API_KEY,
    });

    const response = await leap.workflowRuns.workflow({
        workflow_id: process.env.LEAP_WORKFLOW_ID,
        webhook_url: "https://c464-2601-645-b00-f760-6cd4-745d-907d-ceb1.ngrok-free.app",
        input: {
            title: "Kevin_sims", 
            name: "man",
            image_urls: urls,
        },
    });

    const { status, statusText, data: workflowResponse } = response;
    console.log("workflows response: ", workflowResponse);
}

async function genHeadshot() {
    const directoryPath = path.join(__dirname, './images');
    const readdir = util.promisify(fs.readdir);
    const files = await readdir(directoryPath);
    let uploadPromises = files.map(file => uploadImage(file, directoryPath));

    try {
        const urls = await Promise.all(uploadPromises);
        await executeLeapWorkflow(urls);
    } catch (error) {
        console.error("Error in genHeadshot:", error);
    }
}

genHeadshot()