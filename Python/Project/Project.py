from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Store student data
students = {}


# ------------------ Performance Analysis Function ------------------ #
def analyse_performance(marks):
    if len(marks) == 0:
        return 0, [], []

    total = sum(marks.values())
    avg = total / len(marks)

    weak = [sub for sub, m in marks.items() if m < 40]
    strong = [sub for sub, m in marks.items() if m >= 75]

    return avg, weak, strong


# ------------------ Recommendation Function ------------------ #
def give_recommendation(avg):
    if avg < 40:
        return "Needs Improvement: Practice more and revise basics"

    elif avg < 75:
        return "Average: Focus on weak areas"

    else:
        return "Good: Keep up the good work"


# ------------------ Routes ------------------ #

# Home / Login Page
@app.route('/')
def home():
    return render_template('login.html')


# Student Registration
@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':
        name = request.form['name']
        roll = request.form['roll']
        email = request.form['email']

        students[roll] = {
            "name": name,
            "email": email,
            "marks": {}
        }

        return redirect('/')

    return render_template('register.html')


# Student Dashboard
@app.route('/dashboard/<roll>', methods=['GET', 'POST'])
def dashboard(roll):

    if roll not in students:
        return "Student not found"

    if request.method == 'POST':
        subject = request.form['subject']
        marks = int(request.form['marks'])

        students[roll]["marks"][subject] = marks

    # Analyze performance
    avg, weak, strong = analyse_performance(
        students[roll]["marks"]
    )

    recommendation = give_recommendation(avg)

    return render_template(
        'dashboard.html',
        data=students[roll],
        average=avg,
        weak_subjects=weak,
        strong_subjects=strong,
        recommendation=recommendation
    )


# Run App
if __name__ == '__main__':
    app.run(debug=True)