
import threading
# Function to print even numbers
def print_even():
    for i in range(1, 21):
        if i % 2 == 0:
            print("Even:", i)
# Function to print odd numbers
def print_odd():
    for i in range(1, 21):
        if i % 2 != 0:
            print("Odd:", i)
# Create threads
t1 = threading.Thread(target=print_even)
t2 = threading.Thread(target=print_odd)

# Start threads
t1.start()
t2.start()
# Wait for both threads to finish
t1.join()
t2.join()
print("Program finished")