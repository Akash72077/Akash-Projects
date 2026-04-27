fo=open("file.txt", "r")
# print(fo.name)
# print(fo.mode)
# print(fo.closed)
#input methods 
# data= fo.read(5)
# print(data) # reads 5 lines if length not mentioned it will read upto end of the file
# data1=fo.read()
# print(data1)
#if size not given reads a single line 
rd=fo.readline()
print(rd)
#if size given read size number of characters 
rd=fo.readline(5)
print(rd)