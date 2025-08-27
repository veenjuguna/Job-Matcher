from flask import Flask, render_template, request, redirect, url_for, flash

from love import recommend_jobs

app = Flask(__name__)
app.secret