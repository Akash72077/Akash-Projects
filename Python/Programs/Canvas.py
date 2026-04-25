import tkinter
window=tkinter.Tk()
c=tkinter.Canvas(window, bg="blue", height=250,width=250)
coord= 10, 50 , 240 , 210
arc= c.create_arc(coord,start=0, extent=150, fill="red")
c.pack()
window.mainloop()
