# Image Processing with Leap Workflows

This project uploads images to Cloudinary and then processes them using Leap Workflows.

## Setup

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file in the root directory and add your Cloudinary and Leap API keys:

CLOUD_KEY=your_cloudinary_key
CLOUD_SECRET=your_cloudinary_secret
LEAP_API_KEY=your_leap_api_key
LEAP_WORKFLOW_ID=your_leap_workflow_id

## Usage

1. Place your images in the `./images` directory.
2. Run the script with `node index.js`.

The script will upload all images in the `./images` directory to Cloudinary. If an image is in the `.heic` format, it will be converted to `.jpg` with a quality of '10' for speed, feel free to change to 10-100. The URLs of the uploaded images will then be used as input for a Leap Workflow.

The response from the Leap Workflow will be logged to the console.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)