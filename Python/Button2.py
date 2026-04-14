import tkinter # step 1
from tkinter import messagebox
# Created GUI window step 2
window = tkinter.Tk()
# rename
window.title("GUI")
def callback():
    messagebox.showinfo("Title", "Hello CMREC") 
B=tkinter.Button(window, text="click", command= callback)#Create layout 3a
B.pack() #3b link 
window.mainloop() #run main loop
