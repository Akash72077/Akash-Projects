import tkinter
from tkinter import *
def onclick():
    pass
window= tkinter.Tk()
text =tkinter.Text(window)
text.insert(INSERT, "Hello......\n")
text.insert(END, "Bye Bye......\n")

#configure tags
text.tag_config("tag1" , background="gray", foreground="yellow")
text.tag_config("tag2" , background="lightblue", foreground="orange")
#apply tags to text
#1.0 line 1 char 0 1.end end of line 1
text.tag_add("tag1" ,"1.0","1.end")
text.tag_add("tag2" ,"2.0","2.end")
text.pack()
window.mainloop()
