import tkinter
from tkinter import * 
window=tkinter.Tk()
l=tkinter.Label(window, text="User Name: ")
l.pack(side=LEFT)
e=tkinter.Entry(window)
e.pack(side=RIGHT)
window.mainloop()
