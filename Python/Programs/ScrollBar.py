import tkinter
from tkinter import *
window = tkinter.Tk()

sb=tkinter.Scrollbar(window)
sb.pack(side=RIGHT, fill=Y)
mylist=tkinter.Listbox(window, yscrollcommand=sb.set)
for line in range(51):
    mylist.insert(END, "This is line number " +str(line))
mylist.pack(side=LEFT, fill=BOTH)
sb.config(command=mylist.yview)


window.mainloop()
