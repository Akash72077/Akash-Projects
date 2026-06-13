# Program to accept a list of integers and perform operations

n = int(input("Enter number of elements: ")) #input 

lst = []#initialize

for i in range(n):
    num = int(input()) #taking input data type of int 
    lst.append(num) #inseting values 

print("List:", lst) #printing list

length = len(lst)#len is inbuilt function to calculate length
print("Length =", length)

print("Even numbers:", end=" ")
even_count = 0
odd_count = 0

for num in lst:
    if num % 2 == 0:
        print(num, end=" ")
        even_count += 1
    else:
        odd_count += 1

print()
print("Even count =", even_count)
print("Odd count =", odd_count)

total = sum(lst)# sum anedhi inbuild function we can use for loop also to find sum 
print("Sum =", total)

average = total / length
print("Average = {:.2f}".format(average)) # .2f ante decimial values 2 eh ostai point tharuavatha example : 2.56