import sqlite3
# Connect to database
conn = sqlite3.connect("student.db")
# Create cursor object
cursor = conn.cursor()
# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
)
""")
# Insert data
cursor.execute("INSERT  INTO student (id, name, age) VALUES (1, 'Akash', 20)")
cursor.execute("INSERT INTO student (name, age) VALUES ('Rahul', 22)")
cursor.execute("INSERT INTO student (name, age) VALUES ('Priya', 19)")
# 🔥 Multiple Update Operations
cursor.execute("UPDATE student SET age = 21 WHERE id = 1")
cursor.execute("UPDATE student SET age = 23 WHERE name = 'Rahul'")
cursor.execute("UPDATE student SET age = 20 WHERE name = 'Priya'")

# Commit changes
conn.commit()

# Display updated data
cursor.execute("SELECT * FROM student")
rows = cursor.fetchall()
for row in rows:
    print(row)
# Close connection
conn.close()

