import tkinter as tk
# Create main window
window = tk.Tk()
window.title("Login Page")
window.geometry("300x200")

# Username label and entry
tk.Label(window, text="Username").grid(row=0, column=0, padx=10, pady=10)
username = tk.Entry(window)
username.grid(row=0, column=1, padx=10, pady=10)

# Password label and entry
tk.Label(window, text="Password").grid(row=1, column=0, padx=10, pady=10)
password = tk.Entry(window, show="*")
password.grid(row=1, column=1, padx=10, pady=10)

# Login function
def login():
    user = username.get()
    pwd = password.get()
    print("Username:", user)
    print("Password:", pwd)

# Login button
tk.Button(window, text="Login", command=login).grid(row=2, column=1, pady=10)

# Run the application
window.mainloop()
