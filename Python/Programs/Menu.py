import tkinter
from tkinter import *
window = tkinter.Tk()
window.title("Menu Button")
mb= Menubutton(window , text= "File", relief=RAISED)
mb.pack()
mb.menu= Menu(mb, tearoff=0)
mb["menu"]=mb.menu
mb.menu.add_command(label="New")
mb.menu.add_command(label="Open")
mb.menu.add_command(label="Save")
mb.menu.add_command(label="Save_as")
mb.menu.add_command(label="Close")
mb.menu.add_command(label="Exit", command= window.quit)
window.mainloop()
