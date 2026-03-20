marks = [43.3, 43.6,55.3,55.9, 54.5]
# print(marks[0:5])
# methods in list append = adds on element to end 
# marks.append(14)
# print(marks[len(marks)-1])
"""sort  is used to sort it in ascending order
sort(reverse=True is used to sort the list in descending order)
"""
# new_list= marks
# new_list.sort() # sort function returns none value
# print(new_list)
# new_list.sort(reverse=True)# it is used to print the elements in descending order
# print(new_list)
#list= ["banana", "mango", "litchi"]
# print(list)
# list.sort()
# print(list)
# list.sort(reverse=True)
# print(list)
#list.reverse()
# print(list)
# marks.reverse()
# print(marks)
#insert method is used to add the element in particalr area 
# marks.insert(1,100)
# print(marks)
#pop(idx) deletes the element in a particular index 
#remove() removes the first occurrance of element
# Example : Write a program to ask 3 favourite movies as input and store it in list
# movies=[]
# mov1=input("Enter 1st movie name: ")
# mov2=input("Enter 2rd movie name: ")
# mov3=input("Enter 3rd movie name: ")
# movies.append(mov1)
# movies.append(mov2)
# movies.append(mov3)
# print(movies)
# example 2 : write a program to check if a list contains a palindrome of elements.
# list=[1,"abc", "abc", 1]
# length= len(list)# this method is using for loop 

# result=True
# for i in range(0, length//2):
#     if(list[i]!=list[length-i-1]):
#         result=False
#         break

# print(result)
#another mothod using extra space
# list=[1,"abc", "afbc", 1]
# newList= list[::-1]
# result= True
# for i in range (len(list)):
#     if(list[i]!=newList[i]):
#         result=False
#         break
       
# if(result==True):
#     print("It is palindrome")
# else:
#     print("not palindrome") 
#another method using list
list=[1,"abc", "abc", 1]
new_list= list.copy()
new_list.reverse()
if(list==new_list):
    print("palindrome")
else:
    print("not palindrome")