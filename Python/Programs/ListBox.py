import tkinter
from tkinter import *
window = tkinter.Tk()
lb= Listbox(window)
lb.insert(1, "C")
lb.insert(2, "CPP")
lb.insert(3, "JAVA")
lb.insert(4, "python")
lb.pack()
window.mainloop()
