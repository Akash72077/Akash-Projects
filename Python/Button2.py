import tkinter # step 1
from tkinter import messagebox
# Created GUI window
window = tkinter.Tk()
window.title("GUI")
def callback():
    messagebox.showinfo("Title", "Hello CMREC")
B=tkinter.Button(window, text="click", command= callback)
B.pack()
window.mainloop()
