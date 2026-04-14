import threading

def task():
    print("Thread is running")

# Create threads
t1 = threading.Thread(target=task)
t2 = threading.Thread(target=task)

# Start threads
t1.start()
t2.start()

# Wait for threads to finish
t1.join()
t2.join()

print("Main program finished")