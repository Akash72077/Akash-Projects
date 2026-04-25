import tkinter  # step 1
window=tkinter.Tk() #window created 
#renamed
window.title("Canvaas")
c=tkinter.Canvas(window, bg="blue", height=250,width=250)
coord= 10, 50 , 240 , 210
arc= c.create_arc(coord,start=0, extent=150, fill="red") #create widget or componnent 
c.pack() #link component
window.mainloop() #run main event loop
