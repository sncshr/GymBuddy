# GymBuddy

## What?
GymBuddy is a workout tracking and feedback system that uses machine learning to classify different exercises and provide real-time feedback on form and performance. The system leverages TensorFlow Lite models to run inference on keypoints extracted from video feeds.

## Features
- Real-time exercise classification
- Feedback on exercise form
- Visualization of workout statistics
- Supports multiple exercises including pushups, squats, lunges, bicep curls, situps, tricep extensions, dumbbell rows, jumping jacks, dumbbell shoulder press, and lateral shoulder raises

## Setup
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd GymBuddy
    ```

2. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

3. Download the pre-trained models and place them in the [models](http://_vscodecontentref_/0) directory.

## Usage
### Running Inference
You can run inference using the provided Jupyter notebooks.

1. Open [GymBuddyClassifierInference.ipynb](http://_vscodecontentref_/1):
    ```sh
    jupyter notebook GymBuddyClassifierInference.ipynb
    ```

2. Follow the instructions in the notebook to load the model and run predictions on sample data points.

### Training
To train the model, use the [GymBuddy_training.ipynb](http://_vscodecontentref_/2) notebook.

1. Open [GymBuddy_training.ipynb](http://_vscodecontentref_/3):
    ```sh
    jupyter notebook GymBuddy_training.ipynb
    ```

2. Follow the instructions in the notebook to set up the training environment and train the model.

## Directory Structure
- [data](http://_vscodecontentref_/4): Contains training and validation datasets.
- [models](http://_vscodecontentref_/5): Contains pre-trained models.
- [GymBuddyMobile](http://_vscodecontentref_/5): Contains React Native Application which utlizes the TFLite model.
- [utils](http://_vscodecontentref_/6): Utility scripts for data processing and plotting.
- [GymBuddyClassifier.py](http://_vscodecontentref_/7): Implementation of the GymBuddyClassifier class.
- [gymbuddy_integration.py](http://_vscodecontentref_/8): Script for integrating the classifier with video feed and providing real-time feedback.
- [GymBuddy_training.ipynb](http://_vscodecontentref_/9): Notebook for training the model.
- [GymBuddyClassifierInference.ipynb](http://_vscodecontentref_/10): Notebook for running inference using the trained model.

## Requirements
- TensorFlow
- Mediapipe
- Numpy
- Matplotlib
- Pillow

## License
This project is licensed under the MIT License.
