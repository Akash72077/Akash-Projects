import tkinter
from tkinter import * 
window=tkinter.Tk()
cb1=tkinter.Checkbutton(window,text="dance")
cb1.pack()
cb2=tkinter.Checkbutton(window,text="music" ,onvalue=1, offvalue=0)
cb2.pack()
window.mainloop()
