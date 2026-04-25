import tkinter
from tkinter import *
def sel():
    selection ="You Selected the option "+str(var.get())
    label.config(text=selection)
window=tkinter.Tk()
var=IntVar()
R1= Radiobutton(window, text="C", variable=var, value=1, command=sel)
R1.pack()
R2= Radiobutton(window, text="C++", variable=var, value=2, command=sel)
R2.pack()
R3= Radiobutton(window, text="Python", variable=var, value=3, command=sel)
R3.pack()
label=Label(window)
label.pack()
window.mainloop()
