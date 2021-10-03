# Flat File POC

This project is a POC for the FlatFile [FlatFile](https://flatfile.com/) toolset / product. To make it
faster for me to put this POC together I wrote the server part in Python/Flask and the JavaScript parts in
vanilla JavaScript.

The project runs completely client side and doesn't transmit any data to FlatFile, so no issues with 
PHI information. FlatFile provides secure services so PHI information shouldn't be a problem, but we may
not need those services as they are primarily for users who are importing Excel files.

## Installing The Application

This code was developed with Python version 3.9.4, which you can install with pyenv in a terminal window:

```console
pyenv install 3.9.4
```

This will make Python version 3.9.4 available on your system. In the directory where you've 
git cloned this repository run the following commands:

```console
pyenv local 3.9.4
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

This get the necessary Python virtual environment created, activated and installs the modules necessary to
run the application.

## Running The Application

The application is built using the Python Flask web framework. To run the application follow these steps:

```console
export FLASK_ENV=development
export FLASK_APP=demo.py
flask run
```

This will bring up the application and log it's output to the terminal. In a browser navigate to
http://localhost:5000 and the home screen will be displayed. Refer to the wiki page for information
about using the application.

Once the exports have been defined within a terminal instance you can re-run the application by just
running the command `flask run`
