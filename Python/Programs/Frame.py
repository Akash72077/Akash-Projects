import tkinter
from tkinter import * 
window=tkinter.Tk()
window.title("GUI")
f=tkinter.Frame(window)
f.pack()
b1=tkinter.Button(f,text="red" , fg="red")
b1.pack()
b2=tkinter.Button(f,text="blue" , fg="blue")
b2.pack()
b3=tkinter.Button(f,text="green" , fg="green")
b3.pack()
f.mainloop()
