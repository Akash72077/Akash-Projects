import cv2

img = cv2.imread("novitech.png")

if img is None:
    print("Error: Image not found.")
else:
    cv2.imshow("Display", img)
    cv2.imwrite("Singh.jpg", img)
    cv2.waitKey(10000)   # Wait for 10 seconds
    cv2.destroyAllWindows()