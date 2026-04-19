n= int(input("Enter the value of n: "))
# m=int (input("Enter the value of m: "))
for i in range(n):
    for j in range(n):
        if j<= i:
            print(j+1, end=" ")
        else:
            print(" ", end=" ")
    print("")
